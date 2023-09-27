import React, { useState } from "react";
import styled from "styled-components";
import Chip from '@mui/material/Chip';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Modal, Typography } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import Button from './Button';

const Container = styled.div`
  border: 1px solid #b5b5b5;
  border-radius: 5px;
  padding: 20px;
  width: 315px;
  height: 250px;
  text-align: left;
`;
const TitleBox = styled.div`
  font-size: 24px;
  margin-top: 15px;
  margin-bottom: 30px;
  height: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DateBox = styled.div`
  color: #3C486B;
  `
const ChipBox = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const UrlBox = styled.div`
  text-align: right;
`;
const UrlItem = styled.button`
  background-color: white;
  border: 1px solid white;
  color: #3C486B;
  text-decoration: none;
  font-size: 16px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const FormBox = styled.div`
  display: flex;
  align-items:center;
  justify-content: center;
  flex-direction: column;
  text-align: left;
  padding: 10px;
`

const PhraseBox = styled.div`
  border: 1px solid #DBDBDB;
  border-radius: 4px;
  display: flex;
  align-items:center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 10px;

`
const Phrase = styled.div`
  padding: 30px;
`

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height: 600,
  bgcolor: 'background.paper',
  border: '1px solid #fff',
  borderRadius: 1,
  p: 4,
  padding: 7,
};


function ContentCardB() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container>
      <IconContainer>
      <DateBox>
        2023년 9월 10일
      </DateBox>
      <ClearIcon></ClearIcon>
      </IconContainer>
      <TitleBox>
        TV광고
        <br></br>
        시나리오 추천
      </TitleBox>
      <ChipBox>
      <Chip label="#선크림" />
      <Chip label="#햇빛" color="primary" />
      </ChipBox>
      <UrlBox>
        <UrlItem onClick={handleOpen}>>> 시나리오 보기</UrlItem>
      </UrlBox>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} overflow="auto">
          <Chip label="#선크림" />
          <Chip label="#햇빛" color="primary" />
          <Typography fontSize={40} align="left">
            시나리오 추천
          </Typography>
          <FormBox>
          <PhraseBox>
            <Phrase>
            <Typography fontSize={32}>제목: "햇빛 아래 빛나는 여정, 선크림과 함께"</Typography>
            <br></br>
            <Typography fontSize={24}>장면 1: 해변 풍경
            화면에 아름다운 해변 풍경이 나타납니다. 
            파도 소리와 해변가에서 즐거운 사람들의 웃음소리가 들립니다.
            해변의 모래는 금빛으로 빛나고 있습니다.
            해변에서 행복하게 웃고 노는 가족과 친구들이 화면에 나타납니다.</Typography>
            <br></br>
            <Typography fontSize={24}>나레이션 (음성 오버):      
             "해변에서의 빛나는 순간을 즐기세요. 
              하지만 햇빛으로부터 당신의 피부를 지키세요."</Typography>
            </Phrase>
          </PhraseBox>
            <Button TextColor="white"
              width="70px"
              height="45px"
              border="1px solid #3C486B"
              backgroundColor="#3C486B"
              fontSize="16px"
            >
              삭제
            </Button>
          </FormBox>
        </Box>
      </Modal>
    </Container>
  );
}

export default ContentCardB;
