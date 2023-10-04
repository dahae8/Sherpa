import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid #b5b5b5;
  border-radius: 5px;
  padding: 10px;
  width: 343px;
  height: 300px;
`;
const ImgBox = styled.div`
  width: 200px;
  height: 200px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const TitleBox = styled.div`
  font-size: 24px;
  margin-bottom: 30px;
`;
const UrlBox = styled.div`
  text-align: right;
`;
const UrlItem = styled.a`
  color: #2196f3;
  text-decoration: none;
`;

function makeCard({ img, title, url }) {
  return (
    <Container>
      <ImgBox>
        <img src={img} alt="" width={310} height={170} />
      </ImgBox>
      <TitleBox>{title}</TitleBox>
      <UrlBox>
        <UrlItem href={url}>더 알아보기</UrlItem>
      </UrlBox>
    </Container>
  );
}

export default makeCard;
