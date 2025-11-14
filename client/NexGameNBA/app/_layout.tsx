import { ConnectionProvider } from "@/contexts/ConnectionContext";
import Main from "./main";


export default function RootLayout() {
  return (
    <ConnectionProvider>
      <Main />
    </ConnectionProvider>
  )
  

  
  
}
