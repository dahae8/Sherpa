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
file_path = 'data/news/신문 데이터.xlsx'

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
total_num = {
    '남성' : 0,
    '여성' : 0,
    '20' : 0,
    '30' : 0,
    '40' : 0,
    '50' : 0,
    '60' : 0,
    '70' : 0,
    '서울' : 0,
    '인천/경기' : 0,
    '대전/세종/충청' : 0,   
    '광주/전라' : 0,   
    '대구/경북' : 0,   
    '부산/울산/경남' : 0,   
    '강원' : 0,   
    '제주' : 0
}

df = pd.read_excel(file_path)
# print("=====================\n")
print(df)
for row_num, row in df.iterrows():
    name = row["신문사"]

    if name == '사례수':
      total_num['여성'] = row['여성']
      total_num['남성'] = row['남성']
      total_num['20' ] = row['20대']
      total_num['30' ] = row['30대']
      total_num['40' ] = row['40대']
      total_num['50' ] = row['50대']
      total_num['60' ] = row['60대']
      total_num['70' ] = row['70대']
      total_num['서울' ] = row['서울']
      total_num['인천/경기' ] = row['인천/경기']
      total_num['대전/세종/충청'] = row['대전/세종/충청']
      total_num['광주/전라'] = row['광주/전라']
      total_num['대구/경북'] = row['대구/경북']
      total_num['부산/울산/경남'] = row['부산/울산/경남']
      total_num['강원'] = row['강원']
      total_num['제주'] = row['제주']
    else:
      sql_data_gender['name'].append(name)
      sql_data_gender['gender'].append(0)
      sql_data_gender['total'].append(round(row['여성']*total_num['여성']))

      sql_data_gender['name'].append(name)
      sql_data_gender['gender'].append(1)
      sql_data_gender['total'].append(round(row['남성']*total_num['남성']))

      sql_data_age['name'].append(name)
      sql_data_age['age'].append(20)
      sql_data_age['total'].append(round(row['20대']*total_num['20']))

      sql_data_age['name'].append(name)
      sql_data_age['age'].append(30)
      sql_data_age['total'].append(round(row['30대']*total_num['30']))

      sql_data_age['name'].append(name)
      sql_data_age['age'].append(40)
      sql_data_age['total'].append(round(row['40대']*total_num['40']))

      sql_data_age['name'].append(name)
      sql_data_age['age'].append(40)
      sql_data_age['total'].append(round(row['50대']*total_num['50']))

      sql_data_age['name'].append(name)
      sql_data_age['age'].append(40)
      sql_data_age['total'].append(round(row['60대']*total_num['60']))
      
      sql_data_age['name'].append(name)
      sql_data_age['age'].append(40)
      sql_data_age['total'].append(round(row['70대']*total_num['70']))
      
      sql_data_area['name'].append(name)
      sql_data_area['area'].append('서울')
      sql_data_area['total'].append(round(row['서울']*total_num['서울']))
      
      sql_data_area['name'].append(name)
      sql_data_area['area'].append('인천/경기')
      sql_data_area['total'].append(round(row['인천/경기']*total_num['인천/경기']))
            
      sql_data_area['name'].append(name)
      sql_data_area['area'].append('대전/세종/충청')
      sql_data_area['total'].append(round(row['대전/세종/충청']*total_num['대전/세종/충청']))
            
      sql_data_area['name'].append(name)
      sql_data_area['area'].append('광주/전라')
      sql_data_area['total'].append(round(row['광주/전라']*total_num['광주/전라']))
            
      sql_data_area['name'].append(name)
      sql_data_area['area'].append('대구/경북')
      sql_data_area['total'].append(round(row['대구/경북']*total_num['대구/경북']))
            
      sql_data_area['name'].append(name)
      sql_data_area['area'].append('부산/울산/경남')
      sql_data_area['total'].append(round(row['부산/울산/경남']*total_num['부산/울산/경남']))
            
      sql_data_area['name'].append(name)
      sql_data_area['area'].append('강원')
      sql_data_area['total'].append(round(row['강원']*total_num['강원']))
            
      sql_data_area['name'].append(name)
      sql_data_area['area'].append('제주')
      sql_data_area['total'].append(round(row['제주']*total_num['제주']))


df = pd.DataFrame(sql_data_gender)
table_name = 'newsGender'  # 저장할 테이블 이름
df.to_sql(table_name, engine, if_exists='replace', index=True)

df = pd.DataFrame(sql_data_age)
table_name = 'newsAge'  # 저장할 테이블 이름
df.to_sql(table_name, engine, if_exists='replace', index=True)

df = pd.DataFrame(sql_data_area)
table_name = 'newsArea'  # 저장할 테이블 이름
df.to_sql(table_name, engine, if_exists='replace', index=True)

# MySQL 연결 닫기
engine.dispose()