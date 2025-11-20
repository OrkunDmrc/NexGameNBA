import Line from "@/component/Line";
import SubmitButton from "@/component/SubmitButton";
import { router } from "expo-router";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, contractAcception } from "./utils";



export default function Contract() {
  function accept(){
    contractAcception.setContractAccepted();
    router.push("/");
  }
  return (
    <SafeAreaView style={{
      //paddingTop: Constants.statusBarHeight,
      flex: 1,
      //justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.primaryColor,
      padding: 10
    }}>
      <Text style={{color:colors.yellow, 
        textAlign: "center", 
        fontWeight: "bold",
        fontSize: 25}}>
        Terms of Use, Disclaimer & Privacy Policy for “Nex Game NBA”
      </Text>
      <Text style={{color:colors.white,
        fontWeight: "bold",
        fontSize: 15}}>
        Last Updated: 11/20/2025
        {"\n\n"}By downloading or using the application {"("}“App”{")"}, you agree to the following Terms of Use, Disclaimer, 
        and Privacy Policy. Please read carefully.
      </Text>
      <Line />
      <ScrollView style={{width: "100%", padding:5}}>
        <Text style={{
          color: colors.yellow, 
          fontWeight: "bold",
          fontSize: 20}}>
            1. Purpose of the App
        </Text>
        <Text style={{
          color: colors.white,
          fontSize: 15}}>
             {"\n"}- Nex Game NBA uses publicly available statistical data, odds, and match information from third-party websites to generate automated 
            NBA score predictions and win-probability forecasts. {"\n\n"}

            - All predictions are generated through machine learning/statistical models and are for informational and entertainment purposes only. {"\n\n"}

            - The App does not provide professional advice or guaranteed outcomes.{"\n"}
        </Text>
        <Text style={{
          color: colors.yellow, 
          fontWeight: "bold",
          fontSize: 20}}>
            2. No Gambling or Betting Services
        </Text>
        <Text style={{
          color: colors.white,
          fontSize: 15}}>
             {"\n"}- Nex Game NBA does not offer, promote, facilitate, or encourage betting, gambling, or wagering of any kind. {"\n\n"}
            - The App does not accept bets, process betting transactions, or provide guaranteed betting outcomes. {"\n\n"}
            - The App is not affiliated, endorsed, sponsored, or associated with any betting or gambling operator.{"\n\n"}
            - The App may display publicly available odds or statistical data solely for analysis and prediction modeling, not for betting promotion.{"\n\n"}
            - Any use of the App’s predictions for betting purposes is entirely at the user’s own risk.{"\n"}
        </Text>
        <Text style={{
          color: colors.yellow, 
          fontWeight: "bold",
          fontSize: 20}}>
            3. Disclaimer of Accuracy
        </Text>
        <Text style={{
          color: colors.white,
          fontSize: 15}}>
             {"\n"}- All predictions, forecasts, probabilities, and statistical outputs are estimates only and should not be assumed to be accurate, precise, or guaranteed. {"\n\n"}
            - The developer does not warrant that the predictions will reflect real match outcomes.{"\n"}
        </Text>
        <Text style={{
          color: colors.yellow, 
          fontWeight: "bold",
          fontSize: 20}}>
            4. Limitation of Liability
        </Text>
        <Text style={{
          color: colors.white,
          fontSize: 15}}>
            {"\n"}- The developer of Nex Game NBA shall not be liable for any direct, indirect, incidental, consequential, financial, or non-financial damages arising from the use of the App.{"\n\n"}
            - The user is solely responsible for any decisions made based on the App’s content.{"\n\n"}
            - The developer is not responsible for inaccuracies, delays, or errors that may occur due to third-party data sources.{"\n\n"}
            - The developer does not warrant that the predictions will reflect real match outcomes.{"\n"}
        </Text>
        <Text style={{
          color: colors.yellow, 
          fontWeight: "bold",
          fontSize: 20}}>
            5. No Collection of Personal Data
        </Text>
        <Text style={{
          color: colors.white,
          fontSize: 15}}>
            {"\n"}- Nex Game NBA does not collect, store, process, or share any personal data.{"\n\n"}
            - The App does not collect:{"\n\t\t"}
            Name, email, phone number, address{"\n\t\t"}GPS/location data{"\n\t\t"}Photos, media, microphone, camera, or files{"\n\t\t"}
            Device identifiers{"\n\t\t"}Behavioral tracking data{"\n\t\t"}Sensitive personal information
{"\n\n"}
            - The App does not require user accounts and does not profile users.{"\n"}
        </Text>
        <Text style={{
          color: colors.yellow, 
          fontWeight: "bold",
          fontSize: 20}}>
            6. Automatically Processed Technical Information
        </Text>
        <Text style={{
          color: colors.white,
          fontSize: 15}}>
            {"\n"}- The developer does not intentionally collect technical information from users.{"\n\n"}
            - Crash logs, performance data, or diagnostic information may be collected solely by Google Play Services, independently of the App.{"\n\n"}
            - This data is not accessed or used by the developer.{"\n"}
        </Text>
        <Text style={{
          color: colors.yellow, 
          fontWeight: "bold",
          fontSize: 20}}>
            7. Third-Party Data Sources
        </Text>
        <Text style={{
          color: colors.white,
          fontSize: 15}}>
            {"\n"}- The App may use publicly accessible sports data, statistics, or odds provided by third-party websites or APIs.{"\n\n"}
            - The accuracy, availability, and legality of such data are the responsibility of the respective third parties.{"\n\n"}
            - The App does not endorse or promote any third-party service.{"\n"}
        </Text>
        <Text style={{
          color: colors.yellow, 
          fontWeight: "bold",
          fontSize: 20}}>
            8. Prohibited Uses
        </Text>
        <Text style={{
          color: colors.white,
          fontSize: 15}}>
            {"\n"}- Users agree not to:{"\n\t\t"}
            Use the App for illegal, betting-related, or harmful purposes{"\n\t\t"}
            Reverse-engineer, modify, copy, or redistribute the App{"\n\t\t"}
            Manipulate or disrupt the App's functionality{"\n\t\t"}
            Misrepresent the predictions as guaranteed advice or betting outcomes{"\n"}
        </Text>
        <Text style={{
          color: colors.yellow, 
          fontWeight: "bold",
          fontSize: 20}}>
            9. Modification or Termination
        </Text>
        <Text style={{
          color: colors.white,
          fontSize: 15}}>
            {"\n"}The developer reserves the right to update, modify, suspend, or discontinue the App at any time without prior notice.{"\n\n"}
            The developer is not liable for any consequence resulting from such changes.{"\n"}
        </Text>
        <Text style={{
          color: colors.yellow, 
          fontWeight: "bold",
          fontSize: 20}}>
            10. Acceptance of Terms
        </Text>
        <Text style={{
          color: colors.white,
          fontSize: 15}}>
            {"\n"}By using Nex Game NBA, you acknowledge that you have read, understood, and agreed to these Terms.{"\n\n"}
            If you do not agree, you must discontinue using the App.{"\n\n"}
        </Text>
      </ScrollView>
      <Line/>
      <SubmitButton text="I have read, understood, and agree" onPress={accept} />
    </SafeAreaView>
  )
  

  
  
}
