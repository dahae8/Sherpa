import React from "react";
import styled from "styled-components";
import SherpaMean from "../../organisms/SherpaMean";

const Contanier = styled.div`
  margin: 0 320px;
`;

export const MainPage = () => {
  return (
    <Contanier>
      <SherpaMean></SherpaMean>
    </Contanier>
  );
};
export default MainPage;
