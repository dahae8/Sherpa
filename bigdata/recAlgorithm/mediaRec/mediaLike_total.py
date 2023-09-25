# 매체 호감 - 성별/연령대/지역
# 매체 별 호감도를 가중치를 통해 종합한 결과를 내주는 코드
from sklearn.decomposition import TruncatedSVD
from scipy.sparse.linalg import svds

import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np
import warnings
warnings.filterwarnings("ignore")

import mysql.connector

db_config = {
    "host": "j9c107.p.ssafy.io",
    "user": "c107",
    "password": "c107adrec",
    "database": "adrec",
    "auth_plugin": "mysql_native_password"  # MySQL 8.0 이상일 경우에 필요한 옵션
}

# MySQL에 연결
conn = mysql.connector.connect(**db_config)
# SQL 쿼리 실행 및 결과를 데이터프레임으로 변환

query = "SELECT * FROM mediaLikeAge"
data_age = pd.read_sql(query, conn)
# print(data_age)  # [16 rows x 5 columns]

query = "SELECT * FROM mediaLikeGender"
data_gender = pd.read_sql(query, conn)
# print(data_gender)  # [40 rows x 5 columns]

query = "SELECT * FROM mediaLikeArea"
data_area = pd.read_sql(query, conn)
# print(data_area)


# 연결 종료
conn.close()

for index, item in data_gender.iterrows():
    # 'mediaSub_id' 열의 NaN 값을 '0'으로 대체
    if pd.isna(item['mediaSub_id']):
        data_gender.at[index, 'mediaSub_id'] = 0

for index, item in data_age.iterrows():
    # 'mediaSub_id' 열의 NaN 값을 '0'으로 대체
    if pd.isna(item['mediaSub_id']):
        data_age.at[index, 'mediaSub_id'] = 0

for index, item in data_area.iterrows():
    # 'mediaSub_id' 열의 NaN 값을 '0'으로 대체
    if pd.isna(item['mediaSub_id']):
        data_area.at[index, 'mediaSub_id'] = 0
# print(data_area)

# pivot 테이블
# value에는 rating 값을 cloumn에
gender_mediaType_total = data_gender.pivot_table(
    index=["mediaType_id", "mediaSub_id"],
    columns=["gender"],
    values=["total"]).fillna(0)
# print(gender_mediaType_total)

age_mediaType_total = data_age.pivot_table(
    index=["mediaType_id", "mediaSub_id"],
    columns=["age"],
    values=["total"]).fillna(0)
# print(age_mediaType_total)

area_mediaType_total = data_area.pivot_table(
    index=["mediaType_id", "mediaSub_id"],
    columns=["area"],
    values=["total"]).fillna(0)
# print(area_mediaType_total)

result = pd.concat([gender_mediaType_total, age_mediaType_total, area_mediaType_total], axis=1)
print(result)  # [8 rows x 14 columns]

# 매체 호감도 컬럼 별 가중치
like_weights = {
    "0": 2.5,  # 여성
    "1": 2.5,  # 남성
    "10대": 2.0,
    "20대": 2.0,
    "30대": 2.0,
    "40대": 2.0,
    "50대": 2.0,
    "서울": 1.0,
    "경기/인천": 1.0,
    "대전/충청/세종": 1.0,
    "광주/전라/제주": 1.0,
    "부산/울산/경남": 1.0,
    "대구/경북": 1.0,
    "강원": 1.0
}

# 각 매체별 총 호감도 계산
scores = {}
idx = 0
for index, row in result.iterrows():
    mediaTypeSub = result.index[idx]
    score = 0
    for i, key in enumerate(like_weights.items()):
        # print(key[0], key[1])
        feature = key[0]
        weight = key[1]
        score += row.iloc[i] * weight
    scores[mediaTypeSub] = score
    idx += 1

# 가장 높은 점수(호감도)를 가진 매체 유형 추천
recommended_mediaType = max(scores, key=scores.get)
print(scores)
print("가장 추천하는 매체 유형:", recommended_mediaType)



