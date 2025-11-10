import requests
#from bs4 import BeautifulSoup
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.multioutput import MultiOutputRegressor
from sklearn.metrics import r2_score
from sklearn.preprocessing import LabelEncoder

#df = pd.read_csv('nba_2010_2025.csv')

def convert_odds(row):
    if row['moneyline_away'] > 0:
        row['moneyline_away'] = row['moneyline_away'] / 100 + 1
    else:
        row['moneyline_away'] = round(1 + 100 / (-1 * row['moneyline_away']), 2)

    if row['moneyline_home'] > 0:
        row['moneyline_home'] = row['moneyline_home'] / 100 + 1
    else:
        row['moneyline_home'] = round(1 + 100 / (-1 * row['moneyline_home']), 2)

    return row
    
df = pd.read_csv('nba_2008-2025.csv')
#df = df.loc[~(df['playoffs'] == True)]
columns_to_delete = ['whos_favored',
                     #"q1_away","q2_away","q3_away","q4_away","ot_away",
                     #"q1_home","q2_home","q3_home","q4_home","ot_home",
                     'id_spread','id_total', 'h2_spread', 'h2_total', "date"]
df.drop(columns=columns_to_delete, inplace=True)
#df = df.loc[~((df['season'] == 2008) | (df['season'] == 2009))]
#df.dropna(axis=1, inplace=True)
df = df.apply(convert_odds, axis=1)

team_name_map = {
    'por': 'Portland Trail Blazers',
    'utah': 'Utah Jazz',
    'hou': 'Houston Rockets',
    'phi': 'Philadelphia 76ers',
    'wsh': 'Washington Wizards',
    'mil': 'Milwaukee Bucks',
    'sa': 'San Antonio Spurs',
    'mia': 'Miami Heat',
    'lal': 'Los Angeles Lakers',
    'bos': 'Boston Celtics',
    'chi': 'Chicago Bulls',
    'dal': 'Dallas Mavericks',
    'sac': 'Sacramento Kings',
    'okc': 'Oklahoma City Thunder',
    'det': 'Detroit Pistons',
    'phx': 'Phoenix Suns',
    'tor': 'Toronto Raptors',
    'ny': 'New York Knicks',
    'den': 'Denver Nuggets',
    'gs': 'Golden State Warriors',
    'bkn': 'Brooklyn Nets',
    'orl': 'Orlando Magic',
    'ind': 'Indiana Pacers',
    'min': 'Minnesota Timberwolves',
    'cha': 'Charlotte Hornets',
    'atl': 'Atlanta Hawks',
    'no': 'New Orleans Pelicans',
    'cle': 'Cleveland Cavaliers',
    'lac': 'Los Angeles Clippers',
    'mem': 'Memphis Grizzlies'
}

df['away'] = df['away'].map(team_name_map)
df['home'] = df['home'].map(team_name_map)
df['home_winner'] = df['score_away'] < df['score_home']
df['score_total'] = df['score_away'] + df['score_home']

