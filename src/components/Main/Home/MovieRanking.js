import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/Main/Home/movieRanking.css';

function MovieRanking() {
  const [boxOfficeData,setBoxOfficeData] = useState([]);
    const url = process.env.REACT_APP_API_URL;
    const ImageUrl = process.env.REACT_APP_IMAGE_URL;

    const getMovieData= async()=>{
        const response = await axios.get(`${url}/movie/movieRanking`);
        console.log('boxOffice 출력',response.data);
        setBoxOfficeData(response.data);
    }
    useEffect(()=>{
        getMovieData();
    },[]);
  
  return <div>
    <div className='ranking-main'>
      <div className='ranking-main-sub'>
        <div className='ranking-title'>
          <h2>
            <Link to={`/recomend/actor/`}>오늘의 랭킹</Link>
          </h2>
        </div>
        <div className='ranking-recomend'>
          {boxOfficeData &&
            boxOfficeData.map((item, index) => (
              <Link to={`/movie/${item.movieId}`} key={index}>
                <div className='ranking-image'>
                  <img
                    src={`${ImageUrl}${item.poster_path}`}
                    alt={item.title}
                  />
                  <div className='ranking-rating'>{item.rating}%</div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  </div>;
}

export default MovieRanking;