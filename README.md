# 🏀 NexGameNBA - NBA Game Prediction App

An AI-powered NBA game prediction application built with React Expo, FastAPI, and Machine Learning models. Predict game winners, total scores, and quarter-by-quarter outcomes using advanced Random Forest and Gradient Boosting algorithms.

---

## 📱 Features

- **Live NBA Games Feed** - Browse upcoming and completed games with real-time data
- **ML Game Predictions** - Get predictions for game winners and total scores
- **Quarter-by-Quarter Analysis** - Detailed score predictions for each quarter (Q1, Q2, Q3, Q4, OT)
- **Betting Odds Integration** - Input spread, total, and moneyline odds
- **Rewarded Ads** - Earn rewards by watching ads
- **Cross-Platform** - Works on iOS, Android, and Web (via Expo)
- **Beautiful UI** - Dark theme with NBA-inspired design

---

## 📸 App Screenshots

### Home Screen / Games Feed
```
[SCREENSHOT: Home screen showing date slider and list of NBA games]
- Date selector with carousel
- Games listed with Away vs Home teams
- Real-time game status and time
```

### Betting / Make Predictions Screen
```
[SCREENSHOT: Betting screen with prediction inputs]
- Team comparison (Away Home)
- Input fields for betting odds:
  - Spread
  - Total
  - Moneyline (Away)
  - Moneyline (Home)
- Prediction submit button
```

### Results / Game Details Screen
```
[SCREENSHOT: Game results screen]
- Final scores
- Team comparison
- Quarter-by-quarter breakdown (Q1-Q4)
- Overtime scores
- Winner highlight
```

### ML Predictions Screen
```
[SCREENSHOT: Predictions screen]
- Game predictions
- Predicted winner
- Predicted total score
- Quarter predictions
- Confidence indicators
```

---

## 🔧 Tech Stack

### Frontend (Mobile App)
- **React Native** 19.1.0
- **Expo** 54.0.22 - Cross-platform mobile development
- **Expo Router** 6.0.14 - Navigation
- **TypeScript** 5.9.2 - Type safety
- **React Navigation** - Tab and drawer navigation
- **Axios** - HTTP client
- **React Native Toast Message** - Notifications
- **React Native Google Mobile Ads** - Ad integration

### Backend
- **FastAPI** - Python web framework
- **Uvicorn** - ASGI server
- **Pandas** - Data processing
- **Scikit-learn** - Machine learning
- **Joblib** - Model serialization
- **HuggingFace Hub** - Model hosting and download

### Machine Learning
- **Scikit-learn** (1.7.1)
  - Random Forest Regressor (Score predictions)
  - Gradient Boosting Classifier (Winner predictions)
- **Data Range**: NBA games from 2008-2025
- **Features**: Team stats, odds, spread, moneyline

---

## 🤖 Machine Learning Models

### 1. **Winner Team Prediction**
- **Algorithm**: Gradient Boosting Classifier
- **Output**: Home or Away team winner
- **Accuracy**: Trained on historical game data

### 2. **Total Score Prediction**
- **Algorithm**: Random Forest Regressor
- **Output**: Predicted total combined score
- **Features**: Team data, odds, spread

### 3. **Quarter-Based Score Predictions**
- **Q1 Score Prediction** - First quarter total
- **Q2 Score Prediction** - Second quarter total
- **Q3 Score Prediction** - Third quarter total
- **Q4 Score Prediction** - Fourth quarter total
- **Algorithm**: Random Forest Regressor for each quarter

### 4. **Overtime Score Prediction**
- **Algorithm**: Random Forest Regressor
- **Output**: Predicted overtime points

### Training Data Features
```python
{
    'regular': bool,              # Regular season or playoffs
    'playoffs': bool,             # Playoff indicator
    'away': str,                  # Away team name
    'home': str,                  # Home team name
    'spread': float,              # Betting spread
    'total': float,               # Over/under total
    'moneyline_away': float,      # Away team moneyline odds
    'moneyline_home': float       # Home team moneyline odds
}
```

---

## 📊 Backend API Endpoints

All endpoints require API key authentication in headers.

