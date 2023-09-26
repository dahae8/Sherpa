import React from "react";
import styled from "styled-components";
import MediaCard from "../atoms/MediaCard";

const PageContainer = styled.div``;
const CardGridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 50px;
  justify-items: center;
  align-items: center;
  margin: 3px;
`;

function MediaCardList() {
  return (
    <PageContainer>
      <div className="App">
        <CardGridBox>
          <MediaCard></MediaCard>
          <MediaCard></MediaCard>
          <MediaCard></MediaCard>
          <MediaCard></MediaCard>
        </CardGridBox>
      </div>
    </PageContainer>
  );
}

export default MediaCardList;
