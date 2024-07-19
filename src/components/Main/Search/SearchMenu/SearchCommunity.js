import React from "react";
import CommunityList from "../Community/CoummunityList";
import CommunityTag from "../Community/CoummunityTag";

const SearchCommunity = ({
  communityTitle,
  communityContent,
  communityUserId,
  tagData,
  submittedKeyword,
}) => {
  return (
    <div>
      <CommunityTag tagData={tagData} />
      <CommunityList
        communityTitle={communityTitle}
        communityContent={communityContent}
        communityUserId={communityUserId}
        submittedKeyword={submittedKeyword}
      />
    </div>
  );
};

export default SearchCommunity;
