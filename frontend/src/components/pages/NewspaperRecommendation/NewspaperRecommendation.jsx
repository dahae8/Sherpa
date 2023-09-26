// import React, { useState, useEffect } from "react";
// import axios from "axios";
import RecommendTarget from "../../organisms/RecommendTarget";
import OfflineMediaRecommendation from "../../organisms/OfflineMediaRecommendation";
import ChannelRecommendation from "../../organisms/ChannelRecommendation";
import ProducerRecommendation from "../../organisms/ProducerCardList";
import Buttons from "../../organisms/ResultPageButtens";
import {
  Container,
  TargetBox,
  Box,
  Hr,
  ProducerTitleItem,
} from "./NewspaperRecommendation";

export const NewsPaperRecommendation = () => {
  const ages = [80, 60, 45, 42, 32, 29]; // state
  // const ages = useSelector((state) => state.result.ages);
  const male = 75; // state
  // const male = useSelector((state) => state.result.male);
  const female = 25; // state
  // const female = useSelector((state) => state.result.female);
  const gender = 1; // state
  // const gender = useSelector((state) => state.result.gender);
  const age = 30; // state
  // const age = useSelector((state) => state.result.age);
  const mediaLabels = ["TV 광고", "라디오 광고", "신문 광고", "옥외광고"]; // state
  // const mediaLabels = useSelector((state) => state.result.mediaLabels);
  const subMediaLabels = ["TV 광고", "라디오 광고", "신문 광고", "옥외광고"]; // state
  // const subMediaLabels = useSelector((state) => state.result.subMediaLabels);
  const priceLabels = ["TV 광고", "라디오 광고", "신문 광고", "옥외광고"]; // state
  // const priceLabels = useSelector((state) => state.result.priceLabels);
  const mainDatas = [23, 19, 13, 5]; // state
  // const mainDatas = useSelector((state) => state.result.mainDatas);
  const subDatas = [23, 19, 13, 5]; // state
  // const subDatas = useSelector((state) => state.result.subDatas);
  const prices = [23, 19, 13, 5]; // state
  // const prices = useSelector((state) => state.result.prices);
  const recommendedMedia = "신문 광고"; // state
  // const recommendedMedia = useSelector((state) => state.result.recommendedMedia);

  const recommendedNewspaper = "동아일보"; // 신문사 추천 API
  // const [recommendedNewspaper, setRecommendedNewspaper] = useState("");
  // const APPLICATION_SERVER_URL = "http://j9c107.p.ssafy.io:8080";
  // useEffect(() => {
  //   // API 요청을 수행하는 함수를 정의합니다.
  //   const fetchRecommendedNewspaper = async () => {
  //     try {
  //       const response = await axios.post(
  //         `${APPLICATION_SERVER_URL}/your-api-endpoint`, // 실제 API 엔드포인트로 교체하세요.
  //         {
  //           // 필요한 경우 요청 본문 데이터를 추가합니다.
  //         }
  //       );
  //       // 응답이 'data' 필드에 추천 신문 데이터를 포함한다고 가정합니다.
  //       setRecommendedNewspaper(response.data);
  //     } catch (error) {
  //       console.error("추천 신문 가져오기 오류:", error);
  //     }
  //   };

  //   // 컴포넌트가 마운트될 때 fetchRecommendedNewspaper 함수를 호출합니다.
  //   fetchRecommendedNewspaper();
  // }, []); // 의존성 배열을 비워 한 번만 실행되도록 합니다.
  //const recommendedNewspaper = data[0].type
  const newspaperLabels = [
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
  ]; // 신문사 추천 API
  // const newspaperLabels = [];
  // for (let i = 0; i < data.length; i++) {
  //   if (data[i]) {
  //     newspaperLabels.push(data[i].type);
  //   } else {
  //     newspaperLabels.push(0);
  //   }
  // }
  const newspaperDatas = [80, 60, 45, 42, 32, 29, 19, 5, 3, 2]; // 신문사 추천 API
  // const newspaperDatas = [];
  // for (let i = 0; i < data.length; i++) {
  //   if (data[i]) {
  //     newspaperDatas.push(data[i].ratio);
  //   } else {
  //     newspaperDatas.push(0);
  //   }
  // }
  const recommendedNewspaperArea = "경제"; // 신문 분야 추천 API
  //  const recommendedNewspaperArea = data[o].type
  const newspaperAreaLabels = [
    "정치",
    "사회",
    "경제",
    "문화",
    "스포츠 및 연애",
    "기타",
  ]; // 신문 분야 추천 API
  // const newspaperAreaLabels = [];
  // for (let i = 0; i < data.length; i++) {
  //   if (data[i]) {
  //     newspaperAreaLabels.push(data[i].type);
  //   } else {
  //     newspaperAreaLabels.push(0);
  //   }
  // }
  const newspaperAreaDatas = [80, 60, 45, 42, 32, 29, 19, 5, 3, 2]; // 신문 분야 추천 API
  // const newspaperAreaDatas = [];
  // for (let i = 0; i < data.length; i++) {
  //   if (data[i]) {
  //     newspaperAreaDatas.push(data[i].ratio);
  //   } else {
  //     newspaperAreaDatas.push(0);
  //   }
  // }
  const producerCardDatas = [
    { img: "url", title: "대한민국 명산 도전", url: "url" },
    { img: "url", title: "램블러", url: "url" },
    { img: "url", title: "놀자", url: "url" },
    { img: "url", title: "길잡이", url: "url" },
  ]; // 광고 제작사 리스트 받아오기 API
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
      <Hr />
      <Box>
        <ChannelRecommendation
          title={`추천 드리는 신문사는 ${recommendedNewspaper} 입니다.`}
          datas={newspaperDatas}
          labels={newspaperLabels}
          description={`${target}이 이용하는 신문사 통계`}
        ></ChannelRecommendation>
      </Box>
      <Box>
        <ChannelRecommendation
          title={`추천 드리는 신문 분야는 ${recommendedNewspaperArea} 입니다.`}
          datas={newspaperAreaDatas}
          labels={newspaperAreaLabels}
          description={`${target}이 이용하는 신문 분야 통계`}
        ></ChannelRecommendation>
      </Box>
      <Hr />
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
