import styled from "styled-components";
import RecommendTarget from "../../organisms/RecommendTarget";

const Container = styled.div`
  margin: 0 320px;
`;
const TargetBox = styled.div`
  margin-bottom: 100px;
`;
const Box = styled.div`
  margin: 150px 0px 150px 0px;
`;

export const TvRecommendation = () => {
  const ageDatas = [80, 60, 45, 42, 32, 29]; //API
  const target = "30대 남성"; //API
  const percent = [75, 25]; //API
  return (
    <Container>
      <TargetBox>
        <RecommendTarget
          datas={ageDatas}
          target={target}
          percent={percent}
        ></RecommendTarget>
      </TargetBox>
      <hr />
      <Box></Box>
    </Container>
  );
};
export default TvRecommendation;
