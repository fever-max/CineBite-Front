import React, { useState } from "react";
import axios from "axios";
import InputBox from "./InputBox";
import '../../../styles/Main/UserInfo/Find.css';

function FindId() {
    const [userEmail, setUserEmail] = useState("");
    const [userEmailMessage, setUserEmailMessage] = useState("");
    const [userEmailError, setUserEmailError] = useState(false);

    const userEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const onUserEmailChangeHandler = (event) => {
        const { value } = event.target;
        setUserEmail(value);
        if (!userEmailPattern.test(value)) {
            setUserEmailError(true);
            setUserEmailMessage('올바른 이메일 형식이 아닙니다.');
        } else {
            setUserEmailError(false);
            setUserEmailMessage('');
        }
    };

    const sendCertificationEmail = async (e) => {
        e.preventDefault();
        if(!userEmail) {
            alert('이메일을 입력해주세요.');
            return;
        }
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/auth/findUserId`, { 
                userEmail:userEmail 
            });
            if (response.status===200) {
                setUserEmailMessage("아이디가 이메일로 전송되었습니다.");
            } 
        } catch (error) {
            if(error.response.status===400){
                setUserEmailError(error.response.data.code);
            } else{
                setUserEmailError("서버 오류가 발생했습니다. 다시 시도해주세요.");
            }
        }
    };

    // Key down
    const onKeyDownHandler = (event) => {
        if(event.key !== 'Enter') return;
        sendCertificationEmail(event);
    };

    // 버튼
    const signInButtonClass = userEmail ? 'primary-button-lg' : 'disable-button-lg';

    return (
        <div id='find-wrapper'>
            <div className='find-container'>
                <div className='find-box'>
                <div className='find-content-box'>
                    <div className='find-content-input-box'>
                        <div className='find-content-input-box'>
                            <InputBox title='이메일' id="userEmail" name="userEmail" autoComplete="userEmail" required placeholder='이메일을 입력해주세요.' type='text' value={userEmail} onChange={onUserEmailChangeHandler} onKeyDown={onKeyDownHandler} isErrorMessage={userEmailError} message={userEmailMessage} />     
                        </div>
                        <div className='find-content-button-box'>
                            <div className={`${signInButtonClass} full-width`}  onClick={sendCertificationEmail}>아이디 찾기</div>
                            <div class="link-container">
                                <div className='text-link-lg'><a href="/findPwd">비밀번호 찾기</a></div>
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

export default FindId;
