import { useState } from "react";

export const UserCreate = ({
    onClose,
    onUserCreate
}) => {
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        imageUrl: '',
        country: '',
        city: '',
        street: '',
        streetNumber: ''
    });

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const minLength = (e, bound) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: values[e.target.name].length < bound
        }))
    }

    const isPositive = (e) => {
        let number = Number(e.target.value);
        setErrors(state => ({
            ...state,
            [e.target.name]: number < 0,
        }));
    }

    const validEmail = (e) => {
        const regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        const emailInput = e.target.value;

        setErrors(state => ({
            ...state,
            [e.target.name]: !regex.test(emailInput)
        }))
    }

    const validUrl = (e) => {
        const regex = new RegExp(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i);
        const urlInput = e.target.value;

        setErrors(state => ({
            ...state,
            [e.target.name]: !regex.test(urlInput)
        }))
    }

    const validPhoneNumber = (e) => {
        const regex = new RegExp(/^[0][0-9]{9}/);
        const urlInput = e.target.value;

        setErrors(state => ({
            ...state,
            [e.target.name]: !regex.test(urlInput)
        }))
    }

    return (
        <div className="overlay">
            <div className="backdrop" onClick={onClose}></div>
            <div className="modal">
                <div className="user-container">
                    <header className="headers">
                        <h2>Edit User/Add User</h2>
                        <button className="btn close" onClick={onClose}>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark"
                                className="svg-inline--fa fa-xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                <path fill="currentColor"
                                    d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z">
                                </path>
                            </svg>
                        </button>
                    </header>
                    <form onSubmit={onUserCreate}>
                        <div className="form-row">
                            <div className="form-group">
                                <label forname="firstName">First name</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-user"></i></span>
                                    <input id="firstName" name="firstName" type="text" value={values.firstName} onChange={changeHandler} onBlur={(e) => minLength(e, 3)} />
                                </div>
                                {errors.firstName &&
                                    <p className="form-error">
                                        First name should be at least 3 characters long!
                                    </p>
                                }
                            </div>
                            <div className="form-group">
                                <label forname="lastName">Last name</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-user"></i></span>
                                    <input id="lastName" name="lastName" type="text" value={values.lastName} onChange={changeHandler} onBlur={(e) => minLength(e, 3)} />
                                </div>
                                {errors.lastName && <p className="form-error">
                                    Last name should be at least 3 characters long!
                                </p>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label forname="email">Email</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-envelope"></i></span>
                                    <input id="email" name="email" type="text" value={values.email} onChange={changeHandler} onBlur={(e) => validEmail(e)} />
                                </div>
                                {
                                    errors.email &&
                                    < p className="form-error">Email is not valid!</p>
                                }
                            </div>
                            <div className="form-group">
                                <label forname="phoneNumber">Phone number</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-phone"></i></span>
                                    <input id="phoneNumber" name="phoneNumber" type="text" value={values.phoneNumber} onChange={changeHandler} onBlur={(e) => validPhoneNumber(e)} />
                                </div>
                                {errors.phoneNumber &&
                                    <p className="form-error">Phone number is not valid!</p>
                                }
                            </div>
                        </div>

                        <div className="form-group long-line">
                            <label forname="imageUrl">Image Url</label>
                            <div className="input-wrapper">
                                <span><i className="fa-solid fa-image"></i></span>
                                <input id="imageUrl" name="imageUrl" type="text" value={values.imageUrl} onChange={changeHandler} onBlur={(e) => validUrl(e)} />
                            </div>
                            {errors.imageUrl && <p className="form-error">ImageUrl is not valid!</p>}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label forname="country">Country</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-map"></i></span>
                                    <input id="country" name="country" type="text" value={values.country} onChange={changeHandler} onBlur={(e) => minLength(e, 2)} />
                                </div>
                                {errors.country && <p className="form-error">
                                    Country should be at least 2 characters long!
                                </p>
                                }
                            </div>
                            <div className="form-group">
                                <label forname="city">City</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-city"></i></span>
                                    <input id="city" name="city" type="text" value={values.city} onChange={changeHandler} onBlur={(e) => minLength(e, 3)} />
                                </div>
                                {errors.city &&
                                    <p className="form-error">
                                        City should be at least 3 characters long!
                                    </p>
                                }
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label forname="street">Street</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-map"></i></span>
                                    <input id="street" name="street" type="text" value={values.street} onChange={changeHandler} onBlur={(e) => minLength(e, 3)} />
                                </div>
                                {errors.streetNumber &&
                                    <p className="form-error">
                                        Street should be at least 3 characters long!
                                    </p>
                                }
                            </div>
                            <div className="form-group">
                                <label forname="streetNumber">Street number</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-house-chimney"></i></span>
                                    <input id="streetNumber" name="streetNumber" type="text" value={values.streetNumber} onChange={changeHandler} onBlur={(e) => isPositive(e)} />
                                </div>
                                {errors.streetNumber &&
                                    <p className="form-error">
                                        Street number should be a positive number!
                                    </p>
                                }
                            </div>
                        </div>
                        <div id="form-actions">
                            <button id="action-save" className="btn" type="submit">Save</button>
                            <button id="action-cancel" className="btn" type="button" onClick={onClose}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div >
        </div >);
}