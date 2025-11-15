import { TestIds } from "react-native-google-mobile-ads";

export const colors = {
    primaryColor: "#00438C",
    secondaryColor: "#C52B2F",
    routeButtonColor: "#01579B",
    yellow: "#d3aa05",
    white: "#eee",
    green: "#66BB6A",
}

export const getLogo = (name: string) =>  {
  const fullName = getFullName(name) || "";
  return logos[fullName];
}

const logos: Record<string, any> = {
  'Portland Trail Blazers': require('../assets/logos/Portland Trail Blazers.png'),
  'Utah Jazz': require('../assets/logos/Utah Jazz.png'),
  'Houston Rockets':require('../assets/logos/Houston Rockets.png'),
  'Philadelphia 76ers':require('../assets/logos/Philadelphia 76ers.png'),
  'Washington Wizards':require('../assets/logos/Washington Wizards.png'),
  'Milwaukee Bucks':require('../assets/logos/Milwaukee Bucks.png'),
  'San Antonio Spurs':require('../assets/logos/San Antonio Spurs.png'),
  'Miami Heat':require('../assets/logos/Miami Heat.png'),
  'Los Angeles Lakers':require('../assets/logos/Los Angeles Lakers.png'),
  'Boston Celtics':require('../assets/logos/Boston Celtics.png'),
  'Chicago Bulls':require('../assets/logos/Chicago Bulls.png'),
  'Dallas Mavericks':require('../assets/logos/Dallas Mavericks.png'),
  'Sacramento Kings':require('../assets/logos/Sacramento Kings.png'),
  'Oklahoma City Thunder':require('../assets/logos/Oklahoma City Thunder.png'),
  'Detroit Pistons':require('../assets/logos/Detroit Pistons.png'),
  'Phoenix Suns':require('../assets/logos/Phoenix Suns.png'),
  'Toronto Raptors':require('../assets/logos/Toronto Raptors.png'),
  'New York Knicks':require('../assets/logos/New York Knicks.png'),
  'Denver Nuggets':require('../assets/logos/Denver Nuggets.png'),
  'Golden State Warriors':require('../assets/logos/Golden State Warriors.png'),
  'Brooklyn Nets':require('../assets/logos/Brooklyn Nets.png'),
  'Orlando Magic':require('../assets/logos/Orlando Magic.png'),
  'Indiana Pacers':require('../assets/logos/Indiana Pacers.png'),
  'Minnesota Timberwolves':require('../assets/logos/Minnesota Timberwolves.png'),
  'Charlotte Hornets':require('../assets/logos/Charlotte Hornets.png'),
  'Atlanta Hawks':require('../assets/logos/Atlanta Hawks.png'),
  'New Orleans Pelicans':require('../assets/logos/New Orleans Pelicans.png'),
  'Cleveland Cavaliers':require('../assets/logos/Cleveland Cavaliers.png'),
  'Los Angeles Clippers':require('../assets/logos/Los Angeles Clippers.png'),
  'Memphis Grizzlies':require('../assets/logos/Memphis Grizzlies.png')
};

const getFullName = (name: string) =>  {
  const list = [
    'Portland Trail Blazers',
    'Utah Jazz',
    'Houston Rockets',
    'Philadelphia 76ers',
    'Washington Wizards',
    'Milwaukee Bucks',
    'San Antonio Spurs',
    'Miami Heat',
    'Los Angeles Lakers',
    'Boston Celtics',
    'Chicago Bulls',
    'Dallas Mavericks',
    'Sacramento Kings',
    'Oklahoma City Thunder',
    'Detroit Pistons',
    'Phoenix Suns',
    'Toronto Raptors',
    'New York Knicks',
    'Denver Nuggets',
    'Golden State Warriors',
    'Brooklyn Nets',
    'Orlando Magic',
    'Indiana Pacers',
    'Minnesota Timberwolves',
    'Charlotte Hornets',
    'Atlanta Hawks',
    'New Orleans Pelicans',
    'Cleveland Cavaliers',
    'Los Angeles Clippers',
    'Memphis Grizzlies']
    return list.find((e) => e.includes(name))?.toString();
} 

const configs = require("../config.json");

export const adIds = {
  appOpenAdId: configs["workmode"] === "dev" ? TestIds.APP_OPEN : configs["appOpenUnitId"],
  bannerAdId: configs["workmode"] === "dev" ? TestIds.ADAPTIVE_BANNER : configs["bannerUnitId"],
  rewardedAdId: configs["workmode"] === "dev" ? TestIds.REWARDED : configs["rewardedUnitId"],
  rewardedIntAdId: configs["workmode"] === "dev" ? TestIds.REWARDED_INTERSTITIAL : TestIds.REWARDED_INTERSTITIAL
}


//  //ssl.gstatic.com/onebox/media/sports/logos/_bgagBCd6ieOIt3INWRN_w_96x96.png