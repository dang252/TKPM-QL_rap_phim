import React, { useContext, useState } from 'react'
import axios from 'axios';
import { Tabs, Tab } from 'react-bootstrap'

import "./ProfileAddMovies.css"

import AddMovieForm from '../Forms/AddMovieForm/AddMovieForm';
import AddScheduleForm from '../Forms/AddScheduleForm/AddScheduleForm';

const ProfileAddMovies = () => {

    return (
        <div className='profile-add-movies-container'>
            <Tabs defaultActiveKey="addMovies" >
                <Tab eventKey="addMovies" title="Thêm phim mới">
                    <AddMovieForm />
                </Tab>
                <Tab eventKey="addSchedule" title="Thêm lịch chiếu cho phim">
                    <AddScheduleForm />
                </Tab>
            </Tabs>
        </div>
    )
}

export default ProfileAddMovies