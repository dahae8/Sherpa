# 오프라인 매체 추천
from fastapi import APIRouter
from urllib import parse
from sqlalchemy import create_engine
import pandas as pd
from sklearn.decomposition import TruncatedSVD
from scipy.sparse.linalg import svds
import numpy as np
from app.algorithm import media_rec

router = APIRouter()

@router.get("/offline")
def offline():
    # DB 연결
    db_config = {
        "host": "j9c107.p.ssafy.io",
        "user": "c107",
        "password": "c107adrec",
        "database": "adrec",
    }

    db_connection_str = f"mysql+pymysql://{db_config['user']}:{db_config['password']}@{db_config['host']}/{db_config['database']}"
    db_connection_engine = create_engine(db_connection_str)

    query = "SELECT * FROM productMedia"
    productMedia = pd.read_sql(query, db_connection_engine)
    query = "SELECT productSmall.id, large, `medium`, small, code FROM productSmall, productMedium, productLarge WHERE productSmall.productMedium_id = productMedium.id AND productMedium.productLarge_id = productLarge.id"
    productLargeMediumSmall = pd.read_sql(query, db_connection_engine)
    print(productMedia, productLargeMediumSmall)
    db_connection_engine.dispose()

    # 전처리 & 추천 알고리즘
    df_ratings = productMedia
    df_product = productLargeMediumSmall

    df_media_product = df_ratings.pivot(
        index='id',
        columns='productSmall_id',
        values='like_per',
    ).fillna(0)

    # matrix는 pivot_table 값을 numpy matrix로 만든 것
    matrix = df_media_product.values

    # user_ratings_mean은 사용자의 평균 평점
    media_ratings_mean = np.mean(matrix, axis=1)

    # R_user_mean : 사용자-영화에 대해 사용자 평균 평점을 뺀 것.
    matrix_media_mean = matrix - media_ratings_mean.reshape(-1, 1)
    pd.DataFrame(matrix_media_mean, columns=df_media_product.columns).head()

    # spicy 이용한 Truncated SVD
    # scipy에서 제공해주는 svd.
    # U 행렬, sigma 행렬, V 전치 행렬을 반환.
    U, sigma, Vt = svds(matrix_media_mean, k=12)
    sigma = np.diag(sigma)

    # U, Sigma, Vt의 내적을 수행하면, 다시 원본 행렬로 복원이 된다.
    # 거기에 + 사용자 평균 rating을 적용한다.
    svd_user_predicted_ratings = np.dot(np.dot(U, sigma), Vt) + media_ratings_mean.reshape(-1, 1)
    df_svd_preds = pd.DataFrame(svd_user_predicted_ratings, columns=df_media_product.columns)

    already_rated, predictions = media_rec.recommend_medias(df_svd_preds, 6, df_product, df_ratings, 10)

    print(predictions)


