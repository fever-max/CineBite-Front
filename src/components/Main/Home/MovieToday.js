import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import '../../../styles/Main/Home/movieToday.css';
import { Link } from 'react-router-dom';
import { FaChevronRight } from "react-icons/fa";

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowButton } from '../../../utils/ArrowButton';
import { SliderContainer } from '../../../styles/Main/Home/SliderContainer';

const MovieToday = () => {
    const [actorName, setActorName] = useState('');
    const [actorList, setActorList] = useState([]);
    const actorRef = useRef(''); 
    const url = process.env.REACT_APP_API_URL;
    const ImageUrl = process.env.REACT_APP_IMAGE_URL;
    const showMaxCnt = 4;
    const arr = Array.from(new Array(3));

    const [movieData,setMovieData] = useState([]);
     //메인-배우별 추천
     const getActorList=async(actorName)=>{
        try {
            const response = await axios.post(`${url}/movie/actorList`, { "name": actorName });
            console.log('actorName',actorName);
            console.log('서버 응답:', response.data);
            setActorList(response.data);
        } catch (error) {
            console.error('서버 요청 오류:', error);
        }
    }
    useEffect(() => {
        if (actorRef.current) {
            const name = actorRef.current.innerText.split(' ')[0];
            setActorName(name);
        }
    }, []);

    useEffect(() => {
        if (actorName) {
            getActorList(actorName);
        }
    }, [actorName]);

    //전체 데이터 출력
    const getMovieData= async()=>{
        const response = await axios.get(`${url}/movie/movieList`);
        console.log('getMovieData',response.data);
        setMovieData(response.data);
    }
    useEffect(()=>{
        if (actorName) {
            getActorList(actorName);
        }
        getMovieData();
    },[]);

    const settings = {
        dots: false,
        infinite: arr.length > showMaxCnt,
        speed: 500,
        slidesToShow: showMaxCnt,
        slidesToScroll: showMaxCnt,
        nextArrow: <ArrowButton direction="next" />,
        prevArrow: <ArrowButton direction="prev" />,
    };    
    return (
        <SliderContainer>
            <div className='today-main'>
                <div className='today-main-sub'>
                    <div className='today-title'>
                        <Link to={`/recomend/actor/${actorName}`} className='title-link' ref={actorRef}>
                        <h2>마동석 배우 시리즈</h2>
                        {/* 마우스 올리면 보임 */}
                        <span className='view-all-link'>모두 보기</span>
                        <div className='view-all-link-chevron'><FaChevronRight/></div>
                        </Link>
                    </div>
                    <div className='today-recomend'>
                    {actorList.length > 0 ? (
                        <Slider {...settings}>
                            {actorList.map((item, index) => (
                            <Link to={`/recomend/actor/${actorName}`} key={index}>
                                <div className='today-image'>
                                <img src={`${ImageUrl}${item.poster_path}`} alt={item.title} />
                                <div className="today-rating">{item.rating}%</div>
                                </div>
                            </Link>
                            ))}
                        </Slider>
                        ) : (
                        <p>No data available</p>
                        )}
                    </div>
                    {/* 디자인 확인용 */}
                    <div className='today-title'>
                        <h2>전체 출력</h2>
                        <span className='view-all-link'>모두 보기</span>
                        <div className='view-all-link-chevron'><FaChevronRight/></div>
                    </div>
                    <div className='today-recomend'>
                        <Slider {...settings}>
                            {movieData.length > 0 ? (
                                movieData.map((item, index) => (
                                <Link to={`/movie/${item.id}`} key={index}>
                                    <div className='today-image'>
                                        <img src={`${ImageUrl}${item.poster_path}`} alt={item.title}/>
                                        <div className="today-rating">{item.rating}%</div>
                                    </div>
                                </Link>
                                ))
                            ) : (
                                <p>영화 데이터가 없습니다.</p>
                            )}
                        </Slider>
                    </div>
                </div>
            </div>
        </SliderContainer>
      )
    };
export default MovieToday;