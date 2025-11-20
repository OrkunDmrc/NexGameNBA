import Contract from "@/app/contract";
import { ConnectionProvider } from "@/contexts/ConnectionContext";
import { useEffect, useState } from "react";
import MobileAds, { AdEventType, AppOpenAd } from "react-native-google-mobile-ads";
import Main from "./main";
import { adIds, contractAcception } from "./utils";


MobileAds().initialize().then((adapterStatuses) => { /*innitialization complete*/ });

export default function RootLayout() {
  const [isAccepted, setIsAccepted] = useState<number | null>(null);
  useEffect(() => {
    const loadStatus = async () => {
      const status = await contractAcception.getIsContractAccepted();
      setIsAccepted(status);
    };
    loadStatus();
  }, []);
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
      {isAccepted ? <Main /> : <Contract />}
    </ConnectionProvider>
  )
}
