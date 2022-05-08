import React from "react";

interface Props {
    userFullName?: string;
}

const CoverImage = (props: Props) => {
    const { userFullName } = props;
    return (
        <div className="card w-100 border-0 p-0 bg-white shadow-xss rounded-xxl">
            <div className="card-body h250 p-0 rounded-xxl overflow-hidden m-3">
                {/* <img src="https://via.placeholder.com/1200x250.png" alt="avater" /> */}
            </div>
            <div className="card-body p-0 position-relative mt-4">
                <figure className="avatar position-absolute w100 z-index-1" style={{ top: "-40px", left: "30px" }}>
                    <img
                        src="assets/images/user.png"
                        alt="avater"
                        className="float-right p-1 bg-white rounded-circle w-100"
                    />
                </figure>
                <h4 className="fw-700 font-sm mt-2 mb-lg-5 mb-4 pl-15">
                    {userFullName}{" "}
                    {/* <span className="fw-500 font-xssss text-grey-500 mt-1 mb-3 d-block">support@gmail.com</span> */}
                </h4>
                <div className="d-flex align-items-center justify-content-center position-absolute-md right-15 top-0 me-2">
                    {/* <a
                        href="/defaultmember"
                        className="d-none d-lg-block bg-success p-3 z-index-1 rounded-3 text-white font-xsssss text-uppercase fw-700 ls-3"
                    >
                        Add Friend
                    </a> */}
                    {/* <a
                        href="/defaultemailbox"
                        className="d-none d-lg-block bg-greylight btn-round-lg ms-2 rounded-3 text-grey-700"
                    >
                        <i className="feather-mail font-md"></i>
                    </a>
                    <a
                        href="/home"
                        id="dropdownMenu4"
                        className="d-none d-lg-block bg-greylight btn-round-lg ms-2 rounded-3 text-grey-700"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <i className="ti-more font-md tetx-dark"></i>
                    </a> */}
                </div>
            </div>
        </div>
    );
};

export default CoverImage;
