import React, { useState, useLayoutEffect, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import RecommendTarget from "../../organisms/RecommendTarget";
import OfflineMediaRecommendation from "../../organisms/OfflineMediaRecommendation";
import ChannelRecommendation from "../../organisms/ChannelRecommendation";
import TimeRecommendation from "../../organisms/TimeRecommendation";
import ProducerRecommendation from "../../organisms/ProducerCardList";
import {
  Container,
  TargetBox,
  Box,
  Hr,
  ProducerTitleItem,
  SaveBox,
  ButtonBox,
} from "./RadioRecommendation";
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

export const RadioRecommendation = () => {
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
  const result = useSelector((state) => state.result.media);
  console.log("고객이 입력한 정보", result);
  const mediaList = useSelector((state) => state.result.media.totalList);
  const [mediaLabels, setMediaLabels] = useState([]);
  const [mainDatas, setMainDatas] = useState([]);
  useLayoutEffect(() => {
    const mediaLabels = [];
    const mainDatas = [];
    for (let i = 0; i < mediaList.length; i++) {
      if (mediaList[i]) {
        mediaLabels.push(mediaList[i].name);
        mainDatas.push(mediaList[i].value);
      } else {
        mediaLabels.push(0);
        mainDatas.push(0);
      }
    }
    setMediaLabels(mediaLabels);
    setMainDatas(mainDatas);
  }, [mediaList]);
  const recommendedMedia = useSelector((state) => state.result.media.recommend);
  let target = "성별";
  if (gender === 1) {
    target = "남성";
  } else {
    target = "여성";
  }
  const [subMediaLabels, setSubMediaLabels] = useState([]);
  const [subDatas, setSubDatas] = useState([]);
  const [priceLabels, setPriceLabels] = useState([]);
  const [prices, setPrices] = useState([]);
  const [recommendedRadioChennl, setRecommendedRadioChennl] = useState("");
  const [radioChannelLabels, setRadioChannelLabels] = useState([]);
  const [radioChannelDatas, setRadioChannelDatas] = useState([]);
  const [recommendedtime, setRecommendedtime] = useState("");
  const [weekdaysDatas, setWeekdaysDatas] = useState([]);
  const [weekendsDatas, setWeekendsDatas] = useState([]);
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
        for (let i = 0; i < response.data.data.mediaList.length; i++) {
          if (response.data.data.mediaList[i]) {
            subMediaLabels.push(response.data.data.mediaList[i].name);
          } else {
            subMediaLabels.push(0);
          }
          setSubMediaLabels(subMediaLabels);
        }
        const subDatas = [];
        for (let i = 0; i < response.data.data.mediaList.length; i++) {
          if (response.data.data.mediaList[i]) {
            subDatas.push(response.data.data.mediaList[i].value);
          } else {
            subDatas.push(0);
          }
          setSubDatas(subDatas);
        }
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
        for (let i = 0; i < response.data.data.budgetList.length; i++) {
          if (response.data.data.budgetList[i]) {
            priceLabels.push(response.data.data.budgetList[i].name);
          } else {
            priceLabels.push(0);
          }
          setPriceLabels(priceLabels);
        }
        const prices = [];
        for (let i = 0; i < response.data.data.budgetList.length; i++) {
          if (response.data.data.budgetList[i]) {
            prices.push(response.data.data.budgetList[i].value * 0.0001);
          } else {
            prices.push(0);
          }
          setPrices(prices);
        }
      } catch (error) {
        console.error("추천 가격 가져오기 오류:", error);
      }
    };
    const recommendRadioChannel = async () => {
      try {
        const response = await axios.post(
          `${APPLICATION_FAST_SERVER_URL}/fastapi/offline/radio`,
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
        console.log("라디오 채널", response);
        setRecommendedRadioChennl(response.data.data.radioList[0].type);
        const radioChannelLabels = [];
        for (let i = 0; i < response.data.data.radioList.length; i++) {
          if (response.data.data.radioList[i]) {
            radioChannelLabels.push(response.data.data.radioList[i].type);
          } else {
            radioChannelLabels.push(0);
          }
        }
        setRadioChannelLabels(radioChannelLabels);
        const radioChannelDatas = [];
        for (let i = 0; i < response.data.data.radioList.length; i++) {
          if (response.data.data.radioList[i]) {
            radioChannelDatas.push(response.data.data.radioList[i].ratio);
          } else {
            radioChannelDatas.push(0);
          }
        }
        setRadioChannelDatas(radioChannelDatas);
      } catch (error) {
        console.log("라디오 채널 오류", error);
      }
    };
    const recommendTime = async () => {
      try {
        const response = await axios.post(
          `${APPLICATION_FAST_SERVER_URL}/fastapi/offline/radio/time`,
          {
            age: {
              10: 19,
              20: 17,
              30: 13,
              40: 20,
              50: 21,
              60: 5,
              70: 5,
            },
          }
        );
        console.log("라디오 시간", response);
        setRecommendedtime(response.data.data.weekend_recommend);
        const weekdaysDatas = [];
        for (let i = 0; i < response.data.data.weekdaysDatas.length; i++) {
          if (response.data.data.weekdaysDatas[i]) {
            weekdaysDatas.push(response.data.data.weekdaysDatas[i]);
          } else {
            weekdaysDatas.push(0);
          }
          setWeekdaysDatas(weekdaysDatas);
        }
        const weekendsDatas = [];
        for (let i = 0; i < response.data.data.weekendsDatas.length; i++) {
          if (response.data.data.weekendsDatas[i]) {
            weekendsDatas.push(response.data.data.weekendsDatas[i]);
          } else {
            weekendsDatas.push(0);
          }
          setWeekendsDatas(weekendsDatas);
        }
      } catch (error) {
        console.log("라디오 시간오류", error);
      }
    };
    const linkproducer = async () => {
      try {
        const response = await axios.get(
          `${APPLICATION_SPRING_SERVER_URL}/api/media/company/4`
        );
        console.log("제작사", response);
        setProducerCardDatas(response.data.data);
      } catch (error) {
        console.log("제작사 오류", error);
      }
    };
    recommendMedia();
    recommendPrice();
    recommendRadioChannel();
    recommendTime();
    linkproducer();
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
        <OfflineMediaRecommendation
          mediaLabels={mediaLabels}
          subMediaLabels={subMediaLabels}
          mainDatas={mainDatas}
          subDatas={subDatas}
          priceLabels={priceLabels}
          prices={prices}
          recommendedMedia={recommendedMedia}
        ></OfflineMediaRecommendation>
      </Box>
      <Hr />
      <Box>
        <ChannelRecommendation
          title={`추천 드리는 라디오 채널은 ${recommendedRadioChennl} 입니다.`}
          datas={radioChannelDatas}
          labels={radioChannelLabels}
          description={`${target}이 시청하는 라디오 채널 통계`}
        ></ChannelRecommendation>
      </Box>
      <Box>
        <TimeRecommendation
          weekdaysDatas={weekdaysDatas}
          weekendsDatas={weekendsDatas}
          description={`${target}이 라디오를 시청하는 시간대 데이터`}
          recommendedtime={recommendedtime}
        ></TimeRecommendation>
      </Box>
      <Hr />
      <Box>
        <ProducerTitleItem>라디오 광고 제작사</ProducerTitleItem>
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
export default RadioRecommendation;
