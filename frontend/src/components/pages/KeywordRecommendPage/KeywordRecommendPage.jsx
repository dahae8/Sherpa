import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import styled from 'styled-components';
import MediaSelectOption from '../../organisms/MediaSelectOption';
import WordCloud from '../../atoms/WordCloud';

const APPLICATION_SPRING_SERVER_URL =
  process.env.NODE_ENV === 'production' ? 'https://j9c107.p.ssafy.io' : 'http://j9c107.p.ssafy.io:8080';

const APPLICATION_FAST_SERVER_URL =
  process.env.NODE_ENV === 'production' ? 'https://j9c107.p.ssafy.io' : 'http://j9c107.p.ssafy.io:8000';

const Container = styled.div`
  margin: 0 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Clouds = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;
const Bundle = styled.div`
  margin: 0px 0px 0px 0px;
  width: 40%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
`;

export const KeywordRecommendPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 분류 관련 변수
  const defaultSelectL = useSelector((state) => state.user.productLarge);
  const defaultSelectM = useSelector((state) => state.user.productMedium);
  const defaultSelectS = useSelector((state) => state.user.productSmall);
  const [selectDataL, setSelectDataL] = useState(defaultSelectL || null);
  const [selectDataM, setSelectDataM] = useState(defaultSelectM || null);
  const [selectDataS, setSelectDataS] = useState(defaultSelectS || null);
  const [dataL, setDataL] = useState([]);
  const [dataM, setDataM] = useState([]);
  const [dataS, setDataS] = useState([]);

  // 워드 클라우드 변수
  const [adData, setAdData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [showWordCloud, setShowWordCloud] = useState(false); // WordCloud를 보여줄지 결정하는 상태

  useEffect(() => {
    // 1초 후에 showWordCloud 상태를 true로 설정합니다.
    const timerId = setTimeout(() => setShowWordCloud(true), 200);

    // 컴포넌트가 언마운트되면 setTimeout을 클리어합니다.
    return () => clearTimeout(timerId);
  }, []);

  // 대분류, 중분류, 소분류 관련 effect들
  useLayoutEffect(() => {
    const getDataL = async () => {
      try {
        const response = await axios.get(`${APPLICATION_SPRING_SERVER_URL}/api/product/L/0`);
        if (response.data.success) {
          console.log(response.data.data);
          setDataL(response.data.data);
        }
      } catch (error) {
        console.log('Error!!', error);
      }
    };

    getDataL();
  }, []);
  useEffect(() => {
    const selectedL = selectDataL !== null ? selectDataL : defaultSelectL;
    const getDataM = async () => {
      try {
        const response = await axios.get(`${APPLICATION_SPRING_SERVER_URL}/api/product/M/${selectedL}`);
        if (response.data.success) {
          console.log(response.data.data);
          setDataM(response.data.data);
        }
      } catch (error) {
        console.log('Error!!', error);
      }
    };
    getDataM();
  }, [selectDataL, defaultSelectL]);
  useEffect(() => {
    const selectedM = selectDataM !== null ? selectDataM : defaultSelectM;
    const getDataS = async () => {
      try {
        const response = await axios.get(`${APPLICATION_SPRING_SERVER_URL}/api/product/S/${selectedM}`);
        if (response.data.success) {
          console.log(response.data.data);
          setDataS(response.data.data);
        }
      } catch (error) {
        console.log('getDataS!!', error.response ? error.response.data : error);
      }
    };

    getDataS();
  }, [selectDataM, defaultSelectM]);

  useEffect(() => {
    const getAdKeyword = async () => {
      try {
        const adResponse = await axios.get(`${APPLICATION_SPRING_SERVER_URL}/api/keyword/ad/${selectDataS}`);
        if (adResponse.data.success) {
          console.log('기존광고 키워드', adResponse.data);

          // API 응답을 워드클라우드 형식으로 변환
          const words = adResponse.data.data;

          // 'total' 값이 큰 순서대로 정렬하고, 상위 N개만 선택
          const topNWords = words.sort((a, b) => b.total - a.total).slice(0, 40);

          const cloudData = {
            labels: topNWords.map((d) => d.name),
            datasets: [
              {
                label: '',
                data: topNWords.map((d) => d.total)
              }
            ]
          };
          setAdData(cloudData);
        }
      } catch (error) {
        console.log('getAdKeyword!!', error.adResponse ? error.adResponse.data : error);
      }
    };
    const getTrendKeyword = async () => {
      try {
        const trendResponse = await axios.get(`${APPLICATION_SPRING_SERVER_URL}/api/keyword/trend`);
        if (trendResponse.data.success) {
          console.log('트렌드 키워드', trendResponse.data);

          // API 응답을 워드클라우드 형식으로 변환
          const words = trendResponse.data.data;

          // 'total' 값이 큰 순서대로 정렬하고, 상위 N개만 선택
          const topNWords = words.sort((a, b) => b.total - a.total).slice(0, 40);

          const cloudData = {
            labels: topNWords.map((d) => d.name),
            datasets: [
              {
                label: '',
                data: topNWords.map((d) => d.total)
              }
            ]
          };

          setTrendData(cloudData);
        }
      } catch (error) {
        console.log('getTrendKeyword!!', error.trendResponse ? error.trendResponse.data : error);
      }
    };
    console.log('광고 키워드 받아오는 중!!');
    getAdKeyword();
    getTrendKeyword();
  }, [selectDataS]);

  return (
    <Container>
      <h1>광고 품목을 선택해 주세요</h1>
      <MediaSelectOption
        dataL={dataL}
        dataM={dataM}
        dataS={dataS}
        onSelectL={setSelectDataL}
        onSelectM={setSelectDataM}
        onSelectS={setSelectDataS}
        defaultSelectL={defaultSelectL}
        defaultSelectM={defaultSelectM}
        defaultSelectS={defaultSelectS}
        width="200px"
      ></MediaSelectOption>
      <Clouds>
        <Bundle>
          <h1>광고 키워드</h1>
          {showWordCloud && <WordCloud data={adData}></WordCloud>}
        </Bundle>
        <Bundle>
          <h1>트랜드 키워드</h1>
          {showWordCloud && <WordCloud data={trendData}></WordCloud>}
        </Bundle>
      </Clouds>
    </Container>
  );
};
export default KeywordRecommendPage;
