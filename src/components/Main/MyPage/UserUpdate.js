import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useUserData } from '../../../utils/userInfo/api/userApi';
import { Navigate } from 'react-router-dom';
import InputBox from '../UserInfo/InputBox';
import ResponseCode from '../../../utils/userInfo/ResponseCode';
import '../../../styles/Main/MyPage/UserUpdate.css'

const UserUpdate = () => {

    const { userData, loading, isLogin } = useUserData();

    const [userInfo, setUserInfo] = useState({
        userEmail: '',
        certificationNumber: '',
        userId: '',
        userNick: '',
        userPwd: '',
        userPwdCheck: '',
        userRole: '',
        userType: '',
    });

    useEffect(() => {
        if (userData) {
            setUserInfo({
                userEmail: userData.userEmail || '',
                certificationNumber: '',
                userId: userData.userId || '',
                userNick: userData.userNick || '',
                userPwd: '',
                userPwdCheck: ''
            });
        } else {
            setUserInfo({
                userEmail: '',
                certificationNumber: '',
                userId: '',
                userNick: '',
                userPwd: '',
                userPwdCheck: ''
            });
        }
    }, [userData]);

    const userNickRef = useRef(null);
    const userPwdRef = useRef(null);
    const userPwdCheckRef = useRef(null);
    const userEmailRef = useRef(null);
    const certificationNumberRef = useRef(null);

    const [isUserPwdError, setUserPwdError] = useState(false);
    const [isUserPwdCheckError, setUserPwdCheckError] = useState(false);
    const [isUserEmailError, setUserEmailError] = useState(false);
    const [isCertificationNumberError, setCertificationNumberError] = useState(false);

    const [userNickMessage, setUserNickMessage] = useState('');
    const [userPwdMessage, setUserPwdMessage] = useState('');
    const [userPwdCheckMessage, setUserPwdCheckMessage] = useState('');
    const [userEmailMessage, setUserEmailMessage] = useState('');
    const [certificationNumberMessage, setCertificationNumberMessage] = useState('');

    const [isCertificationCheck, setCertificationCheck] = useState(false);

    // 패턴
    const userEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const userPwdPattern = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,13}$/; // '!@#$%^&*'

    // onChange
    const onUserNickChangeHandler = (event) => {
        const { value } = event.target;
        setUserInfo({ ...userInfo, userNick: value });
        setUserNickMessage('');
    };

    const onUserPwdChangeHandler = (event) => {
        const { value } = event.target;
        setUserInfo({ ...userInfo, userPwd: value });
        if (!userPwdPattern.test(value)) {
            setUserPwdError(true);
            setUserPwdMessage('영문, 숫자 포함 8자 이상으로 입력해주세요.');
        } else {
            setUserPwdError(false);
            setUserPwdMessage('');
        }
    };

    const onUserPwdCheckChangeHandler = (event) => {
        const { value } = event.target;
        setUserInfo({ ...userInfo, userPwdCheck: value });
        if (value !== userInfo.userPwd) {
            setUserPwdCheckError(true);
            setUserPwdCheckMessage('비밀번호가 일치하지 않습니다.');
        } else {
            setUserPwdCheckError(false);
            setUserPwdCheckMessage('');
        }
    };

    const onUserEmailChangeHandler = (event) => {
        const { value } = event.target;
        setUserInfo({ ...userInfo, userEmail: value });
        if (!userEmailPattern.test(value)) {
            setUserEmailError(true);
            setUserEmailMessage('올바른 이메일 형식이 아닙니다.');
        } else {
            setUserEmailError(false);
            setUserEmailMessage('');
        }
    };

    const onCertificationNumberChangeHandler = (event) => {
        const { value } = event.target;
        setUserInfo({ ...userInfo, certificationNumber: value });
        setCertificationNumberMessage('');
        setCertificationCheck(false);
    };

    // onButtonClick
    const onUserEmailButtonClickHandler = async () => {
        if (!userInfo.userEmail) return;
        if (isUserEmailError) return;
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/auth/email-check`, {
                userId: userInfo.userId, userEmail: userInfo.userEmail,
            });
        } catch (error) {
            console.log('이메일 중복 확인 요청:', { userId: userInfo.userId, userEmail: userInfo.userEmail });
            console.error('이메일 중복 확인 실패:', error.response ? error.response.data : error.message);
            setUserEmailError(true);
            setUserEmailMessage('이미 사용중인 이메일입니다.');
            return;
        }
        setUserEmailMessage('인증번호가 전송되었습니다.');
        console.log('userEmail:', userInfo.userEmail);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/auth/email-certification`, {
                userId: userInfo.userId, userEmail: userInfo.userEmail,
            });
            userEmailCertificationResponse(response.data);
            setUserEmailError(false);
        } catch (error) {
            console.log('이메일 전송 실패:', { userId: userInfo.userId, userEmail: userInfo.userEmail });
            console.error('이메일 전송 실패:', error.response ? error.response.data : error.message);
            setUserEmailError(true);
            setUserEmailMessage('이메일 전송 실패.');
        }
    };

    const userEmailCertificationResponse = (responseBody) => {
        if (!responseBody) return;
        const { code } = responseBody;
        if (code === ResponseCode.VALIDATION_FAIL) alert('이메일을 입력하세요.');
        if (code === ResponseCode.MAIL_FAIL) {
            setUserEmailError(true);
            setUserEmailMessage('이메일 전송에 실패했습니다.');
        }
        if (code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');
        if (code !== ResponseCode.SUCCESS) return;
        setUserEmailError(false);
    };

    // 인증번호 확인
    const onCertificationNumberButtonClickHandler = async () => {
        // if (!isCertificationCheck) {
        //     setCertificationNumberError(true);
        //     alert('이메일 인증은 필수입니다.');
        //     return;
        // }
        if (!userInfo.userEmail || !userInfo.certificationNumber) return;
        console.log('certificationNumber:', userInfo.certificationNumber);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/auth/check-certification`, {
                userId: userInfo.userId, userEmail: userInfo.userEmail, certificationNumber: userInfo.certificationNumber,
            });
            checkCertificationResponse(response.data);
        } catch (error) {
            console.error('이메일 번호 인증 실패:', error.response ? error.response.data : error.message);
            setCertificationNumberError(true);
            setCertificationNumberMessage('인증번호 확인 실패.');
        }
    };

    const checkCertificationResponse = (responseBody) => {
        if (!responseBody) return;
        const { code } = responseBody;
        if (code === ResponseCode.VALIDATION_FAIL) alert('이메일, 인증번호를 모두 입력하세요.');
        if (code === ResponseCode.CERTIFICATION_FAIL) {
            setCertificationNumberError(true);
            setCertificationNumberMessage('인증번호가 일치하지않습니다.');
            setCertificationCheck(false);
        }
        if (code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');
        if (code !== ResponseCode.SUCCESS) return;
        setCertificationNumberError(false);
        setCertificationNumberMessage('인증번호가 확인되었습니다.');
        setCertificationCheck(true);
    };

    const handleUpdate = async () => {
        if (userInfo.userPwd !== userInfo.userPwdCheck) {
            setUserPwdCheckError(true);
            setUserPwdCheckMessage('비밀번호가 일치하지않습니다.');
            return;
        }
        const formData = new FormData();
        formData.append('user', new Blob([JSON.stringify({
            userEmail: userInfo.userEmail,
            userId: userInfo.userId,
            userNick: userInfo.userNick,
            userPwd: userInfo.userPwd,
            userType: userInfo.userType,
            userRole: userInfo.userRole
        })], { type: 'application/json' }));
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/api/user/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('업데이트 성공');
            window.location.href = '/myPage';
        } catch (error) {
            alert('업데이트 실패');
        }
    };

    // key down
    const onKeyDownHandler = (event) => {
        if (event.key === 'Enter') {
            handleUpdate(event);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isLogin) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <div id='user-update-wrapper'>
                <div className='user-update-container'>
                    <div className='user-update-box'>
                        <div className='user-update-content-box'>
                            <div className='user-update-content-input-box'>
                                <InputBox readOnly type='hidden' value={userInfo.userId}/>
                                <InputBox title='아이디' readOnly type='text' placeholder={userInfo.userId}/>
                            
                                <InputBox ref={userEmailRef} title='이메일' placeholder={userInfo.userEmail} type='text' value={userInfo.userEmail} onChange={onUserEmailChangeHandler} isErrorMessage={isUserEmailError} message={userEmailMessage} buttonTitle='이메일 인증' onButtonClick={onUserEmailButtonClickHandler}/>

                                <InputBox ref={certificationNumberRef} title='인증번호' placeholder='인증번호 4자리를 입력해주세요.' type='text' value={userInfo.certificationNumber} onChange={onCertificationNumberChangeHandler} onKeyDown={onKeyDownHandler} isErrorMessage={isCertificationNumberError} message={certificationNumberMessage} buttonTitle='인증 확인' onButtonClick={onCertificationNumberButtonClickHandler}/>

                                <InputBox ref={userNickRef} title='닉네임' placeholder={userInfo.userNick} type='text' value={userInfo.userNick} onChange={onUserNickChangeHandler} message={userNickMessage}/>

                                <InputBox ref={userPwdRef} title='변경할 비밀번호' placeholder='비밀번호를 입력해주세요.' type='password' value={userInfo.userPwd} onChange={onUserPwdChangeHandler} isErrorMessage={isUserPwdError} message={userPwdMessage}/>

                                <InputBox ref={userPwdCheckRef} title='비밀번호 확인' placeholder='비밀번호를 한 번 더 입력해주세요.' type='password' value={userInfo.userPwdCheck} onChange={onUserPwdCheckChangeHandler} isErrorMessage={isUserPwdCheckError} message={userPwdCheckMessage}/>
                            </div>
                            <div className='user-update-content-button-box'>
                                <div className="primary-button-lg full-width" onClick={handleUpdate} onKeyDown={onKeyDownHandler}>{'정보 수정'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserUpdate;
