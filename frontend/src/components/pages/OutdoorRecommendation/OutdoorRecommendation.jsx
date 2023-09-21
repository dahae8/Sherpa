import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import RecommendTarget from "../../organisms/RecommendTarget";
import OfflineMediaRecommendation from "../../organisms/OfflineMediaRecommendation";
import ChannelRecommendation from "../../organisms/ChannelRecommendation";
import ProducerRecommendation from "../../organisms/ProducerCardList";
import Buttons from "../../organisms/ResultPageButtens";

const { kakao } = window;
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

export const OutdoorRecommendation = () => {
  const ageDatas = [80, 60, 45, 42, 32, 29]; //API
  const target = "30대 남성"; //API
  const percent = [75, 25]; //API
  const mainDatas = [23, 19, 13, 5]; //API
  const subDatas = [23, 19, 13, 5]; //API
  const prices = [23, 19, 13, 5]; //API
  const recommendedMedia = "옥외 광고"; //API
  const tvChannelDatas = [80, 60, 45, 42, 32, 29, 19, 5]; //API
  const recommendedRegion = "장덕동"; //API
  const bigRegion = "광주 광역시";
  const smallRegion = "광산구";
  const producerCardDatas = [
    { img: "url", title: "대한민국 명산 도전", url: "url" },
    { img: "url", title: "램블러", url: "url" },
    { img: "url", title: "놀자", url: "url" },
    { img: "url", title: "길잡이", url: "url" },
  ]; //API
  const addresses = ["무진대로211번길 28", "월계로 109", "하남산단6번로 107"]; //API

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

          const marker = new kakao.maps.Marker({
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
          datas={ageDatas}
          target={target}
          percent={percent}
        ></RecommendTarget>
      </TargetBox>
      <Hr />
      <Box>
        <OfflineMediaRecommendation
          mainDatas={mainDatas}
          subDatas={subDatas}
          prices={prices}
          recommendedMedia={recommendedMedia}
        ></OfflineMediaRecommendation>
      </Box>
      <Hr></Hr>
      <Box>
        <ChannelRecommendation
          title={`추천 드리는 지역은은 ${recommendedRegion} 입니다.`}
          datas={tvChannelDatas}
          labels={["장덕동", "첨단 1동", "수완동", "하남동", "송정 1동"]}
          description={`${bigRegion} ${smallRegion}에 거주하는 ${target} 통계`}
        ></ChannelRecommendation>
      </Box>
      <Hr></Hr>
      <Box>
        <ChannelRecommendation
          title="버스 정류장 옥외 광고"
          datas={tvChannelDatas}
          labels={["장덕동", "첨단 1동", "수완동", "하남동", "송정 1동"]}
          description={`${recommendedRegion}에 있는 버스 정류장 승하차량 통계`}
        ></ChannelRecommendation>
      </Box>
      <Hr></Hr>
      <Box>
        <ChannelRecommendation
          title="지하철 옥외 광고"
          datas={tvChannelDatas}
          labels={["문화전당", "금난로 4가", "상무"]}
          description={`${bigRegion}에 있는 지하철 역 승하차량 통계`}
        ></ChannelRecommendation>
      </Box>
      <Hr></Hr>
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
      <Hr></Hr>
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
