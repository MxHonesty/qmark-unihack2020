import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import AddDonation from "./components/add-donation.component";
import DonationsList from "./components/donations-list.component";


class App extends Component {
    
    render() {
        return (
          <div>
            <div className="container mt-3">
            
              <Switch>
                <Route exact path={["/"]} component={DonationsList} />
                <Route exact path="/add" component={AddDonation} />
              </Switch>
            </div>
          </div>
        );
      }
}

export default App;
