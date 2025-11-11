export interface Game {
  id?: number
  date?: string
  season?: number
  status?: string
  period?: number
  time?: string
  postseason?: boolean
  home_team_score?: number
  visitor_team_score?: number
  datetime?: string
  home_q1?: number
  home_q2?: number
  home_q3?: number
  home_q4?: number
  home_ot1?: any
  home_ot2?: any
  home_ot3?: any
  home_timeouts_remaining?: number
  home_in_bonus?: boolean
  visitor_q1?: number
  visitor_q2?: number
  visitor_q3?: number
  visitor_q4?: number
  visitor_ot1?: any
  visitor_ot2?: any
  visitor_ot3?: any
  visitor_timeouts_remaining?: number
  visitor_in_bonus?: boolean
  home_team?: Team
  visitor_team?: Team
}

export interface Team {
  id?: number
  conference?: string
  division?: string
  city?: string
  name?: string
  full_name?: string
  abbreviation?: string
}

export interface BetsForm {
    regular: boolean,
    playoffs: boolean,
    away: string,
    home: string,
    spread: number,
    total: number,
    moneyline_away: number,
    moneyline_home: number,
}

export interface WinnerTotalScorePrediction {
  winner_team: string,
  total_score: number
}
export interface WinnerTeamPrediction {
  winner_team: number
}
export interface TotalScorePrediction {
  total_score: number
}
export interface TotalScoreQ1Prediction {
  total_score_q1: number
}
export interface TotalScoreQ2Prediction {
  total_score_q2: number
}
export interface TotalScoreQ3Prediction {
  total_score_q3: number
}
export interface TotalScoreQ4Prediction {
  total_score_q4: number
}
export interface TotalScoreOTPrediction {
  total_score_ot: number
}