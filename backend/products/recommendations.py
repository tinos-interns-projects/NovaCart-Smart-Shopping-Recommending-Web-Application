import pandas as pd

# Load dataset
data = pd.read_csv("data/order_products__prior.csv")

# TAKE SMALL SAMPLE
data = data.head(20000)

# Create basket
basket = (
    data.groupby(["order_id", "product_id"])["product_id"]
    .count()
    .unstack()
    .fillna(0)
)

# Convert to 0/1
basket = (basket > 0).astype(int)


# -------- RECOMMENDATION FUNCTION --------

def get_recommendations(product_id, top_n=5):

    if product_id not in basket.columns:
        return []

    # calculate similarity
    similarity = basket.corr()

    similar_products = similarity[product_id].sort_values(ascending=False)[1:top_n+1]

    return list(similar_products.index)