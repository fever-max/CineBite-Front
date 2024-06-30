import axios from 'axios';
import React, { useState } from 'react';

function MovieInfo() {
  const [movieData,setMovieData] = useState([]);
    const url = process.env.REACT_APP_API_URL;
    
    //전체 데이터 출력
    const getMovieData= async()=>{
        const response = await axios.get(`${url}/api/movie/movieList`);
        console.log('getMovieData',response.data);
        setMovieData(response.data);
    }

  return <div>MovieInfo(지민, 지은) / 영화 클릭시 영화 정보 
    {movieData && 
    movieData.map(item=>
      <div key={item.id}>
        <ul>
          <li>제목: {item.title}</li>
          <li>줄거리: {item.overview}</li>
          <li>
          <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}/>
          </li>
          <li>장르: {item.genres.map(genre=>genre.name).join(', ')}</li>
          <li>배우: {item.credits.cast.map(cast=>cast.name).join(', ')}</li>
        </ul>
      </div>
    )
    }
{/* <div>
                    <section>
                        <div>
                            <div>
                                <div>
                                    <span></span>
                                    <button>더보기</button>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <ul>
                            <li>
                                <span></span>
                                <span></span>
                            </li>
                            <li>
                                <span></span>
                                <span></span>
                            </li>
                            <li>
                                <span></span>
                                <span></span>
                            </li>
                            <li>
                                <span></span>
                                <span></span>
                            </li>
                        </ul>
                    </section>
                    <section>
                        <div>
                            <div>출연진</div>
                            <div>출연진 값</div>
                        </div>
                    </section>
                    <section></section>
                    <section></section>
                </div> */}

  </div>;
}

export default MovieInfo;
