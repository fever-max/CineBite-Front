import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MovieList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // 데이터 가져오기
        axios.get('http://localhost:4000/api/trendMovie/list', { withCredentials: true })
            .then(response => {
                console.log('해당 영화의 상세 정보 :', response.data); // 영화 정보
                setMovies(response.data);
            })
            .catch(error => {
                console.error("영화가 없어요", error);
            });
    }, []);

    return (
        <div>
            <h1>Movie List</h1>
            <ul>
                {movies.length === 0 ? (
                    <li>영화가 없어요.</li>
                ) : (
                    movies.map(movie => (
                        <li key={movie.id}>
                            <h2>제목 : {movie.title}</h2>
                            <p>줄거리 : {movie.overview}</p>
                            <Link to={`/movie/${movie.id}`}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    style={{ maxWidth: '300px', height: 'auto' }}
                                />
                            </Link>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default MovieList;
