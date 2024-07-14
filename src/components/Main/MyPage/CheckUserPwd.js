import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUserData } from '../../../utils/userInfo/api/userApi';
import InputBox from '../UserInfo/InputBox';
import '../../../styles/Main/MyPage/CheckUserPwd.css'

const CheckUserPwd = () => {
    const [userPwd, setUserPwd] = useState('');
    const { userData, loading, isLogin } = useUserData();
    const navigate = useNavigate();

    const handlePasswordValidation = async () => {
        if (!userData) {
            alert('정보 불러오기 실패');
            return;
        }
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/validatePassword`, { 
                userId: userData.userId,
                userPwd 
            });
            if (response.data) {
                navigate('/modifyUser');
            } else {
                alert('올바른 비밀번호가 아닙니다.');
            }
        } catch (error) {
            alert('검증 시도 중 오류 발생');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isLogin) {
        return <Navigate to="/login" />;
    }

    return (
    
        <div id='pwd-check-wrapper'>
            <div className='pwd-check-container'>
                <div className='pwd-check-box'>
                <div className='pwd-check-title'>{'정보수정'}</div>
                    <div className='pwd-check-content-box'>
                        <div className='pwd-check-content-input-box' type="hidden" value={userData.userId || ''} >
                            <InputBox type="password" placeholder="비밀번호를 입력해주세요." value={userPwd} onChange={(e) => setUserPwd(e.target.value)} buttonTitle='확인' onButtonClick={handlePasswordValidation}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckUserPwd;
