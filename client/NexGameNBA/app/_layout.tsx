import { ConnectionProvider } from "@/contexts/ConnectionContext";
import Main from "./main";
import MobileAds, { AdEventType, AppOpenAd, TestIds } from "react-native-google-mobile-ads";
import { useEffect } from "react";
import { adIds } from "./utils";

MobileAds().initialize().then((adapterStatuses) => { /*innitialization complete*/ });

export default function RootLayout() {
  useEffect(() => {
    const adUnitId = adIds.appOpenAdId;
    const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
      keywords: ['fashion', 'clothing'],
    });
    const unsubscribe = appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
      console.log('App Open Ad Loaded');
      appOpenAd.show();
    });

    const unsubscribeError = appOpenAd.addAdEventListener(AdEventType.ERROR, (error) => {
      console.log('App Open Ad Failed to load:', error);
    });
    appOpenAd.load();
    return () => {
      unsubscribe();
      unsubscribeError();
    };
  }, []);
  return (
    <ConnectionProvider>
      <Main />
    </ConnectionProvider>
  )
  

  
  
}
