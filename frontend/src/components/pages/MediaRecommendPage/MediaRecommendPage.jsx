import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';

import styled from 'styled-components';
import MediaSelectOption from '../../organisms/MediaSelectOption';
import { TextField } from '@mui/material';
import Button from '../../atoms/Button';
import Select from '../../atoms/SelectOption';

const Container = styled.div`
  margin: 0 320px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
`;
const Box = styled.div`
  margin: 150px 0px 150px 0px;
`;
const Paragraph = styled.p`
  text-align: start;
`;
const RecommendSelect = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: space-evenly;
  justify-content: space-between;
`;
const BudgetAdvertisement = styled.div`
  width: 40%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;
const ChooseKindOfRecommend = styled.div`
  display: flex;
  width: 40%;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
`;
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Choosesido = styled.div`
  width: 40%;
`;
const Choosedong = styled.div`
  width: 40%;
`;

export const MediaRecommendPage = () => {
  const [selectDataL, setSelectDataL] = useState(null);
  const [selectDataM, setSelectDataM] = useState(null);
  const [selectDataS, setSelectDataS] = useState(null);
  const [dataL, setDataL] = useState([]);
  const [dataM, setDataM] = useState([]);
  const [dataS, setDataS] = useState([]);

  useLayoutEffect(() => {
    // Fetch initial data for type "L"
    axios
      .get('http://j9c107.p.ssafy.io:8080/api/product/L/0')
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
          setDataL(response.data.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching initial data:', error);
      });
  }, []);
  useEffect(() => {
    if (selectDataL) {
      axios
        .get('http://j9c107.p.ssafy.io:8080/api/product/M/' + selectDataL)
        .then((response) => {
          if (response.data.success) {
            setDataM(response.data.data);
          }
        })
        .catch((error) => {
          console.error('Error fetching M type data:', error);
        });
    }
  }, [selectDataL]);
  useEffect(() => {
    if (selectDataM) {
      axios
        .get('http://j9c107.p.ssafy.io:8080/api/product/S/' + selectDataM)
        .then((response) => {
          if (response.data.success) {
            setDataS(response.data.data);
          }
        })
        .catch((error) => {
          console.error('Error fetching S type data:', error);
        });
    }
  }, [selectDataM]);

  return (
    <Container>
      <h1>매체 추천</h1>
      <h3>광고품목에 적합한 매체를 추천해드립니다.</h3>
      <h3>품목</h3>
      <MediaSelectOption
        dataL={dataL}
        dataM={dataM}
        dataS={dataS}
        onSelectL={setSelectDataL}
        onSelectM={setSelectDataM}
        onSelectS={setSelectDataS}
      ></MediaSelectOption>
      <RecommendSelect>
        <BudgetAdvertisement>
          <Paragraph>내가 생각하는 광고 최대 예산</Paragraph>
          <TextField></TextField>
        </BudgetAdvertisement>
        <ChooseKindOfRecommend>
          <Paragraph>온/오프라인</Paragraph>
          <Buttons>
            <Button backgroundColor="#3C486B" width="40%" height="50px" textColor="white" fontSize="24px">
              온라인
            </Button>
            <Button backgroundColor="#3C486B" width="40%" height="50px" textColor="white" fontSize="24px">
              오프라인
            </Button>
          </Buttons>
        </ChooseKindOfRecommend>
        <Choosesido>
          <Paragraph>광고 지역 선택</Paragraph>
          <Select></Select>
        </Choosesido>
        <Choosedong>
          <Paragraph>광고 상세 지역 선택</Paragraph>
          <Select></Select>
        </Choosedong>
      </RecommendSelect>
      <Box>
        <Button backgroundColor="#3C486B" width="30%" height="50px" textColor="white" fontSize="24px">
          추천받기
        </Button>
      </Box>
    </Container>
  );
};
export default MediaRecommendPage;