### Get All Predictions
```bash
POST /get_all_prediction
Content-Type: application/json
Authorization: {SERVICE_API_KEY}

Request Body:
{
    "regular": true,
    "playoffs": false,
    "away": "Boston Celtics",
    "home": "Los Angeles Lakers",
    "spread": 3.5,
    "total": 215.0,
    "moneyline_away": -110,
    "moneyline_home": -110
}

Response:
{
    "winner_team": "Los Angeles Lakers",
    "total_score": 215,
    "total_score_q1": 52,
    "total_score_q2": 53,
    "total_score_q3": 56,
    "total_score_q4": 54,
    "total_score_ot": 0
}
```

### Get Winner Prediction Only
```bash
POST /get_winner_prediction
{
    "regular": true,
    "playoffs": false,
    "away": "Boston Celtics",
    "home": "Los Angeles Lakers",
    "spread": 3.5,
    "total": 215.0,
    "moneyline_away": -110,
    "moneyline_home": -110
}

Response:
{
    "winner_team": "Los Angeles Lakers"
}
```

### Get Total Score Prediction
```bash
POST /get_total_score_prediction
{...request body...}

Response:
{
    "total_score": 215
}
```

### Get Quarter Predictions
```bash
POST /get_quareters_prediction
{...request body...}

Response:
{
    "total_score_q1": 52,
    "total_score_q2": 53,
    "total_score_q3": 56,
    "total_score_q4": 54,
    "total_score_ot": 0
}
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and npm/yarn
- **Python** 3.9+
- **Expo CLI**: `npm install -g expo-cli`
- **Android Studio** (for Android development)
- **Xcode** (for iOS development on macOS)

### Frontend Setup

1. **Navigate to the client directory**
```bash
cd client/NexGameNBA
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure environment variables**
Create `.env` file in `client/NexGameNBA/`:
```
EXPO_PUBLIC_API_URL=http://your-backend-url:8000
EXPO_PUBLIC_SERVICE_API_KEY=your_api_key
EXPO_PUBLIC_BALLEDONTLIE_API_KEY=your_balledontlie_key
```

4. **Run the app**
```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web
```

### Backend Setup

1. **Navigate to the service directory**
```bash
cd service
```

2. **Create virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Configure environment variables**
Create `.env` file in `service/`:
```
BALLEDONTLIE_API_KEY=your_api_key
SERVICE_API_KEY=your_service_api_key
REPO_ID=your_huggingface_repo_id
WINNER_TEAM_MODEL_FILE_NAME=winner_team_pkls/winner_team_gradientboostingclassifier_model.pkl
TOTAL_SCORE_MODEL_FILE_NAME=total_score_pkls/total_score_random_forest_model.pkl
TOTAL_SCORE_Q1_MODEL_FILE_NAME=total_score_q1_pkls/total_score_q1_random_forest_model.pkl
TOTAL_SCORE_Q2_MODEL_FILE_NAME=total_score_q2_pkls/total_score_q2_random_forest_model.pkl
TOTAL_SCORE_Q3_MODEL_FILE_NAME=total_score_q3_pkls/total_score_q3_random_forest_model.pkl
TOTAL_SCORE_Q4_MODEL_FILE_NAME=total_score_q4_pkls/total_score_q4_random_forest_model.pkl
TOTAL_SCORE_OT_MODEL_FILE_NAME=total_score_ot_pkls/total_score_ot_random_forest_model.pkl
LE_AWAY_FILE_NAME=winner_team_pkls/winner_team_label_encoder_away.pkl
LE_HOME_FILE_NAME=winner_team_pkls/winner_team_label_encoder_home.pkl
```

5. **Run the backend**
```bash
uvicorn app:app --reload
# Server runs at http://127.0.0.1:8000
```

### ML Model Training

1. **Navigate to the train directory**
```bash
cd train
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Prepare data** (optional)
```bash
python data_processing.py
```

4. **Train models**
```bash
# Train winner prediction model
python winner_team_train.py

# Train total score prediction
python total_score_train.py

