import axios from "axios"
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "./reissue";

export const GetUser = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [userNick, setUserNick] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      setIsLogin(true);
      const decodedToken = jwtDecode(token);
      setUserNick(decodedToken.userNick);
      setUserRole(decodedToken.userRole);
      setUserEmail(decodedToken.userEmail);
      setUserId(decodedToken.userId);
    }
  }, []);

  return { isLogin, userNick, userRole, userEmail, userId };
};

export const useUserData = () => {
  const [userData, setUserData] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const result = await getUserData(navigate, setIsLogin);
        setUserData(result);
        setLoading(false);
      } catch (error) {
        if (error.response?.data === 'access token expired') {
          try {
            await getAccessToken();
            const result = await getUserData(navigate, setIsLogin);
            setUserData(result);
            setLoading(false);
          } catch (error) {
            console.error('Failed to refresh access token:', error);
            setLoading(false);
          }
        } else {
          console.error('Failed to fetch user data:', error);
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  return { userData, loading, isLogin };
};

export const getUserData = async (navigate, setIsLogin) => {
  const token = localStorage.getItem('access');
  if (!token) {
      console.log('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return;
  }
  setIsLogin(true);

  const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/data`,{headers:
    {access: token},
    withCredentials: true
    });
    console.log('접속한 유저1 : ', JSON.stringify(response.data));
  return response.data
}