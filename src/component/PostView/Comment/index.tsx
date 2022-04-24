import React, { useState, useEffect } from "react";
import { RootState } from "store";
import { connect } from "react-redux";
import { useMutation } from "@apollo/client";
import { queryComment } from "graphql/query";
import { commentMutation } from "graphql/mutation";
import { useLazyQuery } from "@apollo/client";
import "./style.scss";

const mapStateToProps = (state: RootState) => {
    return {
        user: state.userReducer.user,
    };
};

interface Props extends ReturnType<typeof mapStateToProps> {
    postId: number;
    commentSuccess: () => void;
}

const Comment = (props: Props) => {
    const [getComment, { data }] = useLazyQuery(queryComment);
    const [comment, { loading, error }] = useMutation(commentMutation);
    const [listComment, setListComment] = useState([]);
    const { user, postId } = props;
    const onComment = async (e: any) => {
        e.preventDefault();
        try {
            const description = e.target.querySelector(`[name="${postId}-description"]`).value;
            const res = await comment({
                variables: {
                    request: {
                        postId: postId,
                        userId: user.id,
                        description: description,
                    },
                },
            });
            (document.querySelector(`input[name="${postId}-description"]`) as HTMLInputElement).value = "";
            props.commentSuccess();
            getComment({
                variables: {
                    postId: postId,
                },
            });
            //TODO: Thay đổi cơ chế thêm comment mới => push thẳng vào listComment => cần res là comment đó
        } catch (error) {
            console.log(error);
        }
    };

    const loadMore = async () => {
        const comments = data.post.comments;
        setListComment(comments.slice(0, listComment.length + 10));
    };

    useEffect(() => {
        (async () => {
            const res = await getComment({
                variables: {
                    postId: postId,
                },
            });
            const comments = res.data.post.comments;
            setListComment(comments.slice(0, listComment.length > 5 ? listComment.length : 5));
        })();
    }, [data]);

    return (
        <div className="comments">
            {/* <div className="d-flex flex-row mb-2">
                <figure className="avatar me-3">
                    <img src={`assets/images/user.png`} alt="avater" className="shadow-sm rounded-circle w30" />
                </figure>
                <input />
            </div> */}
            <form onSubmit={onComment}>
                <div className="position-relative mb-2">
                    <figure className="avatar position-absolute mt-1 top-5 left-5">
                        <img src="assets/images/user.png" alt="icon" className="shadow-sm rounded-circle w30" />
                    </figure>
                    <input
                        className="bor-0 w-100 rounded-xxl p-2 ps-5 font-xssss text-content fw-500 border-light-md theme-dark-bg"
                        placeholder="Comment"
                        name={`${postId}-description`}
                    ></input>
                </div>
            </form>
            {listComment.length > 0 ? (
                <>
                    {listComment.map((comment: any) => {
                        return (
                            <div className="d-flex flex-row mb-2" style={{ marginLeft: "5px" }} key={comment.id}>
                                <figure className="avatar me-3">
                                    <img
                                        src={`assets/images/user.png`}
                                        alt="avater"
                                        className="shadow-sm rounded-circle w30"
                                    />
                                </figure>
                                <div className="comment-box d-flex flex-column ml-2">
                                    <span className="comment-text fw-700 font-xssss lh-26 text-content">
                                        {comment.userFullName}
                                    </span>
                                    <span className="comment-text fw-400 font-xssss text-content">
                                        {comment.description}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                    {listComment.length < data.post.comments.length ? (
                        <div className="text-grey-500 font-xsss fw-500 ms-xl-2 cursor-pointer" onClick={loadMore}>
                            More
                        </div>
                    ) : null}
                </>
            ) : null}
        </div>
    );
};

export default connect(mapStateToProps)(React.memo(Comment));
