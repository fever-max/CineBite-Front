import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getUserData } from '../../../utils/userInfo/api/userApi'; // getUserData import
import '../../../styles/Main/Recommend/FavoriteListRecommend.css';
import tomatoImg from '../../../assets/images/tomato.png';
import rottenImg from '../../../assets/images/rotten.png';

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
                        params: {userId : user.userId}
                    });
                    setRecommend(response.data);
                    console.log('추천 영화 : ', response.data);
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

    return (
        <div className="recommend-list">
            <h1>다른 사용자들의 즐겨찾기 목록 기반 추천 영화</h1>
            {error && <div className="error-message">{error}</div>}
            <div className="recommend-container">
                {recommend.length > 0 ? (
                    recommend.map((recommend) => (
                        <div
                            key={recommend.movieId}
                            className="recommend-item"
                            onClick={() => handleItemClick(recommend.movieId)} // 아이템 클릭 시 상세 페이지로 이동
                        >
                            <img src={`${ImageUrl}${recommend.posterPath}`} alt={recommend.title} className="recommend-poster" />
                            <div className="recommend-info">
                                <h3>{recommend.title.length > 9 ? `${recommend.title.slice(0, 9)}...` : recommend.title}</h3>
                                <h3><img 
                                        src={
                                            recommend.tomatoScore === 0 || recommend.tomatoScore === undefined ? tomatoImg :
                                            recommend.tomatoScore <= 60 ? rottenImg : tomatoImg
                                        } 
                                        alt={
                                            recommend.tomatoScore === 0 || recommend.tomatoScore === undefined ? 'No Rating' :
                                            recommend.tomatoScore <= 60 ? 'Rotten' : 'Fresh'
                                        } 
                                        className='tomato-image'
                                    />
                                {recommend.tomatoScore}%</h3>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>추천 목록이 비어 있습니다.</p>
                )}
            </div>
        </div>
    );
};

export default FavoriteListRecommend;
