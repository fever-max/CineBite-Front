import useFetchData from '../../../hooks/useFetchData';
import { useParams } from 'react-router-dom';

function BoardItem() {
  const { postNo } = useParams();
  console.log('postNo:' + postNo);
  const url = process.env.REACT_APP_API_URL;
  const postUrl = `${url}/board/post/${postNo}`;
  const { entities, fetchData } = useFetchData(postUrl);

  if (!entities) {
    return <p>게시글을 불러오는 중입니다...</p>;
  }

  return (
    <div>
      <h2>{entities.postTitle}</h2>
      <p>작성자: {entities.userId}</p>
      <p>내용: {entities.postContent}</p>
      <p>작성일: {new Date(entities.createdDate).toLocaleDateString()}</p>
      <p>조회수: {entities.hitCount}</p>
      <p>좋아요: {entities.likeCount}</p>
      <p>댓글 수: {entities.commentCount}</p>
      {entities.imgUrl && <img src={entities.imgUrl} alt={entities.postTitle} />}
      <p>태그: {entities.tagNames ? entities.tagNames.map((tag, index) => <span key={index}>#{tag} </span>) : ''}</p>
    </div>
  );
}

export default BoardItem;
