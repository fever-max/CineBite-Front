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
    const [secondsRemaining, setSecondsRemaining] = useState(0);
    const url = process.env.REACT_APP_API_URL;
    const ImageUrl = "https://image.tmdb.org/t/p/w500";
    const userId = 'test4'; // 임시 아이디

    const getMovieDetail = async (movieId) => {
        try {
            const response = await axios.get(`${url}/movie/${movieId}`);
            console.log('movieDetail', response.data.genres);
            setMovie(response.data);
        } catch (err) {
            console.error('영화 상세정보 불러오기 실패 :', err);
        }
    };

    // 즐겨찾기 목록의 해당 영화의 찜 상태 확인
    const checkIfBookmarked = async () => {
        try {
            const response = await axios.get(`${url}/favorites/list`, {
                params: { userId },
                withCredentials: true,
            });
            const isBookmarked = response.data.some((favorite) => favorite.movieId === parseInt(movieId));
            setIsBookmarked(isBookmarked);
        } catch (err) {
            console.error('찜 상태를 확인할 수  없어요 :', err);
        }
    };

    const handleRating = async (rating) => {
        try {
            const evaluation = {
                userRatingRequest: {
                    movieId, 
                    userId,
                    rating,
                    tomato: rating === 'fresh' ? 1 : 0
                },
                movieRatingRequest: {
                    freshCount: 0, 
                    rottenCount: 0, 
                    tomatoScore: 0.0 
                }
            };
    
            await axios.post(`${url}/movie/${movieId}/rate`, evaluation);
            getMovieDetail(movieId);
            setError(''); // 에러 메시지 초기화
        } catch (err) {
            const responseError = err.response;
            if (responseError && responseError.data && responseError.data.includes('남은 시간:')) {
                const seconds = responseError.data.match(/남은 시간: (\d+)초/)[1];
                setSecondsRemaining(parseInt(seconds, 10));
            } else {
                setError(responseError ? responseError.data : '평가 실패. 다시 시도해주세요.');
            }
            console.error('평가 실패 :', err);
        }
    };

    const handleBookmarkToggle = async () => {
        try {
            if (isBookmarked) {
                await axios.delete(`${url}/favorites/delete`, {
                    params: { userId, movieId },
                    withCredentials: true,
                });
            } else {
                await axios.post(`${url}/favorites/add`, { userId, movieId });
            }
            setIsBookmarked(!isBookmarked); // 토글 상태 변경
        } catch (err) {
            console.error('찜 관련 작업 실패 :', err);
        }
    };

    const handleDeleteRating = async () => {
        try {
            await axios.delete(`${url}/movie/${movieId}/deleteRating`, {
                params: { userId },
            });
            getMovieDetail(movieId);
            console.log("평가 삭제된 영화번호 :", movieId);
            setError('');
        } catch (err) {
            setError(err.response ? err.response.data : '평가 삭제 실패. 다시 시도해주세요.');
            console.error('평가 삭제 실패 :', err);
        }
    };

    useEffect(() => {
        getMovieDetail(movieId);
        checkIfBookmarked();
    }, [movieId]);

    useEffect(() => {
        if (secondsRemaining > 0) {
            const timer = setInterval(() => {
                setSecondsRemaining((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [secondsRemaining]);

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
                                <img src={`${ImageUrl}${movie.poster_path}`} alt={movie.title} />
                            </div>
                        </div>
                    </div>

                    <div className='movie-middle'>
                        <div className='movie-middle-like'>
                            <button onClick={() => handleRating('fresh')}>신선해요</button>
                            <button onClick={() => handleRating('rotten')}>썩었어요</button>
                            <button onClick={handleDeleteRating}>평가 삭제하기</button>
                        </div>
                        {error && <div className='error-message'>{error}</div>}
                        {secondsRemaining > 0 && (
                            <div className='error-message'>
                                평가를 취소한 영화라 잠시 후에 이용해주세요. 남은 시간: {secondsRemaining}초
                            </div>
                        )}
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
