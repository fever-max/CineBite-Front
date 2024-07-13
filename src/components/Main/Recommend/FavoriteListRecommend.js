import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import axios from 'axios';
import { getUserData } from '../../../utils/userInfo/api/userApi';
import tomatoImg from '../../../assets/images/tomato.png';
import rottenImg from '../../../assets/images/rotten.png';
import '../../../styles/Main/Recommend/FavoriteListRecommend.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FavoriteListRecommend = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [recommend, setRecommend] = useState([]);
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const url = process.env.REACT_APP_API_URL;
    const ImageUrl = process.env.REACT_APP_IMAGE_URL;

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getUserData(navigate, setIsLogin);
            if (userData) {
                setUser(userData);
                console.log("리코멘드 유저 확인 : ", userData);
            }
        };
        fetchUserData();
    }, [navigate]);

    useEffect(() => {
        if (isLogin && user) {
            const fetchRecommend = async () => {
                try {
                    const response = await axios.get(`${url}/recommendations`, {
                        params: {
                            userId: user.userId,
                            page: 0,
                            size: 8 // 최대 8개까지 로드
                        }
                    });
                    setRecommend(response.data.content);
                    console.log('추천 영화 : ', response.data.content);
                } catch (err) {
                    console.error('추천 목록 불러오기 실패1');
                    setError('추천 목록을 불러오는데 실패했습니다.');
                }
            };
            fetchRecommend();
        }
    }, [isLogin, user, url]);

    const handleItemClick = (movieId) => {
        navigate(`/movie/${movieId}`);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 4,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        // centerMode: true,
        // leftPadding: '1px'
    };

    const formatTomatoScore = (score) => {
        return score ? score.toFixed(2) : 'ㅡ';
    };

    return (
        <div className="recommend-list">
            <Link to="/recommend/list" className="recommend-header-link">
                <button className="recommend-header-button">
                    비슷한 취향을 가진 회원님들이 즐겨본 영화
                    <span className="arrow">{'〉'}</span>
                </button>
            </Link>
            {error && <div className="error-message">{error}</div>}
            
            <Slider {...settings} className="recommend-slider">
                {recommend.map((recommend) => (
                    <div
                        key={recommend.movieId}
                        className="recommend-item"
                        onClick={() => handleItemClick(recommend.movieId)}
                    >
                        <img src={`${ImageUrl}${recommend.posterPath}`} alt={recommend.title} className="recommend-poster" />
                        <div className="recommend-info">
                            <h3>{recommend.title.length > 9 ? `${recommend.title.slice(0, 9)}...` : recommend.title}</h3>
                            <h3>
                                    <img
                                        src={
                                            recommend.tomatoScore === 0 || recommend.tomatoScore === undefined
                                                ? tomatoImg
                                                : recommend.tomatoScore <= 60
                                                ? rottenImg
                                                : tomatoImg
                                        }
                                        alt={
                                            recommend.tomatoScore === 0 || recommend.tomatoScore === undefined
                                                ? 'No Rating'
                                                : recommend.tomatoScore <= 60
                                                ? 'Rotten'
                                                : 'Fresh'
                                        }
                                        className="tomato-image"
                                        />
                                        {formatTomatoScore(recommend.tomatoScore)}%
                            </h3>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default FavoriteListRecommend;
