<<<<<<< HEAD
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
    const {movieId} = useParams();
    const [movie,setMovie] = useState();
    const url = process.env.REACT_APP_API_URL;

    const getMovieDetail=async(movieId)=>{
        console.log('movieId',movieId);
        const response = await axios.get(`${url}/api/movie/movieDetail/${movieId}`, { withCredentials: true });
        console.log('getMovieDetail: ',response);
        setMovie(response.data);
    }

    useEffect(()=>{
        getMovieDetail(movieId);
    })
    return (
        <div>
            {
            movie && 
            <ul>
                <li>제목: {movie.title}</li>
                <li>줄거리: {movie.overview}</li>
                <li>장르: {movie.genres.map((genre,index)=>
                    <span key={index}>{genre.name}{index < movie.genres.length - 1 && ', '}</span>)
                    }</li>
                <li>배우: {movie.credits.cast.map((cast,index)=>
                            
                            <img src={`https://image.tmdb.org/t/p/w500${cast.profile_path}` } alt={cast.name} key={index} width={'200px'}/>
                        )}
                </li>
                <li>상영시간: {movie.runtime}분</li>
            </ul>
            }
=======
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetail = () => {
    const { movieId } = useParams();
    const [movieDetail, setMovieDetail] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:4000/api/movie/detail/${movieId}`, { withCredentials: true })
            .then(response => {
                console.log('상세 정보 :', response.data); // 상세 정보 로그
                setMovieDetail(response.data);
            })
            .catch(error => {
                console.error("영화 상세 정보를 가져오는 데 실패했습니다.", error);
            });
    }, [movieId]);

    if (!movieDetail) {
        return <div>로딩 중...</div>;
    }

    const genreNames = movieDetail.genres.map(genre => genre.name).join(', ');
    const creditNames = movieDetail.credits.cast.map(cast => cast.name).join(', ');
    const creditProfiles = movieDetail.credits.cast.map(cast => (
        <img key={cast.name} src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} alt={cast.name} />
    ));

    return (
        <div>
            <h1>{movieDetail.title}</h1>
            <p>개봉일: {movieDetail.release_date}</p>
            <p>줄거리: {movieDetail.overview}</p>
            <p>장르: {genreNames}</p>
            <div>배우들: {creditNames}</div>
            <div>배우 사진: {creditProfiles}</div>
            <img
                src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
                alt={movieDetail.title}
                style={{ width: '50px', height: 'auto' }}
            />
>>>>>>> 5216f12befdb72f89447090c080290ca97d44236
        </div>
    );
};

<<<<<<< HEAD
export default MovieDetail;
=======
export default MovieDetail;
>>>>>>> 5216f12befdb72f89447090c080290ca97d44236
