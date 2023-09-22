import React, { useState } from "react";
import ReadOnly from "../atoms/ReadOnly"
import MakeButton from "../atoms/Button";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import user from '../../assets/img/user.png';
import styled from "styled-components";
import ClearIcon from '@mui/icons-material/Clear';

const ImgBox = styled.img`
    width: 201px;
    height: 212px;
    border-radius: 4px;
    margin-top: 15px;
    margin-bottom: 30px;
`

const ValidContainer = styled.div`
  display: flex; /* Flexbox 레이아웃 사용 */
  align-items: flex-start; /* 아이템을 왼쪽으로 정렬 */
  flex-direction: column;
 `

const ConfirmContainer = styled.div`
  display: flex;
  align-items: flex-end;
`

const IconContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 656,
  height: 818,
  bgcolor: 'background.paper',
  border: '1px solid #fff',
  borderRadius: 1,
  p: 4,
};


function FixedInfo() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const checkMail = async (e) => {
    e.preventDefault();
    console.log(1)
  }

    return (
      <div className="fixedInfo">
       <ReadOnly></ReadOnly>
       <ReadOnly></ReadOnly>
       <MakeButton 
        width="116px"
        height="40px"
        backgroundColor="#3C486B"
        textColor="white"
        onClick={handleOpen}
        >
            정보 수정
        </MakeButton>

        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconContainer>
            <ClearIcon onClick={handleClose}></ClearIcon>
          </IconContainer>
          <form>
            <h1>정보 수정</h1>
            <ImgBox src={user} alt="유저이미지"></ImgBox>
            <ValidContainer>
            <ConfirmContainer>
              <input className="e2Input" type="email" placeholder="이메일" required/> 
              <MakeButton backgroundColor="white"
                width="90px"
                height="56px"
                border="1px solid #3C486B"
                textColor="#3C486B"
                fontSize="16px"
                onClick = {checkMail}
              >
                중복 확인
              </MakeButton>
            </ConfirmContainer>
            <p></p>
          </ValidContainer>
          <ValidContainer>
          <input className="pw2Input" type="password" placeholder="비밀번호" required/>
          <p></p>
        </ValidContainer>
        <ValidContainer>
          <input className="pw2Input" type="password" placeholder="비밀번호 확인" required/>
          <p></p>
        </ValidContainer>
        <MakeButton 
          width="106px"
          height="59px"
          backgroundColor="#3C486B"
          textColor="white"
          fontSize="20px"
        >
            수정
        </MakeButton>
          </form>
        </Box>
      </Modal>

      </div>
    );
  }
  
  export default FixedInfo;