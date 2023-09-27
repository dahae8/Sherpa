import React, { useEffect, useState, useRef } from "react";
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
} from "./OutdoorRecommendation";

export const OutdoorRecommendation = () => {
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
  const subMediaLabels = ["TV 광고", "라디오 광고", "신문 광고", "옥외광고"]; // 오프라인 매체 추천 - 품목/매체별 호감도 API 통신
  const priceLabels = ["TV 광고", "라디오 광고", "신문 광고", "옥외광고"]; // 오프라인 매체 추천 - 예산 필터링 API 통신
  const mainDatas = [23, 19, 13, 5]; // state
  // const mainDatas = useSelector((state) => state.result.media);
  const subDatas = [23, 19, 13, 5]; // 오프라인 매체 추천 - 품목/매체별 호감도 API 통신
  const prices = [23, 19, 13, 5]; // 오프라인 매체 추천 - 예산 필터링 API 통신
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
  const producerCardDatas = [
    { img: "url", title: "대한민국 명산 도전", url: "url" },
    { img: "url", title: "램블러", url: "url" },
    { img: "url", title: "놀자", url: "url" },
    { img: "url", title: "길잡이", url: "url" },
  ]; // 광고 제작사 리스트 받아오기 API
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
        <ProducerTitleItem>
          버스 정류장 / 지하철 역 옥외 광고 제작사
        </ProducerTitleItem>
        <ProducerRecommendation
          cardDatas={producerCardDatas}
        ></ProducerRecommendation>
      </Box>
      <Box>
        <ProducerTitleItem>현수막 옥외 광고 제작사</ProducerTitleItem>
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

export default OutdoorRecommendation;
