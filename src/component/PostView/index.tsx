import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import { useMutation } from "@apollo/client";
import { likeMutation } from "graphql/mutation";
import { RootState } from "store";
import { connect } from "react-redux";
import StarRatings from "react-star-ratings";
import { Star } from "react-feather";

const mapStateToProps = (state: RootState) => {
    return {
        user: state.userReducer.user,
    };
};

interface Props extends ReturnType<typeof mapStateToProps> {
    id: number;
    userId: string;
    userFullName: string;
    providerId: string;
    providerName: string;
    serviceId: string;
    serviceName: string;
    description: string;
    rate: number;
    avatar: string;
    postImage?: string;
    postVideo?: string;
    numLikes?: number;
    numComments?: number;
    time?: string;
    isLikeByUser?: boolean;
    disableReaction?: boolean;
}

const PostView = (props: Props) => {
    const {
        id,
        userId,
        userFullName,
        time,
        description,
        avatar,
        postImage,
        numLikes,
        numComments,
        user,
        serviceName,
        providerId,
        providerName,
        rate,
        isLikeByUser,
        disableReaction,
    } = props;
    const [like] = useMutation(likeMutation);
    const [displayDescription, setDisplayDescription] = useState("");
    const [isLike, setIsLike] = useState(false);
    const [isToggleComment, setIsToggleComment] = useState(false);
    const [showSeeMore, setShowSeeMore] = useState(false);
    const [showPostSetting, setShowPostSetting] = useState(false);
    const [displayNumLikes, setDisplayNumLikes] = useState<any>(0);
    const [displayNumComments, setDisplayNumberComments] = useState<any>(0);

    const toggleLike = async () => {
        const res = await like({
            variables: {
                request: {
                    postId: id,
                    userId: user.id,
                    like: !isLike,
                },
            },
        });
        isLike === false ? setDisplayNumLikes(displayNumLikes + 1) : setDisplayNumLikes(displayNumLikes - 1);
        setIsLike(!isLike);
    };

    const toggleComment = () => {
        setIsToggleComment(!isToggleComment);
    };

    const seeMore = () => {
        setShowSeeMore(false);
        setDisplayDescription(description);
    };

    const commentSuccess = () => {
        setDisplayNumberComments(displayNumComments + 1);
    };

    const togglePostSetting = () => {
        setShowPostSetting(!showPostSetting);
    };

    useEffect(() => {
        if (description.length > 300) {
            setDisplayDescription(description.slice(0, 300));
            setShowSeeMore(true);
        } else {
            setDisplayDescription(description);
            setShowSeeMore(false);
        }
    }, [description]);

    useEffect(() => {
        setDisplayNumLikes(numLikes);
        setDisplayNumberComments(numComments);
        setIsLike(isLikeByUser ?? false);
    }, []);

    const isShowPostSetting = `${showPostSetting ? " show" : ""}`;

    return (
        <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
            <div className="card-body p-0 d-flex">
                <figure className="avatar me-3 mb-2">
                    <img src={`/assets/images/${avatar}`} alt="avater" className="shadow-sm rounded-circle w45" />
                </figure>
                <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                    {" "}
                    <a className="text-grey-900" href={`/user/${userId}`}>
                        {userFullName}
                    </a>{" "}
                    <span className="d-inline font-xssss fw-500 text-grey-500">reviewed</span> {serviceName}{" "}
                    <span className="d-inline font-xssss fw-500 text-grey-500">service of</span>{" "}
                    <a className="text-grey-900" href={`/provider/${providerId}`}>
                        {providerName}
                    </a>{" "}
                    {/* <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500"> {time}</span> */}
                    <div className="d-block mt-1">
                        <StarRatings rating={rate} starDimension="20px" starSpacing="2px" starRatedColor="yellow" />
                    </div>
                </h4>
                {/* <div className={`pos-relative ms-auto pointer ${isShowPostSetting}`} onClick={togglePostSetting}>
                    <i className="ti-more-alt text-grey-900 font-xss"></i>
                    <div
                        className={`dropdown-menu right-0 rounded-xxl border-0 shadow-lg ${isShowPostSetting} text-center`}
                        aria-labelledby="dropdownMenu3"
                    >
                        <div className="card bg-transparent-card w-100 border-0 mb-3">
                            <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">Edit Post</h5>
                        </div>
                        <div className="card bg-transparent-card w-100 border-0">
                            <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">Delete Post</h5>
                        </div>
                    </div>
                </div> */}
            </div>
            <div className="card-body p-0 me-lg-5">
                <p className="fw-400 text-content lh-26 font-xssss w-100 mb-2" style={{ textAlign: "justify" }}>
                    {displayDescription}{" "}
                    {showSeeMore && (
                        <a onClick={seeMore} className="fw-600 text-primary ms-2 pointer">
                            See more
                        </a>
                    )}
                </p>
            </div>
            {postImage ? (
                <div className="card-body d-block p-0 mb-3">
                    <div className="row ps-2 pe-2">
                        <div className="col-sm-12 p-1">
                            <img src={postImage} className="rounded-3 w-100" alt="post" />
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
            {!disableReaction ? (
                <div className="reaction card-body d-flex p-0">
                    <div
                        className="emoji-bttn pointer d-flex align-items-center fw-400 text-grey-900 text-dark lh-26 font-xssss me-2"
                        onClick={toggleLike}
                    >
                        {isLike ? (
                            <Star size={25} className="m-1" fill="yellow" />
                        ) : (
                            <Star size={25} className="m-1" fill="white" />
                        )}
                        {displayNumLikes ? `${displayNumLikes} Like` : ""}
                    </div>
                    <a
                        className="d-flex pointer align-items-center fw-400 text-grey-900 text-dark lh-26 font-xssss"
                        onClick={toggleComment}
                    >
                        <i className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"></i>
                        <span className="d-none-xss">{displayNumComments ? `${displayNumComments} Comment` : ""}</span>
                    </a>
                </div>
            ) : null}
            {isToggleComment && <Comment postId={id} commentSuccess={commentSuccess} />}
        </div>
    );
};

export default connect(mapStateToProps)(React.memo(PostView));
