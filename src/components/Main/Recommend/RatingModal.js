import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root'); // 예시로 root를 애플리케이션의 root 요소에 맞추었습니다.

const RatingModal = ({ isOpen, onRequestClose, onRatingSubmit }) => {
    const [rating, setRating] = useState('fresh'); // 기본값을 'fresh'로 설정합니다.

    const handleRating = (value) => {
        setRating(value);
    };

    const API_URL = process.env.REACT_APP_API_URL;
    
    const handleSubmit = () => {
        const userId = 'jyp423'; // 실제 사용자 ID를 동적으로 설정해야 합니다.

        axios.post(`${API_URL}/movies/746036/rate`, {
            userId: userId,
            rating: rating === 'fresh' ? 'fresh' : 'rotten'
        }, {
            headers: {
                'Content-Type': 'text/plain'
            }
        })
        .then(response => {
            console.log('평가 결과:', response.data);
            onRatingSubmit(rating); // 상위 컴포넌트로 평가 값을 전달합니다.
            onRequestClose(); // 모달을 닫습니다.
        })
        .catch(error => {
            console.error("평가를 저장하는 데 실패했습니다.", error);
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="TomatoScore 평가 모달"
        >
            <h2>TomatoScore 평가</h2>
            <div>
                <button onClick={() => handleRating('fresh')}>신선해요</button>
                <button onClick={() => handleRating('rotten')}>썩었어요</button>
            </div>
            <button onClick={handleSubmit}>평가 제출</button>
        </Modal>
    );
};

export default RatingModal;
