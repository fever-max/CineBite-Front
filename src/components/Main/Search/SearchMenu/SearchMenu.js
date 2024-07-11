import React, { useState } from "react";
import { Tabs } from "antd";
import "../../../../styles/Main/Search/SearchMenu.css";
import SearchCommunity from "./SearchCommunity";
import SearchMovie from "./SearchMovie";
import SearchTotal from "./SearchTotal";

const SearchMenu = ({ movieData }) => {
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
        {/* Tabs.TabPane: ant-design 라이브러리 */}
        <Tabs.TabPane tab="통합" key="1">
          <SearchTotal />
        </Tabs.TabPane>
        <Tabs.TabPane tab="작품" key="2">
          <SearchMovie movieData={movieData} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="커뮤니티" key="3">
          <SearchCommunity />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default SearchMenu;
