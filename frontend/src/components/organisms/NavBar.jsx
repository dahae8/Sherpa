import { Link } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../assets/img/logo.png";

const Container = styled.div`
  height: 100px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #d9d9d9;
`;
const LeftBox = styled.div``;
const MiddleBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const RightBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 30px;
`;
const MediaItem = styled.button`
  width: 250px;
  background-color: white;
  border: 0px;
  font-size: 24px;
`;
const KeywordItem = styled.button`
  width: 250px;
  background-color: white;
  border: 0px;
  font-size: 24px;
`;
const ContentItem = styled.button`
  width: 250px;
  background-color: white;
  border: 0px;
  font-size: 24px;
`;
const RightItem = styled.button`
  width: 110px;
  background-color: white;
  border: 0px;
  font-size: 16px;
`;

function MakeNavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Container>
      <LeftBox>
        <img src={logo} alt="" />
      </LeftBox>
      <MiddleBox>
        <Link to="/mediaRecommend">
          <MediaItem>매체 추천</MediaItem>
        </Link>
        <Link to="/keywordRecommend">
          <KeywordItem>키워드 추천</KeywordItem>
        </Link>
        <Link to="/contentRecommend">
          <ContentItem>컨텐츠 추천</ContentItem>
        </Link>
      </MiddleBox>
      <RightBox>
        {isLoggedIn ? (
          <RightBox>
            <RightItem onClick={handleLogout}>로그아웃</RightItem>
            <Link to="/mypage">
              <RightItem>마이페이지</RightItem>
            </Link>
          </RightBox>
        ) : (
          <RightBox>
            <Link to="/login">
              <RightItem>로그인</RightItem>
            </Link>
            <Link to="/signup">
              <RightItem>회원가입</RightItem>
            </Link>
          </RightBox>
        )}
      </RightBox>
    </Container>
  );
}
export default MakeNavBar;
