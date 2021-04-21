import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, About, Games, PlayerSafetyPlan, PvPRules, CashHuntRules, ModGuide, Updates, Leaderboard, Contact, LogIn, Forgot, Registration, Recover, AccountDetails, AdminDashboard, GameCreation, ActionLog, PropertyLog, SignUp} from "./components";
function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/about" exact component={() => <About />} />
          <Route path="/games" exact component={() => <Games />} />
          <Route path="/mod-guide" exact component={() => <ModGuide />} />
          <Route path="/cash-hunt-rules" exact component={() => <CashHuntRules />} />
          <Route path="/player-safety-plan" exact component={() => <PlayerSafetyPlan />} />
          <Route path="/pvp-rules" exact component={() => <PvPRules />} />
          <Route path="/updates" exact component={() => <Updates />} />
          <Route path="/leaderboard" exact component={() => <Leaderboard />} />
          <Route path="/contact" exact component={() => <Contact />} />
          <Route path="/login" exact component={() => <LogIn />} />
          <Route path="/recover/:user" exact component={() => <Recover />} />
          <Route path="/registration/:id" exact component={() => <Registration />} />
          <Route path="/forgot" exact component={() => <Forgot />} />
          <Route path="/account-details" exact component={() => <AccountDetails />} />
          <Route path="/admin-dashboard" exact component={() => <AdminDashboard />} />
          <Route path="/game-creation" exact component={() => <GameCreation />} />
          <Route path="/action-log" exact component={() => <ActionLog />} />
          <Route path="/property" exact component={() => <PropertyLog />} />
          <Route path="/signup" exact component={() => <SignUp />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;