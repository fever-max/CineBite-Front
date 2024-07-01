import React, { useEffect, useState } from "react";
import useFetchData from "../../../hooks/useFetchData";
import { Link } from "react-router-dom";
import { useCurrentTime, getTimeAgo } from "../../../utils/TimeUtil";

function BoardList() {
    const url = process.env.REACT_APP_API_URL;
    const boardList = `${url}/board/post/list`;
    const { entities: boardEntities } = useFetchData(boardList);
    const currentTime = useCurrentTime();
    return (
        <div>
            BoardList
            <ul>
                {boardEntities && boardEntities.length > 0 ? (
                    boardEntities
                        .slice()
                        .reverse()
                        .map((item) => (
                            <li key={item.postNo} className="post_content2">
                                <Link to={`/community/${item.postNo}`}>
                                    <p className="post_createDate">{getTimeAgo(currentTime, item.createdDate)}</p>
                                    <div className="post_sub">
                                        <div className="author_content">
                                            <div className="author_info">
                                                <p>작성자: {item.userId}</p>
                                            </div>
                                            <div className="post_info">
                                                <div>{item.postTitle}</div>
                                                <div>{item.postContent}</div>
                                                <div>{item.tagNames && item.tagNames.map((tag, index) => <span key={index}>#{tag} </span>)}</div>
                                            </div>
                                        </div>
                                        {item.imgUrl && <img src={item.imgUrl} className="post_img" alt={item.postTitle} />}
                                    </div>
                                    <div className="post_info2">
                                        <div>조회수: {item.hitCount}</div>
                                        <div>좋아요: {item.likeCount}</div>
                                        <div>댓글 수: {item.commentCount}</div>
                                    </div>
                                </Link>
                            </li>
                        ))
                ) : (
                    <p>게시글을 불러오는 중입니다...</p>
                )}
            </ul>
        </div>
    );
}

export default BoardList;
