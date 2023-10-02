import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
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
} from "./OutdoorRecommendation";
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

export const OutdoorRecommendation = () => {
  const navigate = useNavigate();
  const { kakao } = window;
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
  const recommendedMedia = "옥외 광고"; // state
  // const recommendedMedia = useSelector((state) => state.result.recommendedMedia);
  const recommendedRegion = "장덕동"; //API 광고 장소 분석
  // const recommendedRegion = data[0].type
  const regionLabels = ["장덕동", "첨단 1동", "수완동", "하남동", "송정 1동"]; //API 광고 장소 분석
  // const regionLabels = [];
  // for (let i = 0; i < data.length; i++) {
  //   if (data[i]) {
  //     regionLabels.push(data[i].type);
  //   } else {
  //     regionLabels.push(0);
  //   }
  // }
  const regionDatas = [80, 60, 45, 42, 32, 29, 19, 5]; // 광고 장소 분석 API
  // const regionDatas = [];
  // for (let i = 0; i < data.length; i++) {
  //   if (data[i]) {
  //     regionDatas.push(data[i].ratio);
  //   } else {
  //     regionDatas.push(0);
  //   }
  // }
  const busLabels = ["장덕동", "첨단 1동", "수완동", "하남동", "송정 1동"]; // 버스 정류장 분석 API
  // const busLabels = [];
  // for (let i = 0; i < data.length; i++) {
  //   if (data[i]) {
  //     busLabels.push(data[i].type);
  //   } else {
  //     busLabels.push(0);
  //   }
  // }
  const busDatas = [80, 60, 45, 42, 32, 29, 19, 5]; // 버스 정류장 분석 API
  // const busDatas = [];
  // for (let i = 0; i < data.length; i++) {
  //   if (data[i]) {
  //     busDatas.push(data[i].ratio);
  //   } else {
  //     busDatas.push(0);
  //   }
  // }
  const subwayLabels = ["문화전당", "금난로 4가", "상무"]; // 지하철역 분석 API
  // const subwayLabels = [];
  // for (let i = 0; i < data.length; i++) {
  //   if (data[i]) {
  //     subwayLabels.push(data[i].station);
  //   } else {
  //     subwayLabels.push(0);
  //   }
  // }
  const subwayDatas = [80, 60, 45, 42, 32, 29, 19, 5]; // 지하철역 분석 API
  // const subwayDatas = [];
  // for (let i = 0; i < data.length; i++) {
  //   if (data[i]) {
  //     subwayDatas.push(data[i].ratio);
  //   } else {
  //     subwayDatas.push(0);
  //   }
  // }
  const bigRegion = "광주 광역시"; //state
  // const bigRegion = useSelector((state) => state.result.selectedBigRegion);
  const smallRegion = "광산구"; //state
  // const smallRegion = useSelector((state) => state.result.selectedSmallRegion);
  const addresses = ["무진대로211번길 28", "월계로 109", "하남산단6번로 107"]; // 현수막 장소 분석 API
  // const addresses = [];
  // for (let i = 0; i < data.length; i++) {
  //   if (data[i]) {
  //     addresses.push(data[i].address);
  //   } else {
  //     addresses.push(0);
  //   }
  // }
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
  const [producerCardDatas, setProducerCardDatas] = useState({});
  const [producerCardDatas2, setProducerCardDatas2] = useState({});
  const [producerCardDatas3, setProducerCardDatas3] = useState({});
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
    const linkproducer = async () => {
      try {
        const response = await axios.get(
          `${APPLICATION_SPRING_SERVER_URL}/api/media/company/6?mediaSubId=1`
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
          `${APPLICATION_SPRING_SERVER_URL}/api/media/company/6?mediaSubId=2`
        );
        console.log("제작사", response);
        setProducerCardDatas2(response.data.data);
      } catch (error) {
        console.log("제작사 오류", error);
      }
    };
    const linkproducer3 = async () => {
      try {
        const response = await axios.get(
          `${APPLICATION_SPRING_SERVER_URL}/api/media/company/6?mediaSubId=3`
        );
        console.log("제작사", response);
        setProducerCardDatas3(response.data.data);
      } catch (error) {
        console.log("제작사 오류", error);
      }
    };
    recommendMedia();
    recommendPrice();
    linkproducer();
    linkproducer2();
    linkproducer3();
  }, []);

  useEffect(() => {
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(35.1595454, 126.8526012),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const geocoder = new kakao.maps.services.Geocoder();

    addresses.forEach((address) => {
      geocoder.addressSearch(address, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          new kakao.maps.Marker({
            map: map,
            position: coords,
          });

          map.setCenter(coords);
        }
      });
    });
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
          title={`추천 드리는 지역은 ${recommendedRegion} 입니다.`}
          datas={regionDatas}
          labels={regionLabels}
          description={`${bigRegion} ${smallRegion}에 거주하는 ${target} 통계`}
        ></ChannelRecommendation>
      </Box>
      <Hr />
      <Box>
        <ChannelRecommendation
          title="버스 정류장 옥외 광고"
          datas={busDatas}
          labels={busLabels}
          description={`${recommendedRegion}에 있는 버스 정류장 승하차량 통계`}
        ></ChannelRecommendation>
      </Box>
      <Hr />
      <Box>
        <ChannelRecommendation
          title="지하철 옥외 광고"
          datas={subwayDatas}
          labels={subwayLabels}
          description={`${bigRegion}에 있는 지하철 역 승하차량 통계`}
        ></ChannelRecommendation>
      </Box>
      <Hr />
      <Box>
        <ProducerTitleItem>현수막 옥외광고</ProducerTitleItem>
        <div
          id="myMap"
          style={{
            width: "100%",
            height: "600px",
          }}
        ></div>
      </Box>
      <Hr />
      <Box>
        <ProducerTitleItem>버스 정류장 옥외 광고 제작사</ProducerTitleItem>
        {showProducer && (
          <ProducerRecommendation cardDatas={producerCardDatas} />
        )}
      </Box>
      <Box>
        <ProducerTitleItem>지하철 역 옥외 광고 제작사</ProducerTitleItem>
        {showProducer && (
          <ProducerRecommendation cardDatas={producerCardDatas2} />
        )}
        <ProducerTitleItem>현수막 옥외 광고 제작사</ProducerTitleItem>
        {showProducer && (
          <ProducerRecommendation cardDatas={producerCardDatas3} />
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

export default OutdoorRecommendation;
