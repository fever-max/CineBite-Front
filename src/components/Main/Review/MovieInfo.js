import axios from 'axios';
import React, { useState } from 'react';
import "../../../styles/Main/Review/MovieInfo.css"

function MovieInfo({movie}) {
    const ImageUrl = process.env.REACT_APP_IMAGE_URL;
    const [showMore, setShowMore] = useState(false);

    const handleToggle = () => {
        setShowMore(!showMore);
    };

    const getOverviewText = () => {
        if (showMore) {
            return movie.overview;
        }
        return movie.overview.length > 100 ? movie.overview.substring(0, 100) + '...' : movie.overview;
    };
    

  return <div>
    <div className='movieInfo_container'>
        <div className='movieInfo-subContainer'>
            <div className='movieInfo-overView'>
                <span>{getOverviewText()}</span>
                <button onClick={handleToggle}>{showMore ? '줄이기' : '더보기'}</button>
            </div>
            <div className='movieInfo-info'>
                <ul>
                    <li>
                        <span>장르 </span>
                        <span>{movie.genres.map(genre=>genre.name).slice(0,2).join(', ')}</span>
                    </li>
                    <li>
                        <span>개봉일 </span>
                        <span>{movie.release_date}</span>
                    </li>
                    <li>
                        <span>러닝타임 </span>
                        <span>{movie.runtime}분</span>
                    </li>
                    <li>
                        <span>제작국가 </span>
                        <span>US</span>
                    </li>
                </ul>
            </div>
            <div className='movieInfo-actors'>
                <div>출연진</div>
                <div class="actors-list">
                    {movie.credits.cast.slice(0, 5).map(cast=>
                        <div class="actor">
                            <img src={`${ImageUrl}${cast.profile_path}`} alt="제시카 알바"/>
                            <div class="actor-name">{cast.name}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>

  </div>;
}

export default MovieInfo;
