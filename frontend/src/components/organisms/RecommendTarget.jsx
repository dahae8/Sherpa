import React from "react";
import styled from "styled-components";
import gender from "../../assets/img/남여-removebg-preview.png";
import BarChartItem from "../atoms/SingleChart";
import TagItem from "../atoms/ImformationTag";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const TagBox = styled.div`
  display: flex;
  justify-content: flex-start;
  color: #0b0b0b;
  font-size: 16px;
  margin-top: 20px;
`;
const TitleBox = styled.div`
  margin: 120px 0px 40px 0px;
  font-size: 48px;
`;
const ContentBox = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 50px;
`;
const ImgItem = styled.div`
  margin: 70px 50px 0px 0px;
  flex: 1;
`;
const Percent = styled.div`
  display: flex;
  font-size: 32px;
`;
const Men = styled.div`
  flex: 1;
`;
const Women = styled.div`
  flex: 1;
  margin-left: 40px;
`;
const ChartItem = styled.div`
  flex: 2;
  margin-top: 30px;
`;

function makeReccommendTarget({ age, datas, target, male, female }) {
  const labels = ["10대", "20대", "30대", "40대", "50대", "60대이상"];
  const tags = ["200만원", "온라인 광고", "광주 광역시", "광산구"]; // state
  const item = "운동화"; // state

  return (
    <Container>
      <TagBox>
        {tags.map((tag, index) => (
          <TagItem key={index} content={`#${tag}`} />
        ))}
      </TagBox>
      <TitleBox>
        {item} 광고는 {age}대 {target}을 추천합니다.
      </TitleBox>
      <ContentBox>
        <ImgItem>
          <img src={gender} alt="" />
          <Percent>
            <Men>{male}%</Men>
            <Women>{female}%</Women>
          </Percent>
        </ImgItem>
        <ChartItem>
          <BarChartItem labels={labels} datas={datas} />
        </ChartItem>
      </ContentBox>
    </Container>
  );
}

export default makeReccommendTarget;
