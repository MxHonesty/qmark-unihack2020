import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";

import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";
import AddDonation from "./components/add-donation.component";
import DonationsList from "./components/donations-list.component";

class App extends Component {
    render() {
        return (
          <div>

    
            <div className="container mt-3">
              <Switch>
                <Route exact path={["/", "/tutorials"]} component={DonationsList} />
                <Route exact path="/add" component={AddDonation} />
                //<Route path="/tutorials/:id" component={Tutorial} />
              </Switch>
            </div>
          </div>
        );
      }
}

export default App;
