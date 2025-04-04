import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./components/Sidebar/Sidebar";
import Mail from "./components/Mail/Mail";
import EmailList from "./components/EmailList/EmailList"; // Import EmailList component
import SendMail from "./components/SendMail/SendMail";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import { selectSendMessageIsOpen } from "./features/mailSlice";
import { selectUser } from "./features/userSlice";

function App() {
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  const user = useSelector(selectUser);

  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <div className="app">
          <Header />
          <div className="app-body">
            <Sidebar />
            <Switch>
              <Route path="/mail">
                <Mail />
              </Route>
              <Route path="/" exact>
                <EmailList /> {/* Use EmailList directly */}
              </Route>
            </Switch>
          </div>

          {sendMessageIsOpen && <SendMail />}
        </div>
      )}
    </Router>
  );
}

export default App;