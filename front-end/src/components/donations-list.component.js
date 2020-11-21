import React, { Component } from "react";
import PropupDataService from "../services/propup.service";
import Donation from "../components/donation.component";

export default class DonationsList extends Component {
    constructor(props){
        super(props);
    this.retrieveDonatii = this.retrieveDonatii.bind(this);
    this.state = {
        numar: 10,  // Numarul de elemente afisate.
        //donatii: []  // Lista completa de date ale donatiilor
        // Trebuie sa fac acum requestul give me a sec 
        donatii: []
    };
    
    this.retrieveDonatii()
    
}

    retrieveDonatii(){
        PropupDataService.getFirst(this.state.numar)
        .then(response => {
            this.setState({
                donatii: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }
    
    render(){
        return(
            <ul className="list-group">
              {this.state.donatii.map(item => (
                  <li key = {item.ID}>
                  <Donation nume = {item.NUME} descriere = {item.DESCRIERE} suma = {item.SUMA}/>
                  </li>))}
            </ul>
        )
    }
    
}
