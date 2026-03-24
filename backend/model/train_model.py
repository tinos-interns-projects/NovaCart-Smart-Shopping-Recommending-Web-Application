import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import joblib

# sample fake training data
data = pd.DataFrame({
    "order_id":[1,2,3,4,5],
    "product_id":[10,20,30,40,50],
    "reordered":[0,1,0,1,1]
})

X = data[["order_id","product_id"]]
y = data["reordered"]

model = LogisticRegression()
model.fit(X,y)

joblib.dump(model,"model.pkl")

print("Model trained and saved")