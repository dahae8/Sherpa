import React, { useState } from "react";
import styled from "styled-components";
import Chip from '@mui/material/Chip';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Modal, Typography } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';

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
  text-align: center;
  padding: 10px;
`

const PhraseBox = styled.div`
  /* width: 450px;
  height: 150px; */
  border: 1px solid #DBDBDB;
  border-radius: 4px;
  display: flex;
  align-items:center;
  justify-content: center;
  margin-top: 20px;

`
const Phrase = styled.div`
  padding: 30px;
`
const CancelBox = styled.div`
  padding-right: 15px;
`

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 600,
  bgcolor: 'background.paper',
  border: '1px solid #fff',
  borderRadius: 1,
  p: 4,
  padding: 7,
};


function ContentCard() {
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
        옥외광고
        <br></br>
        문구 추천
      </TitleBox>
      <ChipBox>
      <Chip label="#라면" />
      <Chip label="#맛" color="primary" />
      </ChipBox>
      <UrlBox>
        <UrlItem onClick={handleOpen}>>> 문구 보기</UrlItem>
      </UrlBox>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} overflow="auto">
          <Chip label="#라면" />
          <Chip label="#맛" color="primary" />
          <Typography fontSize={40} align="left">
            문구 추천
          </Typography>
          <FormBox>
          <PhraseBox>
            <Phrase>
            <Typography fontSize={32}>“내가 알던 라면이 아니다! 맛의 차원이 다르다!”</Typography>
            </Phrase>
            <CancelBox>
            <CancelIcon color="disabled"></CancelIcon>
            </CancelBox>
          </PhraseBox>
          <PhraseBox>
            <Phrase>
            <Typography fontSize={32}>“한국인의 정서가 어우러진 가장 맛있는 라면”</Typography>
            </Phrase>
            <CancelBox>
            <CancelIcon color="disabled"></CancelIcon>
            </CancelBox>
          </PhraseBox>
          </FormBox>
        </Box>
      </Modal>
    </Container>
  );
}

export default ContentCard;
