import { React} from "react"
import { Link } from "react-router-dom"
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
                    <Link to="/login" className="nav-link">ĐĂNG NHẬP
                        {(option === "Login") && <div/>}
                    </Link>
                    <Link to="/register" className="nav-link">ĐĂNG KÝ
                        {(option !== "Login") && <div/>}
                    </Link>
                </div>
                {(option === "Login")? <LoginForm/> : <RegisterForm/>}
            </div>
            <BenefitSlidebar/>
        </div>
    )
    
}

export default FormContainer