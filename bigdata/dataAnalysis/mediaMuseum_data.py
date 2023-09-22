# 매체 호감 데이터 전처리한 csv 파일 서버에 넣는 코드
import pandas as pd
import mysql.connector

# TV - 영상 / 라디오 - 라디오 / 인쇄 - 인쇄 / 옥외 - 옥외 / SNS / 커뮤니티
data_tv = pd.read_csv('./csv/한국방송광고진흥공사_광고박물관 소장 광고소재(영상광고) 현황_20220311 (1).csv', encoding='cp949', low_memory=False)
print(data_tv)  # [17852 rows x 12 columns]



