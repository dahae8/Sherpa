import { Route, Routes } from "react-router-dom";
import MainPage from "../components/pages/MainPage/MainPage";
import MediaRecommendPage from "../components/pages/MediaRecommendPage/MediaRecommendPage";
import OnlineRecommendation from "../components/pages/OnlineRecommendation/OnlineRecommendation.jsx";
import MyPage from "../components/pages/MyPage/MyPage";
import TvRecommendation from "../components/pages/TvRecommendation/TvRecommendation";
import RadioRecommendation from "../components/pages/RadioRecommendation/RadioRecommendation";
import NewspaperRecommendation from "../components/pages/NewspaperRecommendation/NewspaperRecommendation.jsx";
import OutdoorRecommendation from "../components/pages/OutdoorRecommendation/OutdoorRecommendation.jsx";
import Login from "../components/pages/Auth/Login";
import SignPage from "../components/pages/Auth/SignPage";

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
        <Route
          path="/mediaResult/newspaper"
          element={<NewspaperRecommendation />}
        />
        <Route
          path="/mediaResult/outdoor"
          element={<OutdoorRecommendation />}
        />
        {/* <Route path="/keywordRecommend" element={<MyPage />} /> */}
        {/* <Route path="/contentRecommend" element={<MyPage />} /> */}
      </Routes>
    </div>
  );
}

export default RouteLink;
