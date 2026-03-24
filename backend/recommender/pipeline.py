import joblib
import pandas as pd
import numpy as np

from products.models import Product


def sigmoid(x):
    return 1 / (1 + np.exp(-x))


def get_recommendations(user_id):

    # Load trained artifacts
    artifacts = joblib.load("models/lightgbm_ranker.joblib")

    ranker = artifacts["ranker"]
    calibrator = artifacts["calibrator"]
    feature_columns = artifacts["feature_columns"]

    # Candidate products
    product_ids = list(range(1, 51))

    rows = []

    for product_id in product_ids:

        row = {
            "user_id": user_id,
            "product_id": product_id,
        }

        # Fill missing features
        for col in feature_columns:
            if col not in row:
                row[col] = 0

        rows.append(row)

    df = pd.DataFrame(rows)

    # Predict ranking scores
    raw_scores = ranker.predict(df[feature_columns])

    if calibrator is not None:
        probs = calibrator.predict_proba(raw_scores.reshape(-1, 1))[:, 1]
    else:
        probs = sigmoid(raw_scores)

    df["score"] = probs

    # Sort best products
    df = df.sort_values("score", ascending=False)

    top_product_ids = df["product_id"].head(10).tolist()

    # Convert IDs → product names
    products = Product.objects.filter(product_id__in=top_product_ids)

    recommendations = [p.product_name for p in products]

    return recommendations