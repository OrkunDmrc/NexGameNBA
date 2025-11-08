import pandas as pd
from sklearn.metrics import r2_score
from sklearn.calibration import LabelEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.multioutput import MultiOutputRegressor

df = pd.read_csv('first_nba_2008_2025.csv')

le_away = LabelEncoder()
le_home = LabelEncoder()

df['away'] = le_away.fit_transform(df['away'])
df['home'] = le_home.fit_transform(df['home'])

train_df = df.dropna(subset=['moneyline_away', 'moneyline_home'])
X_train = train_df.drop(columns=['moneyline_away', 'moneyline_home'])
y_train = train_df[['moneyline_away', 'moneyline_home']]

print(f"df:{df['home'].count()} train_df:{train_df['away'].count()}")

model = MultiOutputRegressor(RandomForestRegressor())
model.fit(X_train, y_train)

y_pred_train = model.predict(X_train)
r2 = r2_score(y_train, y_pred_train)
print("R² Score (pseudo-accuracy):", r2)

predict_df = df[df[['moneyline_away', 'moneyline_home']].isnull().any(axis=1)]

X_predict = predict_df.drop(columns=['moneyline_away', 'moneyline_home'])
#X_predict = X_predict.fillna(X_train.mean())

predictions = model.predict(X_predict)
prediction_df = pd.DataFrame(predictions, columns=['moneyline_away', 'moneyline_home'], index=predict_df.index)

df.update(prediction_df)

df['away'] = le_away.inverse_transform(df['away'])
df['home'] = le_home.inverse_transform(df['home'])
print(f"df:{df['away'].count()}")
df.to_csv('new_nba_2008_2025.csv', index=False)