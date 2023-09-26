import React from "react";
import styled from "styled-components";
import SherpaMean from "../../organisms/SherpaMean";
import IntroduceRecommendation from "../../organisms/IntroduceRecommendation";
import IntroduceMediaRecommendation from "../../organisms/IntroduceMediaRecommendation";
import IntroduceKeywordRecommendation from "../../organisms/IntroduceKeywordRecommendation";

const Contanier = styled.div`
  margin: 0 320px;
`;

export const MainPage = () => {
  return (
    <Contanier>
      <SherpaMean></SherpaMean>
      <IntroduceRecommendation></IntroduceRecommendation>
      <IntroduceMediaRecommendation></IntroduceMediaRecommendation>
      <IntroduceKeywordRecommendation></IntroduceKeywordRecommendation>
    </Contanier>
  );
};
export default MainPage;
