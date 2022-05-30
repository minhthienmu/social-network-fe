import React from "react";

interface Props {
    name: string;
    address: string;
    serviceRate: any[];
}

const CoverImageProvider = (props: Props) => {
    const { name, address, serviceRate } = props;
    return (
        <div className="card w-100 border-0 p-0 bg-white shadow-xss rounded-xxl">
            <div className="card-body h250 p-0 rounded-xxl overflow-hidden m-3">
                {/* <img src="https://via.placeholder.com/1200x250.png" alt="avater" /> */}
            </div>
            <div className="card-body p-0 position-relative mt-4">
                <figure className="avatar position-absolute w100 z-index-1" style={{ top: "-40px", left: "30px" }}>
                    <img
                        src="/assets/images/user.png"
                        alt="avater"
                        className="float-right p-1 bg-white rounded-circle w-100"
                    />
                </figure>
                <h4 className="fw-700 font-sm mt-2 mb-lg-5 mb-4 pl-15">
                    {name} <span className="fw-500 font-xssss text-grey-500 mt-1 mb-3 d-block">{address}</span>
                </h4>
                <div className="d-flex align-items-center justify-content-center position-absolute-md right-15 top-0 me-2">
                    {serviceRate
                        ? serviceRate.map((service) => {
                              return (
                                  <a
                                      key={service.serviceId}
                                      className="d-none d-lg-block bg-success p-3 z-index-1 rounded-3 text-white font-xsssss text-uppercase fw-700 ls-3 ms-lg-1"
                                  >
                                      {service.serviceName} {(service.sumRating / service.totalRating).toFixed(1)}{" "}
                                      <br></br>
                                      <span>{service.totalRating} rating</span>
                                  </a>
                              );
                          })
                        : null}
                </div>
            </div>
        </div>
    );
};

export default React.memo(CoverImageProvider);
