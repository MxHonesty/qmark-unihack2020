import React, { Component } from "react";
import PropupDataService from "../services/propup.service";

import "../css/card_professor.css"

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
                  <li key = {item.ID} style={{listStyleType: "none"}}>
                  
                  <section id="team">
                      <div className="container my-3 py-2">
                          <div className="row">
                             <div className="card-head col-lg-9 col-md-3">
                               <h3></h3>
                               <h3>{item.NUME}</h3>
                               <h5>
                                    {item.DESCRIERE}
                               </h5>
                               </div>
                             <div className="card-body col-lg-3 col-md-3">
                               <h3>
                                 <div className="allign">
                                   {item.SUMA}
                                 </div>
                               </h3>
                             </div>
                          </div>
              
                      </div>
                  </section>
                  </li>))}
            </ul>
        )
    }
    
}
