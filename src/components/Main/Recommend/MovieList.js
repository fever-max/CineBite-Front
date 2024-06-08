import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // 데이터 가져오기
        axios.get('http://localhost:4000/api/trendMovie/list', { withCredentials: true })
            .then(response => {
                console.log('Fetched movies:', response.data); // 데이터 로그
                setMovies(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the movies!", error);
            });
    }, []);

    return (
        <div>
            <h1>Movie List</h1>
            <ul>
                {movies.length === 0 ? ( // 영화가 없을 때 메시지 출력
                    <li>영화가 없어요.</li>
                ) : (
                    movies.map(movie => (
                            <li key={movie.id}>
                                <h2>{movie.title}</h2>
                                <p>{movie.overview}</p>
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}
                                style={{ maxWidth: '300px', height: 'auto' }} />
                            </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default MovieList;
