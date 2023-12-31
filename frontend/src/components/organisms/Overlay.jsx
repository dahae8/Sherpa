import React from 'react';

const Overlay = ({ handleClickSignUpButton, handleClickSignInButton }) => {
    return (
        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <p className="overlay-description">
                        이미 가입한 회원이시라면,<br/>
                        로그인 후 더 많은 서비스를 이용할 수 있습니다.
                    </p>
                    <button
                        className="ghost form-button"
                        id="signIn"
                        onClick={handleClickSignInButton}
                    >로그인</button>
                </div>
                <div className="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p className="overlay-description">
                        아직 회원이 아니시라면,<br/>
                        가입 후 더 많은 서비스를 이용할 수 있습니다.
                    </p>
                    <button
                        className="ghost form-button"
                        id="signUp"
                        onClick={handleClickSignUpButton}
                    >회원가입</button>
                </div>
            </div>
        </div>
    );
}

export default Overlay;
