import pandas as pd
import lightgbm as lgb
from sklearn.model_selection import train_test_split
import joblib

# load dataset
orders = pd.read_csv("../data/orders.csv")
prior = pd.read_csv("../data/order_products__prior.csv")

# sample small data
prior = prior.head(100000)

# create target
prior["reordered"] = prior["reordered"]

X = prior[["product_id","order_id"]]
y = prior["reordered"]

X_train,X_test,y_train,y_test = train_test_split(X,y,test_size=0.2)

model = lgb.LGBMClassifier()

model.fit(X_train,y_train)

joblib.dump(model,"model.pkl")

print("Model trained and saved")
