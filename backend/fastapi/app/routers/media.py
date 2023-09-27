# 오프라인 매체 추천
from fastapi import APIRouter
from scipy.sparse.linalg import svds
import numpy as np
from app.algorithm import media_rec
from pydantic import BaseModel

import pandas as pd
import pymysql
import math

router = APIRouter(prefix="/fastapi/offline")


class Item(BaseModel):
    productSmallId: int
    sigunguId: int
    gender: int
    age: int


class ResponseItem(BaseModel):
    success: bool
    data: dict
    count: int
    msg: str


# 광고 매체 추천 - 품목
@router.post("/product")
def offline(item: Item):
    # DB 연결
    db_config = {
        "host": "j9c107.p.ssafy.io",
        "user": "c107",
        "password": "c107adrec",
        "database": "adrec"
    }

    conn = pymysql.connect(**db_config)
    cursor = conn.cursor()

    # 품목코드 있는 지 확인
    query = "SELECT * FROM productMedia WHERE productSmall_id = %s"
    cursor.execute(query, (item.productSmallId,))
    query_result = cursor.fetchall()

    if query_result:
        # 품목 코드 있음
        query = "SELECT * FROM productMedia WHERE productSmall_id = %s"
        productMedia = pd.read_sql(query, conn, params=(item.productSmallId,))
        conn.close()

        # 전처리
        for index, item in productMedia.iterrows():
            # 'mediaSub_id' 열의 NaN 값을 '0'으로 대체
            if pd.isna(item['mediaSub_id']):
                productMedia.at[index, 'mediaSub_id'] = 0

        # 매체
        total_sum = productMedia['total'].sum()
        productMedia['total_per'] = (productMedia['total'] / total_sum) * 100

        productMedia['total_like'] = (productMedia['total'] * productMedia['like_per'])
        total_like_sum = productMedia['total_like'].sum()
        productMedia['total_like_per'] = (productMedia['total_like'] / total_like_sum) * 100
        productMedia = productMedia.sort_values(by='total_like_per', ascending=False)

        recommend = ""
        # total_per * like_per
        media_list = []
        media_name = {(3, 0): 'TV', (4, 0): '라디오', (5, 0): '인쇄', (6, 1): '버스', (6, 2): '지하철', (6, 3): '현수막'}
        max_value = productMedia['total_like_per'].max()
        for index, item in productMedia.iterrows():
            name = media_name[(item['mediaType_id'], item['mediaSub_id'])]
            if item['total_like_per'] == max_value:
                recommend = name
            item = {
                "name": name,
                "value": int(round(item['total_like_per']))
            }
            media_list.append(item)
        # count = len(media_list)
        # 응답 데이터 생성
        response_data = ResponseItem(
            success=True,
            data={
                "recommend": recommend,
                "mediaList": media_list
            },
            count=len(media_list),
            msg="데이터를 성공적으로 불러왔습니다."
        )
        return response_data
    else:
        print("0")
        # 품목 코드 없음
        insert_query = "INSERT INTO productMedia (total, mediaType_id, productSmall_id, like_per) VALUES (%s, %s, %s, %s)"
        cursor.execute(insert_query, (0, 3, item.productSmallId, 24))
        cursor.execute(insert_query, (0, 4, item.productSmallId, 2))
        cursor.execute(insert_query, (0, 5, item.productSmallId, 22))

        insert_query = "INSERT INTO productMedia (total, mediaSub_id, mediaType_id, productSmall_id, like_per) VALUES (%s, %s, %s, %s, %s)"
        cursor.execute(insert_query, (0, 1, 6, item.productSmallId, 8))
        cursor.execute(insert_query, (0, 2, 6, item.productSmallId, 8))
        cursor.execute(insert_query, (0, 3, 6, item.productSmallId, 10))
        conn.commit()

        input_item_productSmallId = item.productSmallId

        # 추천 알고리즘
        query = "SELECT * FROM productMedia"
        productMedia = pd.read_sql(query, conn)
        query = "SELECT productSmall.id, large, `medium`, small, code FROM productSmall, productMedium, productLarge WHERE productSmall.productMedium_id = productMedium.id AND productMedium.productLarge_id = productLarge.id"
        productLargeMediumSmall = pd.read_sql(query, conn)
        print(productMedia, productLargeMediumSmall)

        conn.close()

        # 전처리 & 추천 알고리즘
        df_ratings = productMedia
        df_product = productLargeMediumSmall

        df_media_product = df_ratings.pivot(
            index='id',
            columns='productSmall_id',
            values='like_per',
        ).fillna(0)

        matrix = df_media_product.values
        media_ratings_mean = np.mean(matrix, axis=1)
        matrix_media_mean = matrix - media_ratings_mean.reshape(-1, 1)
        pd.DataFrame(matrix_media_mean, columns=df_media_product.columns).head()

        U, sigma, Vt = svds(matrix_media_mean, k=12)  # spicy 이용한 Truncated SVD
        sigma = np.diag(sigma)

        svd_user_predicted_ratings = np.dot(np.dot(U, sigma), Vt) + media_ratings_mean.reshape(-1, 1)
        df_svd_preds = pd.DataFrame(svd_user_predicted_ratings, columns=df_media_product.columns)
        already_rated, predictions = media_rec.recommend_medias(df_svd_preds, 6, df_product, df_ratings, 5)

        # 1 미만 정제
        filtered_predictions = predictions[predictions['Predictions'] >= 1]

        conn = pymysql.connect(**db_config)
        cursor = conn.cursor()
        for index, item in filtered_predictions.iterrows():
            # 품목코드 내용 확인
            query = "SELECT * FROM productMedia WHERE productSmall_id = %s"
            cursor.execute(query, (item['productSmall_id'],))
            query_result = cursor.fetchall()
            print(query_result)  # ((6, 703, None, 3, 244, 24), (99, 1, None, 4, 244, 2), ...

            for row in query_result:
                total = row[1] * item['Predictions']

                query = "SELECT * FROM productMedia WHERE productSmall_id = %s and mediaType_id = %s"
                cursor.execute(query, (item['productSmall_id'], row[3],))
                query_res = cursor.fetchall()

                if row[2] is None:
                    total_value = int(query_res[0][1])
                    total += total_value

                    query = "UPDATE productMedia SET total = %s WHERE productSmall_id = %s and mediaType_id = %s"
                    cursor.execute(query, (total, input_item_productSmallId, row[3],))
                    conn.commit()

                else:
                    total_value = int(query_res[0][1])
                    total += total_value

                    query = "UPDATE productMedia SET total = %s WHERE productSmall_id = %s and mediaType_id = %s and mediaSub_id = %s"
                    cursor.execute(query, (total, input_item_productSmallId, row[3], row[2],))
                    conn.commit()

        query = "SELECT * FROM productMedia WHERE productSmall_id = %s"
        cursor.execute(query, (input_item_productSmallId,))
        productMedia = cursor.fetchall()
        conn.close()

        productMedia = pd.DataFrame(productMedia, columns=["id", "total", "mediaSub_id", "mediaType_id", "productSmall_id", "like_per"])  # Specify column names

        total_sum = productMedia['total'].sum()
        productMedia['total_per'] = (productMedia['total'] / total_sum) * 100
        productMedia = productMedia.sort_values(by='total_per', ascending=False)

        # 전처리
        for index, item in productMedia.iterrows():
            if pd.isna(item['mediaSub_id']):
                productMedia.at[index, 'mediaSub_id'] = 0

        # 추천
        recommend = ""
        media_list = []
        media_name = {(3, 0): 'TV', (4, 0): '라디오', (5, 0): '인쇄', (6, 1): '버스', (6, 2): '지하철', (6, 3): '현수막'}
        max_value = productMedia['total_per'].max()

        for index, item in productMedia.iterrows():
            name = media_name[(item['mediaType_id'], item['mediaSub_id'])]
            if item['total_per'] == max_value:
                recommend = name

            if not math.isnan(item['total_per']):
                total_per_rounded = int(round(item['total_per']))
            else:
                total_per_rounded = None
            print(total_per_rounded)
            item = {
                "name": name,
                "value": total_per_rounded
            }
            media_list.append(item)

        # 응답 데이터 생성
        response_data = ResponseItem(
            success=True,
            data={
                "recommend": recommend,
                "mediaList": media_list
            },
            count=len(media_list),
            msg="데이터를 성공적으로 불러왔습니다."
        )
        return response_data

# 광고 매체 추천 - 예산

# 광고 매체 추천 - 총합


