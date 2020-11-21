import React, { Component } from "react";

export default class Donation extends Component {
    constructor(props){
        // primeste prin props nume, descrierea si suma cu care se initializeaza.
        super(props);
        
        this.state = {
            nume: this.props.nume, 
            descriere: this.props.descriere,
            suma: this.props.suma,
        }
    }
    
    render(){
        return(
            // TODO container cu datele date din construcotr. 
            <div>
            {this.state.nume}
            {this.state.descriere}
            {this.state.suma}
            </div>
        );
    }
    
    
}
