import React, { useState, useLayoutEffect, useEffect } from "react";
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
} from "./TvRecommendation";
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

export const TvRecommendation = () => {
  const navigate = useNavigate();
  const ages = [80, 60, 45, 42, 32, 29]; // state
  // const ages = useSelector((state) => state.result.target);
  const male = 75; // state
  // const male = useSelector((state) => state.result.target);
  const female = 25; // state
  // const female = useSelector((state) => state.result.target);
  const gender = 1; // state
  // const gender = useSelector((state) => state.result.target);
  const age = 30; // state
  // const age = useSelector((state) => state.result.target);
  const mediaLabels = ["TV 광고", "라디오 광고", "신문 광고", "옥외광고"]; // state
  // const mediaLabels = useSelector((state) => state.result.media);
  const mainDatas = [23, 19, 13, 5]; // state
  // const mainDatas = useSelector((state) => state.result.media);
  const recommendedMedia = "TV 영상 광고"; // state
  // const recommendedMedia = useSelector((state) => state.result.recommendedMedia);
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
  const [recommendedTvChennl, setRecommendedTvChennl] = useState("");
  const [tvLabels, setTvLabels] = useState([]);
  const [tvChannelDatas, setTvChannelDatas] = useState([]);
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
            prices.push(response.data.data.budgetList[i].value);
          } else {
            prices.push(0);
          }
          setPrices(prices);
        }
      } catch (error) {
        console.error("추천 가격 가져오기 오류:", error);
      }
    };
    const recommendTvChannel = async () => {
      try {
        const response = await axios.post(
          `${APPLICATION_FAST_SERVER_URL}/fastapi/offline/tv`,
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
        console.log("tv채널", response);
        setRecommendedTvChennl(response.data.data.tvList[0].type);
        const tvLabels = [];
        for (let i = 0; i < response.data.data.tvList.length; i++) {
          if (response.data.data.tvList[i]) {
            tvLabels.push(response.data.data.tvList[i].type);
          } else {
            tvLabels.push(0);
          }
        }
        setTvLabels(tvLabels);
        const tvChannelDatas = [];
        for (let i = 0; i < response.data.data.tvList.length; i++) {
          if (response.data.data.tvList[i]) {
            tvChannelDatas.push(response.data.data.tvList[i].ratio);
          } else {
            tvChannelDatas.push(0);
          }
        }
        setTvChannelDatas(tvChannelDatas);
      } catch (error) {
        console.error("tv채널 오류:", error);
      }
    };
    const recommendTime = async () => {
      try {
        const response = await axios.post(
          `${APPLICATION_FAST_SERVER_URL}/fastapi/offline/tv/time`,
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
        console.log("tv시간", response);
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
        for (let i = 0; i < response.data.data.weekendssDatas.length; i++) {
          if (response.data.data.weekdaysDatas[i]) {
            weekendsDatas.push(response.data.data.weekendssDatas[i]);
          } else {
            weekendsDatas.push(0);
          }
          setWeekendsDatas(weekendsDatas);
        }
      } catch (error) {
        console.log("tv시간오류", error);
      }
    };
    const linkproducer = async () => {
      try {
        const response = await axios.get(
          `${APPLICATION_SPRING_SERVER_URL}/api/media/company/3`
        );
        console.log("제작사", response);
        setProducerCardDatas(response.data.data);
      } catch (error) {
        console.log("제작사 오류", error);
      }
    };
    recommendMedia();
    recommendPrice();
    recommendTvChannel();
    recommendTime();
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
          title={`추천 드리는 TV 채널은 ${recommendedTvChennl} 입니다.`}
          datas={tvChannelDatas}
          labels={tvLabels}
          description={`${age}대 ${target}이 시청하는 TV 프로그램 통계`}
        ></ChannelRecommendation>
      </Box>
      <Hr />
      <Box>
        <TimeRecommendation
          weekdaysDatas={weekdaysDatas}
          weekendsDatas={weekendsDatas}
          description={`${age}대 ${target}이 TV를 시청하는 시간대 데이터`}
          recommendedtime={recommendedtime}
        ></TimeRecommendation>
      </Box>
      <Hr />
      <Box>
        <ProducerTitleItem>TV 광고 제작사</ProducerTitleItem>
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
export default TvRecommendation;
