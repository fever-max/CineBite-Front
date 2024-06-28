import React, { useState } from 'react';
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
    const [replyEdit, setReplyEdit] = useState({
        replyNo: null,
        userId: '',
        content: '',
    });

    const handleContentChange = (e) => {
        setReplyEdit({
            ...replyEdit,
            content: e.target.value,
        });
    };

    const handleReplyChange = (e) => {
        setFormReply({
            ...formReply,
            content: e.target.value,
        });
    };

    const handleEditClick = (replyNo, content, userId) => {
        setReplyEdit({
            replyNo: replyNo,
            content: content,
            userId: userId,
        });
    };

    const handleCancelEdit = () => {
        setReplyEdit({
            replyNo: null,
            userId: '',
            content: '',
        });
    };

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`${apiUrl}/board/comment/${commentNo}/reply/${replyEdit.replyNo}`, replyEdit);
            console.log('대댓글 수정 성공: ', response.data);
            setReplyEdit({
                replyNo: null,
                content: '',
                userId: '',
            });
            fetchData();
        } catch (error) {
            console.error('대댓글 수정 에러: ', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('전송하는 대댓글: ' + formReply.content);
            const response = await axios.post(`${apiUrl}/board/comment/${commentNo}/reply`, formReply);
            console.log('대댓글 저장 성공: ', response.data);
            fetchData();
            setFormReply({
                ...formReply,
                content: '',
            });
        } catch (error) {
            console.error('대댓글 저장 에러: ', error);
        }
    };

    return (
        <div>
            {entities.map((item) => (
                <div key={item.replyNo} className="reply_div">
                    <div className="reply_title">
                        <div className="reply_id">{item.userId}</div>
                        <div className="reply_date">{item.updateDate ? <>{getTimeAgo(currentTime, item.updateDate)} (수정)</> : getTimeAgo(currentTime, item.createDate)}</div>
                    </div>
                    {replyEdit.replyNo === item.replyNo ? (
                        <form onSubmit={handleSubmitEdit}>
                            <textarea placeholder="대댓글 수정" id="content" value={replyEdit.content} onChange={handleContentChange} />
                            <button type="submit">수정 완료</button>
                            <button type="button" onClick={handleCancelEdit}>
                                취소
                            </button>
                        </form>
                    ) : (
                        <div>
                            {item.content}
                            <button onClick={() => handleEditClick(item.replyNo, item.content, item.userId)}>수정</button>
                        </div>
                    )}
                </div>
            ))}
            {showReplyForm && (
                <div className="reply_input">
                    <form onSubmit={handleSubmit}>
                        <textarea placeholder="대댓글 작성" id="content" value={formReply.content} onChange={handleReplyChange} />
                        <button type="submit">등록</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ReplyItem;
