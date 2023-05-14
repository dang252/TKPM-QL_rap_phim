import React, { useState, useEffect } from 'react'

import ReCAPTCHA from "react-google-recaptcha";

import "../LoginForm/LoginForm.css"

const RegisterForm = () => {

    const [name, setName] = useState("");
    const [tel, setTel] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [months, setMonths] = useState([]);
    const [years, setYears] = useState([]);
    const [days, setDays] = useState([]);
    const [bmonth, setBmonth] = useState();
    const [byear, setByear] = useState();
    const [bday, setBday] = useState();

    useEffect(() => {
        let months = ["Tháng"];
        for (let i = 1; i <= 12; i++) {
            months = [...months, i];
        }
        let years = [];
        for (let i = 2023; i >= 2023 - 80; i--) {
            years = [...years, i];
        }
        years = ["Năm", ...years];
        setMonths(months);
        setYears(years);
    }, [])

    useEffect(() => {
        var n = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        if (byear % 4 === 0) n[2] = 29;
        let days = ["Ngày"]
        for (let i = 1; i <= n[bmonth]; i++) {
            days = [...days, i];
        }
        setDays(days)
    }, [bmonth, byear])

    return (
        <form className="login-form">
            <label htmlFor="name" />Tên:
            <input
                className="input-text-field"
                type="text"
                name="name"
                placeholder="Tên"
                value={name}
                onChange={(e) => { setName(e.target.value) }}
                required
            />
            <label htmlFor="tel" />Số điện thoại:
            <input 
                className="input-text-field" 
                type="tel" 
                name="tel" 
                placeholder="Số điện thoại" 
                value={tel} 
                onChange={(e) => { setTel(e.target.value) }} 
                required 
            />
            <label htmlFor="email" />Emai:
            <input 
                className="input-text-field" 
                type="text" 
                name="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => { setEmail(e.target.value) }} 
                required 
            />
            <label htmlFor="pass" />Mật khẩu:
            <input 
                className="input-text-field" 
                type="password" 
                name="pass" 
                autoComplete="off" 
                placeholder="Mật khẩu" 
                value={password} 
                onChange={(e) => { setPassword(e.target.value) }} 
                required 
            />
            <label />Ngày sinh:
            <div className="dob-container">
                <select name="day" className="bday" value={bday} onChange={(e) => { setBday(e.target.value) }}>
                    {days.map(day => <option value={day} key={day}>{day}</option>)}
                </select>
                <select name="month" className='bmonth' value={bmonth} onChange={(e) => { setBmonth(e.target.value) }}>
                    {months.map(month => <option value={month} key={month}>{month}</option>)}
                </select>
                <select name="year" className='byear' value={byear} onChange={(e) => { setByear(e.target.value) }}>
                    {years.map(year => <option value={year} key={year}>{year}</option>)}
                </select>
            </div>

            <div className="captcha-container">
                <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" />
            </div>
            <input className="input-submit" type="submit" value="ĐĂNG KÝ" />
        </form>
    )
}

export default RegisterForm