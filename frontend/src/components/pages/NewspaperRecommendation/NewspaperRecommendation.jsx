import React, { useState, useLayoutEffect, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import RecommendTarget from "../../organisms/RecommendTarget";
import OfflineMediaRecommendation from "../../organisms/OfflineMediaRecommendation";
import ChannelRecommendation from "../../organisms/ChannelRecommendation";
import ProducerRecommendation from "../../organisms/ProducerCardList";
import {
  Container,
  TargetBox,
  Box,
  Hr,
  ProducerTitleItem,
  SaveBox,
  ButtonBox,
} from "./NewspaperRecommendation";
import Button from "../../atoms/Button";
import { useNavigate } from "react-router-dom";

const APPLICATION_FAST_SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "https://j9c107.p.ssafy.io"
    : "http://j9c107.p.ssafy.io:8000";

const APPLICATION_SPRING_SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "https://j9c107.p.ssafy.io"
    : "http://j9c107.p.ssafy.io:8080";

export const NewsPaperRecommendation = () => {
  const navigate = useNavigate();
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
  // const ages = [10, 20, 30, 40, 50, 60];
  // const male = 50;
  // const female = 50;
  // const gender = false;
  // const age = 30;
  const mediaLabels = ["TV 광고", "라디오 광고", "신문 광고", "옥외광고"]; // state
  // const mediaLabels = useSelector((state) => state.result.media);
  const mainDatas = [23, 19, 13, 5]; // state
  // const mainDatas = useSelector((state) => state.result.media);
  const recommendedMedia = "신문 광고"; // state
  // const recommendedMedia = useSelector((state) => state.result.recommendedMedia);
  let target = "성별";
  if (gender === false) {
    target = "남성";
  } else {
    target = "여성";
  }
  const [subMediaLabels, setSubMediaLabels] = useState([]);
  const [subDatas, setSubDatas] = useState([]);
  const [priceLabels, setPriceLabels] = useState([]);
  const [prices, setPrices] = useState([]);
  const [recommendedNewspaper, setRecommendedNewspaper] = useState("");
  const [newspaperLabels, setNewspaperLabels] = useState([]);
  const [newspaperDatas, setNewspaperDatas] = useState([]);
  const [recommendedNewspaperArea, setRecommendedNewspaperArea] = useState("");
  const [newspaperAreaLabels, setNewspaperAreaLabels] = useState([]);
  const [newspaperAreaDatas, setNewspaperAreaDatas] = useState([]);
  const [producerCardDatas, setProducerCardDatas] = useState({});
  const [showProducer, setShowProducer] = useState(false);

  useLayoutEffect(() => {
    console.log(`NODE_ENV = ${process.env.NODE_ENV}`);
    console.log(APPLICATION_FAST_SERVER_URL);
    const recommendMedia = async () => {
      try {
        const response = await axios.post(
          `${APPLICATION_FAST_SERVER_URL}/fastapi/offline/product`,
          {
            productSmallId: 2,
            sigunguId: 0,
            gender: 0,
            age: 20,
          }
        );
        console.log("추천 매체 가져오기", response);
        const subMediaLabels = [];
        const subDatas = [];

        for (let i = 0; i < response.data.data.mediaList.length; i++) {
          if (response.data.data.mediaList[i]) {
            subMediaLabels.push(response.data.data.mediaList[i].name);
            subDatas.push(response.data.data.mediaList[i].value);
          } else {
            subMediaLabels.push(0);
            subDatas.push(0);
          }
        }
        setSubMediaLabels(subMediaLabels);
        setSubDatas(subDatas);
      } catch (error) {
        console.error("추천 매체 가져오기 오류:", error);
      }
    };
    const recommendPrice = async () => {
      try {
        const response = await axios.post(
          `${APPLICATION_FAST_SERVER_URL}/fastapi/offline/budget`,
          {
            budget: 99999999999,
          }
        );
        console.log("추천 가격 가져오기", response);
        const priceLabels = [];
        const prices = [];

        for (let i = 0; i < response.data.data.budgetList.length; i++) {
          if (response.data.data.budgetList[i]) {
            priceLabels.push(response.data.data.budgetList[i].name);
            prices.push(response.data.data.budgetList[i].value * 0.0001);
          } else {
            priceLabels.push(0);
            prices.push(0);
          }
        }
        setPriceLabels(priceLabels);
        setPrices(prices);
      } catch (error) {
        console.error("추천 가격 가져오기 오류:", error);
      }
    };
    const recommendNewspaper = async () => {
      try {
        const response = await axios.post(
          `${APPLICATION_FAST_SERVER_URL}/fastapi/offline/news/newspaper`,
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
            sidoId: 1,
          }
        );
        console.log(response);
        setRecommendedNewspaper(response.data.data.newsList[0].type);
        const newspaperLabels = [];
        const newspaperDatas = [];

        for (let i = 0; i < response.data.data.newsList.length; i++) {
          if (response.data.data.newsList[i]) {
            newspaperLabels.push(response.data.data.newsList[i].type);
            newspaperDatas.push(response.data.data.newsList[i].ratio);
          } else {
            newspaperLabels.push(0);
            newspaperDatas.push(0);
          }
        }
        setNewspaperLabels(newspaperLabels);
        setNewspaperDatas(newspaperDatas);
      } catch (error) {
        console.error("추천 신문 가져오기 오류:", error);
      }
    };
    const recommendNewspaperField = async () => {
      try {
        const response = await axios.post(
          `${APPLICATION_FAST_SERVER_URL}/fastapi/offline/news/field`,
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
            sidoId: 1,
          }
        );
        console.log(response);
        setRecommendedNewspaperArea(response.data.data.newsThemeList[0].type);
        const newspaperAreaLabels = [];
        const newspaperAreaDatas = [];

        for (let i = 0; i < response.data.data.newsThemeList.length; i++) {
          if (response.data.data.newsThemeList[i]) {
            newspaperAreaLabels.push(response.data.data.newsThemeList[i].type);
            newspaperAreaDatas.push(response.data.data.newsThemeList[i].ratio);
          } else {
            newspaperAreaLabels.push(0);
            newspaperAreaDatas.push(0);
          }
        }
        setNewspaperAreaLabels(newspaperAreaLabels);
        setNewspaperAreaDatas(newspaperAreaDatas);
      } catch (error) {
        console.error("추천 신문 가져오기 오류:", error);
      }
    };
    const linkproducer = async () => {
      try {
        const response = await axios.get(
          `${APPLICATION_SPRING_SERVER_URL}/api/media/company/5`
        );
        console.log("제작사", response);
        setProducerCardDatas(response.data.data);
      } catch (error) {
        console.log("제작사 오류", error);
      }
    };
    recommendMedia();
    recommendPrice();
    recommendNewspaper();
    recommendNewspaperField();
    linkproducer();
  }, []);

  useEffect(() => {
    const delayProducerRender = setTimeout(() => {
      setShowProducer(true);
    }, 2000);
    return () => clearTimeout(delayProducerRender);
  }, []);

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
          description={`${age}대 ${target}이 이용하는 신문사 통계`}
        ></ChannelRecommendation>
      </Box>
      <Box>
        <ChannelRecommendation
          title={`추천 드리는 신문 분야는 ${recommendedNewspaperArea} 입니다.`}
          datas={newspaperAreaDatas}
          labels={newspaperAreaLabels}
          description={`${age}대 ${target}이 이용하는 신문 분야 통계`}
        ></ChannelRecommendation>
      </Box>
      <Hr />
      <Box>
        <ProducerTitleItem>신문 광고 제작사</ProducerTitleItem>
        {showProducer && (
          <ProducerRecommendation cardDatas={producerCardDatas} />
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

export default NewsPaperRecommendation;
