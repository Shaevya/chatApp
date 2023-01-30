import useLocalStorage from "../hooks/useLocalStorage";
import Login from "./Login";
import Home from "./Home";
import { ContactsProvider } from "../contexts/ContactsProvider";
import { ConversationsProvider } from "../contexts/ConversationsProvider"
import { SocketProvider } from "../contexts/SocketProvider";
import { UserInfoProvider } from "../contexts/UserInfoProvider";

function App() {
  const home = (
    <SocketProvider>
      <UserInfoProvider>
        <ContactsProvider>
          <ConversationsProvider>
            <Home />
          </ConversationsProvider>
        </ContactsProvider>
      </UserInfoProvider>
    </SocketProvider>
  );


  return (
    <>
      {home}
    </>
  );
}

export default App;