import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetail = () => {
    const { movieId } = useParams();
    const [movieDetail, setMovieDetail] = useState(null);
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.get(`${API_URL}/movie/movieDetail/${movieId}`, { withCredentials: true })
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
        </div>
    );
};

export default MovieDetail;
