import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './css/movieDetail.css';
import { IoIosArrowBack, IoIosSearch } from 'react-icons/io';
import { FaBookmark } from 'react-icons/fa';
import { CiBookmark } from 'react-icons/ci';
import MovieInfo from '../Review/MovieInfo';
import ReviewWrite from '../Review/ReviewWrite';
import GenreRecommend from '../Recommend/GenreRecommend';
import tomatoImg from '../../../assets/images/tomato.png';
import rottenImg from '../../../assets/images/rotten.png';

const MovieDetail = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState();
    const [error, setError] = useState('');
    const [isBookmarked, setIsBookmarked] = useState(false);
    const url = process.env.REACT_APP_API_URL;

    const getMovieDetail = async (movieId) => {
        try {
            const response = await axios.get(`${url}/movie/${movieId}`, { withCredentials: true });
            console.log('movieDetail', response.data.genres);
            setMovie(response.data);
            // 기본적으로 찜 상태를 불러오는 코드가 없으므로 직접 설정해야 합니다.
        } catch (err) {
            console.error('Failed to fetch movie details:', err);
        }
    };

    const handleRating = async (rating) => {
        try {
            const userId = 'test1'; // 임시 아이디 입력
            await axios.post(`${url}/movies/${movieId}/rate`, null, {
                params: { userId, rating },
                withCredentials: true,
            });
            getMovieDetail(movieId);
            setError(''); // 
        } catch (err) {
            setError(err.response ? err.response.data : '평가 실패. 다시 시도해주세요.');
            console.error('평가 실패 :', err);
        }
    };

    const handleBookmarkToggle = async () => {
        try {
            const userId = 'test1'; // 임시 아이디 입력
            await axios.post(`${url}/favorites/add`, { userId, movieId }, { withCredentials: true });
            setIsBookmarked(!isBookmarked); // 토글 상태 변경
        } catch (err) {
            console.error('Failed to toggle bookmark:', err);
        }
    };

    useEffect(() => {
        getMovieDetail(movieId);
    }, [movieId]);

    const formatTomatoScore = (score) => {
        return score ? score.toFixed(2) : 'ㅡ';
    };

    return (
        <div className='movieDetail-main'>
            {movie && (
                <div className='movieDetail-main-sub'>
                    <div className='movie-title'>
                        <div className='movie-title-icon'>
                            <div>
                                <IoIosArrowBack className='icon-back' />
                            </div>
                            <div>
                                <IoIosSearch className='icon-search' />
                            </div>
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
                                    <span></span>
                                    <img 
                                        src={
                                            movie.tomatoScore === 0 || movie.tomatoScore === undefined ? tomatoImg :
                                            movie.tomatoScore <= 60 ? rottenImg : tomatoImg
                                        } 
                                        alt={
                                            movie.tomatoScore === 0 || movie.tomatoScore === undefined ? 'No Rating' :
                                            movie.tomatoScore <= 60 ? 'Rotten' : 'Fresh'
                                        } 
                                        className='tomato-image'
                                    />
                                    <span>{formatTomatoScore(movie.tomatoScore)}%</span>
                                </div>
                                <span>별점</span>
                            </div>
                            <div className='movie-img'>
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            </div>
                        </div>
                    </div>

                    <div className='movie-middle'>
                        <div className='movie-middle-like'>
                            <button onClick={() => handleRating('fresh')}>신선해요</button>
                            <button onClick={() => handleRating('rotten')}>썩었어요</button>
                        </div>
                        {error && <div className='error-message'>{error}</div>}
                        <div className='movie-middle-view'>
                            <ul>
                                <li>
                                    <button onClick={handleBookmarkToggle}>
                                        {isBookmarked ? <FaBookmark className='view-icon' /> : <CiBookmark className='view-icon' />}
                                    </button>
                                    <p>{isBookmarked ? '찜' : '찜'}</p>
                                </li>
                                <li>
                                    <div>
                                        <FaBookmark className='view-icon' />
                                    </div>
                                    <p>보는중</p>
                                </li>
                                <li>
                                    <div>
                                        <FaBookmark className='view-icon' />
                                    </div>
                                    <p>봤어요</p>
                                </li>
                                <li>
                                    <div>
                                        <FaBookmark className='view-icon' />
                                    </div>
                                    <p>더보기</p>
                                </li>
                            </ul>
                        </div>
                        <div className='display'>
                            <div>임시</div>
                        </div>
                    </div>

                    <div className='movie-bottom'>
                        <div className='movie-bottom-select'>
                            <button>작품 정보</button>
                            <button>리뷰</button>
                            <button>커뮤니티</button>
                            <button>비슷한 영화</button>
                        </div>
                    </div>
                    <div>
                        <MovieInfo />
                    </div>
                    <div>
                        <ReviewWrite />
                    </div>
                    <div>
                        {/* <Community/> */}
                    </div>
                    <div>
                        <GenreRecommend movie={movie} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieDetail;
