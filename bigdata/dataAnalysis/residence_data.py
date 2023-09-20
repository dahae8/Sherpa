import pandas as pd

# CSV 로딩
data = pd.read_csv("./csv/연령별인구현황_월간.csv", encoding='CP949')

# 행정구역 헤더의 읍, 면, 동 유무에 따른 필터링
filtered_data = data[data['행정구역'].str.contains('읍|면|동')]

# 데이터 처리
def process_data(row, col):
    # 칼럼 명에 남이 있는 경우 1 없다면 0
    gender = 1 if '남' in col else 0
    
    # 총인구수 또는 계를 피해서 ~세가 있는 경우에 한하여 데이터 추가
    try:
        age = int(col.split('_')[2].split('~')[0].replace('세', ''))
    except ValueError:
        return
    
    # 결과값 추가
    result.append({
        'gender': gender,
        'age': age,
        'total': row[col],
        'dong_id': 1  # Placeholder value for dong_id
    })

# 결과값 저장
result = []

for _, row in filtered_data.iterrows():
    for col in filtered_data.columns:
        if '남_' in col or '여_' in col:
            process_data(row, col)

residence_df = pd.DataFrame(result)

# 결과 확인을 위해 csv 저장
residence_df.to_csv("./csv/거주지전처리.csv", index=False, encoding='CP949')
print("끝났어요")
