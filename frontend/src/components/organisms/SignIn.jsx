import React from 'react';

function SignIn() {
  return (
    <div className="form-container sign-in-container">
      <form action="#">
        <h1 className="form-title">로그인</h1>

        <input className="idInput" type="id" placeholder="아이디" required/>
        <br />
        <br />
        <input className="pwInput" type="password" placeholder="비밀번호" required/>

        <br />
        <div class="pwd">
            <a className="find-password" href="#">비밀번호 찾기</a>
        </div>
        <br />
        <button className="form-button">로그인</button>
        
      </form>
    </div>
  );
}

export default SignIn;
