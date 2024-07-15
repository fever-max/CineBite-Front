import React from "react";
import CommunityList from "../Community/CoummunityList";
import CommunityTag from "../Community/CoummunityTag";

const SearchCommunity = ({
  communityTitle,
  communityContent,
  communityUserId,
  tagData,
}) => {
  return (
    <div>
      <CommunityTag tagData={tagData} />
      <CommunityList
        communityTitle={communityTitle}
        communityContent={communityContent}
        communityUserId={communityUserId}
      />
    </div>
  );
};

export default SearchCommunity;
