import { useEffect, useState } from 'react';

export const useCurrentTime = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // 1분마다 갱신

        return () => clearInterval(interval);
    }, []);

    return currentTime;
};

export const getTimeAgo = (currentTime, createdDate) => {
    const difference = currentTime - new Date(createdDate);
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days}일 전`;
    } else if (hours > 0) {
        return `${hours}시간 전`;
    } else if (minutes > 0) {
        return `${minutes}분 전`;
    } else {
        return '지금';
    }
};
