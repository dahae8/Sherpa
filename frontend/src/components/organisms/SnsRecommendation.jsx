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

function makeSnsRecommendation({ item, firstDatas, secondDatas, target }) {
  const labels = [
    "인스타 그램",
    "페이스북",
    "트위터",
    "싸이월드",
    "카카오스토리",
    "네이버밴드",
    "비트윈",
    "핀터레스트",
    "웨이보",
    "틱톡",
    "기타",
  ];
  return (
    <Container>
      <TitleBox>추천하는 SNS는 {item}입니다.</TitleBox>
      <ChartBox>
        <Chart
          labels={labels}
          firstDatas={firstDatas}
          secondDatas={secondDatas}
        ></Chart>
        <Description>
          광주 광역시에 거주하는 {target}이 이용하는 SNS 통계
        </Description>
      </ChartBox>
    </Container>
  );
}
export default makeSnsRecommendation;
