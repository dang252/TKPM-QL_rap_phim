import React, { useState, useContext } from 'react'
import TimePicker from 'react-time-picker';
import Select from "react-select";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Context } from "../../../context/UserContext";
import { Modal, Button } from "react-bootstrap";

import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import "./AddMovieForm.css"
import axios from 'axios';
import { toast } from 'react-toastify';

const AddMovieForm = () => {

    const [addedMovieInfo, setAddedMovieInfo] = useState({
        title: "",
        release_date: "",
        url_poster: "",
        director: "",
        actors: "",
        genres: [],
        duration: "00:00",
        age: 0,
        overview: ""
    })

    const { genresOption, ageRestrictionOption } = useContext(Context)

    const handleOnSubmit = async () => {
        // e.preventDefault();
        const loading = toast.loading("Đang cập nhật...")
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const rs = await axios.post(
                `${process.env.REACT_APP_BACKEND_API_URL}staff/createMovie`,
                addedMovieInfo,
                {
                    headers: {
                        token: `Bearer ${user.accessToken}`,
                    },
                    withCredentials: true,
                })
            if (rs?.status === 200) {
                const MSG = {
                    type: "success",
                    msg: "Đã thêm phim thành công!"
                }
                localStorage.setItem("UnfulfilledMsg", JSON.stringify(MSG))
                window.location.reload(false);
            }
        } catch (err) {
            toast.update(loading, { render: "Server đang gặp sự cố, bạn vui lòng thử lại sau ít phút nữa nhé!", type: "error", isLoading: false, autoClose: 3000, closeOnClick: true })
        }
    }

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <form className='add-movie-form' onSubmit={(e) => {
            e.preventDefault()
            handleShow()
        }}>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn chắc chắn muốn thêm phim vào danh sách?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Không
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleClose()
                        handleOnSubmit()
                    }}>
                        Thêm phim
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className='upper-form-wrapper'>
                <div className='form-left'>
                    <label>Tên phim: </label>
                    <input
                        className="input-text-field"
                        type="text"
                        name="title"
                        placeholder="Tên phim"
                        value={addedMovieInfo.title}
                        onChange={(e) => {
                            setAddedMovieInfo({ ...addedMovieInfo, title: e.target.value });
                        }}
                        required
                    />
                    <label>Đạo diễn: </label>
                    <input
                        className="input-text-field"
                        type="text"
                        name="Director"
                        placeholder="Đạo diễn"
                        value={addedMovieInfo.director}
                        onChange={(e) => {
                            setAddedMovieInfo({ ...addedMovieInfo, director: e.target.value });
                        }}
                        required
                    />
                    <label>Danh sách diễn viên: </label>
                    <input
                        className="input-text-field"
                        type="text"
                        name="Actors"
                        placeholder="Danh sách diễn viên"
                        value={addedMovieInfo.actors}
                        onChange={(e) => {
                            setAddedMovieInfo({ ...addedMovieInfo, actors: e.target.value });
                        }}
                        required
                    />
                    <label>URL poster: </label>
                    <input
                        className="input-text-field"
                        type="text"
                        name="url"
                        placeholder="URL của poster phim"
                        value={addedMovieInfo.url_poster}
                        onChange={(e) => {
                            setAddedMovieInfo({ ...addedMovieInfo, url_poster: e.target.value });
                        }}
                        required
                    />
                </div>
                <div className='form-right'>
                    {addedMovieInfo.url_poster !== ""
                        ? <img src={addedMovieInfo.url_poster} alt={addedMovieInfo.url_poster} />
                        : <div className='null-img'><FontAwesomeIcon icon={faImage} /></div>
                    }
                </div>
            </div>
            <label>Thể loại: </label>
            <Select
                isMulti
                options={genresOption}
                onChange={(values) => {
                    setAddedMovieInfo({ ...addedMovieInfo, genres: values.map(genre => { return genre.value }) });
                }}
                placeholder="Thể loại"
                required
            />
            <label>Giới hạn độ tuổi: </label>
            <Select
                defaultValue={ageRestrictionOption[0]}
                options={ageRestrictionOption}
                onChange={(value) => {
                    setAddedMovieInfo({ ...addedMovieInfo, age: value.value });
                }}
            />
            <div className='times-wrapper'>
                <div>
                    <label>Ngày khởi chiếu: </label>
                    <input
                        className="input-text-field"
                        type="date"
                        name="release_date"
                        placeholder="Ngày khởi chiếu"
                        value={addedMovieInfo.release_date}
                        onChange={(e) => {
                            setAddedMovieInfo({ ...addedMovieInfo, release_date: e.target.value });
                        }}
                        required
                        min={Date.now()}
                    />
                </div>
                <div>
                    <label>Thời lượng: </label>
                    <TimePicker
                        value={addedMovieInfo.duration}
                        onInvalidChange={() => {
                            console.log(123)
                            setAddedMovieInfo({ ...addedMovieInfo, duration: "00:00" });
                        }}
                        onChange={(value) => {
                            setAddedMovieInfo({ ...addedMovieInfo, duration: value || "00:00" });
                        }}
                        disableClock={true}
                    />
                </div>
            </div>
            <label>Nội dung tóm tắt: </label>
            <input
                className="input-text-field overview"
                type="text"
                name="overview"
                placeholder="Nội dung tóm tắt"
                value={addedMovieInfo.overview}
                onChange={(e) => {
                    setAddedMovieInfo({ ...addedMovieInfo, overview: e.target.value });
                }}
            />
            <input className="input-submit" type="submit" value="Thêm phim" />
        </form>
    )
}

export default AddMovieForm