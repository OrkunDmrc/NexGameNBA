from fastapi import FastAPI
import joblib
import pandas as pd
from pydantic import BaseModel

class Item(BaseModel):
    regular: bool
    playoffs: bool
    away: str
    home: str
    spread: float
    total: float
    moneyline_away: float
    moneyline_home: float
#http://127.0.0.1:8000
#uvicorn app:app --reload
app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, world!"}


@app.post("/get_total_winner_results")
def get_total_winner_results(item: Item):
    winner_team_model = joblib.load('winner_team_pkls/winner_team_gradientboostingclassifier_model.pkl')
    winner_team_le_away = joblib.load('winner_team_pkls/winner_team_label_encoder_away.pkl')
    winner_team_le_home = joblib.load('winner_team_pkls/winner_team_label_encoder_home.pkl')
    print("winner team",joblib.load("winner_team_pkls/winner_team_features.pkl"))
    total_score_model = joblib.load('total_score_pkls/total_score_random_forest_model.pkl')
    total_score_le_away = joblib.load('total_score_pkls/total_score_label_encoder_away.pkl')
    total_score_le_home = joblib.load('total_score_pkls/total_score_label_encoder_home.pkl')
    print("total score", joblib.load("total_score_pkls/total_score_features.pkl"))
    h = winner_team_le_home.transform([item.home])[0]
    a = winner_team_le_away.transform([item.away])[0]
    df = pd.DataFrame([{
        'regular': item.regular,
        'playoffs': item.playoffs,
        'away': a,
        'home': h,
        'spread': item.spread,
        'total': item.total,
        'moneyline_away': item.moneyline_away,
        'moneyline_home': item.moneyline_home
    }])
    winner_team_pred = winner_team_model.predict(df)[0]
    if hasattr(winner_team_pred, "item"):
        winner_team_pred = winner_team_pred.item()
    else:
        winner_team_pred = int(winner_team_pred)
    df['away'] = total_score_le_home.transform([item.away])[0]
    df['home'] = total_score_le_away.transform([item.home])[0]
    total_score_pred = total_score_model.predict(df)[0]
    if hasattr(total_score_pred, "item"):
        total_score_pred = total_score_pred.item()
    else:
        total_score_pred = float(total_score_pred)
    return {
        "winner_team": item.home if winner_team_pred == 1 else item.away, 
        "total_score": str(round(total_score_pred, 0))
    }






