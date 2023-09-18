import styled from "styled-components";
import Chart from "../atoms/DoubleChart";

const Container = styled.div``;
const TitleBox = styled.div`
  font-size: 48px;
`;
const ChartBox = styled.div`
  justify-content: center;
  margin-top: 50px;
`;
const Description = styled.div``;

function makeCommunityRecommendation({
  target,
  item,
  firstDatas,
  secondDatas,
}) {
  const labels = ["네이버", "다음", "싸이월드", "텀블러", "구글"];
  const text = `광주 광역시에 거주하는 ${target}이 이용하는 커뮤니티 통계`;
  return (
    <Container>
      <TitleBox>추천하는 커뮤니티는 {item} 블로그 입니다.</TitleBox>
      <ChartBox>
        <Chart
          labels={labels}
          firstDatas={firstDatas}
          secondDatas={secondDatas}
        ></Chart>
        <Description>{text}</Description>
      </ChartBox>
    </Container>
  );
}
export default makeCommunityRecommendation;
