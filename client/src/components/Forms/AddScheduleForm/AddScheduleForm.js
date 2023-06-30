import React, { useState, useContext, useEffect } from 'react'
import Select from "react-select";
import { DayPicker } from 'react-day-picker';
import axios from 'axios';
import { Context } from "../../../context/UserContext";
import { Modal, Button } from 'react-bootstrap';

import SummaryMovieDetail from '../../SummaryMovieDetail/SummaryMovieDetail';

import 'react-day-picker/dist/style.css';
import "./AddScheduleForm.css"
import { toast } from 'react-toastify';



const AddScheduleForm = () => {
    const { getMoviesForSelect, getProvincesForSelect, getCinemaProvincesForSelect, getRoomForSelect, getMovieByID, timeOption } = useContext(Context)
    const [movies, setMovies] = useState([]);
    const [movieDetail, setMovieDetail] = useState("");
    const [provinces, setProvinces] = useState([])
    const [cinemas, setCinemas] = useState([])
    const [rooms, setRooms] = useState([])
    const [cinemasOption, setCinemasOption] = useState()
    const [roomsOption, setRoomsOption] = useState()
    const [dateOption, setDateOption] = useState(new Date())
    const [schedule, setSchedule] = useState({
        id_movie: 0,
        id_cinema: 0,
        id_room: 0,
        date: (dateOption.getYear() + 1900) + "-" + (("0" + (dateOption.getMonth() + 1)).slice(-2)) + "-" + ("0" + dateOption.getDate()).slice(-2),
        time: []
    })

    const handleSubmit = async (e) => {
        // e.preventDefault();
        const loading = toast.loading("Đang cập nhật...")
        try {
            setSchedule({
                ...schedule, time: schedule.time.sort((a, b) => {
                    return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : a[1] < b[1] ? -1 : 1
                })
            })
            // schedule.time.sort((a, b) => {
            //     return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : a[1] < b[1] ? -1 : 1
            // })
            console.log(schedule)
            const user = JSON.parse(localStorage.getItem("user"));
            const rs = await axios.put(
                `${process.env.REACT_APP_BACKEND_API_URL}/staff/updateSchedule`,
                schedule,
                {
                    headers: {
                        token: `Bearer ${user.accessToken}`,
                    },
                    withCredentials: true,
                })
            if (rs?.status === 200) {
                const MSG = {
                    type: "success",
                    msg: "Đã thêm lịch thành công!"
                }
                localStorage.setItem("UnfulfilledMsg", JSON.stringify(MSG))
                window.location.reload(false);
            }
        } catch (err) {
            if (err.message === "Request failed with status code 409") {
                toast.update(loading, { render: "Lịch thêm đã bị trùng, vui lòng đổi lịch khác ", type: "error", isLoading: false, autoClose: 3000, closeOnClick: true })
            }
            else {
                toast.update(loading, { render: "Server đang gặp sự cố, bạn vui lòng thử lại sau ít phút nữa nhé!", type: "error", isLoading: false, autoClose: 3000, closeOnClick: true })
            }
        }
    }
    useEffect(() => {
        getMoviesForSelect().then((rs) => { setMovies(rs); })
        getProvincesForSelect().then((rs) => { setProvinces(rs) })
    }, [getMoviesForSelect, getProvincesForSelect])

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // useEffect()
    return (
        <div className='form-wrapper'>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn chắc chắn muốn thêm lịch chiếu phim?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Không
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleClose()
                        handleSubmit()
                    }}>
                        Thêm lịch
                    </Button>
                </Modal.Footer>
            </Modal>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleShow()
            }}>
                <Select
                    options={movies}
                    onChange={(movie) => {
                        getMovieByID(movie.value).then((rs) => {
                            setMovieDetail(rs);
                        })
                        setSchedule({ ...schedule, id_movie: movie.value })
                    }}
                    placeholder="Phim"
                />
                <div className='detail-wrapper'>
                    <div className='movie-content'>
                        <SummaryMovieDetail detailMovie={movieDetail} />
                    </div>
                    <div className='options-wrapper'>
                        {provinces.length !== 0 &&
                            <Select
                                options={provinces}
                                placeholder="Tỉnh thành"
                                onChange={(province) => {
                                    getCinemaProvincesForSelect(province).then((rs) => {
                                        setCinemas(rs)
                                        // setSchedule({ ...schedule, id_cinema: null, id_room: null })
                                        setCinemasOption(null)
                                        setRoomsOption(null)
                                    })
                                }}
                                required
                            />
                        }
                        {cinemas.length !== 0 &&
                            <Select
                                options={cinemas}
                                value={cinemasOption}
                                placeholder="Rạp"
                                onChange={(cinema) => {
                                    getRoomForSelect(cinema).then((rs) => {
                                        setRooms(rs)
                                        // setSchedule({ ...schedule, id_room: null })
                                        setRoomsOption(null)
                                    })
                                    // console.log(cinema.value)
                                    setSchedule({ ...schedule, id_cinema: cinema.value })
                                    setCinemasOption(cinema)
                                    console.log("change cinema", schedule)
                                }}
                                required
                            />
                        }
                        {rooms.length !== 0 &&
                            <Select
                                options={rooms}
                                value={roomsOption}
                                placeholder="Phòng"
                                onChange={(room) => {
                                    console.log(room.value)
                                    setSchedule({ ...schedule, id_room: room.value })
                                    setRoomsOption(room)
                                    console.log("change room", schedule)
                                }}
                                required
                            />
                        }
                        <DayPicker
                            mode="single"
                            selected={dateOption}
                            onSelect={(value) => {
                                if (value >= new Date()) {
                                    const day = (value.getYear() + 1900) + "-" + (("0" + (value.getMonth() + 1)).slice(-2)) + "-" + ("0" + value.getDate()).slice(-2)
                                    setDateOption(value)
                                    setSchedule({ ...schedule, date: day })
                                }
                            }}
                        />
                        <Select
                            options={timeOption}
                            isMulti
                            placeholder="Giờ"
                            onChange={(time) => {
                                setSchedule({
                                    ...schedule, time: time.map((tm) => { return tm.value })
                                })
                            }}
                            required
                        />
                    </div>
                </div>
                <input className="input-submit" type="submit" value="Thêm lịch" />
            </form>
        </div>
    )
}

export default AddScheduleForm