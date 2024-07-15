import React, { useState } from "react";
import { Tabs } from "antd";
import "../../../../styles/Main/Search/SearchMenu.css";
import SearchCommunity from "./SearchCommunity";
import SearchMovie from "./SearchMovie";
import SearchTotal from "./SearchTotal";
import SearchNone from "./SearchNone";
const SearchMenu = ({
  movieData,
  communityTitle,
  communityContent,
  communityUserId,
  tagData,
  submittedKeyword,
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
              />
              ) : (
            </>
          ) : (
            <>
              <p>오늘의 추천영화</p>
            </>
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
