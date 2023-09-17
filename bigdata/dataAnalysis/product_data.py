# 가맹점_업종분류표 데이터를 토대로 업종명 대분류, 업종명 중분류, 업종명 소분류 데이터를 전처리
import pandas as pd

# csv에서 파일 가져오는 코드
data = pd.read_csv('./csv/가맹점_업종분류표.csv', encoding='cp949', low_memory=False)
print(data)  # [255 rows x 4 columns]

large = data['대분류'].drop_duplicates()
medium = data['중분류'].drop_duplicates()
small = data['소분류'].drop_duplicates()
print(large)
print(medium)
print(small)