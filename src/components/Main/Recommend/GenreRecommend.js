import axios from 'axios';
import React, { useEffect, useState } from 'react';

const GenreRecommend = ({movie}) => {
    const [movieGenreList, setMovieGenreList] = useState([]);
    const url = process.env.REACT_APP_API_URL;

    //장르별 데이터 출력
    const getMovieGenres = async (movie) => {
        try {
            const genres = movie.genres
            if (genres) {
                const resp = await axios.post(`${url}/movie/genresList`, 
                    genres, 
                    { headers: { 'Content-Type': 'application/json' } }
                );
                setMovieGenreList(resp.data);
            } else {
                console.error('영화의 장르 데이터가 없습니다.');
            }
        } catch (error) {
            console.error('장르 데이터 가져오기 오류:', error);
        }
    };
    useEffect(()=>{
        getMovieGenres(movie);
    },[movie]);

    return (
        <>
            {movieGenreList && movieGenreList.map((genre, index) => (
                <li key={index}>
                    <div className='genre_Img'>
                        <img src={`https://image.tmdb.org/t/p/w500${genre.poster_path}`} alt={genre.title}/>
                    </div>
                    <div className='genre_Info'></div>
                </li>
            ))}
        </>
    );
};

export default GenreRecommend;