import React, { Component } from "react";
import PropupDataService from "../services/propup.service";
import Donation from "../components/donation.component";

export default class DonationsList extends Component {
    constructor(props){
        super(props);
    
    this.state = {
        numar: 2,  // Numarul de elemente afisate.
        donatii: [
            {nume: "salut",
            descriere: "descriere locatie",
            suma: 50},
            {nume: "salut2",
            descriere: "descriere locatie2",
            suma: 502},
            {nume: "salut2",
            descriere: "descriere locatie2",
            suma: 502},
            {nume: "salut2",
            descriere: "descriere locatie2",
            suma: 502},
        ]  // Lista completa de date ale donatiilor
    };
    
}
    render(){
        return(
            <ul className="list-group">
              {this.state.donatii.map(item => (
                  <li>
                  <Donation nume = {item.nume} descriere = {item.descriere} suma = {item.suma}/>
                  </li>))}
            </ul>
        )
    }
    
}
