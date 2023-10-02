import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import OpenAI from 'openai';

import styled from 'styled-components';
import Select from '../../atoms/SelectOption';
import MediaSelectOption from '../../organisms/MediaSelectOption';
import Button from '../../atoms/Button';
import { TextField } from '@mui/material';
import { Chip } from '@mui/material';

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === 'production' ? 'https://j9c107.p.ssafy.io' : 'http://j9c107.p.ssafy.io:8080';

const Container = styled.div`
  margin: 0 320px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
`;
const Paragraph = styled.p`
  text-align: start;
`;
const Title = styled.p`
  font-size: 32px;
  margin: 10px 20px 50px 0px;
  font-weight: 700;
`;
const Box = styled.div`
  margin: 50px 0px 50px 0px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
`;
const Bunch = styled.div`
  margin: 100px 0px 20px 0px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
`;
const Bundle = styled.div`
  margin: 0px 0px 0px 0px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
`;

export const ContentRecommendPage = () => {
  // 매체 선택 리스트
  const [mediaList, setMediaList] = useState([]);

  // 분류 관련 변수
  const [selectDataL, setSelectDataL] = useState(null);
  const [selectDataM, setSelectDataM] = useState(null);
  const [selectDataS, setSelectDataS] = useState(null);
  const [dataL, setDataL] = useState([]);
  const [dataM, setDataM] = useState([]);
  const [dataS, setDataS] = useState([]);
  // const [defaultSelectL, setDfaultSelectL] = useSelector();

  const [media, setMedia] = useState('신문');
  const [keywords, setKeywords] = useState(['신소재', '경량']);
  const [category, setCategory] = useState({
    major: '레포츠/문화/취미',
    middle: '레저/스포츠',
    minor: '스포츠용품점'
  });
  const [adContent, setAdContent] = useState({
    phrase: '',
    scenario: {
      title: '',
      content: ''
    }
  });

  async function getRecommend(media, keywords, category, setAdContent) {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const openai = new OpenAI({
      apiKey: API_KEY,
      dangerouslyAllowBrowser: true
    });
    try {
      // Construct the message for OpenAI
      const message = `나는 ${media} 매체에서 광고하려고 합니다. 주요 키워드는 ${keywords.join(
        ', '
      )}입니다. 광고의 업종은 ${category.major} > ${category.middle} > ${
        category.minor
      }입니다. 이를 기반으로 광고 문구와 시나리오를 추천해주세요.`;

      // Call OpenAI API
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
        temperature: 0.8, // 모델의 출력 다양성
        max_tokens: 1024, // 응답받을 메시지 최대 토큰(단어) 수 설정
        top_p: 1, // 토큰 샘플링 확률을 설정
        frequency_penalty: 0.5, // 일반적으로 나오지 않는 단어를 억제하는 정도
        presence_penalty: 0.5 // 동일한 단어나 구문이 반복되는 것을 억제하는 정도
      });

      console.log(response.choices);

      // Extract the recommendation from the response
      const recommendation = response.data.choices[0].message.content.split('\n');

      // Extract phrase and scenario
      const phrase = recommendation[0];
      let scenario = {};

      if (media === 'TV' || media === '라디오') {
        scenario.title = recommendation[1];
        scenario.content = recommendation.slice(2).join('\n');
      }

      // Set the state with the recommendation
      setAdContent({
        phrase: phrase,
        scenario: scenario
      });
    } catch (error) {
      console.error('Error getting recommendation:', error);
    }
  }

  // 대분류, 중분류, 소분류 관련 effect들
  useLayoutEffect(() => {
    const getMediaData = async () => {
      try {
        const response = await axios.get(`${APPLICATION_SERVER_URL}/api/media`);
        if (response.data.success) {
          console.log(response.data);
          // setMediaList(response.data);
        }
      } catch (error) {
        console.log('Media Error!!', error);
      }
    };
    const getDataL = async () => {
      try {
        const response = await axios.get(`${APPLICATION_SERVER_URL}/api/product/L/0`);
        if (response.data.success) {
          console.log(response.data);
          setDataL(response.data.data);
        }
      } catch (error) {
        console.log('Error!!', error);
      }
    };

    getMediaData();
    getDataL();
  }, []);
  useEffect(() => {
    const getDataM = async () => {
      try {
        const response = await axios.get(`${APPLICATION_SERVER_URL}/api/product/M/${selectDataL}`);
        if (response.data.success) {
          console.log(response.data);
          setDataM(response.data.data);
        }
      } catch (error) {
        console.log('Error!!', error);
      }
    };
    getDataM();
  }, [selectDataL]);
  useEffect(() => {
    const getDataS = async () => {
      try {
        const response = await axios.get(APPLICATION_SERVER_URL + `/api/product/S/${selectDataM}`);
        if (response.data.success) {
          console.log(response.data);
          setDataS(response.data.data);
        }
      } catch (error) {
        console.log('Error!!', error);
      }
    };

    getDataS();
  }, [selectDataM]);

  return (
    <Container>
      <h1>광고 매체를 선택해주세요</h1>
      <Box>
        <Select width="700px"></Select>
      </Box>
      <h1>광고 품목을 선택해 주세요</h1>
      <MediaSelectOption
        dataL={dataL}
        dataM={dataM}
        dataS={dataS}
        onSelectL={setSelectDataL}
        onSelectM={setSelectDataM}
        onSelectS={setSelectDataS}
        width="200px"
      ></MediaSelectOption>
      <Bunch>
        <Title>키워드를 입력해주세요</Title>
        <Button
          backgroundColor="white"
          width="180px"
          height="50px"
          textColor="#3C486B"
          fontSize="16px"
          border="solid 1px"
        >
          좋아요한 키워드+
        </Button>
      </Bunch>
      <Bundle>
        <Select width="600px"></Select>
        <Button
          backgroundColor="#3C486B"
          width="150px"
          height="50px"
          textColor="white"
          fontSize="24px"
          onClick={() => {
            getRecommend(media, keywords, category, setAdContent);
          }}
        >
          추가
        </Button>
      </Bundle>
      <Bundle>
        <Chip
          label="Clickable Deletable"
          // onClick={handleClick}
          // onDelete={handleDelete}
        />
      </Bundle>
      <div>
        <h2>광고 문구</h2>
        <p>{adContent.phrase}</p>

        <h2>시나리오</h2>
        <h3>{adContent.scenario.title}</h3>
        <p>{adContent.scenario.content}</p>
      </div>
    </Container>
  );
};

export default ContentRecommendPage;
