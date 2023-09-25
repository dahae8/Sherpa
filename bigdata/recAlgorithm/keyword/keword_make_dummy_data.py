import pymysql
from datetime import datetime

# # 연결 설정
# connection = pymysql.connect(
#     host='j9c107.p.ssafy.io',
#     user='c107',
#     password='c107adrec',
#     database='adrec'
# )

# 연결 설정
connection = pymysql.connect(
    host='localhost',
    user='root',
    password='1234',
    database='test'
)

# 커서 생성
cursor = connection.cursor()


# # member INSERT 쿼리 작성
# member_insert_query= "INSERT INTO member (email, name, pwd, productSmall_id) VALUES (%s,%s, %s, %s)"
# for i in range(2,258):
#     for j in range(1000):
#       name = "dummy"+str(i)+str(j)
#       email = name+"@ssafy.com"
#       data_to_insert = (email,name,"1234",i)
#       cursor.execute(member_insert_query, data_to_insert)


# member SELECT 쿼리 실행
member_selsect_query = "SELECT * FROM member;"
cursor.execute(member_selsect_query)
member_data = {}
# 결과 가져오기
members_sql_data = cursor.fetchall()
for row in members_sql_data:
    if row[5] in member_data:
        member_data[row[5]].append(row[1])
    else:
        member_data[row[5]] = []
        member_data[row[5]].append(row[1])


# keword SELECT 쿼리 실행
keyword_selsect_query = "SELECT * FROM adKeyword;"
cursor.execute(keyword_selsect_query)
keyword_data = {}
# 결과 가져오기
keywords_sql_data = cursor.fetchall()
for row in keywords_sql_data:
    if row[3] in keyword_data:
        keyword_data[row[3]][row[1]] = row[2]
    else:
        keyword_data[row[3]] = {}
        keyword_data[row[3]][row[1]] = row[2]


keywordRec_insert_query= "INSERT INTO keywordRec (productSmall_id, member_id, rec_date) VALUES (%s, %s, %s)"
keywordLike_insert_query= "INSERT INTO keywordLike (keywordRec_id, keyword) VALUES (%s,%s)"
for k,members in member_data.itmes():
    for member in members:
        now = datetime.today() 
        data_to_insert = (k, member, now)
        cursor.execute(keywordRec_insert_query, data_to_insert)




# 변경사항을 커밋
connection.commit()

# 커서 닫기
cursor.close()

# 연결 닫기
connection.close()
