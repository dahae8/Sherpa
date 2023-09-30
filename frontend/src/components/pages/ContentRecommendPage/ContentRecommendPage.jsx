import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

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

export const MediaRecommendPage = () => {
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

  // 대분류, 중분류, 소분류 관련 effect들
  useLayoutEffect(() => {
    const getMediaData = async () => {
      try {
        const response = await axios.get(`{APPLICATION_SERVER_URL}/api/media`);
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
        const response = await axios.get(APPLICATION_SERVER_URL + `/api/product/L/0`);
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
        const response = await axios.get(APPLICATION_SERVER_URL + `/api/product/M/${selectDataL}`);
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
        <Button backgroundColor="#3C486B" width="150px" height="50px" textColor="white" fontSize="24px">
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
    </Container>
  );
};

export default MediaRecommendPage;
