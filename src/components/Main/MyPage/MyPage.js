import React from 'react';
import { useUserData } from '../../../utils/userInfo/api/userApi';
import { useNavigate } from 'react-router-dom';

function MyPage() {

    const navigate = useNavigate();

    const { userData, loading } = useUserData();

    const handleUserEdit = () => {
        if (!userData.userPwd) {
            navigate('/modifyUser');
        } else {
            navigate('/checkUserPwd');
        }
    };
    
    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <button onClick={handleUserEdit}>정보수정</button>
            <h1>User Profile</h1>
            <img src={userData.userProfileImg} alt="User Profile" />
            <p>Username: {userData.userId}</p>
            <p>Email: {userData.userEmail}</p>
            <p>Role: {userData.userRole}</p>
            <p>userNick: {userData.userNick}</p>
            <p>userPwd: {userData.userPwd}</p>
        </div>
    )
}

export default MyPage;
