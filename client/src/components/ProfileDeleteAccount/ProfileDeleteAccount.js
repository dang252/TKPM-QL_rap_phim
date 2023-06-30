import React, { useState } from 'react'
import axios from "axios";
import { Modal, Button } from "react-bootstrap"
import { toast } from 'react-toastify';

import "./ProfileDeleteAccount.css"

const ProfileDeleteAccount = () => {
    const [password, setPassword] = useState("")
    const [repassword, setRepassword] = useState("")
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [err, setErr] = useState({
        status: 0,
        msg: ""
    });
    const checkInput = () => {
        if (repassword !== password) {
            setErr({
                status: 1,
                msg: "Mật khẩu không giống nhau"
            })
            return false;
        }
        else {
            setErr({
                status: 0,
                msg: ""
            })
            return true;
        }
    }
    const handleOnSubmit = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));

            if (user) {
                const rs = await axios.delete(
                    `${process.env.REACT_APP_BACKEND_API_URL}/user/delete_account?id_user=${user.id}&password=${password}`,
                    {
                        headers: {
                            token: `Bearer ${user.accessToken}`,
                        },
                    }
                );
                if (rs.status === 200) {
                    window.location.reload()
                }
            }
        } catch (error) {
            if (error.response.status === 401) {
                setErr({
                    status: 1,
                    msg: "Sai mật khẩu"
                })
            }
            else {
                toast.error("Server đang gặp sự cố, bạn vui lòng thử lại sau ít phút nữa nhé!")
            }
        }
    }
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn chắc chắn muốn xóa tài khoản?
                    Sau khi tài khoản được xóa, toàn bộ dữ liệu sẽ bị mất đi, bạn không có cách nào để xem lại!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Không
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleClose()
                        handleOnSubmit()
                    }}>
                        Xóa tài khoản
                    </Button>
                </Modal.Footer>
            </Modal>
            <form className='delete-account-form' onSubmit={(e) => {
                e.preventDefault();
                if (checkInput()) {
                    handleShow()
                }
            }}>
                <div className='caution'>
                    <h2>Xóa tài khoản</h2>
                    <p>Chú ý: Bạn đang muốn xóa tài khoản, sau khi tài khoản được xóa, toàn bộ dữ liệu sẽ bị mất đi, bạn không có cách nào để xem lại!</p>
                </div>
                <div>
                    <label>Nhập mật khẩu: </label>
                    <input
                        className="input-text-field"
                        type="password"
                        name="title"
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        required
                    />
                </div>
                <div>
                    <label>Nhập lại mật khẩu: </label>
                    <input
                        className="input-text-field"
                        type="password"
                        name="title"
                        placeholder="Nhập lại mật khẩu"
                        value={repassword}
                        onChange={(e) => {
                            setRepassword(e.target.value);
                        }}
                        required
                    />
                </div>
                <input className="input-submit" type="submit" value="Xóa tài khoản" />
                {err.status !== 0 && <p className="err-msg">{err.msg}</p>}
            </form>
        </div>
    )
}

export default ProfileDeleteAccount