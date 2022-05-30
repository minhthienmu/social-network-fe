import { useMutation } from "@apollo/client";
import Leftnav from "component/LeftNav";
import { changePasswordMutation } from "graphql/mutation";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { RootState } from "store";

const mapStateToProps = (state: RootState) => {
    return {
        user: state.userReducer.user,
    };
};

interface Props extends RouteComponentProps, ReturnType<typeof mapStateToProps> {}

const ChangePassword = (props: Props) => {
    const { user } = props;
    const [changePassword] = useMutation(changePasswordMutation);

    const onSubmit = async (e: any) => {
        e.preventDefault();
        const currentPassword = e.target.querySelector('[name="current-password"]').value;
        const newPassword = e.target.querySelector('[name="new-password"]').value;
        //const newPassword2 = e.target.querySelector('[name="new-password-2"]').value;
        const res = await changePassword({
            variables: {
                userId: user.id,
                oldPassword: currentPassword,
                newPassword: newPassword,
            },
        });
        if (res.data.changePassword) {
            props.history.push("/setting");
        }
    };

    return (
        <Fragment>
            <Leftnav />
            <div className="main-content bg-lightblue theme-dark-bg right-chat-active">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left">
                        <div className="middle-wrap">
                            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-3">
                                    <Link to="/setting" className="d-inline-block mt-2">
                                        <i className="ti-arrow-left font-sm text-white"></i>
                                    </Link>
                                    <h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">Change Password</h4>
                                </div>
                                <div className="card-body p-lg-5 p-4 w-100 border-0">
                                    <form onSubmit={onSubmit}>
                                        <div className="row">
                                            <div className="col-lg-12 mb-3">
                                                <div className="form-gorup">
                                                    <label className="mont-font fw-600 font-xssss">
                                                        Current Password
                                                    </label>
                                                    <input
                                                        type="Password"
                                                        name="current-password"
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-12 mb-3">
                                                <div className="form-gorup">
                                                    <label className="mont-font fw-600 font-xssss">
                                                        Change Password
                                                    </label>
                                                    <input
                                                        type="Password"
                                                        name="new-password"
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-12 mb-3">
                                                <div className="form-gorup">
                                                    <label className="mont-font fw-600 font-xssss">
                                                        Confirm Change Password
                                                    </label>
                                                    <input
                                                        type="Password"
                                                        name="new-password-2"
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12 mb-0">
                                                <button className="no-border bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block">
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default connect(mapStateToProps)(ChangePassword);
