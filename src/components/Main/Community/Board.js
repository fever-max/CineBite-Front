import React, { useEffect, useState } from 'react';
import useFetchData from '../../../hooks/useFetchData';
import { Link } from 'react-router-dom';
import '../../../styles/Main/Community/Board.css';

function Board() {
  const url = process.env.REACT_APP_API_URL;
  const boardUrl = url + '/board/post/list';
  const { entities } = useFetchData(boardUrl);
  const [currentTime, setCurrentTime] = useState(new Date());

  // 1분마다 현재 시간을 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 1분마다 갱신
    return () => clearInterval(interval);
  }, []);

  // 시간 차이를 계산하여 문자열 반환
  const getTimeAgo = (createdDate) => {
    const difference = currentTime - new Date(createdDate);
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}일 전`;
    } else if (hours > 0) {
      return `${hours}시간 전`;
    } else if (minutes > 0) {
      return `${minutes}분 전`;
    } else {
      return `${seconds}초 전`;
    }
  };

  return (
    <div>
      <h2>최근 커뮤니티</h2>
      <div className="board_content">
        <div className="post_content">
          <ul>
            {entities.length > 0 ? (
              entities
                .slice()
                .reverse()
                .map((item) => (
                  <div key={item.postNo} className="post_content2">
                    <Link to={`/community/${item.postNo}`}>
                      <p className="post_createDate">{getTimeAgo(item.createdDate)}</p>
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
                  </div>
                ))
            ) : (
              <p>게시글을 불러오는 중입니다...</p>
            )}
          </ul>
        </div>
        <div className="sub_content">
          <Link to={'/community/write'}>
            <button>글 작성</button>
          </Link>
          <h3>인기 태그</h3>
        </div>
      </div>
    </div>
  );
}

export default Board;
