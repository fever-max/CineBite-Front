import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../styles/Main/UserInfo/FavoriteList.css';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // useNavigate import

const FavoriteList = () => {
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // useNavigate 사용

    const url = process.env.REACT_APP_API_URL;
    const ImageUrl = "https://image.tmdb.org/t/p/w500";
    const TempUserId = 'test4'; // 임시 아이디

    useEffect(() => {
        localStorage.setItem('userId', TempUserId);

        const fetchFavorites = async () => {
            try {
                const userId = localStorage.getItem('userId'); // 로컬 스토리지에서 userId 가져오기
                console.log("유저 : ", userId);
                if (!userId) {
                    setError('로그인이 필요합니다.');
                    return;
                }

                const response = await axios.get(`${url}/favorites/list`, {
                    params: { userId },
                });

                setFavorites(response.data);
                console.log('영화정보 :', response.data);
            } catch (err) {
                console.error('Error fetching favorite list:', err);
                setError('즐겨찾기 목록을 불러오는데 실패했습니다. 다시 시도해주세요.');
            }
        };

        fetchFavorites();
    }, [url]);

    const handleDelete = async (movieId) => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                setError('로그인이 필요합니다.');
                return;
            }

            await axios.delete(`${url}/favorites/delete`, {
                params: { userId, movieId },
            });

            setFavorites(favorites.filter((favorite) => favorite.movieId !== movieId));
        } catch (err) {
            console.error('Error deleting favorite:', err);
            setError('즐겨찾기 삭제에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const handleItemClick = (movieId) => {
        navigate(`/movie/${movieId}`);
    };

    return (
        <div className="favorite-list">
            <h1>즐겨찾기 목록</h1>
            {error && <div className="error-message">{error}</div>}
            {favorites.length > 0 ? (
                favorites.map((favorite) => (
                    <div 
                        key={favorite.movieId} 
                        className="favorite-item"
                        onClick={() => handleItemClick(favorite.movieId)} // 아이템 클릭 시 상세 페이지로 이동
                    >
                        <img src={`${ImageUrl}${favorite.posterPath}`} alt={favorite.title} className="favorite-poster" />
                        <div className="favorite-info">
                            <h3>{favorite.title}</h3>
                            <h3>{favorite.tomatoScore}%</h3>
                            <button onClick={(e) => { e.stopPropagation(); handleDelete(favorite.movieId); }} className="deleteSize">
                                <FaTrashAlt /> 삭제
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p>즐겨찾기 목록이 비어 있습니다.</p>
            )}
        </div>
    );
};

export default FavoriteList;
