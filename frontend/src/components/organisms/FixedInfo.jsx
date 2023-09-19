import React from "react";
import ReadOnly from "../atoms/ReadOnly"
import styled from "styled-components";


function FixedInfo() {
    return (
      <div className="fixedInfo">
       <ReadOnly></ReadOnly>
       <ReadOnly></ReadOnly>
      </div>
    );
  }
  
  export default FixedInfo;