import React, { useState } from 'react';
import axios from 'axios';
import InputBox from './InputBox';
import '../../../styles/Main/UserInfo/Find.css';

function FindPwd() {
    const [userEmail, setUserEmail] = useState('');
    const [userId, setUserId] = useState('');
    const [userEmailMessage, setUserEmailMessage] = useState('');
    const [userIdMessage, setUserIdMessage] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [userIdError, setUserIdError] = useState(false);

    const userIdPattern = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{5,10}$/;
    const userEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const onEmailChangeHandler = (event) => {
        const { value } = event.target;
        setUserEmail(value);
        if (!userEmailPattern.test(value)) {
            setEmailError(true);
            setUserEmailMessage('올바른 이메일 형식이 아닙니다.');
        } else {
            setEmailError(false);
            setUserEmailMessage('');
        }
    };

    const onUserIdChangeHandler = (e) => {
        const { value } = e.target;
        setUserId(value);
        setUserIdMessage('');
        if (!userIdPattern.test(value)) {
            setUserIdError(true);
            setUserIdMessage('문자, 숫자 포함 5~10자리로 입력해주세요.');
        } else {
            setUserIdError(false);
            setUserIdMessage('');
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!userId || !userEmail) {
            alert('이메일과 아이디를 입력해주세요.');
            return;
        }
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/auth/findUserPwd`, {
                userId: userId,
                userEmail: userEmail
            });
            if (response.status === 200) {
                setUserEmailMessage('임시 비밀번호가 이메일로 전송되었습니다.');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setEmailError(true);
                alert('아이디 혹은 비밀번호가 틀렸습니다.');
            } else {
                setEmailError(true);
                alert('서버 오류가 발생했습니다. 다시 시도해주세요.');
            }
        }
    };

    // Key down
    const onKeyDownHandler = (event) => {
        if(event.key !== 'Enter') return;
        handleResetPassword(event);
    };

    // 버튼
    const resetButtonClass = userEmail && userId ? 'primary-button-lg' : 'disable-button-lg';

    return (
        <div id='find-wrapper'>
            <div className='find-container'>
                <div className='find-box'>
                <div className='find-content-box'>
                    <div className='find-content-input-box'>
                        <div className='find-content-input-box'>
                            <InputBox title='아이디' id="userId" name="userId" autoComplete="userId" required placeholder='아이디를 입력해주세요.' type='text' value={userId} onChange={onUserIdChangeHandler} isErrorMessage={userIdError} message={userIdMessage} />
                            <InputBox title='이메일' id="userEmail" name="userEmail" autoComplete="userEmail" required placeholder='이메일을 입력해주세요.' type='text' value={userEmail} onChange={onEmailChangeHandler} onKeyDown={onKeyDownHandler} isErrorMessage={emailError} message={userEmailMessage} />
                        </div>
                        <div className='find-content-button-box'>
                            <div className={`${resetButtonClass} full-width`} onClick={handleResetPassword}>비밀번호 찾기</div>
                            <div className='link-container'>
                                <div className='text-link-lg'><a href="/findId">아이디 찾기</a></div>
                                <div className='text-link-lg'><a href="/login">로그인</a></div>
                                <div className='text-link-lg'><a href="/join">회원가입</a></div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default FindPwd;
