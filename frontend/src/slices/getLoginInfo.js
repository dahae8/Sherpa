import {
  setToken,
  setIsLogin,
  setIsLoginError,
  setIsValidToken,
  setEmail,
  setName,
  setProductSmall,
} from './userSlice';

import axios from 'axios';


const APPLICATION_SERVER_URL = "http://j9c107.p.ssafy.io:8080" ;
  
// 사용자 로그인 처리 함수
export const userLogin = (user) => async (dispatch) => {
  try {
    const response = await axios
      .post(APPLICATION_SERVER_URL + '/api/member/login', user)
      .then((response) => {
        console.log("로그인여부:",response)
        alert('로그인 성공');
        return response;
      })
      .catch(() => {
        alert('로그인 실패');
      });
    if (response.data.success === true) {
      const accessToken = response.data.accessToken;
      sessionStorage.setItem('accessToken', accessToken);
      dispatch(setToken(accessToken));
      dispatch(setIsLogin(true));
      dispatch(setIsLoginError(false));
      dispatch(setIsValidToken(true));
      dispatch(setName(user.name));
    } else {
      dispatch(setIsLogin(false));
      dispatch(setIsLoginError(true));
      dispatch(setIsValidToken(false));
    }
  } catch (error) {}
};



// export const getUserInfo = (Email) => async (dispatch) => {
//   try {
//     const response = await axios.get(APPLICATION_SERVER_URL + `/api/info/${Email}`);
//     dispatch(setNickname(response.data.userInfo.userNickname));
//     dispatch(setTodayBium(response.data.userInfo.todayBium));
//     dispatch(setTotalBium(response.data.userInfo.totalBium));
//     dispatch(setRank(response.data.userInfo.userRank));

//     if (response.data.imgInfo !== "none") {
//       dispatch(setProfileImage(response.data.imgInfo));

//       const saveFolder = response.data.imgInfo.saveFolder;
//       const imageType = response.data.imgInfo.imgType;
//       const originalFile = response.data.imgInfo.originalFile;
//       const saveFile = response.data.imgInfo.saveFile;

//       await profileImageInfo(saveFolder, imageType, originalFile, saveFile, dispatch);
//     }
//     return ;
//   } catch (error) {
//     dispatch(setIsValidToken(false));
//     return error;
//   }
// };
