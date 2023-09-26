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

function MediaSelectOption({ dataL, dataM, dataS, onSelectL, onSelectM, onSelectS }) {
  const [selectedataL, setSelectedataL] = useState(null);
  const [selectedataM, setSelectedataM] = useState(null);
  const [selectedataS, setSelectedataS] = useState(null);
  return (
    <Container>
      <Select data={dataL || []} onSelect={onSelectL} />
      <Select data={dataM} onSelect={onSelectM} />
      <Select data={dataS} onSelect={onSelectS} />
    </Container>
  );
}

export default MediaSelectOption;
