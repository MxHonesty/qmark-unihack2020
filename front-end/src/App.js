import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import AddDonation from "./components/add-donation.component";
import DonationsList from "./components/donations-list.component";
import "./css/aos.css";
import "./css/custom.css";
import logo from "./img/UP.png";
import background from "./img/banner-bk.jpg";
import background_contact from "./img/contact-bk.jpg";



class App extends Component {
    
    render() {
        return (
          <div>
            
            <div className="jumbotron jumbotron" id="banner" style={{backgroundImage: `url(${background})`}}>
                <div className="container text-center text-md-left">
                    <header>
                        <div className="row justify-content-between">
                            <div className="col-2">
                                <img src={logo} alt="logo"/>
                            </div>
                            <div className="col-6 align-self-center text-right">
                                <a href="https://github.com/MxHonesty/qmark-unihack2020" className="text-white lead">Github</a>
                            </div>
                        </div>
                    </header>
                    <center>
                    <br/>
                    <h1 style={{color: "white", fontSize: "2em"}}>Would you like to make a donation?</h1> </center> <br/>
                    <AddDonation/>
                </div>
            </div>
            
            <div className="container my-5 py-2">
                <h2 className="text-center font-weight-bold my-5">Leaderboard</h2>
                
                <Switch>
                  <Route exact path="/" component={DonationsList} />
                  <Route exact path="/add" component={AddDonation} />
                </Switch>
            </div>
            
            <div className="jumbotron jumbotron-fluid" id="contact" style={{backgroundImage: `url(${background_contact})`}}>
                <div className="container my-5">
                    <div className="row justify-content-between">
                        <div className="col-md-6 text-white">
                            <h2 className="font-weight-bold">Contact Us</h2>
                        </div>
                        <div className="col-md-6">
                            <form>
                            	<div className="row">
        	                        <div className="form-group col-md-6">
        	                            <label htmlFor="name">Your Name</label>
        	                            <input type="name" className="form-control" id="name"/>
        	                        </div>
        	                        <div className="form-group col-md-6">
        	                            <label htmlFor="Email">Your Email</label>
        	                            <input type="email" className="form-control" id="Email"/>
        	                        </div>
        	                    </div>
        	                    <div className="form-group">
        	                        <label htmlFor="message">Message</label>
        	                        <textarea className="form-control" id="message" rows="3"></textarea>
        	                    </div>
                                <button type="submit" className="btn font-weight-bold atlas-cta atlas-cta-wide cta-green my-3">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="jumbotron jumbotron-fluid" id="copyright">
                <div className="container">
                    <div className="row justify-content-between">
                    	<div className="col-md-6 text-white align-self-center text-center text-md-left my-2">
                            PropUp
                        </div>
                    
                    </div>
                </div>
            </div>
            
              
          </div>
        );
      }
}

export default App;
