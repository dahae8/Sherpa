import pandas as pd

# CSV 파일이 있는 디렉토리 경로
csv_file_ad_detail = 'C:/Users/SSAFY/Desktop/adRec/data/keyword/AiSAC 광고소재명별 광고 정보.csv'
csv_file_ad_keyword = 'C:/Users/SSAFY/Desktop/adRec/data/keyword/AiSAC시스템 AI 인식결과 및 광고소재명별 키워드.csv'

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
    data_key = large_product + ','+middle_product + ','+small_product

    for row_num_ad_keyword, row_ad_keyword in dataframe_ad_keyword[idx:].iterrows():

        if row_ad_detail['광고소재명'] == row_ad_keyword['광고소재명']:
            keywords = [word.strip("' ").strip()
                        for word in row_ad_keyword['키워드'].split(',')]
            for keyword in keywords:
                data_key += ',' + keyword
                if data_key in data:
                    data[data_key] += 1
                else:
                    data[data_key] = 1
            idx += 1
            break
print(data)
# styled_df = df.style
# styled_df.set_table_styles(
#     [{'selector': 'th', 'props': [('text-align', 'center')]}])  # 테이블 스타일 지정
# styled_df.set_caption('Sample DataFrame')  # 표 제목 추가
# styled_df.set_precision(2)  # 소수점 이하 자릿수 설정
# styled_df.hide_index()  # 인덱스 열 숨김
# styled_df.hide_columns()  # 특정 열 숨김


# for row_num, row in dataframe_ad_keyword.iterrows():
#     if start_row <= row_num <= end_row:
#         # 읽어온 행을 출력하거나 다른 작업을 수행합니다.
#         print(row)
#         b = row[-1]
#         a = [word.strip("' ").strip() for word in b.split(',')]
#         print(a)
#     elif row_num > end_row:
#         # 종료 행을 넘어가면 반복문을 종료합니다.
#         break

# # CSV 파일을 읽기 모드로 엽니다.
# with open(csv_file, mode='r', newline='') as file:
#     # CSV 파일을 읽는 데 사용할 CSV 리더 객체를 생성합니다.
#     csv_reader = csv.reader(file)

#     # 특정 범위의 행을 읽어옵니다.
#     for row_num, row in enumerate(csv_reader, start=1):
#         if start_row <= row_num <= end_row:
#             # 읽어온 행을 출력하거나 다른 작업을 수행합니다.
#             b = row[-1]
#             a = [word.strip("' ").strip() for word in b.split(',')]
#             print(a)
#         elif row_num > end_row:
#             # 종료 행을 넘어가면 반복문을 종료합니다.
#             break
