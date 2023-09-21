import React, { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <button onClick={handleLogout}>로그아웃</button>
      ) : (
        <button onClick={handleLogin}>로그인</button>
      )}

      {isLoggedIn ? <LoggedInNavbar /> : <LoggedOutNavbar />}
    </div>
  );
}

function LoggedInNavbar() {
  return (
    <nav>
      <ul>
        <li>홈</li>
        <li>프로필</li>
        <li>대시보드</li>
      </ul>
    </nav>
  );
}

function LoggedOutNavbar() {
  return (
    <nav>
      <ul>
        <li>홈</li>
        <li>로그인</li>
        <li>회원가입</li>
      </ul>
    </nav>
  );
}

export default App;
