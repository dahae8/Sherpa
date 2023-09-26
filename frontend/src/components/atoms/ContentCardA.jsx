import React from "react";
import styled from "styled-components";
import Chip from '@mui/material/Chip';

const Container = styled.div`
  border: 1px solid #b5b5b5;
  border-radius: 5px;
  padding: 20px;
  width: 315px;
  height: 250px;
  text-align: left;
`;
const TitleBox = styled.div`
  font-size: 24px;
  margin-top: 15px;
  margin-bottom: 30px;
  height: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DateBox = styled.div`
  color: #3C486B;
  `
const ChipBox = styled.div`

`
const UrlBox = styled.div`
  text-align: right;
`;
const UrlItem = styled.a`
  color: #3C486B;
  text-decoration: none;
`;

function ContentCard() {
  return (
    <Container>
      <DateBox>
        2023년 9월 10일
      </DateBox>
      <TitleBox>
        옥외광고
        <br></br>
        문구 추천
      </TitleBox>
      <ChipBox>
      <Chip label="#라면" />
      <Chip label="#맛" color="primary" />
      </ChipBox>
      <UrlBox>
        <UrlItem>>> 문구 보기</UrlItem>
      </UrlBox>
    </Container>
  );
}

export default ContentCard;
