import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../../../utils/userInfo/api/userApi'; // 예시에서 사용하는 getUserData 함수
import tomatoImg from '../../../assets/images/tomato.png';
import rottenImg from '../../../assets/images/rotten.png';
import Pagination from '../../../utils/Pagination';
import '../../../styles/Main/UserInfo/FavoriteList.css';

const FavoriteList = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [pagedFavorites, setPagedFavorites] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 1-based index
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 4;
    const navigate = useNavigate();

    const url = process.env.REACT_APP_API_URL; // API URL 설정
    const ImageUrl = process.env.REACT_APP_IMAGE_URL; // 이미지 URL 설정

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getUserData(navigate, setIsLogin);
            if (userData) {
                setUser(userData);
                console.log("페이버릿 유저 확인 :", userData);
            }
        };
        fetchUserData();
    }, [navigate]);

    useEffect(() => {
        if (isLogin && user) {
            const fetchFavorites = async () => {
                try {
                    // 페이징 처리된 찜 목록 불러오기
                    const pagingResponse = await axios.get(`${url}/favorites/paging/favoriteList`, {
                        params: { userId: user.userId,
                            page: currentPage,
                            size: itemsPerPage,
                            sort: 'favoriteId,desc' 
                        },
                    });
                    setPagedFavorites(pagingResponse.data.content);
                    setTotalPages(pagingResponse.data.totalPages);
                    console.log('페이징된 찜 목록 :', pagingResponse.data.content);
                } catch (err) {
                    console.error('Error fetching favorite list:', err);
                    setError('즐겨찾기 목록을 불러오는데 실패했습니다. 다시 시도해주세요.');
                }
            };
            fetchFavorites();
        }
    }, [isLogin, user, url, currentPage]);


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
            setPagedFavorites(pagedFavorites.filter((favorite) => favorite.movieId !== selectedMovieId));
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

    // 페이지 이동
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const formatTomatoScore = (score) => {
        return score ? score.toFixed(2) : 'ㅡ';
    };

    return (
        <div className="favorite-list">
            <h1>즐겨찾기 목록</h1>
            {error && <div className="error-message">{error}</div>}
            <div className="favorites-container">
                {pagedFavorites.length > 0 ? (
                    pagedFavorites.map((favorite) => (
                        <div
                            key={favorite.movieId}
                            className="favorite-item"
                            onClick={() => handleItemClick(favorite.movieId)}
                        >
                            <img
                                src={`${ImageUrl}${favorite.posterPath}`}
                                alt={favorite.title}
                                className="favorite-poster"
                            />
                            <div className="favorite-info">
                                <h3>{favorite.title}</h3>
                                <h3>
                                    <img
                                        src={
                                            favorite.tomatoScore === 0 || favorite.tomatoScore === undefined
                                                ? tomatoImg : favorite.tomatoScore <= 60
                                                ? rottenImg : tomatoImg
                                        }
                                        alt={
                                            favorite.tomatoScore === 0 || favorite.tomatoScore === undefined
                                                ? 'No Rating' : favorite.tomatoScore <= 60
                                                ? 'Rotten' : 'Fresh'
                                        }
                                        className="tomato-image"
                                    />
                                    {formatTomatoScore(favorite.tomatoScore)}%
                                </h3>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openModal(favorite.movieId);
                                    }}
                                    className="delete-button"
                                >
                                    <FaTrashAlt /> 삭제
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>즐겨찾기 목록이 비어 있습니다.</p>
                )}
            </div>
            {/* 페이징 */}
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
            />
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
