import React, { useState, useLayoutEffect, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import RecommendTarget from "../../organisms/RecommendTarget";
import CommunityRecommendation from "../../organisms/CommunityRecommendation";
import BlogRecommendation from "../../organisms/ProducerCardList";
import SnsRecomendation from "../../organisms/SnsRecommendation";
import ProducerRecommendation from "../../organisms/ProducerCardList";
import {
  Container,
  TargetBox,
  Box,
  BlogTitle,
  Hr,
  SaveBox,
  ButtonBox,
} from "./OnlineRecommendation";
import { useNavigate } from "react-router-dom";
import Button from "../../atoms/Button";

const APPLICATION_FAST_SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "https://j9c107.p.ssafy.io"
    : "http://j9c107.p.ssafy.io:8000";

const APPLICATION_SPRING_SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "https://j9c107.p.ssafy.io"
    : "http://j9c107.p.ssafy.io:8080";

export const OnlineRecommendation = () => {
  const navigate = useNavigate();
  const name = useSelector((state) => state.user.name);
  const ageDatas = useSelector((state) => state.result.target.age);
  const [ages, setAges] = useState([]);
  useLayoutEffect(() => {
    const newAges = [];
    for (let i = 0; i < ageDatas.length; i++) {
      if (ageDatas[i]) {
        newAges.push(ageDatas[i].value);
      } else {
        newAges.push(0);
      }
    }
    setAges(newAges);
  }, [ageDatas]);
  const male = useSelector((state) => state.result.target.gender[1].value);
  const female = useSelector((state) => state.result.target.gender[0].value);
  const gender = useSelector((state) => state.result.target.recommend.gender);
  const age = useSelector((state) => state.result.target.recommend.age);
  const blogCardDatas = [
    { img: "url", title: "대한민국 명산 도전", url: "url" },
    { img: "url", title: "램블러", url: "url" },
    { img: "url", title: "놀자", url: "url" },
    { img: "url", title: "길잡이", url: "url" },
  ]; // 커뮤니티 주제별 추천 API
  const selectedItem = "등산화"; // state
  // const selectedItem = useSelector((state) => state.user.productSmall);
  const description = `${selectedItem}에 알맞는 블로그 목록`;
  let target = "성별";

  if (gender === 1) {
    target = "남성";
  } else {
    target = "여성";
  }

  const [recommendedCommunity, setRecommendedCommunity] = useState("");
  const [firstCommunityLabels, setFirstCommunityLabels] = useState([]);
  const [coummunityfirstDatas, setCoummunityfirstDatas] = useState([]);
  const [coummunitysecondDatas, setCoummunitysecondDatas] = useState([]);
  const [recommendedSns, setRecommendedSns] = useState("");
  const [snsLabels, setSnsLabels] = useState([]);
  const [snsFirstDatas, setSnsFirstDatas] = useState([]);
  const [snsSecondDatas, setSnsSecondDatas] = useState([]);
  const [producerCardDatas, setProducerCardDatas] = useState({});
  const [producerCardDatas2, setProducerCardDatas2] = useState({});
  const [showProducer, setShowProducer] = useState(false);

  useLayoutEffect(() => {
    console.log(`NODE_ENV = ${process.env.NODE_ENV}`);
    console.log(APPLICATION_FAST_SERVER_URL);
    const recommendCommunity = async () => {
      try {
        const response = await axios.post(
          `${APPLICATION_FAST_SERVER_URL}/fastapi/online/community`,
          {
            gender: {
              0: 45,
              1: 55,
            },
            age: {
              10: 19,
              20: 17,
              30: 13,
              40: 20,
              50: 21,
              60: 5,
              70: 5,
            },
            sidoId: 2,
          }
        );
        console.log("추천 커뮤니티 가져오기", response);
        setRecommendedCommunity(response.data.data.communityList_2022[0].type);
        const communityLabels = [];
        for (let i = 0; i < response.data.data.communityList_2022.length; i++) {
          if (response.data.data.communityList_2022[i]) {
            communityLabels.push(response.data.data.communityList_2022[i].type);
          } else {
            communityLabels.push(0);
          }
        }
        setFirstCommunityLabels(communityLabels);
        const coummunityfirstDatas = [];
        for (let i = 0; i < response.data.data.communityList_2022.length; i++) {
          if (response.data.data.communityList_2021[i]) {
            coummunityfirstDatas.push(
              response.data.data.communityList_2021[i].ratio
            );
          } else {
            coummunityfirstDatas.push(0);
          }
        }
        setCoummunityfirstDatas(coummunityfirstDatas);
        const coummunitysecondDatas = [];
        for (let i = 0; i < response.data.data.communityList_2022.length; i++) {
          if (response.data.data.communityList_2022[i]) {
            coummunitysecondDatas.push(
              response.data.data.communityList_2022[i].ratio
            );
          } else {
            coummunitysecondDatas.push(0);
          }
        }
        setCoummunitysecondDatas(coummunitysecondDatas);
      } catch (error) {
        console.log("추천 커뮤니티 오류", error);
      }
    };
    const recommendSns = async () => {
      try {
        const response = await axios.post(
          `${APPLICATION_FAST_SERVER_URL}/fastapi/online/sns`,
          {
            gender: {
              0: 45,
              1: 55,
            },
            age: {
              10: 19,
              20: 17,
              30: 13,
              40: 20,
              50: 21,
              60: 5,
              70: 5,
            },
            sidoId: 3,
          }
        );
        console.log("sns 추천", response);
        setRecommendedSns(response.data.data.snsList_2022[0].type);
        const snsLabels = [];
        for (let i = 0; i < response.data.data.snsList_2022.length; i++) {
          if (response.data.data.snsList_2022[i]) {
            snsLabels.push(response.data.data.snsList_2022[i].type);
          } else {
            snsLabels.push(0);
          }
        }
        setSnsLabels(snsLabels);
        const snsFirstDatas = [];
        for (let i = 0; i < response.data.data.snsList_2021.length; i++) {
          if (response.data.data.snsList_2021[i]) {
            snsFirstDatas.push(response.data.data.snsList_2021[i].ratio);
          } else {
            snsFirstDatas.push(0);
          }
        }
        setSnsFirstDatas(snsFirstDatas);
        const snsSecondDatas = [];
        for (let i = 0; i < response.data.data.snsList_2022.length; i++) {
          if (response.data.data.snsList_2022[i]) {
            snsSecondDatas.push(response.data.data.snsList_2022[i].ratio);
          } else {
            snsSecondDatas.push(0);
          }
        }
        setSnsSecondDatas(snsSecondDatas);
      } catch (error) {
        console.log("sns 추천 오류", error);
      }
    };
    const linkproducer = async () => {
      try {
        const response = await axios.get(
          `${APPLICATION_SPRING_SERVER_URL}/api/media/company/1`
        );
        console.log("제작사", response);
        setProducerCardDatas(response.data.data);
      } catch (error) {
        console.log("제작사 오류", error);
      }
    };
    const linkproducer2 = async () => {
      try {
        const response = await axios.get(
          `${APPLICATION_SPRING_SERVER_URL}/api/media/company/2`
        );
        console.log("제작사", response);
        setProducerCardDatas2(response.data.data);
      } catch (error) {
        console.log("제작사 오류", error);
      }
    };
    recommendCommunity();
    recommendSns();
    linkproducer();
    linkproducer2();
  }, []);

  useEffect(() => {
    const delayProducerRender = setTimeout(() => {
      setShowProducer(true);
    }, 2000);
    return () => clearTimeout(delayProducerRender);
  }, []);

  const save = async () => {
    try {
      const response = await axios.post(
        `${APPLICATION_SPRING_SERVER_URL}/api/mypage/save/mediaRec`,
        {
          memberName: name,
          productSmallId: 4,
          budget: 100000,
          inOnOff: 0,
          sigunguId: 113,
          mediaTypeId: 6,
        }
      );
      console.log("저장 성공", response);
    } catch (error) {
      console.log("저장 오류", error);
    }
  };

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
          labels={firstCommunityLabels}
        ></CommunityRecommendation>
      </Box>
      <Hr />
      <Box>
        <BlogTitle>추천하는 {recommendedCommunity} 입니다.</BlogTitle>
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
        <BlogTitle>커뮤니티 광고 제작사</BlogTitle>
        {showProducer && (
          <ProducerRecommendation cardDatas={producerCardDatas} />
        )}
        <BlogTitle>SNS 광고 제작사</BlogTitle>
        {showProducer && (
          <ProducerRecommendation cardDatas={producerCardDatas2} />
        )}
      </Box>
      <ButtonBox>
        <SaveBox>
          <Button
            backgroundColor="white"
            width="350px"
            height="80px"
            border="1px solid #3C486B"
            textColor="#3C486B"
            fontSize="24px"
            onClick={() => {
              save();
              navigate("/mypage");
            }}
          >
            보관함에 추가
          </Button>
          <Button
            backgroundColor="white"
            width="350px"
            height="80px"
            border="1px solid #3C486B"
            textColor="#3C486B"
            fontSize="24px"
          >
            PDF로 저장
          </Button>
        </SaveBox>
        <Button
          backgroundColor="#3C486B"
          width="890px"
          height="80px"
          textColor="white"
          fontSize="24px"
          onClick={() => {
            navigate("/mediaRecommend");
          }}
        >
          다시 추천받기
        </Button>
      </ButtonBox>
    </Container>
  );
};
export default OnlineRecommendation;
