import pandas as pd
import gradio as gr
import joblib
import requests

def request(regular, playoffs, away, home, spread, total, moneyline_away, moneyline_home):
    url = "http://127.0.0.1:8000/get_total_winner_results"
    data = {
        "regular": regular,
        "playoffs": playoffs,
        "away": away,
        "home": home,
        "spread": spread,
        "total": total,
        "moneyline_away": moneyline_away,
        "moneyline_home": moneyline_home
    }
    response = requests.post(url, json=data)
    if(response.ok):
        print(response.json())


winner_team_model = joblib.load('winner_team_pkls/winner_team_gradientboostingclassifier_model.pkl')
winner_team_le_away = joblib.load('winner_team_pkls/winner_team_label_encoder_away.pkl')
winner_team_le_home = joblib.load('winner_team_pkls/winner_team_label_encoder_home.pkl')
print("winner team",joblib.load("winner_team_pkls/winner_team_features.pkl"))

total_score_model = joblib.load('total_score_pkls/total_score_random_forest_model.pkl')
total_score_le_away = joblib.load('total_score_pkls/total_score_label_encoder_away.pkl')
total_score_le_home = joblib.load('total_score_pkls/total_score_label_encoder_home.pkl')
print("total score", joblib.load("total_score_pkls/total_score_features.pkl"))

total_score_q1_model = joblib.load('total_score_q1_pkls/total_score_random_forest_model.pkl')
#total_score_le_away = joblib.load('total_score_q1_pkls/total_score_not_2025_label_encoder_away.pkl')
#total_score_le_home = joblib.load('total_score_q1_pkls/total_score_not_2025_label_encoder_home.pkl')
print("q1 total score", joblib.load("total_score_q1_pkls/total_score_features.pkl"))

total_score_q2_model = joblib.load('total_score_q2_pkls/total_score_random_forest_model.pkl')
#total_score_le_away = joblib.load('total_score_q2_pkls/total_score_not_2025_label_encoder_away.pkl')
#total_score_le_home = joblib.load('total_score_q2_pkls/total_score_not_2025_label_encoder_home.pkl')
print("q2 total score", joblib.load("total_score_q2_pkls/total_score_features.pkl"))

total_score_q3_model = joblib.load('total_score_q3_pkls/total_score_random_forest_model.pkl')
#total_score_le_away = joblib.load('total_score_q3_pkls/total_score_not_2025_label_encoder_away.pkl')
#total_score_le_home = joblib.load('total_score_q3_pkls/total_score_not_2025_label_encoder_home.pkl')
print("q3 total score", joblib.load("total_score_q3_pkls/total_score_features.pkl"))

total_score_q4_model = joblib.load('total_score_q4_pkls/total_score_random_forest_model.pkl')
#total_score_le_away = joblib.load('total_score_q4_pkls/total_score_not_2025_label_encoder_away.pkl')
#total_score_le_home = joblib.load('total_score_q4_pkls/total_score_not_2025_label_encoder_home.pkl')
print("q4 total score", joblib.load("total_score_q4_pkls/total_score_features.pkl"))

total_score_ot_model = joblib.load('total_score_ot_pkls/total_score_random_forest_model.pkl')
#total_score_le_away = joblib.load('total_score_ot_pkls/total_score_not_2025_label_encoder_away.pkl')
#total_score_le_home = joblib.load('total_score_ot_pkls/total_score_not_2025_label_encoder_home.pkl')
print("ot total score", joblib.load("total_score_ot_pkls/total_score_features.pkl"))


def predict_winner_team(regular, playoffs, away, home, spread, total, moneyline_away, moneyline_home):
    h = winner_team_le_home.transform([home])[0]
    a = winner_team_le_away.transform([away])[0]
    df = pd.DataFrame([{
        'regular': regular,
        'playoffs': playoffs,
        'away': a,
        'home': h,
        'spread': spread,
        'total': total,
        'moneyline_away': moneyline_away,
        'moneyline_home': moneyline_home,
        #'away_rat': away_rat, 
        #'home_rat': home_rat,
    }])
    winner_team_pred = winner_team_model.predict(df)[0]
    df['away'] = total_score_le_home.transform([away])[0]
    df['home'] = total_score_le_away.transform([home])[0]
    total_score_pred = total_score_model.predict(df)[0]
    total_score_q1_pred = total_score_q1_model.predict(df)[0]
    total_score_q2_pred = total_score_q2_model.predict(df)[0]
    total_score_q3_pred = total_score_q3_model.predict(df)[0]
    total_score_q4_pred = total_score_q4_model.predict(df)[0]
    total_score_ot_pred = total_score_ot_model.predict(df)[0]
    #request(regular, playoffs, away, home, spread, total, moneyline_away, moneyline_home)
    return [f"winner_team:{home if winner_team_pred == 1 else away}",
             f"total_score:{str(round(total_score_pred, 0))}",
             f"total_score_q1:{str(round(total_score_q1_pred, 0))}",
             f"total_score_q2:{str(round(total_score_q2_pred, 0))}",
             f"total_score_q3:{str(round(total_score_q3_pred, 0))}",
             f"total_score_q4:{str(round(total_score_q4_pred, 0))}",
             f"total_score_ot:{str(round(total_score_ot_pred, 0))}"
             ]

UI = gr.Interface(
    fn=predict_winner_team,
    inputs=[
        gr.Checkbox(label="Regular"),
        gr.Checkbox(label="Playoff"),
        gr.Dropdown(list(winner_team_le_away.classes_), label="Away Team"),
        gr.Dropdown(list(winner_team_le_home.classes_), label="Home Team"),
        gr.Number(label="Spread"),
        gr.Number(label="Total"),
        gr.Number(label="Moneyline Away"),
        gr.Number(label="Moneyline Home"),
        #gr.Number(label="Away Rating"),
        #gr.Number(label="Home Rating"),
    ],
    outputs=gr.Textbox(label="Winner Team and Total Score"),
    title="Winner Team and Total Score"
)

UI.launch()