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

# CSV 파일이 있는 디렉토리 경로
csv_file_ad_detail = 'S09P22C107/bigdata/dataAnalysis/keyword/data/AiSAC 광고소재명별 광고 정보.csv'
csv_file_ad_keyword = 'S09P22C107/bigdata/dataAnalysis/keyword/data/AiSAC시스템 AI 인식결과 및 광고소재명별 키워드.csv'

csv_files = [csv_file_ad_detail, csv_file_ad_keyword]

dataframe_ad_detail = pd.read_csv(csv_file_ad_detail, encoding='cp949')
dataframe_ad_keyword = pd.read_csv(csv_file_ad_keyword, encoding='cp949')

idx = 0
# data = {
#     '대분류': [],
#     '중분류': [],
#     '소분류': [],
#     '키워드': [],
# }
data = {}
for row_num_ad_detail, row_ad_detail in dataframe_ad_detail.iterrows():
    large_product = row_ad_detail['대업종 분류']
    middle_product = row_ad_detail['중업종 분류']
    small_product = row_ad_detail['소업종 분류']
    data_key = large_product + ' '+middle_product + ' '+small_product

    for row_num_ad_keyword, row_ad_keyword in dataframe_ad_keyword[idx:].iterrows():

        # if row_num_ad_keyword >10:
        #     break

        if row_ad_detail['광고소재명'] == row_ad_keyword['광고소재명']:
            keywords = [word.strip("' ").strip()
                        for word in row_ad_keyword['키워드'].split(',')]
            
            for keyword in keywords:
                data_key = large_product + ','+middle_product + ','+small_product + ','+keyword
                if data_key in data:
                    data[data_key]+= 1
                else:
                    data[data_key] = 1
            idx += 1
            break



# CREATE TABLE `adKeyword` (
# 	`id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
# 	`name`	VARCHAR(80)	NOT NULL,
# 	`total`	INT	NOT NULL,
# 	`productSmall_id`	INT	NOT NULL
# );

sql_data = {
    'productSmall_id1': [],
    'productSmall_id2': [],
    'productSmall_id': [],
    'name': [],
    'total': [],
}

for key, value in data.items():
     product_lst = [word.strip("' ").strip() for word in key.split(',')]
     sql_data['productSmall_id1'].append(product_lst[0])
     sql_data['productSmall_id2'].append(product_lst[1])
     sql_data['productSmall_id'].append(product_lst[2])
     sql_data['name'].append(product_lst[3])
     sql_data['total'].append(value)
    
df = pd.DataFrame(sql_data)
# DataFrame 출력
# print(df)

# DataFrame을 MySQL 테이블로 저장
table_name = 'adKeyword'  # 저장할 테이블 이름
df.to_sql(table_name, engine, if_exists='replace', index=False)

# MySQL 연결 닫기
engine.dispose()