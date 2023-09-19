import styled from "styled-components";
import SingleChart from "../atoms/SingleChart";

const Container = styled.div``;
const Title = styled.div`
  font-size: 48px;
  margin-bottom: 100px;
`;

function makeTvChannelRecommendation({ labels, datas, title, description }) {
  return (
    <Container>
      <Title>{title}</Title>
      <SingleChart
        labels={labels}
        datas={datas}
        text={description}
      ></SingleChart>
    </Container>
  );
}
export default makeTvChannelRecommendation;
