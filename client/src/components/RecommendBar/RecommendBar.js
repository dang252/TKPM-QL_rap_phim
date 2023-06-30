import React, { useContext, useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import { Context } from "../../context/UserContext";
import './RecommendBar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceLaughBeam } from "@fortawesome/free-solid-svg-icons";

const RecommendBar = () => {
    const [recommendMovies, setRecommendMovies] = useState([])
    const { getRecommendMovies } = useContext(Context);
    useEffect(() => {
        getRecommendMovies().then((recommendMovie) => {
            setRecommendMovies(recommendMovie)
            // recommendMovies = recommendMovie
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const [showRecommend, setShowRecommend] = useState(true)

    // useEffect(() => {
    //     console.log(recommendMovies)
    // }, [recommendMovies])

    return (
        <>
            {recommendMovies !== undefined && recommendMovies?.length !== 0 &&
                <>
                    {showRecommend
                        ? <div className='recommend-bar'>
                            <h4 className='header' onClick={() => {
                                setShowRecommend(false)
                            }}>
                                <FontAwesomeIcon icon={faFaceLaughBeam} bounce />
                                <span> CGV đề xuất:</span>
                            </h4>
                            <div className='movies'>
                                {recommendMovies?.length !== 0 && recommendMovies?.map((movie) => {
                                    return (
                                        <Link className='movie-container' to={`/movies/detail?id=${movie.id}`}>
                                            <img src={movie.url_poster} alt={movie.title} />
                                            <p>{movie.title}</p>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                        : <div className='show-button' onClick={() => { setShowRecommend(true) }}>
                            {/* <div className='message'>Đề xuất cho bạn</div> */}
                            <FontAwesomeIcon icon={faFaceLaughBeam} bounce className='icon' size="xl" />
                        </div>
                    }
                </>
            }
        </>
    )
}

export default RecommendBar