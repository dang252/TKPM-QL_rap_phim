import { React, useState, useEffect } from "react"

import LoginForm from "../Forms/LoginForm/LoginForm"
import RegisterForm from "../Forms/RegisterForm/RegisterForm"
import BenefitSlidebar from "../BenefitSlidebar/BenefitSlidebar"

import "./FormContainer.css"

const FormContainer = (props) => {
    const {option} = props
    return(
        <div className="form-container">
            <div className="forms">
                <div className="option-container">
                    <a href="/login">ĐĂNG NHẬP
                        {(option === "Login") && <div/>}
                    </a>
                    <a href="/register">ĐĂNG KÝ
                        {(option !== "Login") && <div/>}
                    </a>
                </div>
                {(option === "Login")? <LoginForm/> : <RegisterForm/>}
            </div>
            <BenefitSlidebar/>
        </div>
    )
    
}

export default FormContainer