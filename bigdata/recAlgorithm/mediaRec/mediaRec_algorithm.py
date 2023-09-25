# 매체 추천 알고리즘
from sklearn.decomposition import TruncatedSVD
from scipy.sparse.linalg import svds

import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np
import warnings
import mysql.connector

warnings.filterwarnings("ignore")

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
query = "SELECT * FROM productMedia"
productMedia = pd.read_sql(query, conn)

# 연결 종료
conn.close()

# 데이터프레임 출력 또는 활용
# print(productMedia)  # [270 rows x 5 columns]
for index, item in productMedia.iterrows():
    # 'mediaSub_id' 열의 NaN 값을 '0'으로 대체
    if pd.isna(item['mediaSub_id']):
        productMedia.at[index, 'mediaSub_id'] = 0

productMedia_total = productMedia.pivot_table(
    index=["mediaType_id", "mediaSub_id"],
    columns=["productSmall_id"],
    values=["total"]).fillna(0)
print(productMedia_total)  # [6 rows x 64 columns]


