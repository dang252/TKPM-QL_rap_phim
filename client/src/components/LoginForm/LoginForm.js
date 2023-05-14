import React, {useState} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

import "./LoginForm.css"

const LoginForm = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [captcha, setCaptcha] = useState(Boolean(false))

    const handleSubmit = async (e) => {
        e.preventDefault();  
        if(username !== ""  && password !== "" && captcha !== false) {
            try {
                const response = await axios.get('/user?ID=12345', {
                    username: username,
                    password: password,
                });
                console.log(response);
              } catch (error) {
                console.error(error);
              }
        }
    }
    
    return(
        <form className="login-form">
            <label htmlFor="user"/>Email hoặc số điện thoại:
            <input 
                className="input-text-field" 
                type="text" name="user" 
                placeholder="Email hoặc số điện thoại" 
                value={username} 
                onChange={(e) => {setUsername(e.target.value)}} 
                required
            />
            <label htmlFor="pass"/>Mật khẩu:
            <input 
                className="input-text-field" 
                type="password" 
                name="pass" 
                autoComplete="off" 
                placeholder="Mật khẩu" 
                value={password} 
                onChange={(e) => {setPassword(e.target.value)}} 
                required
            />
            <div className = "captcha-container">
                <ReCAPTCHA 
                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                    onChange={() => {setCaptcha(!captcha)}}
                />
            </div>
            <input className="input-submit" type="submit" value="ĐĂNG NHẬP" onClick={(e) => {handleSubmit(e)}}/>
            <a href="/">Bạn muốn tìm lại mật khẩu?</a>
        </form>
    )
}
export default LoginForm