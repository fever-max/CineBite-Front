import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // 데이터 가져오기
        axios.get('http://localhost:4000/api/trendMovie/list', { withCredentials: true })
            .then(response => {
                console.log('해당 영화의 상세 정보 :', response.data); // 데이터 로그
                setMovies(response.data);
            })
            .catch(error => {
                console.error("영화가 없어요", error);
            });
    }, []);

    const handleClick = (movieId) => {
        // 클릭한 영화의 movie_id를 서버에 전송
        axios.get(`http://localhost:4000/api/movie/detail/${movieId}`, { withCredentials: true })
            .then(response => {
                console.log('상세 정보 :', response.data); // 상세 정보 로그
                
                // 여기서 상세 정보 처리
                const movieDetail = response.data;
                const genreNames = movieDetail.genres.map(genre => genre.name);
                const creditNames = movieDetail.credits.cast.map(cast => cast.name);
                const creditProfile = movieDetail.credits.cast.map(cast => cast.profile_path);
                
                console.log('장르 이름들:', genreNames);
                console.log('배우들:', creditNames);
                console.log('배우 사진:', creditProfile);
                
                // <p>장르 : {genreNames}</p> 
            })
            .catch(error => {
                console.error("영화 상세 정보를 가져오는 데 실패했습니다.", error);
            });
    };

    return (
        <div>
            <h1>Movie List</h1>
            <ul>
                {movies.length === 0 ? (
                    <li>영화가 없어요.</li>
                ) : (
                    movies.map(movie => (
                        <li key={movie.id} onClick={() => handleClick(movie.id)}>
                            <h2>제목 : {movie.title}</h2>
                            <p>줄거리 : {movie.overview}</p>
                            {/* <p>장르 : {movie.genreNames}</p>  */}
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                style={{ maxWidth: '300px', height: 'auto' }}
                            />
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default MovieList;
