import React from 'react';
import SelectAutoWidth from '../atoms/Select';

function SignUp() {
  return (
    <div className="form-container sign-up-container">
      <form action="#">
        <h1 className="form-title">회원가입</h1>

        <input className="idInput" type="text" placeholder="아이디" />
        <input className="pwInput" type="password" placeholder="비밀번호" />
        <input className="pwInput" type="password" placeholder="비밀번호 확인" />
        <input className="eInput" type="email" placeholder="이메일" /> 
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