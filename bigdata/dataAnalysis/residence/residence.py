import os
import pandas as pd
import pymysql


# 연결 설정
connection = pymysql.connect(
    host='j9c107.p.ssafy.io',
    user='c107',
    password='c107adrec',
    database='adrec'
)

# 커서 생성
cursor = connection.cursor()

# SQL 쿼리 실행
query = """SELECT dong.id, dong.name AS dong_name, sigungu.name AS sigungu_name, sido.name AS sido_name
            FROM dong
            JOIN sigungu ON dong.sigungu_id = sigungu.id
            JOIN sido ON sigungu.sido_id = sido.id;"""
cursor.execute(query)

address_data = {}

# 결과 가져오기
address = cursor.fetchall()
for row in address:
    if row[3] in address_data:
        if row[2] in address_data[row[3]]:
            address_data[row[3]][row[2]][row[1]] = row[0]
        else:
            address_data[row[3]][row[2]] = {}
            address_data[row[3]][row[2]][row[1]] = row[0]
    else:
        address_data[row[3]] = {}
        address_data[row[3]][row[2]] = {}
        address_data[row[3]][row[2]][row[1]] = row[0]

print(address_data)
# 변경사항을 커밋
connection.commit()

# 커서 닫기
cursor.close()

# 연결 닫기
connection.close()
