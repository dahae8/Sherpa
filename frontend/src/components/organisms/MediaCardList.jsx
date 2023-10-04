import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MediaCard from "../atoms/MediaCard";
import { useSelector } from "react-redux";
import axios from "axios";

const PageContainer = styled.div``;
const CardGridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 50px;
  justify-items: center;
  align-items: center;
  margin: 3px;
`;

function MediaCardList() {

  const APPLICATION_SERVER_URL = 'https://j9c107.p.ssafy.io';

  const name = useSelector((state) => state.user.name);
  const [medList, setMedList] = useState([]);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const response = await axios.get(APPLICATION_SERVER_URL + `/api/mypage/mediaRec/${name}`);
        // if (response.data.success) {
        //   console.log(response.data);
        // // }
        // console.log("데이터",response.data.data);
        // console.log("데이터 행렬", response.data.data);
        setMedList(response.data.data);
      } catch (error) {
        console.log('Error!!', error);
      }
    };
    getMedia();
  }, [medList]);

  return (
    <PageContainer>
      <div className="App">
        <CardGridBox>
        {
            medList.map(function(a,i){
              return (<MediaCard
                Date={a.recDate} key={i} key2={a.id} label={a.productSmall} isOnOff = {a.isOnOff} budget ={a.budget} sigungu = {a.sigungu}
              ></MediaCard>)
            })
          }
        </CardGridBox>
      </div>
    </PageContainer>
  );
}

export default MediaCardList;
