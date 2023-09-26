import styled from "styled-components";
import RecommendTarget from "../../organisms/RecommendTarget";
import CommunityRecommendation from "../../organisms/CommunityRecommendation";
import BlogRecommendation from "../../organisms/ProducerCardList";
import SnsRecomendation from "../../organisms/SnsRecommendation";
import ProducerRecommendation from "../../organisms/ProducerCardList";
import Buttons from "../../organisms/ResultPageButtens";
import {
  Container,
  TargetBox,
  Box,
  BlogTitle,
  Hr,
} from "./OnlineRecommendation";

export const OnlineRecommendation = () => {
  // state productSmallId,
  const ages = [80, 60, 45, 42, 32, 29]; // state
  // const ages = useSelector((state) => state.result.ages);
  const male = 75; // state
  // const ages = useSelector((state) => state.result.male);
  const female = 25; // state
  // const ages = useSelector((state) => state.result.female);
  const gender = 1; // state
  // const ages = useSelector((state) => state.result.gender);
  const age = 30; // state
  // const ages = useSelector((state) => state.result.age);
  const communityLabels = ["네이버", "다음", "싸이월드", "텀블러", "구글"]; //커뮤니티 추천 API
  // const communityLabels = [];
  // for (let i = 0; i < communityList.length; i++) {
  //   if (data[0].communityList[i]) {
  //     communityLabels.push(data[0].communityList[i].name);
  //   } else {
  //     communityLabels.push(0);
  //   }
  // }
  const recommendedCommunity = "네이버"; // 커뮤니티 추천 API
  // const recommendedCommunity = data[0].communityList[0].name
  const coummunityfirstDatas = [80, 60, 45, 25, 10]; // 커뮤니티 추천 API
  // const coummunityfirstDatas = [];
  // for (let i = 0; i < communityList.length; i++) {
  //   if (data[0].communityList[i]) {
  //     coummunityfirstDatas.push(data[0].communityList[i].percent);
  //   } else {
  //     coummunityfirstDatas.push(0);
  //   }
  // }
  const coummunitysecondDatas = [70, 75, 50, 20, 5]; // 커뮤니티 추천 API
  // const coummunitysecondDatas = [];
  // for (let i = 0; i < communityList.length; i++) {
  //   if (data[1].communityList[i]) {
  //     coummunitysecondDatas.push(data[1].communityList[i].percent);
  //   } else {
  //     coummunitysecondDatas.push(0);
  //   }
  // }
  const blogCardDatas = [
    { img: "url", title: "대한민국 명산 도전", url: "url" },
    { img: "url", title: "램블러", url: "url" },
    { img: "url", title: "놀자", url: "url" },
    { img: "url", title: "길잡이", url: "url" },
  ]; // 커뮤니티 주제별 추천 API
  const selectedItem = "등산화"; // state
  // const selectedItem = useSelector((state) => state.user.productSmall);
  const description = `${selectedItem}에 알맞는 블로그 목록`;
  const snsLabels = [
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
  ]; // SNS 추천 API
  // const snsLabels = [];
  // for (let i = 0; i < snsList.length; i++) {
  //   if (data[0].snsList[i]) {
  //     snsLabels.push(data[0].snsList[i].name);
  //   } else {
  //     snsLabels.push(0);
  //   }
  // }
  const recommendedSns = "인스타그램"; // SNS 추천 API
  // const recommendedSns = data[0].snsList[0].name
  const snsFirstDatas = [80, 60, 45, 25, 10, 20, 30, 20, 30, 12, 5]; // SNS 추천 API
  // const snsFirstDatas = [];
  // for (let i = 0; i < snsList.length; i++) {
  //   if (data[0].snsList[i]) {
  //     snsFirstDatas.push(data[0].snsList[i].percent);
  //   } else {
  //     snsFirstDatas.push(0);
  //   }
  // }
  const snsSecondDatas = [70, 75, 50, 20, 5, 20, 30, 20, 30, 12, 5]; // SNS 추천 API
  // const snsSecondDatas = [];
  // for (let i = 0; i < snsList.length; i++) {
  //   if (data[1].snsList[i]) {
  //     snsSecondDatas.push(data[1].snsList[i].percent);
  //   } else {
  //     snsSecondDatas.push(0);
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
        <CommunityRecommendation
          item={recommendedCommunity}
          firstDatas={coummunityfirstDatas}
          secondDatas={coummunitysecondDatas}
          target={target}
          labels={communityLabels}
        ></CommunityRecommendation>
      </Box>
      <Hr />
      <Box>
        <BlogTitle>추천하는 {recommendedCommunity} 블로그 입니다.</BlogTitle>
        <BlogRecommendation
          cardDatas={blogCardDatas}
          description={description}
        ></BlogRecommendation>
      </Box>
      <Hr />
      <Box>
        <SnsRecomendation
          labels={snsLabels}
          item={recommendedSns}
          firstDatas={snsFirstDatas}
          secondDatas={snsSecondDatas}
          target={target}
        ></SnsRecomendation>
      </Box>
      <Hr />
      <Box>
        <BlogTitle>온라인 광고 제작사</BlogTitle>
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
export default OnlineRecommendation;
