import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import OpenAI from 'openai';

import styled from 'styled-components';
import Select from '../../atoms/SelectOption';
import MediaSelectOption from '../../organisms/MediaSelectOption';
import Button from '../../atoms/Button';
import { TextField } from '@mui/material';
import { Chip } from '@mui/material';

const APPLICATION_SPRING_SERVER_URL =
  process.env.NODE_ENV === 'production' ? 'https://j9c107.p.ssafy.io' : 'http://j9c107.p.ssafy.io:8080';

const APPLICATION_FAST_SERVER_URL =
  process.env.NODE_ENV === 'production' ? 'https://j9c107.p.ssafy.io' : 'http://j9c107.p.ssafy.io:8000';

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

  // 매체 리스트
  const [mediaList, setMediaList] = useState([]);
  const [mediaText, setMediaText] = useState([]);
  const [media, setMedia] = useState(null);
  const [keywords, setKeywords] = useState(['에듀윌', '공무원시험', '합격']);
  const [category, setCategory] = useState({
    major: 'selectDataL',
    middle: 'selectDataM',
    minor: 'selectDataS'
  });
  const [phrase, setPhrase] = useState([]);
  const [scenario, setScenario] = useState([
    {
      title: '',
      content: ''
    }
  ]);

  function getMediaText() {
    const targetMediaData = mediaList.find((data) => data.id === media);
    const mediaText = targetMediaData ? targetMediaData.area : null;
    console.log('매체명', mediaText);
    console.log(mediaList);
    console.log(media);
  }
  async function getRecommend(media, keywords, category, setPhrase, setScenario) {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const openai = new OpenAI({
      apiKey: API_KEY,
      dangerouslyAllowBrowser: true
    });
    getMediaText();
    try {
      // media가 TV, 라디오인 경우
      if (['TV', '라디오'].includes(media)) {
        console.log('시나리오 추천받는 중');
        const scenarioMessage = `나는 ${mediaText} 매체에서 광고하려고 합니다. 주요 키워드는 ${keywords.join(
          ', '
        )}입니다. 광고의 업종은 ${category.major} > ${category.middle} > ${
          category.minor
        }입니다. 음악의 경우 저작권이 없는 ncm 혹은 클래식을 위주로 해주세요. 
        예산의 경우 고려하지 않고 진행합니다. 
        광고 시나리오에는 반드시 각각 제목을 달고 '제목: 시나리오제목'의 형식으로 해주세요. 
        대사도 추가해서 작성해주세요.
        광고 시나리오 2개를 추천해주세요.`;

        const scenarioResponse = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: scenarioMessage }],
          temperature: 0.8,
          max_tokens: 3000,
          top_p: 1,
          frequency_penalty: 0.5,
          presence_penalty: 0.5
        });

        console.log(scenarioResponse.choices[0].message.content);
        // "제목:"이라는 문자열을 기준으로 시나리오들을 분리
        const scenarioStrings = scenarioResponse.choices[0].message.content.split('제목:').slice(1);

        // 각 시나리오 문자열을 처리하여 원하는 객체 형태로 변형
        const scenarios = scenarioStrings.map((s) => {
          const lines = s.trim().split('\n');
          const title = lines[0].replace(/["]/g, '').trim();
          const content = lines.slice(1).join('\n').replace('시나리오:\n', '').trim();
          return { title, content };
        });
        console.log(scenarios);
        setScenario(scenarios);

        // media가 TV, 라디오가 아닌 다른 경우
      } else {
        console.log('문구 추천받는 중');
        const phraseMessage = `나는 ${media} 매체에서 광고하려고 합니다. 주요 키워드는 ${keywords.join(
          ', '
        )}입니다. 광고의 업종은 ${category.major} > ${category.middle} > ${
          category.minor
        }입니다. 광고 문구 5개를 추천해주세요. 광고 문구의 경우 숫자를 통해 시작하지 않고 바로 문장이 시작되고 줄바꿈을 통해서 구분해주었으면해.`;

        const phraseResponse = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: phraseMessage }],
          temperature: 0.8,
          max_tokens: 1024,
          top_p: 1,
          frequency_penalty: 0.5,
          presence_penalty: 0.5
        });

        if (phraseResponse.created) {
          console.log(phraseResponse.choices[0].message.content);

          const receiveMessage = phraseResponse.choices[0].message.content;
          const processedPhrase = receiveMessage.split('\n').map((str) => str.replace(/^\d+\.\s*/, ''));
          setPhrase(processedPhrase);
          console.log(phrase);
        }
      }
    } catch (error) {
      console.error('Error getting recommendation:', error);
    }
  }

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
    const getMedia = async () => {
      try {
        const mediumResponse = await axios.get(`${APPLICATION_SPRING_SERVER_URL}/api/media/type/largeMedium/0`);
        const smallResponse = await axios.get(`${APPLICATION_SPRING_SERVER_URL}/api/media/type/small/6`);
        if (mediumResponse.data.success && smallResponse.data.success) {
          console.log(mediumResponse.data);
          console.log(smallResponse.data);
          const mediumMediaList = mediumResponse.data.data
            .map((item) => {
              return { id: item.id, medium: item.medium };
            })
            .slice(0, -1); // 옥외 제거

          // smallResponse에서 "type"을 "medium"으로 이름 변경
          const smallMediaList = smallResponse.data.data.map((item) => {
            return { medium: item.type };
          });

          // 두 리스트 합치기
          const combinedMediaList = [...mediumMediaList, ...smallMediaList];

          // 새로운 ID 부여
          const swappedMediaList = combinedMediaList.map((item, index) => {
            return { id: index + 1, medium: item.medium };
          });

          // console.log('수정된 리스트', swappedMediaList);

          // 수정된 데이터를 상태로 설정합니다.
          setMediaList(swappedMediaList);
        }
      } catch (error) {
        console.log('getTargetError!!', error.response ? error.response.data : error);
      }
    };

    getDataL();
    getMedia();
  }, []);
  useEffect(() => {
    const selectedL = selectDataL !== null ? selectDataL : defaultSelectL;
    const getDataM = async () => {
      try {
        const response = await axios.get(APPLICATION_SPRING_SERVER_URL + `/api/product/M/${selectedL}`);
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
        const response = await axios.get(APPLICATION_SPRING_SERVER_URL + `/api/product/S/${selectedM}`);
        if (response.data.success) {
          console.log(response.data.data);
          setDataS(response.data.data);
        }
      } catch (error) {
        console.log('Error!!', error);
      }
    };

    getDataS();
  }, [selectDataM, defaultSelectM]);

  return (
    <Container>
      <h1>광고 매체를 선택해주세요</h1>
      <Box>
        <Select data={mediaList} onSelect={setMedia} width="700px"></Select>
      </Box>
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
          onClick={() => { getMediaText() }}
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
      <Button
        backgroundColor="#3C486B"
        width="400px"
        height="50px"
        textColor="white"
        fontSize="24px"
        onClick={() => {
          getRecommend(media, keywords, category, setPhrase, setScenario);
        }}
      >
        추천 결과 보기
      </Button>
      <div>
        <h2>광고 문구</h2>
        {phrase.map((p, index) => (
          <p key={index}>{p}</p>
        ))}
        <h2>시나리오</h2>
        {scenario.map((item, index) => (
          <div key={index}>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </div>
        ))}
        ;
      </div>
    </Container>
  );
};

export default ContentRecommendPage;
