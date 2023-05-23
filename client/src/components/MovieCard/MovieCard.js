import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/UserContext'
import "./MovieCard.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons' 

const MovieCard = (props) => {
    const { getDate } = useContext(Context)
    return (
        <div className='movie-card'>
            {(props.index <= 3) && <div className = {`ribbon ribbon${props.index}`}></div>}
            <image className='movie-img' scr={props.movie.url_poster} alt={props.movie.title}></image>
            <h5 className='movie-title'>{props.movie.title}</h5>
            <p className='movie-discription'>Khởi chiếu: {getDate(props.movie.release_date)}</p>
            <Link to="/" className='booking-button'>
                <div>
                    <FontAwesomeIcon icon={faPhone} />
                    <span>MUA VÉ</span>
                </div>
            </Link>
        </div>
    )
}

export default MovieCard