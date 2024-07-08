import React from 'react';
import { useUserData } from '../../../utils/userInfo/api/userApi';

function MyPage() {

    const { userData, loading } = useUserData();
    
    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>User Profile</h1>
            <p>Username: {userData.userId}</p>
            <p>Email: {userData.userEmail}</p>
            <p>Role: {userData.userRole}</p>
            <p>userNick: {userData.userNick}</p>
        </div>
    )
}

export default MyPage;
