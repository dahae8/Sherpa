import pandas as pd
import mysql.connector

# DB
conn = mysql.connector.connect(
    host="localhost",
    user="YOUR_USERNAME",
    password="YOUR_PASSWORD",
    database="adrec"
)
cursor = conn.cursor()

# csv 파일
tv_data = pd.read_csv('../scrapper/budget/bueget_data/TV광고단가.csv', encoding='cp949')
newspaper_data = pd.read_csv('../scrapper/budget/bueget_data/신문광고단가.csv', encoding='cp949')
community_data = pd.read_csv('../scrapper/budget/bueget_data/커뮤니티광고단가.csv', encoding='cp949')
radio_data = pd.read_csv('../scrapper/budget/bueget_data/radio광고단가.csv', encoding='cp949')

# 최솟값 최댓값 계산
tv_min, tv_max = tv_data['TV광고단가'].min(), tv_data['TV광고단가'].max()
newspaper_min, newspaper_max = newspaper_data['신문광고단가'].min(), newspaper_data['신문광고단가'].max()
community_min, community_max = community_data['커뮤니티광고단가'].min(), community_data['커뮤니티광고단가'].max()
radio_min, radio_max = radio_data['radio광고단가'].min(), radio_data['radio광고단가'].max()


media_types = ["TV", "신문", "커뮤니티", "라디오", "버스", "지하철", "현수막", "SNS"]
budget_values = [
    (tv_min, tv_max),
    (newspaper_min, newspaper_max),
    (community_min, community_max),
    (radio_min, radio_max),
    (350000, 2200000),
    (1000000, 4000000),
    (12900, 10000000),
    (1200, 100000000)
]

# mediaType_id과 mediaSub_id 어떻게 구하지? 

for (min_budget, max_budget) in zip(media_types, budget_values):
    # Fetch the media type index from the 매체유형 테이블
    cursor.execute(f"SELECT id FROM 매체유형 WHERE 이름 = 'mediaType'")
    media_index = cursor.fetchone()
    if media_index:
        media_index = media_index[0]
        # Insert the data into the budget table
        cursor.execute(f"INSERT INTO budget (`minBudget`, `maxBudget`, `매체 유형 테이블 인덱스`, `매체 유형 소유형 테이블 인덱스`) VALUES ({min_budget}, {max_budget}, {mediaType_id}, {mediaSub_id} )")



conn.commit()
cursor.close()
conn.close()
