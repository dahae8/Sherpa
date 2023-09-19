import { Route, Routes } from 'react-router-dom';
import MainPage from '../components/pages/MainPage/MainPage';
import MediaRecommendPage from '../components/pages/MediaRecommendPage/MediaRecommendPage';
import ChangeAuth from '../components/pages/Auth/ChangeAuth'
import MyPage from '../components/pages/MyPage/MyPage'

function RouteLink(props) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}
        {/* <Route path="/signup" element={<SignupPage />} /> */}
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/auth" element={<ChangeAuth />} />
        <Route path="/mediaRecommend" element={<MediaRecommendPage />} />
        {/* <Route path="/mediaResult/online" element={<MyPage />} /> */}
        {/* <Route path="/mediaResult/tv" element={<MyPage />} /> */}
        {/* <Route path="/mediaResult/radio" element={<MyPage />} /> */}
        {/* <Route path="/mediaResult/newspaper" element={<MyPage />} /> */}
        {/* <Route path="/mediaResult/outdoor" element={<MyPage />} /> */}
        {/* <Route path="/keywordRecommend" element={<MyPage />} /> */}
        {/* <Route path="/contentRecommend" element={<MyPage />} /> */}
      </Routes>
    </div>
  );
}

export default RouteLink;