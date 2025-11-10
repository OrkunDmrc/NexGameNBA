import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.svm import SVR
from sklearn.metrics import r2_score
#from xgboost import XGBRegressor
import joblib

df = pd.read_csv('new_nba_2008_2025.csv')
df = df.loc[~((df['season'] == 2025))]
df = df.drop(columns=['season', 'score_away', 'score_home', 'home_winner', "score_total",
                      "q1_away",	"q2_away",	"q3_away",	"ot_away",
                        	"q1_home",	"q2_home",	"q3_home",	"ot_home"
                      #, 'away_rat', 'home_rat'
                      #,'away_p0','home_p0','away_p1','home_p1',"away_p2","home_p2","away_p3",
                    #"home_p3","away_p4","home_p4","away_p5","home_p5","away_p6","home_p6",
                    #"away_p7","home_p7","away_p8","home_p8","away_p9","home_p9","away_p10",
                    #"home_p10","away_p11","home_p11"
                      ])

#df['home_winner'] = df['home_winner'].astype(int)
df["q4_total"] = df["q4_home"] + df["q4_away"]
df = df.drop(columns=["q4_home", "q4_away"])

le_away = LabelEncoder()
le_home = LabelEncoder()
df['away'] = le_away.fit_transform(df['away'])
df['home'] = le_home.fit_transform(df['home'])

print("count:", df['away'].count())
df.dropna(axis=0, inplace=True)
#df = df[np.abs(df['away_rat'] - df['home_rat']) > 1.5]
#df = df[np.abs(df['moneyline_away'] - df['moneyline_home']) > 0.1] #1.6
print("count:", df['away'].count())

models = {
    #'Linear Regression': LinearRegression(),
    'Random Forest': RandomForestRegressor(),
    #'Gradient Boosting': GradientBoostingRegressor(),
    #'XGBoost': XGBRegressor(),
    #'SVR': SVR()
}
X_train = df.drop(columns=['q4_total'])
y_train = df['q4_total']

results = []
best_model_obj = None
best_model_name = ""
best_r2 = -np.inf
for name, model in models.items():
  model.fit(X_train, y_train)
  y_pred = model.predict(X_train)
  r2 = r2_score(y_train, y_pred)
  results.append((name, r2))
  print(name, r2)
  if r2 > best_r2:
    best_r2 = r2
    best_model_obj = model
    best_model_name = name

print(f"Best Model: {best_model_name} with R2 Score: {best_r2:.4f}")

joblib.dump(best_model_obj, f"total_score_q4_pkls/total_score_q4_{best_model_name.replace(' ', '_').lower()}_model.pkl", compress=("lzma", 3))
joblib.dump(X_train.columns.tolist(), "total_score_q4_pkls/total_score_features.pkl")
joblib.dump(le_away, 'total_score_q4_pkls/total_score_label_encoder_away.pkl')
joblib.dump(le_home, 'total_score_q4_pkls/total_score_label_encoder_home.pkl')
print(f"\nSaved best model as: total_score_q4_{best_model_name.replace(' ', '_').lower()}_model.pkl")
#loaded_model=  joblib.load('gradient_boosting_model.pkl')
#decoded_away = le_away.inverse_transform(df['away'])