import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.neighbors import KNeighborsClassifier
import xgboost as xgb
from sklearn.svm import SVC
import joblib

df = pd.read_csv('new_nba_2008_2025.csv')
#df = df.loc[~((df['season'] == 2025))]
df = df.drop(columns=['season', 'score_away',	'score_home', 'score_total',
                    	"q1_away",	"q2_away",	"q3_away",	"q4_away",	"ot_away",
                        	"q1_home",	"q2_home",	"q3_home",	"q4_home",	"ot_home"
                      #'away_rat', 'home_rat'
                      #,'away_p0','home_p0','away_p1','home_p1',"away_p2","home_p2","away_p3",
                    #"home_p3","away_p4","home_p4","away_p5","home_p5","away_p6","home_p6",
                    #"away_p7","home_p7","away_p8","home_p8","away_p9","home_p9","away_p10",
                    #"home_p10","away_p11","home_p11"
                      ])

df['home_winner'] = df['home_winner'].astype(int)

#df = pd.get_dummies(df, columns=['away', 'home'])

le_away = LabelEncoder()
le_home = LabelEncoder()

df['away'] = le_away.fit_transform(df['away'])
df['home'] = le_home.fit_transform(df['home'])
print("count", df['away'].count())
df.dropna(axis=0, inplace=True)
#df = df[np.abs(df['away_rat'] - df['home_rat']) > 1.5]
#df = df[np.abs(df['moneyline_away'] - df['moneyline_home']) > 1.6] #1.6
print("count", df['away'].count())
print(df.columns.tolist())



X = df.drop(columns=['home_winner'])
y = df['home_winner']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

models = {
  "LogisticRegression": LogisticRegression(),
  "GradientBoostingClassifier" :GradientBoostingClassifier(),
  "RandomForestClassifier":RandomForestClassifier(),
  "MLPClassifier": MLPClassifier(hidden_layer_sizes=(100,50), max_iter=500),
  "KNeighborsClassifier": KNeighborsClassifier(n_neighbors=10),
  "XGBClassifier": xgb.XGBClassifier(use_label_encoder=False, eval_metric='logloss'),
  "SVC": SVC()
}
results = []
best_model_obj = None
best_model_name = ""
best_score = -np.inf
for name, model in models.items():
  model.fit(X_train, y_train)
  y_pred = model.predict(X_test)
  acc_score = accuracy_score(y_test, y_pred)
  results.append((name, acc_score))
  print(name, acc_score)
  if acc_score > best_score:
    best_score = acc_score
    best_model_obj = model
    best_model_name = name

print(f"Best Model: {best_model_name} with accuracy Score: {best_score:.4f}")

joblib.dump(best_model_obj, f"winner_team_pkls/winner_team_{best_model_name.replace(' ', '_').lower()}_model.pkl")
joblib.dump(X.columns.tolist(), "winner_team_pkls/winner_team_features.pkl")
joblib.dump(le_away, 'winner_team_pkls/winner_team_label_encoder_away.pkl')
joblib.dump(le_home, 'winner_team_pkls/winner_team_label_encoder_home.pkl')
print(f"\nSaved best model as: winner_team_{best_model_name.replace(' ', '_').lower()}_model.pkl")
#loaded_model=  joblib.load('gradient_boosting_model.pkl')
#decoded_away = le_away.inverse_transform(df['away'])
