import React from "react";
import Select from '../atoms/SelectOption'
import MakeButton from "../atoms/Button";
import styled from "styled-components";


const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-between;
  align-items: baseline;
  width: 470px;
  margin-top: 10px;
`


function EditProduct() {
    return (
      <Container>
        <Select></Select>
        <Select></Select>
        <Select></Select>
        <MakeButton 
        width="118px"
        height="40px"
        backgroundColor="#3C486B"
        textColor="white"
        >
            품목 수정
        </MakeButton>
      </Container>
    );
  }
  
  export default EditProduct;