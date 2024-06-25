import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useFetchData from '../../../hooks/useFetchData';
import '../../../styles/Main/Community/CommentItem.css';
import ReplyItem from './ReplyItem';
import { useCurrentTime, getTimeAgo } from '../../../utils/TimeUtil';

function CommentItem(props) {
    const { postNo, apiUrl } = props;
    const commentUrl = `${apiUrl}/board/post/${postNo}/comment`;
    const { entities, fetchData } = useFetchData(commentUrl);
    const currentTime = useCurrentTime();
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [formComment, setFormComment] = useState({
        userId: 'test4',
        content: '',
    });

    const handleContentChange = (e) => {
        setFormComment({
            ...formComment,
            content: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('전송하는 코멘트: ' + formComment.content);
            const response = await axios.post(`${apiUrl}/board/post/${postNo}/comment`, formComment);
            console.log('댓글 저장 성공: ', response.data);
            setFormComment({
                ...formComment,
                content: '',
            });
            fetchData();
        } catch (error) {
            console.error('댓글 저장 에러: ', error);
        }
    };

    return (
        <div>
            <h3>댓글창</h3>
            <div>
                {entities.length > 0 ? (
                    entities.map((item) => (
                        <div key={item.commentNo} className="comment_div">
                            <div className="comment_title">
                                <div className="comment_id">{item.userId}</div>
                                <div className="comment_date">{getTimeAgo(currentTime, item.date)}</div>
                            </div>
                            <div>{item.content}</div>
                            <button onClick={() => setShowReplyForm((prevState) => (prevState === item.commentNo ? null : item.commentNo))}>{showReplyForm === item.commentNo ? '닫기' : '대댓글'}</button>
                            <div>
                                <ReplyItem commentNo={item.commentNo} apiUrl={apiUrl} showReplyForm={showReplyForm === item.commentNo} />
                            </div>
                        </div>
                    ))
                ) : (
                    <p>댓글을 불러오는 중입니다...</p>
                )}
            </div>
            <hr />
            <div>
                <form onSubmit={handleSubmit}>
                    <textarea placeholder="댓글작성" id="content" value={formComment.content} onChange={handleContentChange} />
                    <button type="submit">등록</button>
                </form>
            </div>
        </div>
    );
}

export default CommentItem;
