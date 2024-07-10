import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../styles/Main/UserInfo/FavoriteList.css';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate, Navigate } from 'react-router-dom'; // useNavigate 및 Navigate import
import { getUserData } from '../../../utils/userInfo/api/userApi'; // getUserData import
import tomatoImg from '../../../assets/images/tomato.png';
import rottenImg from '../../../assets/images/rotten.png';
import Modal from 'react-modal';

const FavoriteList = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState('');
    const [user, setUser] = useState(null); // 현재 로그인한 사용자 상태 추가
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const navigate = useNavigate(); // useNavigate 사용

    const url = process.env.REACT_APP_API_URL;
    const ImageUrl = process.env.REACT_APP_IMAGE_URL;

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getUserData(navigate, setIsLogin);
            if (userData) {
                setUser(userData); // 로그인한 사용자 데이터 저장
                console.log("페이버릿 유저 확인 :", userData);
            }
        };
        fetchUserData();
    }, [navigate]);

    useEffect(() => {
        if (isLogin && user) {
            const fetchFavorites = async () => {
                try {
                    const response = await axios.get(`${url}/favorites/list`, {
                        params: { userId: user.userId }, 
                    });

                    setFavorites(response.data);
                    console.log('영화정보 :', response.data);
                    console.log("페이버릿 유저 : ", user.userId);
                } catch (err) {
                    console.error('Error fetching favorite list:', err);
                    setError('즐겨찾기 목록을 불러오는데 실패했습니다. 다시 시도해주세요.');
                }
            };

            fetchFavorites();
        }
    }, [isLogin, user, url]);

    const handleDelete = async () => {
        try {
            if (!user) {
                setError('로그인이 필요합니다.');
                return;
            }

            await axios.delete(`${url}/favorites/delete`, {
                params: { userId: user.userId, movieId: selectedMovieId }, 
            });

            setFavorites(favorites.filter((favorite) => favorite.movieId !== selectedMovieId));
            closeModal();
        } catch (err) {
            console.error('Error deleting favorite:', err);
            setError('즐겨찾기 삭제에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const openModal = (movieId) => {
        setSelectedMovieId(movieId);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedMovieId(null);
        setModalIsOpen(false);
    };

    const handleItemClick = (movieId) => {
        navigate(`/movie/${movieId}`);
    };

    return (
        <div className="favorite-list">
            <h1>즐겨찾기 목록</h1>
            {error && <div className="error-message">{error}</div>}
            <div className="favorites-container">
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
                                <h3><img 
                                        src={
                                            favorite.tomatoScore === 0 || favorite.tomatoScore === undefined ? tomatoImg :
                                            favorite.tomatoScore <= 60 ? rottenImg : tomatoImg
                                        } 
                                        alt={
                                            favorite.tomatoScore === 0 || favorite.tomatoScore === undefined ? 'No Rating' :
                                            favorite.tomatoScore <= 60 ? 'Rotten' : 'Fresh'
                                        } 
                                        className='tomato-image'
                                    />
                                {favorite.tomatoScore}%</h3>
                                <button onClick={(e) => { e.stopPropagation(); openModal(favorite.movieId); }} className="delete-button">
                                    <FaTrashAlt /> 삭제
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>즐겨찾기 목록이 비어 있습니다.</p>
                )}
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Delete Confirmation"
                className="Modal"
                overlayClassName="Overlay"
            >
                <h2>찜목록에서 삭제하시겠습니까?</h2>
                <button onClick={handleDelete}>예</button>
                <button onClick={closeModal}>아니오</button>
            </Modal>
        </div>
    );
};

export default FavoriteList;
