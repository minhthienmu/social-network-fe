import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import { useMutation } from "@apollo/client";
import { likeMutation } from "graphql/mutation";
import { RootState } from "store";
import { connect } from "react-redux";

const mapStateToProps = (state: RootState) => {
    return {
        user: state.userReducer.user,
    };
};

interface Props extends ReturnType<typeof mapStateToProps> {
    id: number;
    userFullName: string;
    time?: string;
    description: string;
    avatar: string;
    postImage?: string;
    postVideo?: string;
    numLikes?: number;
    numComments?: number;
    likes: any;
}

const PostView = (props: Props) => {
    const { id, userFullName, time, description, avatar, postImage, postVideo, numLikes, numComments, user, likes } =
        props;
    const [like] = useMutation(likeMutation);
    const [displayDescription, setDisplayDescription] = useState("");
    const [isLike, setIsLike] = useState(false);
    const [isToggleComment, setIsToggleComment] = useState(false);
    const [showSeeMore, setShowSeeMore] = useState(false);
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
        if (likes.find((e: any) => e.userId === user.id)) {
            setIsLike(true);
        }
    }, []);

    return (
        <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
            <div className="card-body p-0 d-flex">
                <figure className="avatar me-3">
                    <img src={`assets/images/${avatar}`} alt="avater" className="shadow-sm rounded-circle w45" />
                </figure>
                <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                    {" "}
                    {userFullName} <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500"> {time}</span>
                </h4>
                {/* <div className="ms-auto pointer">
                    <i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i>
                </div> */}
            </div>
            {/* {postVideo ? (
                <div className="card-body p-0 mb-3 rounded-3 overflow-hidden uttam-die">
                    <a href="/defaultvideo" className="video-btn">
                        <video autoPlay loop className="float-right w-100">
                            <source src={`assets/images/${postVideo}`} type="video/mp4" />
                        </video>
                    </a>
                </div>
            ) : (
                ""
            )} */}
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
            <div className="reaction card-body d-flex p-0">
                <div
                    className="emoji-bttn pointer d-flex align-items-center fw-400 text-grey-900 text-dark lh-26 font-xssss me-2"
                    onClick={toggleLike}
                >
                    <i
                        className={`feather-star text-black me-2 btn-round-xs font-lg ${
                            isLike ? "bg-gold-gradiant" : "bg-grey"
                        }`}
                    ></i>
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
            {isToggleComment && <Comment postId={id} commentSuccess={commentSuccess} />}
        </div>
    );
};

export default connect(mapStateToProps)(React.memo(PostView));
