import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import '../../../styles/Main/Home/movieToday.css';
import { Link } from 'react-router-dom';
import { FaChevronRight } from "react-icons/fa";

const MovieList = () => {
    const [actorName, setActorName] = useState('');
    const [actorList, setActorList] = useState([]);
    const actorRef = useRef(null); 
    const url = process.env.REACT_APP_API_URL;
    const ImageUrl = process.env.REACT_APP_IMAGE_URL;

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
        const response = await axios.get(`${url}/movie/movieList`, { withCredentials: true });
        console.log('getMovieData',response.data);
        setMovieData(response.data);
        
    }
    useEffect(()=>{
        getMovieData();
    },[]);

    return (
        <div className='today-main'>
            <div className='today-main-sub'>
                <div className='today-title'>
                    <Link to={`/recomend/actor/${actorName}`} ref={actorRef} className='title-link'>
                    <h2>마동석 배우 시리즈</h2>
                    {/* 마우스 올리면 보임 */}
                    <span className='view-all-link'>모두 보기</span>
                    <div className='view-all-link-chevron'><FaChevronRight/></div>
                    </Link>
                </div>
                <div className='today-recomend'>
                    {actorList && actorList.slice(0, 5).map((item,index)=>(
                        <Link to={`/movie/${item.id}`} key={index}>
                            <div className='today-image'>
                            <img src={`${ImageUrl}${item.poster_path}`} alt={item.title}/>
                            <div className="today-rating">{item.rating}%</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
      )
    };
export default MovieList;