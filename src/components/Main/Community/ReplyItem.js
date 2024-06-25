import React, { useEffect, useState } from 'react';
import useFetchData from '../../../hooks/useFetchData';
import axios from 'axios';
import '../../../styles/Main/Community/ReplyItem.css';
import { useCurrentTime, getTimeAgo } from '../../../utils/TimeUtil';

function ReplyItem(props) {
    const { commentNo, apiUrl, showReplyForm } = props;
    const commentUrl = `${apiUrl}/board/comment/${commentNo}/reply`;
    const { entities, fetchData } = useFetchData(commentUrl);
    const currentTime = useCurrentTime();
    const [formReply, setFormReply] = useState({
        userId: 'test5',
        content: '',
    });

    const handleContentChange = (e) => {
        setFormReply({
            ...formReply,
            content: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('전송하는 대댓글: ' + formReply.content);
            const response = await axios.post(`${apiUrl}/board/comment/${commentNo}/reply`, formReply);
            console.log('댓글 저장 성공: ', response.data);
            fetchData();
            setFormReply({
                // Clear the textarea input
                ...formReply,
                content: '',
            });
        } catch (error) {
            console.error('댓글 저장 에러: ', error);
        }
    };

    return (
        <div>
            {entities.slice().map((item) => (
                <div key={item.replyNo} className="reply_div">
                    <div className="reply_title">
                        <div className="reply_id">{item.userId}</div>
                        <div className="reply_date">{getTimeAgo(currentTime, item.date)}</div>
                    </div>
                    <div>{item.content}</div>
                </div>
            ))}
            {showReplyForm && (
                <div className="reply_input">
                    <form onSubmit={handleSubmit}>
                        <textarea placeholder="대댓글 작성" id="content" value={formReply.content} onChange={handleContentChange} />
                        <button type="submit">등록</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ReplyItem;
