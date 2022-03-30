import React, { Component } from "react";
import "./style.scss";

interface Props {}

interface State {}

class Comment extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div className="comments">
                <div className="d-flex flex-row mb-2">
                    <figure className="avatar me-3">
                        <img src={`assets/images/user.png`} alt="avater" className="shadow-sm rounded-circle w30" />
                    </figure>
                    <div className="comment-box d-flex flex-column ml-2">
                        <span className="comment-text fw-700 font-xssss lh-26 text-content">Thiện</span>
                        <span className="comment-text fw-400 font-xssss text-content">Xin chào!</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Comment;
