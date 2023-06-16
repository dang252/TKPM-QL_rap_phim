import React, { useState, useContext, useEffect } from 'react'
import Select from "react-select";
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import axios from 'axios';
import { Context } from "../../../context/UserContext";
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
        e.preventDefault();
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
                "http://localhost:5000/staff/updateSchedule",
                schedule,
                {
                    headers: {
                        token: `Bearer ${user.accessToken}`,
                    },
                    withCredentials: true,
                })
            const MSG = {
                type: "success",
                msg: "Đã thêm lịch thành công!"
            }
            if (rs?.status === 200) {
                localStorage.setItem("UnfulfilledMsg", JSON.stringify(MSG))
                window.location.reload(false);
            }
        } catch (err) {
            console.log(err)
            toast.error("Server đang gặp sự cố, bạn vui lòng thử lại sau ít phút nữa nhé!")
        }
    }
    useEffect(() => {
        getMoviesForSelect().then((rs) => { setMovies(rs); })
        getProvincesForSelect().then((rs) => { setProvinces(rs) })
    }, [getMoviesForSelect, getProvincesForSelect])

    // useEffect()
    return (
        <div className='form-wrapper'>
            <form onSubmit={(e) => { handleSubmit(e) }}>
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