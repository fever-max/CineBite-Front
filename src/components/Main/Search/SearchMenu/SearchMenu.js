import React, { useState } from "react";
import { Tabs } from "antd";
import "../../../../styles/Main/Search/SearchMenu.css";
import SearchCommunity from "./SearchCommunity";
import SearchMovie from "./SearchMovie";
import SearchTotal from "./SearchTotal";
import SearchNone from "./SearchNone";
import MovieRanking from "../../Home/MovieRanking";

const SearchMenu = ({
  movieData,
  communityTitle,
  communityContent,
  communityUserId,
  tagData,
  submittedKeyword,
  movieAllData,
}) => {
  const [activeTab, setActiveTab] = useState("1");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        activeKey={activeTab}
        onChange={handleTabChange}
        className="ant-tabs"
        size="large"
        centered
      >
        <Tabs.TabPane tab="통합" key="1">
          {submittedKeyword ? (
            <>
              <SearchMovie
                movieData={movieData}
                submittedKeyword={submittedKeyword}
                movieAllData={movieAllData}
              />
              <SearchCommunity
                tagData={tagData}
                communityTitle={communityTitle}
                communityContent={communityContent}
                communityUserId={communityUserId}
                submittedKeyword={submittedKeyword}
              />
            </>
          ) : (
            <>
              <SearchNone />
              <SearchTotal
                communityTitle={communityTitle}
                communityContent={communityContent}
                communityUserId={communityUserId}
                tagData={tagData}
                submittedKeyword={submittedKeyword}
              />
            </>
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab="작품" key="2">
          {submittedKeyword ? (
            <>
              <SearchMovie
                movieData={movieData}
                submittedKeyword={submittedKeyword}
                movieAllData={movieAllData}
              />
            </>
          ) : (
            <div className="tab2">
              <div className="movie_ranking">
                <p>이런 영화는 어떠세요?</p>
                <MovieRanking />
              </div>
            </div>
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab="커뮤니티" key="3">
          {submittedKeyword ? (
            <>
              <SearchCommunity
                communityTitle={communityTitle}
                communityContent={communityContent}
                communityUserId={communityUserId}
                submittedKeyword={submittedKeyword}
                tagData={tagData}
              />
            </>
          ) : (
            <SearchTotal
              communityTitle={communityTitle}
              communityContent={communityContent}
              communityUserId={communityUserId}
              tagData={tagData}
              submittedKeyword={submittedKeyword}
            />
          )}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default SearchMenu;
