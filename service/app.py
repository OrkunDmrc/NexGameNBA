import os
from typing import Optional
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException, Request, status
from huggingface_hub import hf_hub_download
import joblib
import pandas as pd
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import psycopg2
import time

class PredictionInput(BaseModel):
    date: Optional[str] = None
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

class GetItem(BaseModel):
    date: str
    away: str
    home: str

load_dotenv()
BALLEDONTLIE_API_KEY = os.getenv("BALLEDONTLIE_API_KEY")
SERVICE_API_KEY = os.getenv("SERVICE_API_KEY")
SUPABASE_TOKEN = os.getenv("SUPABASE_TOKEN")


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

@app.post("/get_and_insert")
def get_and_insert(item: PredictionInput):
    waiting_time = int(os.getenv("WAITING_TIME"))
    winner = get_winner_prediction(item)
    time.sleep(waiting_time)
    total_socre = get_total_score_prediction(item)
    time.sleep(waiting_time)
    q1_socre = get_total_score_q1_prediction(item)
    time.sleep(waiting_time)
    q2_socre = get_total_score_q2_prediction(item)
    time.sleep(waiting_time)
    q3_socre = get_total_score_q3_prediction(item)
    time.sleep(waiting_time)
    q4_socre = get_total_score_q4_prediction(item)
    time.sleep(waiting_time)
    ot_socre = get_total_score_ot_prediction(item)
    time.sleep(waiting_time)
    try:
        connection = psycopg2.connect(
            user=os.getenv("SUPABASE_USER"),
            password=os.getenv("SUPABASE_PASSWORD"),
            host=os.getenv("SUPABASE_HOST"),
            port=os.getenv("SUPABASE_PORT"),
            dbname=os.getenv("SUPABASE_DBNAME")
        )
        print("Connection successful!")
        cursor = connection.cursor()
        cursor.execute("""
                INSERT INTO nexgamenbapred (
                    date, regular, playoff, away, home, spread, total,
                    away_moneyline, home_moneyline,
                    total_score, q1_score, q2_score, q3_score, q4_score, ot_score,
                    winner
                )
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                item.date,          # date (nullable)
                item.regular,          # regular
                item.playoffs,         # playoff
                item.away,      # away
                item.home,     # home
                item.spread,          # spread
                item.total,         # total
                item.moneyline_away,           # away_moneyline
                item.moneyline_home,          # home_moneyline
                total_socre["total_score"],          # total_score
                q1_socre["total_score_q1"],          # q1_score
                q2_socre["total_score_q2"],          # q2_score
                q3_socre["total_score_q3"],          # q3_score
                q4_socre["total_score_q4"],          # q4_score
                ot_socre["total_score_ot"],          # ot_score
                winner["winner_team"]           # winner
            ))
        connection.commit()
        cursor.close()
        connection.close()
        print("Connection closed.")
    except Exception as e:
        print(f"Failed to connect: {e}")

@app.post("/get_predictions")
def get_predictions(item: GetItem):
    try:
        connection = psycopg2.connect(
            user=os.getenv("SUPABASE_USER"),
            password=os.getenv("SUPABASE_PASSWORD"),
            host=os.getenv("SUPABASE_HOST"),
            port=os.getenv("SUPABASE_PORT"),
            dbname=os.getenv("SUPABASE_DBNAME")
        )
        print("Connection successful!")
        cursor = connection.cursor()
        row = cursor.execute("""
            SELECT
                date,
                regular,
                playoff,
                away,
                home,
                spread,
                total,
                away_moneyline,
                home_moneyline,
                total_score,
                q1_score,
                q2_score,
                q3_score,
                q4_score,
                ot_score,
                winner
            FROM nexgamenbapred
            WHERE away = %s and home = %s and date = %s
            LIMIT 1
        """, (item.away, item.home, item.date))
        row = cursor.fetchone()
        cursor.close()
        connection.close()
        print("Connection closed.")
        return {
            "date":row[0],
            "regular":row[1],
            "playoff":row[2],
            "away":row[3],
            "home":row[4],
            "spread":row[5],
            "total":row[6],
            "away_moneyline":row[7],
            "home_moneyline":row[8],
            "total_score":row[9],
            "q1_score":row[10],
            "q2_score":row[11],
            "q3_score":row[12],
            "q4_score":row[13],
            "ot_score":row[14],
            "winner":row[15]
        }
    except Exception as e:
        print(f"Failed to connect: {e}")

@app.post("/get_winner_prediction")
def get_winner_prediction(item: PredictionInput):
    file_path = hf_hub_download(repo_id=os.getenv("REPO_ID"), filename=os.getenv("WINNER_TEAM_MODEL_FILE_NAME"))
    print(os.getenv("WINNER_TEAM_MODEL_FILE_NAME"), "Loaded")
    winner_team_model = joblib.load(file_path) #winner_team_pkls/winner_team_gradientboostingclassifier_model.pkl
    winner_team_pred = get_prediction(item, winner_team_model)
    return {
        "winner_team": item.home if winner_team_pred == 1 else item.away
    }

@app.post("/get_total_score_prediction")
def get_total_score_prediction(item: PredictionInput):
    file_path = hf_hub_download(repo_id=os.getenv("REPO_ID"), filename=os.getenv("TOTAL_SCORE_MODEL_FILE_NAME"))
    print(os.getenv("TOTAL_SCORE_MODEL_FILE_NAME"), "Loaded")
    total_score_model = joblib.load(file_path) #'total_score_pkls/total_score_random_forest_model.pkl'
    total_score_pred = get_prediction(item, total_score_model)
    return {
        "total_score": int(round(total_score_pred, 0))
    }

@app.post("/get_total_score_q1_prediction")
def get_total_score_q1_prediction(item: PredictionInput):
    file_path = hf_hub_download(repo_id=os.getenv("REPO_ID"), filename=os.getenv("TOTAL_SCORE_Q1_MODEL_FILE_NAME"))
    total_score_q1_model = joblib.load(file_path)#'total_score_q1_pkls/total_score_q1_random_forest_model.pkl'
    total_score_q1_pred = get_prediction(item, total_score_q1_model)
    return {
        "total_score_q1": int(round(total_score_q1_pred, 0))
    }

@app.post("/get_total_score_q2_prediction")
def get_total_score_q2_prediction(item: PredictionInput):
    file_path = hf_hub_download(repo_id=os.getenv("REPO_ID"), filename=os.getenv("TOTAL_SCORE_Q2_MODEL_FILE_NAME"))
    total_score_q2_model = joblib.load(file_path)#'total_score_q2_pkls/total_score_q2_random_forest_model.pkl'
    total_score_q2_pred = get_prediction(item, total_score_q2_model)
    return {
        "total_score_q2": int(round(total_score_q2_pred, 0))
    }

@app.post("/get_total_score_q3_prediction")
def get_total_score_q3_prediction(item: PredictionInput):
    file_path = hf_hub_download(repo_id=os.getenv("REPO_ID"), filename=os.getenv("TOTAL_SCORE_Q3_MODEL_FILE_NAME"))
    total_score_q3_model = joblib.load(file_path)#'total_score_q3_pkls/total_score_q3_random_forest_model.pkl'
    total_score_q3_pred = get_prediction(item, total_score_q3_model)
    return {
        "total_score_q3": int(round(total_score_q3_pred, 0))
    }

@app.post("/get_total_score_q4_prediction")
def get_total_score_q4_prediction(item: PredictionInput):
    file_path = hf_hub_download(repo_id=os.getenv("REPO_ID"), filename=os.getenv("TOTAL_SCORE_Q4_MODEL_FILE_NAME"))
    total_score_q4_model = joblib.load(file_path)#'total_score_q4_pkls/total_score_q4_random_forest_model.pkl'
    total_score_q4_pred = get_prediction(item, total_score_q4_model)
    return {
        "total_score_q4": int(round(total_score_q4_pred, 0))
    }


@app.post("/get_total_score_ot_prediction")
def get_total_score_ot_prediction(item: PredictionInput):
    file_path = hf_hub_download(repo_id=os.getenv("REPO_ID"), filename=os.getenv("TOTAL_SCORE_OT_MODEL_FILE_NAME"))
    total_score_model = joblib.load(file_path) #'total_score_pkls/total_score_random_forest_model.pkl'
    total_score_pred = get_prediction(item, total_score_model)
    return {
        "total_score_ot": int(round(total_score_pred, 0))
    }

@app.post("/get_total_winner_prediction")
def get_total_winner_prediction(item: PredictionInput):
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
def get_quareters_prediction(item: PredictionInput):
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
def get_all_prediction(item: PredictionInput):
    return get_total_winner_prediction(item) | get_quareters_prediction(item)

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")
