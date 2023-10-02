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
const KeyBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;
  margin-left: 25px;
  
`

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 500,
  bgcolor: 'background.paper',
  border: '1px solid #fff',
  borderRadius: 1,
  p: 4,
  padding: 7,
};

function KeywordCard() {
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
        점보도시락
        <br></br>
        진라면
        <br></br>
        컵누들
        <br></br>
        사리곰탕
      </TitleBox>
      <Chip label="#선크림" />
      <UrlBox>
        <UrlItem onClick={handleOpen}>>> 키워드 더보기</UrlItem>
      </UrlBox>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} overflow="auto">
          <Chip label="#선크림" />
          <Typography fontSize={40} align="center">
            키워드
          </Typography>
          <KeyBox>
          <Typography fontSize={24}>
            톤업선크림
          </Typography>
          <CancelIcon fontSize="large" color="disabled"></CancelIcon>
          </KeyBox>
        </Box>
      </Modal>

    </Container>
  );
}

export default KeywordCard;
