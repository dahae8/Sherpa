import React from "react";
import styled from "styled-components";
import KeywordCard from "../atoms/KeywordCard";

const PageContainer = styled.div``;
const CardGridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 50px;
  justify-items: center;
  align-items: center;
  margin: 3px;
`;

function KeywordCardList() {
  return (
    <PageContainer>
      <div className="App">
        <CardGridBox>
          <KeywordCard></KeywordCard>
          <KeywordCard></KeywordCard>
          <KeywordCard></KeywordCard>
          <KeywordCard></KeywordCard>
        </CardGridBox>
      </div>
    </PageContainer>
  );
}

export default KeywordCardList;
