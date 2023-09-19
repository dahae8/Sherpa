import styled from "styled-components";
import RecommendTarget from "../../organisms/RecommendTarget";
import OfflineMediaRecommendation from "../../organisms/OfflineMediaRecommendation";
import ChannelRecommendation from "../../organisms/ChannelRecommendation";

const Container = styled.div`
  margin: 0 320px;
`;
const TargetBox = styled.div`
  margin-bottom: 100px;
`;
const Box = styled.div`
  margin: 150px 0px 150px 0px;
`;
const Hr = styled.hr``;

export const TvRecommendation = () => {
  const ageDatas = [80, 60, 45, 42, 32, 29]; //API
  const target = "30대 남성"; //API
  const percent = [75, 25]; //API
  const mainDatas = [23, 19, 13, 5]; //API
  const subDatas = [23, 19, 13, 5]; //API
  const prices = [23, 19, 13, 5]; //API
  const recommendedMedia = "TV 영상 광고"; //API
  const tvChannelDatas = [80, 60, 45, 42, 32, 29, 19, 5]; //API
  const recommendedTvChennl = "스포츠"; //API
  return (
    <Container>
      <TargetBox>
        <RecommendTarget
          datas={ageDatas}
          target={target}
          percent={percent}
        ></RecommendTarget>
      </TargetBox>
      <Hr />
      <Box>
        <OfflineMediaRecommendation
          mainDatas={mainDatas}
          subDatas={subDatas}
          prices={prices}
          recommendedMedia={recommendedMedia}
        ></OfflineMediaRecommendation>
      </Box>
      <Hr></Hr>
      <Box>
        <ChannelRecommendation
          title={`추천 드리는 TV 채널은 ${recommendedTvChennl} 입니다.`}
          datas={tvChannelDatas}
          labels={[
            "스포츠",
            "뉴스",
            "드라마",
            "예능",
            "영화",
            "애니메이션",
            "토론",
            "교양",
          ]}
          description={`${target}이 시청하는 TV 프로그램 통계`}
        ></ChannelRecommendation>
      </Box>
    </Container>
  );
};
export default TvRecommendation;
