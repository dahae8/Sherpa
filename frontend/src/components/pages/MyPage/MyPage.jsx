import React from 'react';
import styled from "styled-components";
import FixedInfo from '../../organisms/FixedInfo';
import user from '../../../assets/img/user.png';

const Container = styled.div`
  margin: 0 320px;
`;

const MyBox = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 30px;
  font-size: 48px;
  font-weight: bold;
`
const InfoBox = styled.div`
    display: flex;
    margin-top: 30px;
`

const ImgBox = styled.img`
    width: 201px;
    height: 212px;
    border-radius: 4px;
    margin-top: 10px;
`

function MyPage() {
  return (
    <Container>
        <MyBox>MyPage</MyBox>
        <InfoBox>
            <ImgBox src={user} alt="유저이미지"></ImgBox>
            <FixedInfo></FixedInfo>
        </InfoBox>
    </Container>
    
    
  );
}

export default MyPage;