import React, { useContext } from 'react'
import { Context } from "../../context/UserContext";

const TicketInfo = (props) => {
    const { getDate } = useContext(Context)
    const { ticket } = props
    return (
        <div
            style={{
                border: "1px solid gray",
                borderRadius: "5px",
                margin: "30px 0",
                padding: "20px 20px",
            }}
        >
            <div style={{ display: "flex" }}>
                <p style={{ fontWeight: "bold" }}>Người đặt:</p>
                <p style={{ marginLeft: "10px" }}>{ticket.name}</p>
            </div>
            <div style={{ display: "flex" }}>
                <p style={{ fontWeight: "bold" }}>Số điện thoại:</p>
                <p style={{ marginLeft: "10px" }}>{ticket.phone}</p>
            </div>
            <div style={{ display: "flex" }}>
                <p style={{ fontWeight: "bold" }}>Ngày đặt:</p>
                <p style={{ marginLeft: "10px" }}>
                    {getDate(ticket.purchase_date)}
                </p>
            </div>
            <div style={{ display: "flex" }}>
                <p style={{ fontWeight: "bold" }}>Tên rạp:</p>
                <p style={{ marginLeft: "10px" }}>{ticket.cinema_name}</p>
            </div>
            <div style={{ display: "flex" }}>
                <p
                    style={{
                        fontWeight: "bold",
                        minWidth: "60px",
                    }}
                >
                    Địa chỉ:
                </p>
                <p style={{ marginLeft: "10px" }}>{ticket.location}</p>
            </div>
            <div style={{ display: "flex" }}>
                <p style={{ fontWeight: "bold" }}>Tên phim:</p>
                <p style={{ marginLeft: "10px" }}>{ticket.title}</p>
            </div>
            <div style={{ display: "flex" }}>
                <p style={{ fontWeight: "bold" }}>Ngày chiếu:</p>
                <p style={{ marginLeft: "10px" }}>{getDate(ticket.opening_day)}</p>
            </div>
            <div style={{ display: "flex" }}>
                <p style={{ fontWeight: "bold" }}>Giờ bắt đầu:</p>
                <p style={{ marginLeft: "10px" }}>{ticket.start_time}</p>
            </div>
            <div style={{ display: "flex" }}>
                <p style={{ fontWeight: "bold" }}>Ghế đặt:</p>
                <div style={{ marginLeft: "10px", display: "flex" }}>
                    {ticket.seats?.map((seat, index) => {
                        return (
                            <p key={index + 55555} style={{ marginLeft: "10px" }}>
                                {seat},
                            </p>
                        );
                    })}
                </div>
            </div>
            <div style={{ display: "flex" }}>
                <p style={{ fontWeight: "bold" }}>Bắp nước:</p>
                <div style={{ marginLeft: "10px", display: "flex" }}>
                    {ticket.food_drink?.map((food, index) => {
                        return (
                            <p key={index + 4444} style={{ marginLeft: "10px" }}>
                                {food},
                            </p>
                        );
                    })}
                </div>
            </div>
            <div style={{ display: "flex" }}>
                <p style={{ fontWeight: "bold" }}>Giá vé:</p>
                <p style={{ marginLeft: "10px", color: "red" }}>
                    {ticket.total_price}đ
                </p>
            </div>
        </div>
    )
}

export default TicketInfo