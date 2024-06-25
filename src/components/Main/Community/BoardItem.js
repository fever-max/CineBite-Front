import useFetchData from '../../../hooks/useFetchData';
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

    if (!entities) {
        return <p>게시글을 불러오는 중입니다...</p>;
    }

    return (
        <div>
            <div>
                <button onClick={editBtn}>글수정</button>
                <h2>{entities.postTitle}</h2>
                <p>작성자: {entities.userId}</p>
                {entities.imgUrl && <img src={entities.imgUrl} alt={entities.postTitle} className="itemImg" />}
                <p>내용: {entities.postContent}</p>
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
