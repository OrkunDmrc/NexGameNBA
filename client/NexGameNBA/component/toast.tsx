import { colors } from '@/app/utils';
import Toast from 'react-native-toast-message';

type ToastType = "success" | "error" | "info";

export const toast = (text: string, type: ToastType, title?: string) => {
  Toast.show({
    type: type,
    text1: title,
    text1Style: {
      fontSize: 20,
      color: type === "error" ? colors.secondaryColor : colors.primaryColor
    },
    text2Style: {
      fontSize: 15
    },
    text2: text,
  });
};


