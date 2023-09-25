import styled from "styled-components";
import RecommendTarget from "../../organisms/RecommendTarget";
import OfflineMediaRecommendation from "../../organisms/OfflineMediaRecommendation";
import ChannelRecommendation from "../../organisms/ChannelRecommendation";
import TimeRecommendation from "../../organisms/TimeRecommendation";
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

export const TvRecommendation = () => {
  const ages = [80, 60, 45, 42, 32, 29]; // 광고 타겟층 분석 API state로 변경 예정
  //  ages = [data.age10, data.age20, data.age30, data.age40, data.age50, data.age60]
  const male = 75; // 광고 타겟층 분석 API state로 변경 예정
  const female = 25; // 광고 타겟층 분석 API state로 변경 예정
  const gender = 1; // 광고 타겟층 분석 API state로 변경 예정
  const age = 30; // 광고 타겟층 분석 API state로 변경 예정
  const mediaLabels = ["TV 광고", "라디오 광고", "신문 광고", "옥외광고"]; //API state로 변경 예정
  const subMediaLabels = ["TV 광고", "라디오 광고", "신문 광고", "옥외광고"]; //API state로 변경 예정
  const priceLabels = ["TV 광고", "라디오 광고", "신문 광고", "옥외광고"]; //API state로 변경 예정
  const mainDatas = [23, 19, 13, 5]; //API state로 변경 예정
  const subDatas = [23, 19, 13, 5]; //API state로 변경 예정
  const prices = [23, 19, 13, 5]; //API state로 변경 예정
  const recommendedMedia = "TV 영상 광고"; //API state로 변경 예정
  const tvLabels = [
    "스포츠",
    "뉴스",
    "드라마",
    "예능",
    "영화",
    "애니메이션",
    "토론",
    "교양",
  ]; // TV 채널 추천 API
  // const tvLabels = [];
  // for (let i = 0; i < data.length; i++) {
  //   if (data[i]) {
  //     tvLabels.push(data[i].type);
  //   } else {
  //     tvLabels.push(0);
  //   }
  // }
  const tvChannelDatas = [80, 60, 45, 42, 32, 29, 19, 5]; // TV 채널 추천 API
  // const tvChannelDatas = [];
  // for (let i = 0; i < data.length; i++) {
  //   if (data[i]) {
  //     tvChannelDatas.push(data[i].ratio);
  //   } else {
  //     tvChannelDatas.push(0);
  //   }
  // }
  const recommendedTvChennl = "스포츠"; // TV 채널 추천 API
  // const recommendedTvChennl = data[0].type
  const weekdaysDatas = [
    3, 5.9, 7.4, 12.8, 13, 22, 24, 43, 42, 55, 44, 33, 22, 34, 44, 56, 66, 54,
    66, 64, 66, 64, 33, 22, 19,
  ]; // TV 광고 시간대 분석 API
  // const weekdaysDatas = data.weekdaysDatas
  const weekendsDatas = [
    23, 26, 32, 36, 34, 34, 46, 52, 41, 53, 63, 53, 49, 64, 72, 81, 79, 78, 69,
    67, 59, 52, 51, 47, 39,
  ]; // TV 광고 시간대 분석 API
  // const weekendsDatas = data.weekendsDatas
  const recommendedtime = "18"; // TV 광고 시간대 분석 API

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
          title={`추천 드리는 TV 채널은 ${recommendedTvChennl} 입니다.`}
          datas={tvChannelDatas}
          labels={tvLabels}
          description={`${target}이 시청하는 TV 프로그램 통계`}
        ></ChannelRecommendation>
      </Box>
      <Hr></Hr>
      <Box>
        <TimeRecommendation
          weekdaysDatas={weekdaysDatas}
          weekendsDatas={weekendsDatas}
          description={`${target}이 TV를 시청하는 시간대 데이터`}
          recommendedtime={recommendedtime}
        ></TimeRecommendation>
      </Box>
      <Hr></Hr>
      <Box>
        <ProducerTitleItem>TV 광고 제작사</ProducerTitleItem>
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
export default TvRecommendation;
