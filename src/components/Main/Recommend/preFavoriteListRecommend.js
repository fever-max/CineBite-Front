import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getUserData } from '../../../utils/userInfo/api/userApi';
import tomatoImg from '../../../assets/images/tomato.png';
import rottenImg from '../../../assets/images/rotten.png';
import Pagination from '../../../utils/Pagination';
import '../../../styles/Main/Recommend/preFavoriteListRecommend.css';

const PreFavoriteListRecommend = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [recommend, setRecommend] = useState([]);
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 4; // 페이지 당 4개 출력
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
                            page: currentPage - 1,
                            size: itemsPerPage
                        }
                    });
                    setRecommend(response.data.content);
                    setTotalPages(response.data.totalPages);
                    console.log('추천 영화 : ', response.data.content);
                } catch (err) {
                    console.error('추천 목록 불러오기 실패');
                    setError('추천 목록을 불러오는데 실패했습니다.');
                }
            };
            fetchRecommend();
        }
    }, [isLogin, user, currentPage, url]);

    const handleItemClick = (movieId) => {
        navigate(`/movie/${movieId}`);
    };

    // 페이지 이동
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // 토마토 지수 셋째자리 내림
    const formatTomatoScore = (score) => {
        return score ? score.toFixed(2) : 'ㅡ';
    };

    return (
        <div className="Prerecommend-list">
            {error && <div className="error-message">{error}</div>}
            <div className="Prerecommend-container">
                {recommend.length > 0 ? (
                    recommend.map((recommend) => (
                        <div
                            key={recommend.movieId}
                            className="Prerecommend-item"
                            onClick={() => handleItemClick(recommend.movieId)}
                        >
                            <img src={`${ImageUrl}${recommend.posterPath}`} alt={recommend.title} className="Prerecommend-poster" />
                            <div className="Prerecommend-info">
                                <h3>{recommend.title.length > 9 ? `${recommend.title.slice(0, 9)}...` : recommend.title}</h3>
                                <h3>
                                    <img
                                        src={
                                            recommend.tomatoScore === 0 || recommend.tomatoScore === undefined
                                                ? tomatoImg : recommend.tomatoScore <= 60 
                                                ? rottenImg : tomatoImg
                                        }
                                        alt={
                                            recommend.tomatoScore === 0 || recommend.tomatoScore === undefined
                                                ? 'No Rating' : recommend.tomatoScore <= 60
                                                ? 'Rotten' : 'Fresh'
                                        }
                                        className="tomato-image"
                                    />
                                    {formatTomatoScore(recommend.tomatoScore)}%
                                </h3>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>추천 목록이 비어 있습니다.</p>
                )}
            </div>
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
            />
        </div>
    );
};

export default PreFavoriteListRecommend;
