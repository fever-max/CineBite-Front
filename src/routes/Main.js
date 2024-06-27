import React from 'react';
import { Routes, Route } from 'react-router-dom';
import '../styles/Main/Main.css';
import Home from '../components/Main/Home/Home';
import Search from '../components/Main/Search/Search';
import Community from '../components/Main/Community/Community';
import Recommend from '../components/Main/Recommend/Recommend';
import MyPage from '../components/Main/MyPage/MyPage';
import NotFound from '../components/Main/NotFound';
import ReviewWrite from '../components/Main/Review/ReviewWrite';
import MovieInfo from '../components/Main/Review/MovieInfo';
import OAuth from '../components/Main/UserInfo/OAuth';
import SignIn from '../components/Main/UserInfo/SignIn';
import SignUp from '../components/Main/UserInfo/SignUp';

function Main() {
  return (
    <div className="main_div">
      <Routes>
        {/* 메인 */}
        <Route path="/" element={<Home />} />

        {/* 로그인,회원가입 */}
        <Route path="/login" element={<SignIn />} />
        <Route path="/join" element={<SignUp />} />
        {/* <Route path="oauth-response/:token/:expirationTime" element={<OAuth />} /> */}

        {/* 영화 검색 */}
        <Route path="/search" element={<Search />} />

        {/* 사용자 영화 추천 */}
        <Route path="/recommend" element={<Recommend />} />

        {/* 영화 커뮤니티 */}
        <Route path="/community" element={<Community />} />

        {/* 영화정보 및 리뷰 */}
        <Route path="/review/:movieId" element={<MovieInfo />} />
        <Route path="/review/write/:movieId" element={<ReviewWrite />} />

        {/* 마이페이지 */}
        <Route path="/myPage" element={<MyPage />} />

        {/* 404 페이지 */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default Main;
