import os
import pymysql
import pandas as pd

connection = pymysql.connect(
    host='호스트주소',
    user='사용자이름',
    password='비밀번호',
    database='데이터베이스이름'
)

# MySQL 데이터베이스 연결 설정
db_username = 'root'
db_password = '1234'
db_host = 'localhost'
db_port = '3306'
db_name = 'test'

# MySQL 연결 문자열 생성
connection_str = f'mysql+pymysql://{db_username}:{db_password}@{db_host}:{db_port}/{db_name}'
# MySQL 엔진 생성
engine = create_engine(connection_str)


# 폴더 경로 설정
folder_path = 'data/trendKeyword/'

# 폴더 내의 모든 파일 목록 가져오기
file_list = os.listdir(folder_path)

# XLSX 파일만 선택
xlsx_files = [file for file in file_list if file.endswith('.xlsx')]


data = {}

for xlsx_file in xlsx_files:
    file_path = os.path.join(folder_path, xlsx_file)
    df = pd.read_excel(file_path)
    # print("=====================\n")
    # print(df)

    for row_num, row in df.iterrows():
        data_key = row["tmng"]

        if data_key == "- topic":
            data_key = "topic"

        if data_key in data:
            data[data_key] += 1
        else:
            data[data_key] = 1


sql_data = {
    'name': [],
    'total': [],
}

for key, value in data.items():
    sql_data['name'].append(key)
    sql_data['total'].append(value)

df = pd.DataFrame(sql_data)
# DataFrame 출력
# print(df)

# DataFrame을 MySQL 테이블로 저장
table_name = 'youtubeKeyword'  # 저장할 테이블 이름
df.to_sql(table_name, engine, if_exists='replace', index=True)

# MySQL 연결 닫기
engine.dispose()
