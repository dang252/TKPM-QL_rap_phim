import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

import "./ProfileSearchTicket.css"
import TicketInfo from '../TicketInfo/TicketInfo';


const ProfileSearchTicket = () => {
    const [bookingCode, setBookingCode] = useState({
        field1: "",
        field2: "",
        field3: "",
        field4: "",
    })
    const [ticket, setTicket] = useState("")

    const handleOnSubmit = async () => {
        const loading = toast.loading("Đang cập nhật...")
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const code = bookingCode.field1 + bookingCode.field2 + bookingCode.field3 + bookingCode.field4
            const rs = await axios.get(
                `${process.env.REACT_APP_BACKEND_API_URL}staff/getTicketInfo?booking_code=${code}`,
                {
                    headers: {
                        token: `Bearer ${user.accessToken}`,
                    },
                    withCredentials: true,
                })
            if (rs?.status === 200) {
                toast.update(loading, { render: "Đã tìm ra vé!", type: "success", isLoading: false, autoClose: 3000, closeOnClick: true })
                setTicket(rs.data)
            }
        } catch (err) {
            if (err.response.status === 404) {
                toast.update(loading, { render: "Vé không tồn tại", type: "error", isLoading: false, autoClose: 3000, closeOnClick: true })
            }
            else {
                toast.update(loading, { render: "Server đang gặp sự cố, bạn vui lòng thử lại sau ít phút nữa nhé!", type: "error", isLoading: false, autoClose: 3000, closeOnClick: true })
            }
        }
    }
    return (
        <div className='search-container'>
            <form className='search-form' onSubmit={(e) => {
                e.preventDefault()
                handleOnSubmit()
            }}>
                <label>Mã số vé:</label>
                <div className='booking-code-field'>
                    <input id='field-1' type='text'
                        maxLength={2} minLength={2}
                        placeholder='__'
                        value={bookingCode.field1}
                        onFocus={(e) => {
                            e.target.select()
                        }}
                        onChange={(e) => {
                            if (e.target.value.length >= 2)
                                document.getElementById('field-2').focus()
                            setBookingCode({ ...bookingCode, field1: e.target.value })
                        }}
                        required
                    />
                    <span>-</span>
                    <input id='field-2' type='text'
                        maxLength={4} minLength={4}
                        placeholder='____'
                        value={bookingCode.field2}
                        onFocus={(e) => {
                            e.target.select()
                        }}
                        onChange={(e) => {
                            if (e.target.value.length >= 4)
                                document.getElementById('field-3').focus()
                            setBookingCode({ ...bookingCode, field2: e.target.value })
                        }}
                        required
                    />
                    <span>-</span>
                    <input id='field-3' type='text'
                        maxLength={4} minLength={4}
                        placeholder='____'
                        value={bookingCode.field3}
                        onFocus={(e) => {
                            e.target.select()
                        }}
                        onChange={(e) => {
                            if (e.target.value.length >= 4)
                                document.getElementById('field-4').focus()
                            setBookingCode({ ...bookingCode, field3: e.target.value })
                        }}
                        required
                    />
                    <span>-</span>
                    <input id='field-4' type='text'
                        maxLength={4} minLength={4}
                        placeholder='____'
                        value={bookingCode.field4}
                        onFocus={(e) => {
                            e.target.select()
                        }}
                        onChange={(e) => {
                            if (e.target.value.length >= 4)
                                document.getElementById('submit').focus()
                            setBookingCode({ ...bookingCode, field4: e.target.value })
                        }}
                        required />
                </div>
                <input className="input-submit" id='submit' type="submit" value="Tra cứu" />
            </form>
            {ticket !== "" && <TicketInfo ticket={ticket} />}
        </div>
    )
}

export default ProfileSearchTicket