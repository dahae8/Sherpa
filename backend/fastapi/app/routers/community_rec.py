from sklearn.decomposition import TruncatedSVD
from scipy.sparse.linalg import svds

import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np
import warnings

import pymysql
from pydantic import BaseModel
from fastapi import FastAPI, responses, APIRouter

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from typing import Dict

# Request Body로 받을 데이터
class Item(BaseModel):
    gender: Dict[str, int]
    age: Dict[str, int]
    sidoId: int


router = APIRouter()

warnings.filterwarnings("ignore")

@router.post("/online/community", status_code=200)
async def recommend_community(item: Item):

    # 연결 설정
    connection = pymysql.connect(
        host='j9c107.p.ssafy.io',
        user='c107',
        password='c107adrec',
        database='adrec'
    )

    # 커서 생성
    cursor = connection.cursor()

    data={}

    query = "SELECT * FROM communityGender where year = 2021 and gender = 1"
    cursor.execute(query)
    community_gender_2021_male = pd.read_sql(query, connection)
    print(community_gender_2021_male)

    # 가중치 설정
    weight_2021_male = 349
    weight_2021_female = 397
    weight_2022_male = 235.2
    weight_2022_female = 374.9

    # 커뮤니티 별 점수 계산
    scores = {}
    total_score = 0



    # 데이터프레임 출력 또는 활용
    # print(productMedia)  # [270 rows x 5 columns]
    # for index, item in communitiyGender.iterrows():
        # 'mediaSub_id' 열의 NaN 값을 '0'으로 대체
        # print(item)

    # print(community_gender)

    # 커뮤니티 점수 계산
