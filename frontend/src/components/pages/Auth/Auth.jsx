import React, { useState } from 'react';
import './Auth.css';
import SignUp from '../../organisms/SignUp';
import SignIn from '../../organisms/SignIn';
import Overlay from '../../organisms/Overlay';

function Auth() {
  const [rightPanelActive, setRightPanelActive] = useState(false);

  const handleClickSignUpButton = () => setRightPanelActive(true);
  const handleClickSignInButton = () => setRightPanelActive(false);

  return (
    <div className="App">
      <div className={`container ${rightPanelActive ? 'right-panel-active' : ''}`} id="container">
        <SignUp />
        <SignIn />
        <Overlay
          handleClickSignInButton={handleClickSignInButton}
          handleClickSignUpButton={handleClickSignUpButton}
        />
      </div>
    </div>
  );
}

export default Auth;