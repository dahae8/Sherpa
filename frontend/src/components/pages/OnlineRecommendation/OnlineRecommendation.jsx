import RecommendTarget from "../../organisms/RecommendTarget";
import styled from "styled-components";

const Container = styled.div`
  margin: 0 320px;
`;
const TargetBox = styled.div`
  margin-bottom: 50px;
`;

export const OnlineRecommendation = () => {
  const communityDatas = [80, 60, 45, 42, 32, 29];
  const target = "30대 남성";
  const percent = [75, 25];
  return (
    <Container>
      <TargetBox>
        <RecommendTarget
          datas={communityDatas}
          target={target}
          percent={percent}
        ></RecommendTarget>
      </TargetBox>
      <hr />
    </Container>
  );
};
export default OnlineRecommendation;
