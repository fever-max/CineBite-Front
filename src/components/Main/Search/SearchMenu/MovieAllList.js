import React from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../../styles/Main/Search/MovieAllList.css";
import { ArrowButton } from "../../../../utils/ArrowButton";
import { SliderContainer } from "../../../../styles/Main/Home/SliderContainer";

const MovieAllList = ({ movieAllData }) => {
  const ImageUrl = process.env.REACT_APP_IMAGE_URL;
  const showMaxCnt = 4;
  const arr = Array.from(new Array(3));

  const settings = {
    dots: false,
    infinite: arr.length > showMaxCnt,
    speed: 500,
    slidesToShow: showMaxCnt,
    slidesToScroll: showMaxCnt,
    nextArrow: <ArrowButton direction="next" />,
    prevArrow: <ArrowButton direction="prev" />,
  };

  return (
    <SliderContainer>
      <div className="today-main">
        <div className="today-main-sub">
          <div className="today-title">
            <div className="today-title-sub">
              <h2>[영화] 검색 결과</h2>
              <span> 검색결과가 없습니다</span>
              <h2>더 많은 작품 보러갈까요?</h2>
            </div>
            <span className="view-all-link">모두 보기</span>
            <div className="view-all-link-chevron">
              <FaChevronRight />
            </div>
          </div>
          <div className="today-recomend">
            <Slider {...settings}>
              {movieAllData.map((item, index) => (
                <Link to={`/movie/${item.id}`} key={index}>
                  <div className="today-image">
                    <img
                      src={`${ImageUrl}${item.poster_path}`}
                      alt={item.title}
                    />
                    <div className="today-rating">{item.rating}%</div>
                  </div>
                </Link>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </SliderContainer>
  );
};

export default MovieAllList;
