import { Route, Routes } from "react-router-dom";
import MainPage from "../components/pages/MainPage/MainPage";
import MediaRecommendPage from "../components/pages/MediaRecommendPage/MediaRecommendPage";
import ChangeAuth from "../components/pages/Auth/ChangeAuth";
import OnlineRecommendation from "../components/pages/OnlineRecommendation/OnlineRecommendation";
import TvRecommendation from "../components/pages/TvRecommendation/TvRecommendation";
import RadioRecommendation from "../components/pages/RadioRecommendation/RadioRecommendation";
import NewspaperRecommendation from "../components/pages/NewspaperRecommendation/NewspaperRecommendation";

function RouteLink(props) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}
        {/* <Route path="/signup" element={<SignupPage />} /> */}
        {/* <Route path="/mypage" element={<MyPage />} /> */}
        <Route path="/auth" element={<ChangeAuth />} />
        <Route path="/mediaRecommend" element={<MediaRecommendPage />} />
        <Route path="/mediaResult/online" element={<OnlineRecommendation />} />
        <Route path="/mediaResult/tv" element={<TvRecommendation />} />
        <Route path="/mediaResult/radio" element={<RadioRecommendation />} />
        <Route
          path="/mediaResult/newspaper"
          element={<NewspaperRecommendation />}
        />
        {/* <Route path="/mediaResult/outdoor" element={<MyPage />} /> */}
        {/* <Route path="/keywordRecommend" element={<MyPage />} /> */}
        {/* <Route path="/contentRecommend" element={<MyPage />} /> */}
      </Routes>
    </div>
  );
}

export default RouteLink;
