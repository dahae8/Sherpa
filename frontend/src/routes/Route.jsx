import { Route, Routes } from 'react-router-dom';
import MainPage from '../components/pages/MainPage/MainPage';
import MediaRecommendPage from '../components/pages/MediaRecommendPage/MediaRecommendPage';
import ContentRecommendPage from '../components/pages/ContentRecommendPage/ContentRecommendPage';
import OnlineRecommendation from '../components/pages/OnlineRecommendation/OnlineRecommendation';
import MyPage from '../components/pages/MyPage/MyPage';
import TvRecommendation from '../components/pages/TvRecommendation/TvRecommendation';
import RadioRecommendation from '../components/pages/RadioRecommendation/RadioRecommendation';
import NewspaperRecommendation from '../components/pages/NewspaperRecommendation/NewspaperRecommendation';
import OutdoorRecommendation from '../components/pages/OutdoorRecommendation/OutdoorRecommendation';
import Login from '../components/pages/Auth/Login';
import SignPage from '../components/pages/Auth/SignPage';

function RouteLink(props) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mediaRecommend" element={<MediaRecommendPage />} />
        <Route path="/mediaResult/online" element={<OnlineRecommendation />} />
        <Route path="/mediaResult/tv" element={<TvRecommendation />} />
        <Route path="/mediaResult/radio" element={<RadioRecommendation />} />
        <Route path="/mediaResult/newspaper" element={<NewspaperRecommendation />} />
        <Route path="/mediaResult/outdoor" element={<OutdoorRecommendation />} />
        {/* <Route path="/keywordRecommend" element={<MyPage />} /> */}
        <Route path="/contentRecommend" element={<ContentRecommendPage />} />
      </Routes>
    </div>
  );
}

export default RouteLink;
