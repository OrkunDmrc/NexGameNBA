import os
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException, Request, status
from huggingface_hub import hf_hub_download
import joblib
import pandas as pd
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

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

load_dotenv()
BALLEDONTLIE_API_KEY = os.getenv("BALLEDONTLIE_API_KEY")
SERVICE_API_KEY = os.getenv("SERVICE_API_KEY")

def verify_api_key(request: Request):
    client_key = request.headers.get("Authorization") or ""
    if client_key != SERVICE_API_KEY:
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
file_path = hf_hub_download(repo_id=os.getenv("REPO_ID"), filename=os.getenv("LE_AWAY_FILE_NAME"))
le_away = joblib.load(file_path)#'winner_team_pkls/winner_team_label_encoder_away.pkl'
file_path = hf_hub_download(repo_id=os.getenv("REPO_ID"), filename=os.getenv("LE_HOME_FILE_NAME"))
le_home = joblib.load(file_path)#'winner_team_pkls/winner_team_label_encoder_home.pkl'
def get_prediction(item, model):
    a = le_away.transform([item.away])[0]
    h = le_home.transform([item.home])[0]
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
    file_path = hf_hub_download(repo_id=os.getenv("REPO_ID"), filename=os.getenv("WINNER_TEAM_MODEL_FILE_NAME"))
    winner_team_model = joblib.load(file_path) #winner_team_pkls/winner_team_gradientboostingclassifier_model.pkl
    winner_team_pred = get_prediction(item, winner_team_model)

    file_path = hf_hub_download(repo_id=os.getenv("REPO_ID"), filename=os.getenv("TOTAL_SCORE_MODEL_FILE_NAME"))
    total_score_model = joblib.load(file_path) #'total_score_pkls/total_score_random_forest_model.pkl'
    total_score_pred = get_prediction(item, total_score_model)

    return {
        "winner_team": item.home if winner_team_pred == 1 else item.away, 
        "total_score": int(round(total_score_pred, 0))
    }

@app.post("/get_quareters_prediction")
def get_quareters_prediction(item: Item):
    file_path = hf_hub_download(repo_id=os.getenv("REPO_ID"), filename=os.getenv("TOTAL_SCORE_Q1_MODEL_FILE_NAME"))
    total_score_q1_model = joblib.load(file_path)#'total_score_q1_pkls/total_score_q1_random_forest_model.pkl'
    total_score_q1_pred = get_prediction(item, total_score_q1_model)

    file_path = hf_hub_download(repo_id=os.getenv("REPO_ID"), filename=os.getenv("TOTAL_SCORE_Q2_MODEL_FILE_NAME"))
    total_score_q2_model = joblib.load(file_path)#'total_score_q2_pkls/total_score_q2_random_forest_model.pkl'
    total_score_q2_pred = get_prediction(item, total_score_q2_model)

    file_path = hf_hub_download(repo_id=os.getenv("REPO_ID"), filename=os.getenv("TOTAL_SCORE_Q3_MODEL_FILE_NAME"))
    total_score_q3_model = joblib.load(file_path)#'total_score_q3_pkls/total_score_q3_random_forest_model.pkl'
    total_score_q3_pred = get_prediction(item, total_score_q3_model)

    file_path = hf_hub_download(repo_id=os.getenv("REPO_ID"), filename=os.getenv("TOTAL_SCORE_Q4_MODEL_FILE_NAME"))
    total_score_q4_model = joblib.load(file_path)#'total_score_q4_pkls/total_score_q4_random_forest_model.pkl'
    total_score_q4_pred = get_prediction(item, total_score_q4_model)

    file_path = hf_hub_download(repo_id=os.getenv("REPO_ID"), filename=os.getenv("TOTAL_SCORE_OT_MODEL_FILE_NAME"))
    total_score_ot_model = joblib.load(file_path)#('total_score_ot_pkls/total_score_ot_random_forest_model.pkl'
    total_score_ot_pred = get_prediction(item, total_score_ot_model)

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

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")
