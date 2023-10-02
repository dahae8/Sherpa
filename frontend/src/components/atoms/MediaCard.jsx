import React from "react";
import styled from "styled-components";
import Chip from '@mui/material/Chip';
import ClearIcon from '@mui/icons-material/Clear';


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

const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

function MediaCard() {
  return (
    <Container>
      <IconContainer>
      <DateBox>
        2023년 9월 10일
      </DateBox>
      <ClearIcon></ClearIcon>
      </IconContainer>
      <TitleBox>
        온라인 매체 추천
        <br></br>
        예산 한도 최대 300만원
      </TitleBox>
      <ChipBox>
      <Chip label="#라면" />
      </ChipBox>
      <UrlBox>
        <UrlItem>>>자세히 보기</UrlItem>
      </UrlBox>
    </Container>
  );
}

export default MediaCard;