# Train quarter-based predictions
python total_score_q1_train.py
python total_score_q2_train.py
python total_score_q3_train.py
python total_score_q4_train.py
python total_score_ot_train.py
```

5. **Test predictions with UI**
```bash
python UI_gradio.py
```

---

## 📁 Project Structure

```
NexGameNBA/
├── client/
│   └── NexGameNBA/                    # React Expo app
│       ├── app/                        # App screens
│       │   ├── index.tsx               # Home/Games Feed
│       │   ├── bets.tsx                # Betting screen
│       │   ├── prediction.tsx          # Predictions screen
│       │   ├── results.tsx             # Game results
│       │   ├── main.tsx                # Main content
│       │   ├── _layout.tsx             # Navigation layout
│       │   └── utils.ts                # Utilities & colors
│       ├── component/                  # Reusable components
│       │   ├── DateCardSlider.tsx
│       │   ├── AwayHome.tsx
│       │   ├── BaseTextInput.tsx
│       │   ├── SubmitButton.tsx
│       │   ├── RouteButton.tsx
│       │   └── toast.tsx
│       ├── contexts/                   # React contexts
│       │   ├── DateContext.tsx
│       │   └── ConnectionContext.tsx
│       ├── api/                        # API client
│       │   ├── client.ts
│       │   └── objects.ts
│       ├── assets/                     # Images & logos
│       │   ├── images/
│       │   └── logos/
│       ├── android/                    # Android native code
│       ├── package.json
│       └── tsconfig.json
├── service/                            # FastAPI backend
│   ├── app.py                          # Main FastAPI application
│   └── requirements.txt
└── train/                              # ML training scripts
    ├── winner_team_train.py
    ├── total_score_train.py
    ├── total_score_q1_train.py
    ├── total_score_q2_train.py
    ├── total_score_q3_train.py
    ├── total_score_q4_train.py
    ├── total_score_ot_train.py
    ├── data_processing.py
    ├── UI_gradio.py
    ├── requirements.txt
    └── data/
        ├── nba_2008-2025.csv
        ├── nba_2010_2025.csv
        └── ...
```

---

## 🎨 App Design

### Color Scheme
- **Primary Color**: `#00438C` (NBA Blue)
- **Text Color**: White
- **Background**: Dark theme for better viewing

### Key Components

#### DateCardSlider
- Horizontal scrollable carousel for date selection
- Displays NBA games for selected date

#### AwayHome Comparison
- Side-by-side team comparison
- Team names and logos

#### BaseTextInput
- Custom input component for odds entry
- Number input for betting amounts

#### SubmitButton
- Styled button for prediction submission
- Loading states

#### RouteButton
- Game card component
- Shows away vs home teams and scores
- Navigates to details screen

---

## 🔐 Security

- API key authentication required for all endpoints
- CORS enabled for frontend access
- Environment variables for sensitive data
- Models hosted on HuggingFace Hub

---

## 📊 Data Sources

- **Ball Don't Lie API** - Live NBA game data
- **Historical Data**: NBA games 2008-2025
- **Betting Data**: Spread, total, and moneyline odds

---

## 🧪 Testing

### Run Linting
```bash
cd client/NexGameNBA
npm run lint
```

### Test Backend API
```bash
# Test with curl
curl -X POST http://127.0.0.1:8000/get_all_prediction \
  -H "Authorization: your_api_key" \
  -H "Content-Type: application/json" \
  -d '{
    "regular": true,
    "playoffs": false,
    "away": "Boston Celtics",
    "home": "Los Angeles Lakers",
    "spread": 3.5,
    "total": 215.0,
    "moneyline_away": -110,
    "moneyline_home": -110
  }'
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Author

**Orkun Demirci** - [@OrkunDmrc](https://github.com/OrkunDmrc)

---

## 📧 Contact

For questions or support, please open an issue on the GitHub repository.

---

## 🙏 Acknowledgments

- Ball Don't Lie API for NBA game data
- Scikit-learn team for ML algorithms
- Expo team for the amazing cross-platform framework
- HuggingFace for model hosting

---

## 📅 Current Data

- **Training Period**: 2008-2025
- **Games Covered**: Regular season and playoffs
- **Latest Update**: November 2025

---

## 🚧 Known Issues

- Overtime score predictions may be less accurate due to limited OT data
- Real-time predictions require current betting odds
- Model accuracy depends on data freshness

---

## 🔄 Version History

### v1.0.0 (Current)
- Initial release
- Core prediction models
- Cross-platform mobile app
- FastAPI backend
- Real-time game data integration
