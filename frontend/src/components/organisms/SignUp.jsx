import React, { useEffect, useState } from 'react';
import SelectAutoWidth from '../atoms/SelectOption';
import styled from 'styled-components';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '../atoms/Button'


const ValidContainer = styled.div`
  display: flex; /* Flexbox 레이아웃 사용 */
  align-items: flex-start; /* 아이템을 왼쪽으로 정렬 */
  flex-direction: column;
 `

const ConfirmContainer = styled.div`
  display: flex;
  align-items: flex-end;
`

function SignUp() {
  const [pwValue, setPwValue] = useState("");
  const [pw2Value, setPw2Value] = useState("");
  const [pw2Helper, setPw2Helper] = useState("안녕");

  useEffect(() => {
    if (pwValue !== pw2Value && pw2Value !== "") {
      setPw2Helper("비밀번호가 일치하지 않습니다.");
    } else {
      setPw2Helper(" ");
    }
  }, [pwValue, pw2Value]);

  return (
    <div className="form-container sign-up-container">
      <form action="#">
        <h1 className="form-title">회원가입</h1>

        <ValidContainer>
          <ConfirmContainer>
            <input className="idInput2" type="text" placeholder="아이디" required/>
            <Button backgroundColor="white"
              width="99px"
              height="56px"
              border="1px solid #3C486B"
              textColor="#3C486B"
              fontSize="16px"
            >
              중복 확인
            </Button>
          </ConfirmContainer>
          <p>아이디를 입력하세요</p>
        </ValidContainer>
        <ValidContainer>
          <input className="pwInput" type="password" placeholder="비밀번호" value={pwValue} onChange={(e) => { setPwValue(e.target.value);}} required/>
          <p></p>
        </ValidContainer>
        <ValidContainer>
          <input className="pwInput" type="password" placeholder="비밀번호 확인" value={pw2Value} onChange={(e) => { setPw2Value(e.target.value); }} required/>
          <p>{pw2Helper}</p>
        </ValidContainer>
        <ValidContainer>
          <ConfirmContainer>
            <input className="eInput" type="email" placeholder="이메일" required/> 
            <Button backgroundColor="white"
              width="99px"
              height="56px"
              border="1px solid #3C486B"
              textColor="#3C486B"
              fontSize="16px"
            >
              중복 확인
            </Button>
          </ConfirmContainer>
          <p>사용가능한 이메일입니다.</p>
        </ValidContainer>
        <div>
            <SelectAutoWidth></SelectAutoWidth>
            <SelectAutoWidth></SelectAutoWidth>
            <SelectAutoWidth></SelectAutoWidth>
        </div>       
        <button className="form-button">회원가입</button>
      </form>
    </div>
  );
}

export default SignUp;