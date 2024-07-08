import { useEffect, useState } from "react";
import axios from "axios";

const useFetchData = (apiUrl) => {
    const [entities, setEntities] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(apiUrl);
            console.log(apiUrl + " 데이터 불러오기 성공");
            console.log(response.data);
            setEntities(response.data);
        } catch (error) {
            console.error("데이터 불러오기 에러:", error);
            setError(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [apiUrl]);

    return { entities, setEntities, fetchData, error };
};

export default useFetchData;
