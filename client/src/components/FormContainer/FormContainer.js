import { React, useState, useEffect } from "react"

import LoginForm from "../LoginForm/LoginForm"
import RegisterForm from "../RegisterForm/RegisterForm"
import BenefitSlidebar from "../BenefitSlidebar/BenefitSlidebar"

import "./FormContainer.css"

const FormContainer = (props) => {
    const {option} = props
    return(
        <div className="form-container">
            <div className="forms">
                <div className="option-container">
                    <a href="/login">ĐĂNG NHẬP</a>
                    <a href="/register">ĐĂNG KÝ</a>
                </div>
                {(option === "Login")? <LoginForm/> : <RegisterForm/>}
            </div>
            <BenefitSlidebar/>
        </div>
    )
    
}

export default FormContainer