import React, { useCallback, useEffect, useRef, useState } from 'react';
import { modifyUserData, useUserData } from '../../../utils/userInfo/api/userApi';
import '../../../styles/Main/MyPage/MyPage.css';
import { getAccessToken } from '../../../utils/userInfo/api/reissue';
import { useNavigate } from 'react-router-dom';
import { FaGear } from "react-icons/fa6";

function MyPage() {
    const { userData, loading } = useUserData();
    const inputRef = useRef(null);
    const [currentProfileImage, setCurrentProfileImage] = useState("https://i.pinimg.com/564x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg");
    const [changeProfileImage, setChangeProfileImage] = useState(null);
    const [isDelete, setIsDelete] = useState(false);
    const [fileName, setFileName] = useState('');

    useEffect(() => {
        if (userData) {
            setCurrentProfileImage(userData.userProfileImg ? `${process.env.REACT_APP_API_URL}/${userData.userProfileImg}` : "https://i.pinimg.com/564x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg");
        }
    }, [userData]);

    console.log('currentProfileImage:', currentProfileImage);

    const onUploadImageButtonClick = useCallback(() => {
        if (!inputRef.current) {
            return;
        }
        inputRef.current.click();
    }, []);

    const handleImageChange = () => {
        const file = inputRef.current.files[0];
        if (file) {
            setFileName(file.name); // 파일명 설정
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setChangeProfileImage(reader.result);
                setCurrentProfileImage(reader.result);
                setIsDelete(false);
            };
        }
    };

    const deleteButtonClick = () => {
        setCurrentProfileImage(null);
        setChangeProfileImage(null);
        setIsDelete(true);
        setFileName(''); // 파일명 초기화
    };

    const handleModify = async () => {
        const file = inputRef.current.files[0];
        const formData = new FormData();
        formData.append('userNick', userData.userNick);
        if (!isDelete && file) {
            formData.append("userProfileFile", file);
        }
        formData.append('isDelete', String(isDelete));

        try {
            await modifyUserData(formData);
            window.location.reload();
        } catch (error) {
            if (error.response?.data === 'access token expired') {
                try {
                    await getAccessToken();
                    handleModify();
                } catch (error) {
                    console.error('토큰 갱신 실패:', error);
                }
            } else {
                console.error('사용자 정보 수정 실패:', error);
            }
        }
    };

    const navigate = useNavigate();
    
    const handleUserEdit = () => {
        if (!userData.userPwd) {
            navigate('/modifyUser');
        } else {
            navigate('/checkUserPwd');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='user-info'>
            <div className='img-modify'>
                <div className="user-img-wrapper">
                    <div className='img-wrapper-inner' onClick={onUploadImageButtonClick}>
                        <img 
                            className="user-img"
                            alt="profile"
                            src={changeProfileImage ? changeProfileImage : (currentProfileImage ? currentProfileImage : "https://i.pinimg.com/564x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg")} 
                        />
                        <div className="user-img-overlay" readOnly>편집</div>
                    </div>
                    <div className="modify-button" onClick={handleUserEdit}><FaGear size={32} /></div>
                </div><br/>
                <input 
                    ref={inputRef}
                    className="hidden"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange} 
                    style={{ display: 'none' }}
                />
                {fileName && <div>{fileName}</div>}
                <div className='img-box-body'>
                    <div className="img-box" onClick={handleModify}>
                        확인
                    </div>
                    <div className="img-box" onClick={deleteButtonClick}>
                        초기화
                    </div>
                </div>
            </div>
            <div className='ect'>

            </div>
        </div>
    );
}

export default MyPage;