#df.to_csv('doldur_bosalt.csv', index=False)
"""
team_urls = [
        "https://eu.hoopshype.com/nba-2k/teams/?game=nba-2k10",
        "https://eu.hoopshype.com/nba-2k/teams/?game=nba-2k11",
        "https://eu.hoopshype.com/nba-2k/teams/?game=nba-2k12",
        "https://eu.hoopshype.com/nba-2k/teams/?game=nba-2k13",
        "https://eu.hoopshype.com/nba-2k/teams/?game=nba-2k14",
        "https://eu.hoopshype.com/nba-2k/teams/?game=nba-2k15",
        "https://eu.hoopshype.com/nba-2k/teams/?game=nba-2k16",
        "https://eu.hoopshype.com/nba-2k/teams/?game=nba-2k17",
        "https://eu.hoopshype.com/nba-2k/teams/?game=nba-2k18",
        "https://eu.hoopshype.com/nba-2k/teams/?game=nba-2k19",
        "https://eu.hoopshype.com/nba-2k/teams/?game=nba-2k20",
        "https://eu.hoopshype.com/nba-2k/teams/?game=nba-2k21",
        "https://eu.hoopshype.com/nba-2k/teams/?game=nba-2k22",
        "https://eu.hoopshype.com/nba-2k/teams/?game=nba-2k23",
        "https://eu.hoopshype.com/nba-2k/teams/?game=nba-2k24",
        "https://eu.hoopshype.com/nba-2k/teams/?game=nba-2k25"]
player_urls = [
        "https://eu.hoopshype.com/nba-2k/players/?game=nba-2k10&team=[nba_team]",
        "https://eu.hoopshype.com/nba-2k/players/?game=nba-2k11&team=[nba_team]",
        "https://eu.hoopshype.com/nba-2k/players/?game=nba-2k12&team=[nba_team]",
        "https://eu.hoopshype.com/nba-2k/players/?game=nba-2k13&team=[nba_team]",
        "https://eu.hoopshype.com/nba-2k/players/?game=nba-2k14&team=[nba_team]",
        "https://eu.hoopshype.com/nba-2k/players/?game=nba-2k15&team=[nba_team]",
        "https://eu.hoopshype.com/nba-2k/players/?game=nba-2k16&team=[nba_team]",
        "https://eu.hoopshype.com/nba-2k/players/?game=nba-2k17&team=[nba_team]",
        "https://eu.hoopshype.com/nba-2k/players/?game=nba-2k18&team=[nba_team]",
        "https://eu.hoopshype.com/nba-2k/players/?game=nba-2k19&team=[nba_team]",
        "https://eu.hoopshype.com/nba-2k/players/?game=nba-2k20&team=[nba_team]",
        "https://eu.hoopshype.com/nba-2k/players/?game=nba-2k21&team=[nba_team]",
        "https://eu.hoopshype.com/nba-2k/players/?game=nba-2k22&team=[nba_team]",
        "https://eu.hoopshype.com/nba-2k/players/?game=nba-2k23&team=[nba_team]",
        "https://eu.hoopshype.com/nba-2k/players/?game=nba-2k24&team=[nba_team]",
        "https://eu.hoopshype.com/nba-2k/players/?game=nba-2k25&team=[nba_team]"]
years = np.arange(2010,2026)
print(f"count:{df['season'].count()}")
for year, team_url, player_url in zip(years, team_urls, player_urls):
    response = requests.get(team_url)
    soup = BeautifulSoup(response.text, "html.parser")
    teams = soup.find_all("div", class_="_0cD6l-__0cD6l-")
    rates = soup.find_all("td", class_="RLrCiX__RLrCiX")
    for team, rate in zip(teams, rates):
        team_name = ""
        if team.text == "Charlotte Bobcats":
            team_name = "Charlotte Hornets"
        elif team.text == "New Orleans Hornets":
            team_name = "New Orleans Pelicans"
        elif team.text == "New Jersey Nets":
            team_name = "Brooklyn Nets"
        else:
            team_name = team.text
        df.loc[(df['season'] == year) & (df['away'] == team_name), 'away_rat'] = rate.text
        df.loc[(df['season'] == year) & (df['home'] == team_name), 'home_rat'] = rate.text    
        response = requests.get(player_url.replace("[nba_team]", team.text.replace(" ", "-").lower()))
        soup = BeautifulSoup(response.text, "html.parser")
        #players = soup.find_all("div", class_="_0cD6l-__0cD6l-")
        rates = soup.find_all("td", class_="RLrCiX__RLrCiX")
        for i in np.arange(12):
            df.loc[(df['season'] == year) & (df['away'] == team_name), 'away_p' + str(i)] = rates[i].text
            df.loc[(df['season'] == year) & (df['home'] == team_name), 'home_p' + str(i)] = rates[i].text
    #df = df.replace("-", 55)
    #df.to_csv('nba_2010_2025.csv', index=False)

print(f"count:{df['season'].count()}")

#columns_to_delete = ['score_away', 'score_home', 'date']
columns_to_delete = ['date']
df.drop(columns=columns_to_delete, inplace=True)
df = df[(df['away_rat'] != 'nan') & (df['home_rat'] != 'nan')]
df = df.replace("-", 52)
print(f"count:{df['season'].count()}")
"""
df.to_csv('first_nba_2008_2025.csv', index=False)
