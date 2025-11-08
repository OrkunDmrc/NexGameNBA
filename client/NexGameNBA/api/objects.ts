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

export interface PredictRequestItem {
    regular: boolean,
    playoffs: boolean,
    away: string,
    home: string,
    spread: number,
    total: number,
    moneyline_away: number,
    moneyline_home: number,
}