import os
from fastapi import Depends, FastAPI, HTTPException, Request, status
import joblib
import pandas as pd
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

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

API_KEY = os.getenv("API_KEY", "c-t6J2rNglNlUH0fOm95He3mZmgbAAGL_5v9nzSkjSw")
API_KEY_NAME = "Authorization"

def verify_api_key(request: Request):
    client_key = request.headers.get(API_KEY_NAME) or request.query_params.get("api_key")
    if client_key != API_KEY:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing API Key",
        )

app = FastAPI(dependencies=[Depends(verify_api_key)])

origins = [
    #"http://localhost:8081",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_prediction(item, model, le_away, le_home):
    h = le_home.transform([item.home])[0]
    a = le_away.transform([item.away])[0]
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
    pred = model.predict(df)[0]
    if hasattr(pred, "item"):
        pred = pred.item()
    else:
        pred = int(pred)
    return pred

@app.get("/")
def read_root():
    return {"message": "Hello, world!"}

@app.post("/get_total_winner_prediction")
def get_total_winner_prediction(item: Item):
    winner_team_model = joblib.load('winner_team_pkls/winner_team_gradientboostingclassifier_model.pkl')
    winner_team_le_away = joblib.load('winner_team_pkls/winner_team_label_encoder_away.pkl')
    winner_team_le_home = joblib.load('winner_team_pkls/winner_team_label_encoder_home.pkl')
    #print("winner team",joblib.load("winner_team_pkls/winner_team_features.pkl"))
    winner_team_pred = get_prediction(item, winner_team_model, winner_team_le_away, winner_team_le_home)
    total_score_model = joblib.load('total_score_pkls/total_score_random_forest_model.pkl')
    total_score_le_away = joblib.load('total_score_pkls/total_score_label_encoder_away.pkl')
    total_score_le_home = joblib.load('total_score_pkls/total_score_label_encoder_home.pkl')
    #print("total score", joblib.load("total_score_pkls/total_score_features.pkl"))
    total_score_pred = get_prediction(item, total_score_model, total_score_le_away, total_score_le_home)
    return {
        "winner_team": item.home if winner_team_pred == 1 else item.away, 
        "total_score": int(round(total_score_pred, 0))
    }

@app.post("/get_quareters_prediction")
def get_quareters_prediction(item: Item):
    total_score_q1_model = joblib.load('total_score_q1_pkls/total_score_random_forest_model.pkl')
    total_score_le_q1_away = joblib.load('total_score_q1_pkls/total_score_not_2025_label_encoder_away.pkl')
    total_score_le_q1_home = joblib.load('total_score_q1_pkls/total_score_not_2025_label_encoder_home.pkl')
    total_score_q1_pred = get_prediction(item, total_score_q1_model, total_score_le_q1_away, total_score_le_q1_home)

    total_score_q2_model = joblib.load('total_score_q2_pkls/total_score_random_forest_model.pkl')
    total_score_le_q2_away = joblib.load('total_score_q2_pkls/total_score_not_2025_label_encoder_away.pkl')
    total_score_le_q2_home = joblib.load('total_score_q2_pkls/total_score_not_2025_label_encoder_home.pkl')
    total_score_q2_pred = get_prediction(item, total_score_q2_model, total_score_le_q2_away, total_score_le_q2_home)

    total_score_q3_model = joblib.load('total_score_q3_pkls/total_score_random_forest_model.pkl')
    total_score_le_q3_away = joblib.load('total_score_q3_pkls/total_score_not_2025_label_encoder_away.pkl')
    total_score_le_q3_home = joblib.load('total_score_q3_pkls/total_score_not_2025_label_encoder_home.pkl')
    total_score_q3_pred = get_prediction(item, total_score_q3_model, total_score_le_q3_away, total_score_le_q3_home)

    total_score_q4_model = joblib.load('total_score_q4_pkls/total_score_random_forest_model.pkl')
    total_score_le_q4_away = joblib.load('total_score_q4_pkls/total_score_not_2025_label_encoder_away.pkl')
    total_score_le_q4_home = joblib.load('total_score_q4_pkls/total_score_not_2025_label_encoder_home.pkl')
    total_score_q4_pred = get_prediction(item, total_score_q4_model, total_score_le_q4_away, total_score_le_q4_home)

    total_score_ot_model = joblib.load('total_score_ot_pkls/total_score_random_forest_model.pkl')
    total_score_le_ot_away = joblib.load('total_score_ot_pkls/total_score_not_2025_label_encoder_away.pkl')
    total_score_le_ot_home = joblib.load('total_score_ot_pkls/total_score_not_2025_label_encoder_home.pkl')
    total_score_ot_pred = get_prediction(item, total_score_ot_model, total_score_le_ot_away, total_score_le_ot_home)

    return {
        "total_score_q1": int(round(total_score_q1_pred, 0)), 
        "total_score_q2": int(round(total_score_q2_pred, 0)),
        "total_score_q3": int(round(total_score_q3_pred, 0)),
        "total_score_q4": int(round(total_score_q4_pred, 0)),
        "total_score_ot": int(round(total_score_ot_pred, 0)),
    }


@app.post("/get_all_prediction")
def get_all_prediction(item: Item):
    return get_total_winner_prediction(item) | get_quareters_prediction(item)



