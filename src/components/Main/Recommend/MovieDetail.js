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
        </div>
    );
};

export default MovieDetail;