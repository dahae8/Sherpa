import styled from "styled-components";
import RecommendTarget from "../../organisms/RecommendTarget";
import OfflineMediaRecommendation from "../../organisms/OfflineMediaRecommendation";
import ChannelRecommendation from "../../organisms/ChannelRecommendation";
import ProducerRecommendation from "../../organisms/ProducerCardList";
import Buttons from "../../organisms/ResultPageButtens";

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
const ProducerTitleItem = styled.div`
  font-size: 48px;
  margin-bottom: 100px;
`;

export const NewsPaperRecommendation = () => {
  const ages = [80, 60, 45, 42, 32, 29]; // 광고 타겟층 분석 API
  //  ages = [data.age10, data.age20, data.age30, data.age40, data.age50, data.age60]
  const male = 75; // 광고 타겟층 분석 API
  const female = 25; // 광고 타겟층 분석 API
  const gender = 1; // 광고 타겟층 분석 API
  const age = 30; // 광고 타겟층 분석 API
  const mediaLabels = ["TV 광고", "라디오 광고", "신문 광고", "옥외광고"]; //API state로 변경 예정
  const subMediaLabels = ["TV 광고", "라디오 광고", "신문 광고", "옥외광고"]; //API state로 변경 예정
  const priceLabels = ["TV 광고", "라디오 광고", "신문 광고", "옥외광고"]; //API state로 변경 예정
  const mainDatas = [23, 19, 13, 5]; //API
  const subDatas = [23, 19, 13, 5]; //API
  const prices = [23, 19, 13, 5]; //API
  const recommendedMedia = "신문 광고"; //API
  const recommendedNewspaper = "동아일보"; //API
  const newspaperDatas = [80, 60, 45, 42, 32, 29, 19, 5, 3, 2]; //API
  const recommendedNewspaperArea = "경제"; //API
  const producerCardDatas = [
    { img: "url", title: "대한민국 명산 도전", url: "url" },
    { img: "url", title: "램블러", url: "url" },
    { img: "url", title: "놀자", url: "url" },
    { img: "url", title: "길잡이", url: "url" },
  ]; //API

  let target = "성별";

  if (gender === 1) {
    target = "남성";
  } else {
    target = "여성";
  }

  return (
    <Container>
      <TargetBox>
        <RecommendTarget
          datas={ages}
          target={target}
          age={age}
          male={male}
          female={female}
        ></RecommendTarget>
      </TargetBox>
      <Hr />
      <Box>
        <OfflineMediaRecommendation
          mediaLabels={mediaLabels}
          subMediaLabels={subMediaLabels}
          priceLabels={priceLabels}
          mainDatas={mainDatas}
          subDatas={subDatas}
          prices={prices}
          recommendedMedia={recommendedMedia}
        ></OfflineMediaRecommendation>
      </Box>
      <Hr></Hr>
      <Box>
        <ChannelRecommendation
          title={`추천 드리는 신문사는 ${recommendedNewspaper} 입니다.`}
          datas={newspaperDatas}
          labels={[
            "조선일보",
            "중앙일보",
            "동아일보",
            "매일경제",
            "한겨레",
            "한국경제",
            "경향신문",
            "한국일보",
            "농민신문",
            "국민일보",
          ]}
          description={`${target}이 이용하는 신문사 통계`}
        ></ChannelRecommendation>
      </Box>
      <Box>
        <ChannelRecommendation
          title={`추천 드리는 신문 분야는 ${recommendedNewspaperArea} 입니다.`}
          datas={newspaperDatas}
          labels={["정치", "사회", "경제", "문화", "스포츠 및 연애", "기타"]}
          description={`${target}이 이용하는 신문 분야 통계`}
        ></ChannelRecommendation>
      </Box>
      <Hr></Hr>
      <Box>
        <ProducerTitleItem>신문 광고 제작사</ProducerTitleItem>
        <ProducerRecommendation
          cardDatas={producerCardDatas}
        ></ProducerRecommendation>
      </Box>
      <Box>
        <Buttons></Buttons>
      </Box>
    </Container>
  );
};

export default NewsPaperRecommendation;
