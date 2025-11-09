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

const logos: Record<string, string> = {
  'Portland Trail Blazers': 'http://ssl.gstatic.com/onebox/media/sports/logos/_bgagBCd6ieOIt3INWRN_w_96x96.png',
  'Utah Jazz':'http://ssl.gstatic.com/onebox/media/sports/logos/8-M9TwRyXGqWqhI2UHZFWg_96x96.png',
  'Houston Rockets':'http://ssl.gstatic.com/onebox/media/sports/logos/zhO6MIB1UzZmtXLHkJQBmg_96x96.png',
  'Philadelphia 76ers':'http://ssl.gstatic.com/onebox/media/sports/logos/US6KILZue2D5766trEf0Mg_96x96.png',
  'Washington Wizards':'http://ssl.gstatic.com/onebox/media/sports/logos/NBkMJapxft4V5kvufec4Jg_96x96.png',
  'Milwaukee Bucks':'http://ssl.gstatic.com/onebox/media/sports/logos/Wd6xIEIXpfqg9EZC6PAepQ_96x96.png',
  'San Antonio Spurs':'http://ssl.gstatic.com/onebox/media/sports/logos/FKwMB_85FlZ_7PTt1f7hjQ_96x96.png',
  'Miami Heat':'http://ssl.gstatic.com/onebox/media/sports/logos/0nQXN6OF7wnLY3hJz8lZJQ_96x96.png',
  'Los Angeles Lakers':'http://ssl.gstatic.com/onebox/media/sports/logos/4ndR-n-gall7_h3f7NYcpQ_96x96.png',
  'Boston Celtics':'http://ssl.gstatic.com/onebox/media/sports/logos/GDJBo7eEF8EO5-kDHVpdqw_96x96.png',
  'Chicago Bulls':'http://ssl.gstatic.com/onebox/media/sports/logos/ofjScRGiytT__Flak2j4dg_96x96.png',
  'Dallas Mavericks':'http://ssl.gstatic.com/onebox/media/sports/logos/xxxlj9RpmAKJ9P9phstWCQ_96x96.png',
  'Sacramento Kings':'http://ssl.gstatic.com/onebox/media/sports/logos/wkCDHakxEThLGoZ4Ven48Q_96x96.png',
  'Oklahoma City Thunder':'http://ssl.gstatic.com/onebox/media/sports/logos/b4bJ9zKFBDykdSIGUrbWdw_96x96.png',
  'Detroit Pistons':'http://ssl.gstatic.com/onebox/media/sports/logos/qvWE2FgBX0MCqFfciFBDiw_96x96.png',
  'Phoenix Suns':'http://ssl.gstatic.com/onebox/media/sports/logos/pRr87i24KHWH0UuAc5EamQ_96x96.png',
  'Toronto Raptors':'http://ssl.gstatic.com/onebox/media/sports/logos/5sHsS5f1a6SCgiaYqWkC-w_96x96.png',
  'New York Knicks':'http://ssl.gstatic.com/onebox/media/sports/logos/-rf7eY39l_0V7J4ekakuKA_96x96.png',
  'Denver Nuggets':'http://ssl.gstatic.com/onebox/media/sports/logos/9wPFTOxV_zP1KmRRggJNqQ_96x96.png',
  'Golden State Warriors':'http://ssl.gstatic.com/onebox/media/sports/logos/ovwlyYHRKZ90s7zn_qlMCg_96x96.png',
  'Brooklyn Nets':'http://ssl.gstatic.com/onebox/media/sports/logos/booQJbi9Uew90gakPxUiVA_96x96.png',
  'Orlando Magic':'http://ssl.gstatic.com/onebox/media/sports/logos/YaftZcw8oWwRh6CLYoq2Vw_96x96.png',
  'Indiana Pacers':'http://ssl.gstatic.com/onebox/media/sports/logos/I3MuFlxv71r8Hgws3Qf_oA_96x96.png',
  'Minnesota Timberwolves':'http://ssl.gstatic.com/onebox/media/sports/logos/21Zm6e_zGiWXsaLCQyjVig_96x96.png',
  'Charlotte Hornets':'http://ssl.gstatic.com/onebox/media/sports/logos/ToeKy5-TrHAnTCl-qhuuHQ_96x96.png',
  'Atlanta Hawks':'http://ssl.gstatic.com/onebox/media/sports/logos/pm5l5mtY1elOQAl9ZEcm2A_96x96.png',
  'New Orleans Pelicans':'http://ssl.gstatic.com/onebox/media/sports/logos/JCQO978-AWbg00TQUNPUVg_96x96.png',
  'Cleveland Cavaliers':'http://ssl.gstatic.com/onebox/media/sports/logos/NAlGkmv45l1L-3NhwVhDPg_96x96.png',
  'Los Angeles Clippers':'http://ssl.gstatic.com/onebox/media/sports/logos/Qfmcz6S86sLz19CP8Hv0Gw_96x96.png',
  'Memphis Grizzlies':'http://ssl.gstatic.com/onebox/media/sports/logos/cPBaon0tDBPu6Wqu-JkGzQ_96x96.png',
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

//  //ssl.gstatic.com/onebox/media/sports/logos/_bgagBCd6ieOIt3INWRN_w_96x96.png