import useLocalStorage from "../hooks/useLocalStorage";
import Login from "./Login";
import Home from "./Home";
import { ContactsProvider } from "../contexts/ContactsProvider";
import { ConversationsProvider } from "../contexts/ConversationsProvider"
import { SocketProvider } from "../contexts/SocketProvider";
import { UserInfoProvider } from "../contexts/UserInfoProvider";

function App() {
  const home = (
    <UserInfoProvider>
      <SocketProvider>
        <ContactsProvider>
            <ConversationsProvider>
              <Home />
          </ConversationsProvider>
        </ContactsProvider>
      </SocketProvider>
    </UserInfoProvider>
    
  );


  return (
    <>
      {home}
    </>
  );
}

export default App;