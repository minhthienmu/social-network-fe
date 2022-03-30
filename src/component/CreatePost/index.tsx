import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import TextareaAutosize from "react-textarea-autosize";
import "./style.scss";

class CreatePost extends Component {
    inputRef = React.createRef<HTMLInputElement>();
    state = {
        isOpen: false,
        value: "",
        image: "",
    };

    toggleOpen = () => this.setState({ value: "", isOpen: !this.state.isOpen, image: "" });

    createPost = () => this.setState({ value: "", isOpen: !this.state.isOpen, image: "" });

    onChangeFile = () => {
        if (this.inputRef.current !== null) {
            const reader = new FileReader();
            const file = this.inputRef.current.files ? this.inputRef.current.files[0] : null;
            reader.onloadend = () => {
                if (file != null) {
                    console.log(reader.result);
                    this.setState({ image: reader.result as string });
                }
            };
            file && reader.readAsDataURL(file);
        }
    };

    render() {
        const { isOpen, value, image } = this.state;
        return (
            <>
                <div className="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-4 pe-4 pb-3 mb-3">
                    <div className="card-body p-0">
                        <a
                            className="font-xssss fw-600 text-grey-500 card-body p-0 d-flex align-items-center pointer"
                            onClick={this.toggleOpen}
                        >
                            <i className="btn-round-sm font-xs text-primary feather-edit-3 me-2 bg-greylight"></i>Create
                            Post
                        </a>
                    </div>
                    <div className="card-body p-0 mt-2 position-relative pointer" onClick={this.toggleOpen}>
                        <figure className="avatar position-absolute ms-2 mt-1 top-5">
                            <img src="assets/images/user.png" alt="icon" className="shadow-sm rounded-circle w30" />
                        </figure>
                        <input
                            name="message"
                            className="bor-0 w-100 rounded-xxl p-2 ps-5 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg pointer"
                            placeholder="What's on your mind?"
                            disabled
                        ></input>
                    </div>
                    <div className="card-body d-flex p-1 mt-3">
                        <a
                            className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4 pointer"
                            onClick={this.toggleOpen}
                        >
                            <i className="font-md text-success feather-image me-2"></i>
                            <span className="d-none-xs">Photo/Video</span>
                        </a>
                    </div>
                </div>

                <Modal show={isOpen} onHide={this.toggleOpen} centered>
                    <Modal.Header closeButton>
                        <div className="header">
                            <a className="font-xssss fw-600 text-grey-500 card-body p-0 d-flex align-items-center justify-content-center">
                                <i className="btn-round-sm font-xs text-primary feather-edit-3 me-2 bg-greylight"></i>
                                Create Post
                            </a>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="body">
                            <TextareaAutosize
                                className="text-box bor-0 rounded-xxl p-2 font-xssss text-content fw-500 border-light-md theme-dark-bg"
                                value={value}
                                minRows={3}
                                maxRows={14}
                                placeholder="What's on your mind?"
                                onChange={(ev) => this.setState({ value: ev.target.value })}
                            />
                            <div className="card-body p-1 mt-3">
                                {image ? (
                                    <div className="col-sm-12 p-1 pb-2">
                                        <img src={image} className="rounded-3 w-100 h300" />
                                    </div>
                                ) : null}
                                <div>
                                    <input
                                        ref={this.inputRef}
                                        type="file"
                                        id="upload"
                                        name="upload"
                                        style={{ display: "none", visibility: "hidden" }}
                                        onChange={this.onChangeFile}
                                        multiple
                                    />
                                    <a
                                        className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4 pointer"
                                        onClick={() => {
                                            document.getElementById("upload")?.click();
                                        }}
                                    >
                                        <i className="font-md text-success feather-image me-2"></i>
                                        <span className="d-none-xs">Photo/Video</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <a
                            onClick={this.createPost}
                            className="p-2 lh-20 w-100 bg-primary-gradiant me-2 text-white text-center font-xssss fw-600 ls-1 rounded-xl pointer"
                        >
                            Post
                        </a>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default CreatePost;
