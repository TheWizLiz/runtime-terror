import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, About, Games, Rules, Updates, Leaderboard, Contact, LogIn, Forgot, Registration, Recover, AccountDetails, AdminDashboard, GameCreation, Log, Property, SignUp} from "./components";
function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/about" exact component={() => <About />} />
          <Route path="/games" exact component={() => <Games />} />
          <Route path="/rules" exact component={() => <Rules />} />
          <Route path="/updates" exact component={() => <Updates />} />
          <Route path="/leaderboard" exact component={() => <Leaderboard />} />
          <Route path="/contact" exact component={() => <Contact />} />
          <Route path="/login" exact component={() => <LogIn />} />
          <Route path="/recover/:user" exact component={() => <Recover />} />
          <Route path="/registration" exact component={() => <Registration />} />
          <Route path="/forgot" exact component={() => <Forgot />} />
          <Route path="/account-details" exact component={() => <AccountDetails />} />
          <Route path="/admin-dashboard" exact component={() => <AdminDashboard />} />
          <Route path="/game-creation" exact component={() => <GameCreation />} />
          <Route path="/log" exact component={() => <Log />} />
          <Route path="/property" exact component={() => <Property />} />
          <Route path="/signup" exact component={() => <SignUp />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;