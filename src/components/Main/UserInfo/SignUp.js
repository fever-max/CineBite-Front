import React, { useRef, useState } from 'react';
import '../../../styles/Main/UserInfo/SignUp.css';
import InputBox from './InputBox';
import ResponseCode from '../../../utils/userInfo/ResponseCode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {

    const navigate = useNavigate();

    const userIdRef = useRef(null);
    const userNickRef = useRef(null);
    const userPwdRef = useRef(null);
    const userPwdCheckRef = useRef(null);
    const userEmailRef = useRef(null);
    const certificationNumberRef = useRef(null);

    const [userId, setUserId] = useState('');
    const [userNick, setUserNick] = useState('');
    const [userPwd, setUserPwd] = useState('');
    const [userPwdCheck, setUserPwdCheck] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [certificationNumber, setCertificationNumber] = useState('');

    const [isUserIdError, setUserIdError] = useState(false);
    const [isUserNickError, setUserNickError] = useState(false);
    const [isUserPwdError, setUserPwdError] = useState(false);
    const [isUserPwdCheckError, setUserPwdCheckError] = useState(false);
    const [isUserEmailError, setUserEmailError] = useState(false);
    const [isCertificationNumberError, setCertificationNumberError] = useState(false);

    const [userIdMessage, setUserIdMessage] = useState('');
    const [userNickMessage, setUserNickMessage] = useState('');
    const [userPwdMessage, setUserPwdMessage] = useState('');
    const [userPwdCheckMessage, setUserPwdCheckMessage] = useState('');
    const [userEmailMessage, setUserEmailMessage] = useState('');
    const [certificationNumberMessage, setCertificationNumberMessage] = useState('');

    const [isUserIdCheck, setUserIdCheck] = useState(false);
    const [isCertificationCheck, setCertificationCheck] = useState(false);

    const signUpButtonClass = userId && userNick && userPwd && userPwdCheck && userEmail && certificationNumber ? 'primary-button-lg' : 'disable-button-lg';

    // 패턴
    const userEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const userPwdPattern = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,13}$/; // '!@#$%^&*'
    const userIdPattern = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{5,10}$/;

    // onChange
    const onUserIdChangeHandler = (event) => {
        const { value } = event.target;
        setUserId(value);
        setUserIdMessage('');
        setUserIdCheck(false);
        if (!userIdPattern.test(value)) {
            setUserIdError(true);
            setUserIdMessage('문자, 숫자 포함 5~10자리로 입력해주세요.');
        } else {
            setUserIdError(false);
            setUserIdMessage('');
        }
    };

    const onUserNickChangeHandler = (event) => {
        const { value } = event.target;
        setUserNick(value);
        setUserNickMessage('');
    };

    const onUserPwdChangeHandler = (event) => {
        const { value } = event.target;
        setUserPwd(value);
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
        setUserPwdCheck(value);
        if (!userPwdPattern.test(value)) {
            setUserPwdError(true);
            setUserPwdMessage('영문, 숫자 포함 8자 이상으로 입력해주세요.');
        } else {
            setUserPwdError(false);
            setUserPwdMessage('');
        }
    };

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

    const onCertificationNumberChangeHandler = (event) => {
        const { value } = event.target;
        setCertificationNumber(value);
        setCertificationNumberMessage('');
        setCertificationCheck(false);
    };

    // onButtonClick
    // 아이디 중복 확인
    const onUserIdButtonClickHandler = async () => {
        if (!userId) return;
        if (isUserIdError) return;
        setUserIdMessage('');
        console.log('userId:', userId);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/auth/id-check`, {
                userId: userId,
            });
            userIdCheckResponse(response.data);
        } catch (error) {
            console.error('ID 중복 확인 요청 실패:', error.response ? error.response.data : error.message);
            setUserIdError(true);
            setUserIdMessage('이미 사용중인 아이디입니다.');
            setUserIdCheck(false);
        }
    };

    const userIdCheckResponse = (responseBody) => {
        if (!responseBody) return;
        const { code } = responseBody;
        if (code === ResponseCode.VALIDATION_FAIL) alert('아이디를 입력하세요.');
        if (code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');
        if (code !== ResponseCode.SUCCESS) return;
        setUserIdError(false);
        setUserIdMessage('사용 가능한 아이디입니다.');
        setUserIdCheck(true);
    };
    const onUserEmailButtonClickHandler = async () => {
        if (!isUserIdCheck) {
            setUserEmailMessage('아이디 중복 확인은 필수입니다.');
            return;
        }
        if (!userId || !userEmail) return;
        if (isUserEmailError) return;
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/auth/email-check`, {
                userId: userId, userEmail: userEmail,
            });
        } catch (error) {
            console.error('이메일 중복 확인 실패:', error.response ? error.response.data : error.message);
            setUserEmailError(true);
            setUserEmailMessage('이미 사용중인 이메일입니다.');
            return;
        }
        setUserEmailMessage('인증번호가 전송되었습니다.');
        console.log('userEmail:', userEmail);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/auth/email-certification`, {
                userId: userId, userEmail: userEmail,
            });
            userEmailCertificationResponse(response.data);
            setUserEmailError(false);
        } catch (error) {
            console.error('이메일 전송 실패:', error.response ? error.response.data : error.message);
            setUserEmailError(true);
            setUserEmailMessage('이메일 전송 실패.');
        }
    };

    const userEmailCertificationResponse = (responseBody) => {
        if (!responseBody) return;
        const { code } = responseBody;
        if (code === ResponseCode.VALIDATION_FAIL) alert('아이디와 이메일을 모두 입력하세요.');
        if (code === ResponseCode.DUPLICATION_ID) {
            setUserIdError(true);
            setUserIdMessage('이미 사용중인 아이디입니다.');
            setUserIdCheck(false);
        }
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
        if (!userId || !userEmail || !certificationNumber) return;
        console.log('certificationNumber:', certificationNumber);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/auth/check-certification`, {
                userId: userId, userEmail: userEmail, certificationNumber: certificationNumber,
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
        if (code === ResponseCode.VALIDATION_FAIL) alert('아이디, 이메일, 인증번호를 모두 입력하세요.');
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

    // 회원가입
    const onSignUpClickHandler = async () => {
        if (!userId || !userNick || !userPwd || !userPwdCheck || !userEmail || !certificationNumber) {
            alert("모든 필드를 입력하세요.");
            return;
        }
        if (isUserIdError || isUserNickError || isUserPwdError || isUserPwdCheckError || isUserEmailError || isCertificationNumberError) {
            alert("잘못된 입력이 있습니다.");
            return;
        }
        if (userPwd !== userPwdCheck) {
            setUserPwdCheckError(true);
            setUserPwdCheckMessage('비밀번호가 일치하지않습니다.');
            return;
        }
        if (!isUserIdCheck) {
            setUserIdError(true);
            alert('아이디 중복 확인은 필수입니다.');
            return;
        }
        if (!isCertificationCheck) {
            setCertificationNumberError(true);
            alert('이메일 인증은 필수입니다.');
            return;
        }
        console.log('입력 정보:', '1', userId, '2', userNick, '3', userPwd, '4', userEmail, '5', certificationNumber);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/auth/join`, {
                userId: userId, 
                userNick: userNick, 
                userPwd: userPwd,
                userEmail: userEmail, 
                certificationNumber: certificationNumber, 
            });
            signUpResponse(response.data);
        } catch (error) {
            console.error('회원가입 실패:', error.response ? error.response.data : error.message);
            alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
        window.location.href = '/';
    };

    const signUpResponse = (responseBody) => {
        if (!responseBody) return;
        const { code } = responseBody;
        if (code === ResponseCode.VALIDATION_FAIL) alert('모든 값을 입력하세요.');
        if (code === ResponseCode.DUPLICATION_ID) {
            setUserIdError(true);
            setUserIdMessage('이미 사용중인 아이디입니다.');
            setUserIdCheck(false);
        }
        if (code === ResponseCode.CERTIFICATION_FAIL) {
            setCertificationNumberError(true);
            setCertificationNumberMessage('인증번호가 일치하지않습니다.');
            setCertificationCheck(false);
        }
        if (code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 오류입니다.');
        if (code !== ResponseCode.SUCCESS) return;
    };

    const onSignInButtonClickHandler = () => {
        navigate('/login');
    };

    // OAuth 로그인
    const onSnsSignInButtonClickHandler = (type) => {
        window.location.href = `${process.env.REACT_APP_API_URL}/api/v1/auth/oauth2/${type}`;
    };

    // key down
    const onKeyPressHandler = (event) => {
        if (event.key === 'Enter') {
            onSignUpClickHandler();
        }
    };

    return (
    
    <div id='sign-up-wrapper'>
        <div className='sign-up-image'></div>
            <div className='sign-up-container'>
                <div className='sign-up-box'>
                <div className='sign-up-title'>{'CineBite 회원가입'}</div>
                <div className='sign-up-content-box'>
                    <div className='sign-up-content-sns-sign-in-box'>
                        <div className='sign-up-content-sns-sign-in-title'>{'SNS 회원가입'}</div>
                        <div className='sign-up-content-sns-sign-in-button-box'>
                            <div className='google-sign-in-button' onClick={() => onSnsSignInButtonClickHandler('google')}></div>
                            <div className='kakao-sign-in-button' onClick={() => onSnsSignInButtonClickHandler('kakao')} ></div>
                            <div className='naver-sign-in-button' onClick={() => onSnsSignInButtonClickHandler('naver')} ></div>
                        </div>
                    </div>
                    <div className='sign-up-content-divider'></div>
                    <div className='sign-up-content-input-box'>
                        <InputBox ref={userIdRef} title='아이디' placeholder='아이디를 입력해주세요.' type='text' value={userId} onChange={onUserIdChangeHandler} isErrorMessage={isUserIdError} message={userIdMessage} buttonTitle='중복 확인' onButtonClick={onUserIdButtonClickHandler}/>

                        <InputBox ref={userNickRef} title='닉네임' placeholder='닉네임을 입력해주세요.' type='text' value={userNick} onChange={onUserNickChangeHandler} isErrorMessage={isUserNickError} message={userNickMessage}/>

                        <InputBox ref={userPwdRef} title='비밀번호' placeholder='비밀번호를 입력해주세요.' type='password' value={userPwd} onChange={onUserPwdChangeHandler} isErrorMessage={isUserPwdError} message={userPwdMessage}/>

                        <InputBox ref={userPwdCheckRef} title='비밀번호 확인' placeholder='비밀번호를 한 번 더 입력해주세요.' type='password' value={userPwdCheck} onChange={onUserPwdCheckChangeHandler} isErrorMessage={isUserPwdCheckError} message={userPwdCheckMessage}/>

                        <InputBox ref={userEmailRef} title='이메일' placeholder='이메일 주소를 입력해주세요.' type='text' value={userEmail} onChange={onUserEmailChangeHandler} isErrorMessage={isUserEmailError} message={userEmailMessage} buttonTitle='이메일 인증' onButtonClick={onUserEmailButtonClickHandler}/>
                        
                        <InputBox ref={certificationNumberRef} title='인증번호' placeholder='인증번호 4자리를 입력해주세요.' type='text' value={certificationNumber} onChange={onCertificationNumberChangeHandler} isErrorMessage={isCertificationNumberError} message={certificationNumberMessage} buttonTitle='인증 확인' onButtonClick={onCertificationNumberButtonClickHandler}/>
                    </div>
                    <div className='sign-up-content-button-box'>
                    <div className={`${signUpButtonClass} full-width`} onClick={onSignUpClickHandler} onKeyDown={onKeyPressHandler}>{'회원가입'}</div>
                    <div className='text-link-lg full-width' onClick={onSignInButtonClickHandler}>{'로그인'}</div>
                </div>
            </div>
            </div>
        </div>
    </div>
    );
}

export default SignUp;