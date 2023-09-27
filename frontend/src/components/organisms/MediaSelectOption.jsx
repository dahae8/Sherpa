import React, { useState } from 'react';
import Select from '../atoms/SelectOption';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: flex-start;
  justify-content: space-between;
  align-items: baseline;
  width: 90%;
  margin-top: 10px;
`;

function MediaSelectOption({ dataL, dataM, dataS, onSelectL, onSelectM, onSelectS, width }) {
  const [selectedataL, setSelectedataL] = useState(null);
  const [selectedataM, setSelectedataM] = useState(null);
  const [selectedataS, setSelectedataS] = useState(null);
  return (
    <Container>
      <Select data={dataL || []} onSelect={onSelectL} width={width}/>
      <Select data={dataM} onSelect={onSelectM} width={width}/>
      <Select data={dataS} onSelect={onSelectS} width={width}/>
    </Container>
  );
}

export default MediaSelectOption;
