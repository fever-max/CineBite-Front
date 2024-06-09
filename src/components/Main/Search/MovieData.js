import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import useFetchData from '../../../hooks/useFetchData';

const MovieData = () => {
 
    //hook 사용
    const apiUrl = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=80f6f10f4bb8241970963df19083f374&targetDt=20240607`;
    const { entities, fetchData } = useFetchData(apiUrl);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('API 응답:', entities);
        if (entities.movieListResult && entities.movieListResult.movieList) {
            const filteredMovies = filterMovies(entities.movieListResult.movieList);
            setMovies(filteredMovies);
            setLoading(false);
        }
        saveMovies();
    }, [entities]);
    
    // entities.movieListResult.movieList가 정의되어 있는 경우에만 호출되도록 filterMovies 함수를 정의
    const filterMovies = (movieList) => {
        return movieList.filter(movie => {
            // 정보가 있는 경우
            if (movie.genreAlt) {
                // 성인물(에로) 필터링
                return movie.genreAlt !== '성인물(에로)';
            }
            // 정보가 없는 경우
            return true;
        });
    };


    // const filterMovies = entities.movieListResult.movieList.filter(movie => {
        
    //     // 등급 정보가 있는 경우
    //     if (movie.movieGrade) {
    //         // 19금 필터링
    //         return movie.movieGrade !== '19금';
    //     }
    //     // 등급 정보가 없는 경우
    //     return true;
    // });


    const saveMovies = async () => {
        try {
            // DB에서 가져온 영화 정보
            const moviesData = movies.map(movie => ({
                movieCd: movie.movieCd,
                movieNm: movie.movieNm,
                openDt: movie.openDt
            }));
    
            // DB에서 가져온 영화 정보 서버로 전송
            const saveResponse = await axios.post('http://localhost:4000/movies/save', moviesData);
            
            if (saveResponse.status === 200) {
                console.log('영화 정보 저장 완료!');
            } else {
                console.error('영화 정보 저장 실패!');
            }
        } catch (error) {
            console.error('영화 정보 저장 중 오류 발생!', error);
        }
    };


    
    return (
        <div>
            {loading ? (
                <p>Loading...</p> // 로딩 중일 때 보여줄 메시지
            ) : (
                <ul>
                    {movies.map((movie) => (
                        <li key={movie.movieCd}>
                            {movie.movieNm} ({movie.openDt})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MovieData;
