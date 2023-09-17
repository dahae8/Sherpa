import pandas as pd
from sqlalchemy import create_engine


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
file_path = 'data/newsTheme/신문__분야별.xlsx'

data = {
    '정치' : {},
    '사회' : {},
    '경제' : {},
    '문화' : {},
    '스포츠 및 연예' : {},
    '기타' : {},
}
df = pd.read_excel(file_path)
for row_num, row in df.iterrows():
    key = row['행정구역별(1)']
    data['정치'][key] = row['정치']
    data['사회'][key] = row['사회']
    data['경제'][key] = row['경제']
    data['문화'][key] = row['문화']
    data['스포츠 및 연예'][key] = row['스포츠 및 연예']
    data['기타'][key] = row['기타']

sql_data_gender= {
    'gender': [],
    'name': [],
    'total': [],
}
sql_data_age = {
    'age': [],
    'name': [],
    'total': [],
}
sql_data_area = {
    'area': [],
    'name': [],
    'total': [],
}
for key, value in data.items():
    for k, v in value.items():
        if type(k) == str:
          sql_data_area['name'].append(key)
          sql_data_area['area'].append(k)
          sql_data_area['total'].append(v)
          
        else:
          if k==0 or k ==1:
            sql_data_gender['name'].append(key)
            sql_data_gender['gender'].append(k)
            sql_data_gender['total'].append(v)
          else:
            sql_data_age['name'].append(key)
            sql_data_age['age'].append(k)
            sql_data_age['total'].append(v)
        
            
df = pd.DataFrame(sql_data_gender)
table_name = 'newsThemeGender'  # 저장할 테이블 이름
df.to_sql(table_name, engine, if_exists='replace', index=True)

df = pd.DataFrame(sql_data_age)
table_name = 'newsThemeAge'  # 저장할 테이블 이름
df.to_sql(table_name, engine, if_exists='replace', index=True)

df = pd.DataFrame(sql_data_area)
table_name = 'newsThemeArea'  # 저장할 테이블 이름
df.to_sql(table_name, engine, if_exists='replace', index=True)

# MySQL 연결 닫기
engine.dispose()




