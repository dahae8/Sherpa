import styled from "styled-components";
import RecommendTarget from "../../organisms/RecommendTarget";
import CommunityRecommendation from "../../organisms/CommunityRecommendation";
import BlogRecommendation from "../../organisms/ProducerCardList";
import SnsRecomendation from "../../organisms/SnsRecommendation";
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
const BlogTitle = styled.div`
  font-size: 48px;
  margin-bottom: 100px;
`;

export const OnlineRecommendation = () => {
  const ages = [80, 60, 45, 42, 32, 29]; // 광고 타겟층 분석 API
  const male = 75; // 광고 타겟층 분석 API
  const female = 25; // 광고 타겟층 분석 API
  const gender = 1; // 광고 타겟층 분석 API
  const age = 30; // 광고 타겟층 분석 API
  const recommendedCommunity = "네이버"; //API
  const coummunityfirstDatas = [80, 60, 45, 25, 10]; //API
  const coummunitysecondDatas = [70, 75, 50, 20, 5]; //API
  const blogCardDatas = [
    { img: "url", title: "대한민국 명산 도전", url: "url" },
    { img: "url", title: "램블러", url: "url" },
    { img: "url", title: "놀자", url: "url" },
    { img: "url", title: "길잡이", url: "url" },
  ]; //API
  const selectedItem = "등산화"; // state
  const description = `${selectedItem}에 알맞는 블로그 목록`;
  const recommendedSns = "인스타그램"; //API
  const snsFirstDatas = [80, 60, 45, 25, 10, 20, 30, 20, 30, 12, 5]; //API
  const snsSecondDatas = [70, 75, 50, 20, 5, 20, 30, 20, 30, 12, 5]; //API
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
      <hr />
      <Box>
        <CommunityRecommendation
          item={recommendedCommunity}
          firstDatas={coummunityfirstDatas}
          secondDatas={coummunitysecondDatas}
          target={target}
        ></CommunityRecommendation>
      </Box>
      <hr />
      <Box>
        <BlogTitle>추천하는 {recommendedCommunity} 블로그 입니다.</BlogTitle>
        <BlogRecommendation
          cardDatas={blogCardDatas}
          description={description}
        ></BlogRecommendation>
      </Box>
      <hr />
      <Box>
        <SnsRecomendation
          item={recommendedSns}
          firstDatas={snsFirstDatas}
          secondDatas={snsSecondDatas}
          target={target}
        ></SnsRecomendation>
      </Box>
      <hr />
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
