import React from "react";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { Flex, Rate } from "antd";
import "../../../styles/Main/Review/ReviewWrite.css";

const customIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

function ReviewWrite() {
  return (
    <div className="review_total_box">
      <form>
        <div class="review_register_title">
          시청하신 작품에 대한 리뷰를 남겨주세요
        </div>
        {/* 별점 */}
        <div className="review_stars_box">
          <Flex gap="middle" vertical>
            <Rate
              className="review_stars"
              defaultValue={3}
              character={({ index = 0 }) => customIcons[index + 1]}
            />
          </Flex>
        </div>

        <textarea class="content" placeholder="리뷰를 입력하세요"></textarea>
      </form>
      <div>
        <button className="review_btn">취소</button>
        <button className="review_btn">저장</button>
      </div>
    </div>
  );
}

export default ReviewWrite;
