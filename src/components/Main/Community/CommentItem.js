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
  const [formEdit, setFormEdit] = useState({
    commentNo: null,
    userId: '',
    content: '',
  });

  const handleContentChange = (e) => {
    setFormEdit({
      ...formEdit,
      content: e.target.value,
    });
  };

  const handleCommentChange = (e) => {
    setFormComment({
      ...formComment,
      content: e.target.value,
    });
  };

  const handleEditClick = (commentNo, content, userId) => {
    setFormEdit({
      commentNo: commentNo,
      content: content,
      userId: userId,
    });
  };

  const handleCancelEdit = () => {
    setFormEdit({
      commentNo: null,
      userId: '',
      content: '',
    });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`${apiUrl}/board/post/${postNo}/comment/${formEdit.commentNo}`, formEdit);
      console.log('댓글 수정 성공: ', response.data);
      setFormEdit({
        commentNo: null,
        content: '',
        userId: '',
      });
      fetchData();
    } catch (error) {
      console.error('댓글 수정 에러: ', error);
    }
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

  const handleDeleteClick = async (commentNo) => {
    const isConfirmed = window.confirm('댓글을 삭제하시겠습니까?');
    if (isConfirmed) {
      try {
        const response = await axios.delete(`${apiUrl}/board/post/${postNo}/comment/${commentNo}`);
        console.log('댓글 삭제 성공: ', response.data);
        fetchData();
      } catch (error) {
        console.error('댓글 삭제 에러: ', error);
      }
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
                <div className="comment_date">{item.updateDate ? <>{getTimeAgo(currentTime, item.updateDate)} (수정)</> : getTimeAgo(currentTime, item.createDate)}</div>
              </div>
              {formEdit.commentNo === item.commentNo ? (
                <form onSubmit={handleSubmitEdit}>
                  <textarea placeholder="댓글 수정" id="content" value={formEdit.content} onChange={handleContentChange} wrap="hard" />
                  <button type="submit">수정 완료</button>
                  <button type="button" onClick={handleCancelEdit}>
                    취소
                  </button>
                </form>
              ) : (
                <div>
                  <div className="comment_content">{item.content.replace(/<br>/g, '\n')}</div>
                  <button onClick={() => handleEditClick(item.commentNo, item.content, item.userId)}>수정</button>
                  <button onClick={() => handleDeleteClick(item.commentNo)}>삭제</button>
                </div>
              )}
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
          <textarea placeholder="댓글작성" id="content" value={formComment.content} onChange={handleCommentChange} wrap="hard" />
          <button type="submit">등록</button>
        </form>
      </div>
    </div>
  );
}

export default CommentItem;
