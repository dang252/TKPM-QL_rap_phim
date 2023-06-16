import React from 'react'
// import { Context } from "../../context/UserContext";

import "./SummaryMovieDetail.css"

const SummaryMovieDetail = (props) => {
    const { detailMovie } = props
    return (
        <div className='summary-movie'>
            <div className='summary-movie-poster'>
                <img src={detailMovie.url_poster} alt={detailMovie.title}></img>
            </div>
            <h5>{detailMovie.title}</h5>
        </div>
    )
}

export default SummaryMovieDetail