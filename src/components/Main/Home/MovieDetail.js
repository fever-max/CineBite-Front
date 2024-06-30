import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './css/movieDetail.css'

import { IoIosArrowBack ,IoIosSearch} from "react-icons/io";
import { FaBookmark } from "react-icons/fa";
import MovieInfo from '../Review/MovieInfo';
import ReviewWrite from '../Review/ReviewWrite';
import GenreRecommend from '../Recommend/GenreRecommend';
import Community from '../Community/Community';

const MovieDetail = () => {
    const {movieId} = useParams();
    const [movie,setMovie] = useState();
    const url = process.env.REACT_APP_API_URL;

    const getMovieDetail = async(movieId)=>{
        const response = await axios.get(`${url}/movie/${movieId}`, { withCredentials: true });
        console.log('movieDetail',response.data.genres);
        setMovie(response.data);
    }
    useEffect(() => {
        getMovieDetail(movieId);
    }, [movieId]);

    
    return (
        <div className='movieDetail-main'>
            {movie &&
            <div className='movieDetail-main-sub'>
                <div className='movie-title'>
                    <div className='movie-title-icon'>
                        <div><IoIosArrowBack className='icon-back'/></div>
                        <div><IoIosSearch className='icon-search'/></div>
                    </div>
                    <div className='movie-title-info'>
                        <div className='movie-info'>
                            <div className='title'>
                                <p>{movie.title}</p>
                            </div>
                            <div className='title-sub'>
                                <span>{movie.title}</span>
                                <span>{movie.release_date}</span>
                            </div>
                            <div className='title-grade'>
                                <span>토마토평점</span>
                                <span>별점</span>
                            </div>
                        </div>

                        <div className='movie-img'>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                        </div>
                    </div>
                </div>

                <div className='movie-middle'>
                    <div className='movie-middle-like'>
                        <button>별로에요</button>
                        <button>좋아요</button>
                    </div>
                    <div className='movie-middle-view'>
                        <ul>
                            <li>
                                <div><FaBookmark className='view-icon'/></div>
                                <p>찜</p>
                            </li>
                            <li>
                                <div><FaBookmark className='view-icon'/></div>
                                <p>보는중</p>
                            </li>
                            <li>
                                <div><FaBookmark className='view-icon'/></div>
                                <p>봤어요</p>
                            </li>
                            <li>
                                <div><FaBookmark className='view-icon'/></div>
                                <p>더보기</p>
                            </li>
                        </ul>
                    </div>
                    <div className='display'>
                        <div>임시</div>
                    </div>
                </div>

                {/* 메뉴바 */}
                <div className='movie-bottom'>
                    <div className='movie-bottom-select'>
                        <button>작품 정보</button>
                        <button>리뷰</button>
                        <button>커뮤니티</button>
                        <button>비슷한 영화</button>
                    </div>
                </div>
                <div>
                    <MovieInfo/>
                </div>
                <div>
                    <ReviewWrite/>
                </div>
                <div>
                    <Community/>
                </div>
                <div>
                    <GenreRecommend movie={movie}/>
                </div>
            </div>
            }
        </div>
    );
};

export default MovieDetail;