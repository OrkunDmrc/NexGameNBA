import { request } from "@/api/client";
import { Game } from "@/api/objects";
import DateCardSlider from "@/component/DateCardSlider";
import DateText from "@/component/DateText";
import Line from "@/component/Line";
import RouteButton from "@/component/RouteButton";
import { DateContext } from "@/contexts/DateContext";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { colors } from "./utils";

export default function Index() {
  const context = useContext(DateContext);
  if (!context) {
      throw new Error('DateDisplay must be used within a DateProvider');
  }
  const { selectedDate, setSelectedDate } = context;
  const [matches, setMaches] = useState<Array<Game>>();
  const [isLoading, setLoading] = useState<boolean>(true);
  async function getGamesByDate(date: string){
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const res = await request.balldontlie.getGamesByDate(`${year}-${month}-${day}`);
    if(res.data){
      const games = res.data as Array<Game>;
      setMaches(games);
      setLoading(false);
    }
    
  }
  useEffect(() => {
    const now = new Date();
    const date = now.toDateString();
    setSelectedDate(date);
  }, []);
  useEffect(() => {
    setLoading(true);
    if(selectedDate){
      getGamesByDate(selectedDate);
    }
  }, [selectedDate])
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: colors.primaryColor,
        padding: 10
      }}
    >
      <DateCardSlider />
      <Line/>
      <DateText/>
      {isLoading ? 
      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <ActivityIndicator size="large" color={colors.white}/>
      </View>
      :<ScrollView style={{width: "100%", marginBottom: 50}}>
        {matches?.map((match) => (
          <RouteButton 
            awayTeam={match.visitor_team?.name || ""} 
            homeTeam={match.home_team?.name || ""} 
            awayScore={match.visitor_team_score}
            homeScore={match.home_team_score}
            time={match.datetime}
            onPress={() => {
              match.home_team_score && match.visitor_team_score ?
              router.push({
                pathname: "/results",
                params: {
                  winnerFullName: match.visitor_team_score > match.home_team_score ? match.visitor_team?.full_name :  match.home_team?.full_name,
                  away: match.visitor_team?.name,
                  home: match.home_team?.name,
                  awayScore: match.visitor_team_score,
                  homeScore: match.home_team_score,
                  awayQ1: match.visitor_q1,
                  awayQ2: match.visitor_q2,
                  awayQ3: match.visitor_q3,
                  awayQ4: match.visitor_q4,
                  awayOT:
                    (match.visitor_ot1 || 0) +
                    (match.visitor_ot2 || 0) +
                    (match.visitor_ot3 || 0),
                  homeQ1: match.home_q1,
                  homeQ2: match.home_q2,
                  homeQ3: match.home_q3,
                  homeQ4: match.home_q4,
                  homeOT:
                    (match.home_ot1 || 0) + (match.home_ot2 || 0) + (match.home_ot3 || 0),
                },
              }) :
              router.push({
                pathname: "/bets",
                params: {
                  away: match.visitor_team?.full_name,
                  home: match.home_team?.full_name,
                  postseason: match.postseason?.toString()
                }
              });
            }} />
        ))}
      </ScrollView>
      }
    </View>
  );
}
