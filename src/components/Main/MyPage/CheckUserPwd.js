import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUserData } from '../../../utils/userInfo/api/userApi';

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
        <div>
            <div 
                type="text" 
                // type="hidden" 
                value={userData.userId || ''} >
                {userData.userId || ''} </div> 
            <input type="password" placeholder="Password" value={userPwd} onChange={(e) => setUserPwd(e.target.value)} />
            <button onClick={handlePasswordValidation}>비밀번호 확인</button>
        </div>
    );
};

export default CheckUserPwd;
