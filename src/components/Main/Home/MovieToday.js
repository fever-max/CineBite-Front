import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './css/movieToday.css'
import { Link } from 'react-router-dom';

const MovieList = () => {
    const [movieData,setMovieData] = useState([]);
    const url = process.env.REACT_APP_API_URL;
    
    //전체 데이터 출력
    const getMovieData= async()=>{
        const response = await axios.get(`${url}/movie/movieList`, { withCredentials: true });
        console.log('getMovieData',response.data);
        setMovieData(response.data);
        
    }

    // //배우별 데이터 출력
    // const getMovieActor=async()=>{
    //     const actor = '휴 잭맨'
    //     const resp = await axios.post(`${url}/movie/actorList`, actor, {
    //         headers: {
    //             'Content-Type': 'text/plain'
    //         }
    //     });
    //     console.log('actors: ',resp.data);
    // }


    useEffect(()=>{
        getMovieData();
        //getMovieGenres(movieData);
        //getMovieActor();
    },[]);

    return (
        <div>
            <div  className='movieList'>
            {movieData.map((item,index)=>
                <Link to={`/movie/${item.id}`} key={index}>
                    <ul>
                        <li>
                            <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}/>
                        </li>
                        <li>{item.title}</li>
                    </ul>
                </Link>
            )}
            </div>
        </div>
    );
};

export default MovieList;