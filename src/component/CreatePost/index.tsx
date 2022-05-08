import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import TextareaAutosize from "react-textarea-autosize";
import "./style.scss";
import { connect } from "react-redux";
import Axios from "axios";
import { RootState } from "store";
import { useMutation, useLazyQuery } from "@apollo/client";
import { createPostMutation, createProviderMutation } from "graphql/mutation";
import { queryAllProvider, queryAllService } from "graphql/query";
import StarRatings from "react-star-ratings";
import Select from "react-select";

const mapStateToProps = (state: RootState) => {
    return {
        user: state.userReducer.user,
    };
};

interface Props extends ReturnType<typeof mapStateToProps> {
    createPostSuccess: () => void;
}

const CreatePost = (props: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [getAllProvider] = useLazyQuery(queryAllProvider);
    const [getAllService] = useLazyQuery(queryAllService);
    const [createNewProvider] = useMutation(createProviderMutation);
    const [createNewPost] = useMutation(createPostMutation);
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState("");
    const [image, setImage] = useState("");
    const [rating, setRating] = useState(0);
    const [imageFile, setImageFile] = useState<any>(null);
    const [imgCloud, setImgCloud] = useState<any>(null);
    const [allProvider, setAllProvider] = useState([]);
    const [selectedProviderOption, setSelectedProviderOption] = useState<any>(null);
    const [allService, setAllService] = useState([]);
    const [selectedServiceOption, setSelectedServiceOption] = useState<any>(null);
    const [toggleAddNewProvider, setToggleAddNewProvider] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggleOpen = async () => {
        const resAllProvider = await getAllProvider({
            variables: {
                last: 0,
            },
        });
        const resAllService = await getAllService();
        setAllProvider(
            resAllProvider.data?.allProvider.map((provider: any) => {
                return {
                    value: provider.id,
                    label: provider.name,
                };
            }) ?? [],
        );
        setAllService(
            resAllService.data?.allService.map((service: any) => {
                return {
                    value: service.id,
                    label: service.name,
                };
            }) ?? [],
        );
        setSelectedProviderOption(null);
        setSelectedServiceOption(null);
        setIsOpen(!isOpen);
        setValue("");
        setImage("");
        setRating(0);
        setToggleAddNewProvider(false);
    };

    const createPost = async () => {
        try {
            setLoading(true);
            if (toggleAddNewProvider) {
                const name = (document.querySelector('[name="providerName"]') as HTMLInputElement).value;
                const address = (document.querySelector('[name="providerAddress"]') as HTMLInputElement).value;
                const resCreateProvider = await createNewProvider({
                    variables: {
                        request: {
                            name: name,
                            address: address,
                        },
                    },
                });
            }
            let imgRes;
            if (image) {
                const formData = new FormData();
                formData.append("file", imageFile);
                formData.append("upload_preset", "t07q9vpq");
                imgRes = await Axios.post("https://api.cloudinary.com/v1_1/dh5w4n75i/image/upload", formData);
            }
            const request = {
                userId: props.user.id,
                providerId: selectedProviderOption?.value,
                serviceId: selectedServiceOption?.value,
                image: imgRes?.data?.url ?? "",
                description: value,
                rate: rating,
            };
            const res = await createNewPost({
                variables: {
                    request: request,
                },
            });
            setLoading(false);
            props.createPostSuccess();
            setIsOpen(!isOpen);
        } catch (error) {
            console.log(error);
        }
    };

    const onChangeFile = async () => {
        if (inputRef.current !== null) {
            const reader = new FileReader();
            const file = inputRef.current.files ? inputRef.current.files[0] : null;
            reader.onloadend = () => {
                if (file != null) {
                    setImageFile(file);
                    setImage(reader.result as string);
                }
            };
            file && reader.readAsDataURL(file);
        }
    };

    const onClickAddNewProvider = () => {
        setToggleAddNewProvider(!toggleAddNewProvider);
    };

    return (
        <>
            <div className="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-4 pe-4 pb-3 mb-3">
                <div className="card-body p-0">
                    <a
                        className="font-xssss fw-600 text-grey-500 card-body p-0 d-flex align-items-center pointer"
                        onClick={toggleOpen}
                    >
                        <i className="btn-round-sm font-xs text-primary feather-edit-3 me-2 bg-greylight"></i>Create
                        Post
                    </a>
                </div>
                <div className="card-body p-0 mt-2 position-relative pointer" onClick={toggleOpen}>
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
                        onClick={toggleOpen}
                    >
                        <i className="font-md text-success feather-image me-2"></i>
                        <span className="d-none-xs">Photo/Video</span>
                    </a>
                </div>
            </div>

            <Modal show={isOpen} onHide={toggleOpen} centered size="lg">
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
                        <div className="row">
                            <div className="col-lg-10 mb-3">
                                {toggleAddNewProvider ? (
                                    <form>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control rounded-xxxl"
                                                        placeholder="Provider Name"
                                                        name="providerName"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control rounded-xxxl"
                                                        placeholder="Provider Address"
                                                        name="providerAddress"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                ) : (
                                    <Select
                                        classNamePrefix="selectInput"
                                        defaultValue={selectedProviderOption}
                                        onChange={setSelectedProviderOption}
                                        options={allProvider}
                                        placeholder={"Select Provider"}
                                    />
                                )}
                            </div>
                            <div className="col-lg-2 mb-3">
                                <button
                                    className="bg-current text-center text-white font-xsss fw-600 w-100 h-100 rounded-3 d-inline-block no-border"
                                    onClick={onClickAddNewProvider}
                                >
                                    Add New
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 mb-3">
                                <Select
                                    classNamePrefix="selectInput"
                                    defaultValue={selectedServiceOption}
                                    onChange={setSelectedServiceOption}
                                    options={allService}
                                    placeholder={"Select Service"}
                                />
                            </div>
                        </div>

                        <TextareaAutosize
                            className="text-box bor-0 rounded-xxxl p-2 font-xssss text-content fw-500 border-light-md theme-dark-bg"
                            value={value}
                            minRows={3}
                            maxRows={8}
                            placeholder="What's on your mind?"
                            onChange={(ev) => setValue(ev.target.value)}
                        />
                        <StarRatings
                            rating={rating}
                            starDimension="30px"
                            starSpacing="5px"
                            starRatedColor="yellow"
                            starHoverColor="yellow"
                            numberOfStars={5}
                            changeRating={(value) => setRating(value)}
                        />
                        <div className="card-body p-1 mt-3">
                            {image ? (
                                <div className="col-sm-12 p-1 pb-2">
                                    <img src={image} className="rounded-3 w150 h150" />
                                    {/* <AdvancedImage cldImg={img} plugins={[responsive(), accessibility()]} /> */}
                                </div>
                            ) : null}
                            <div>
                                <input
                                    ref={inputRef}
                                    type="file"
                                    id="upload"
                                    name="upload"
                                    style={{ display: "none", visibility: "hidden" }}
                                    onChange={onChangeFile}
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
                    <button
                        type="button"
                        onClick={createPost}
                        className={`p-2 lh-20 w-100 bg-primary-gradiant me-2 text-white text-center font-xssss fw-600 ls-1 rounded-xl no-border ${
                            loading ? "disable-button" : ""
                        }`}
                        disabled={loading}
                    >
                        Post
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default connect(mapStateToProps)(CreatePost);
