import useFetchData from '../../../hooks/useFetchData';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../../styles/Main/Community/BoardItem.css';
import CommentItem from './CommentItem';

function BoardItem() {
  const { postNo } = useParams();
  const navigate = useNavigate();
  console.log('postNo:' + postNo);
  const apiUrl = process.env.REACT_APP_API_URL;
  const postUrl = `${apiUrl}/board/post/${postNo}`;
  const { entities } = useFetchData(postUrl);

  const editBtn = () => {
    navigate('/community/edit/' + postNo);
  };

  const deleteBtn = async () => {
    const isConfirmed = window.confirm('게시글을 삭제하시겠습니까?');
    if (isConfirmed) {
      try {
        const response = await axios.delete(`${apiUrl}/board/post/delete/${postNo}`);
        if (response) {
          console.log('게시글 삭제 성공');
          navigate('/community');
        }
      } catch (error) {
        console.log('게시글 삭제 에러: ', error);
      }
    }
  };

  if (!entities) {
    return <p>게시글을 불러오는 중입니다...</p>;
  }

  return (
    <div>
      <div>
        <button onClick={editBtn}>글수정</button>
        <button onClick={deleteBtn}>글삭제</button>
        <h2>{entities.postTitle}</h2>
        <p>작성자: {entities.userId}</p>
        {entities.imgUrl && <img src={entities.imgUrl} alt={entities.postTitle} className="itemImg" />}
        <p className="write_content">내용: {entities.postContent ? entities.postContent.replace(/<br>/g, '\n') : '내용이 없습니다.'}</p>
        <p>작성일: {new Date(entities.createdDate).toLocaleDateString()}</p>
        <p>조회수: {entities.hitCount}</p>
        <p>좋아요: {entities.likeCount}</p>
        <p>댓글 수: {entities.commentCount}</p>

        <p>태그: {entities.tagNames ? entities.tagNames.map((tag, index) => <span key={index}>#{tag} </span>) : ''}</p>
      </div>
      <div>
        <CommentItem postNo={postNo} apiUrl={apiUrl} />
      </div>
    </div>
  );
}

export default BoardItem;
