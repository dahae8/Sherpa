import React from "react";
import ReadOnly from "../atoms/ReadOnly"
import MakeButton from "../atoms/Button";


function FixedInfo() {
    return (
      <div className="fixedInfo">
       <ReadOnly></ReadOnly>
       <ReadOnly></ReadOnly>
       <MakeButton 
        width="116px"
        height="40px"
        backgroundColor="#3C486B"
        textColor="white"
        >
            정보 수정
        </MakeButton>
      </div>
    );
  }
  
  export default FixedInfo;