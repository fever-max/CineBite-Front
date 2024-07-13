import React from "react";
import { Routes, Route } from "react-router-dom";
import "../styles/Main/Main.css";
import Home from "../components/Main/Home/Home";
import Search from "../components/Main/Search/Search";
import Recommend from "../components/Main/Recommend/Recommend";
import MyPage from "../components/Main/MyPage/MyPage";
import NotFound from "../components/Main/NotFound";
import ReviewWrite from "../components/Main/Review/ReviewWrite";
import MovieInfo from "../components/Main/Review/MovieInfo";
import SignIn from "../components/Main/UserInfo/SignIn";
import MovieDetail from "../components/Main/Home/MovieDetail";
import SignUp from "../components/Main/UserInfo/SignUp";
import Board from "./../components/Main/Community/Board";
import BoardItem from "../components/Main/Community/BoardItem";
import BoardWrite from "../components/Main/Community/BoardWrite";
import FavoriteList from "../components/Main/Favorite/FavoriteList";
import GetAccess from "../utils/userInfo/api/getAccess";
import BoardList from "../components/Main/Community/BoardList";
import FindUserId from '../components/Main/UserInfo/FindUserId';
import FindUserPwd from '../components/Main/UserInfo/FindUserPwd';
import CheckUserPwd from '../components/Main/MyPage/CheckUserPwd';
import UserUpdate from '../components/Main/MyPage/UserUpdate';
import PreFavoriteListRecommend from "../components/Main/Recommend/preFavoriteListRecommend"; // 컴포넌트 이름 수정
import ActorRecomend from "../components/Main/Recommend/ActorRecomend";
import GenreRecommend from "../components/Main/Recommend/GenreRecommend";

function Main() {
    return (
        <div className="main_div">
            <Routes>
                {/* 메인 */}
                <Route path="/" element={<Home />} />

                {/* 마이페이지 */}
                <Route path="/myPage" element={<MyPage />} />
                <Route path="/checkUserPwd" element={<CheckUserPwd />} />
                <Route path="/modifyUser" element={<UserUpdate />} />
                <Route path="/favoriteList" element={<FavoriteList />} />

                {/* 로그인, 회원가입 */}
                {<Route path="/login" element={<SignIn />} />}
                <Route path="/join" element={<SignUp />} />
                <Route path="/getAccess" element={<GetAccess />} />
                <Route path="/findId" element={<FindUserId />} />
                <Route path="/findPwd" element={<FindUserPwd />} />

                {/* 영화 검색 */}
                <Route path="/search" element={<Search />} />

                {/* 사용자 영화 추천 */}
                <Route path="/recommend" element={<Recommend />} />
                <Route path="/recommend/list" element={<PreFavoriteListRecommend />} />

                {/* 일반 영화 추천 */}
                <Route path="/recomend/actor/:actorName" element={<ActorRecomend />} />
                <Route path="/recomend/genre/:genre" element={<GenreRecommend />} />

                {/* 영화 커뮤니티 */}
                <Route path="/community" element={<Board />} />
                <Route path="/community/:postNo" element={<BoardItem />} />
                <Route path="/community/write" element={<BoardWrite />} />
                <Route path="/community/edit/:postNo" element={<BoardWrite />} />
                <Route path="/community/list" element={<BoardList />} />
                <Route path="/community/list/:tagName" element={<BoardList />} />

                {/* 영화정보 및 리뷰 */}
                <Route path="/review/:movieId" element={<MovieInfo />} />
                <Route path="/review/write/:movieId" element={<ReviewWrite />} />
                <Route path="/movie/:movieId" element={<MovieDetail />} />

                {/* 404 페이지 */}
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default Main;
