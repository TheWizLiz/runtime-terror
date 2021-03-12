import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, About, Games, Rules, Updates, Leaderboard, Contact, LogIn} from "./components";
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
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;