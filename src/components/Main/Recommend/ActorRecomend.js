import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ActorRecomend = ({movie}) => {
    const [actorList, setActorList] = useState([]);
    const url = process.env.REACT_APP_API_URL;
    const getActorList=async(actorName)=>{
        try {
            const response = await axios.post(`${url}/movie/actorList`, { "name": actorName });
            console.log('actorName',actorName);
            console.log('서버 응답:', response.data);
            setActorList(response.data);
        } catch (error) {
            console.error('서버 요청 오류:', error);
        }
    }
    useEffect(()=>{
        getActorList();
    },[movie])
    
    return (
        <div>
            
        </div>
    );
};
export default ActorRecomend;