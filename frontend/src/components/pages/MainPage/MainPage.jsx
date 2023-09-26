import React from "react";
import styled from "styled-components";
import SherpaMean from "../../organisms/SherpaMean";
import IntroduceRecommendation from "../../organisms/IntroduceRecommendation";

const Contanier = styled.div`
  margin: 0 320px;
`;

export const MainPage = () => {
  return (
    <Contanier>
      <SherpaMean></SherpaMean>
      <IntroduceRecommendation></IntroduceRecommendation>
    </Contanier>
  );
};
export default MainPage;
