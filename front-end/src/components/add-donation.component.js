import React, { Component } from "react";
import PropupDataService from "../services/propup.service";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

export default class AddDonation extends Component {
    constructor(props) {
        super(props);
        this.onChangeNume = this.onChangeNume.bind(this);
        this.onChangeDescriere = this.onChangeDescriere.bind(this);
        this.onChangeSuma = this.onChangeSuma.bind(this);
        this.saveDonatie = this.saveDonatie.bind(this);
        this.newDonatie = this.newDonatie.bind(this);
        const stripePromise = loadStripe("KEY")
        
        
        this.state = {
            nume: "",
            descriere: "",
            suma: "0",
            
            submitted: false,
            
        }
    }
    
    onChangeNume(e){
        // Metoda aperata la fiecare schimbare a numelui.
        // Date de intrare: event e
        this.setState({
            nume: e.target.value
        });
    }
    
    onChangeDescriere(e){
        // Metoda apelata la fiecare schimbare a descrierii. 
        // Date de intrare: event e
        this.setState({
            descriere: e.target.value
        });
    }
    
    onChangeSuma(e){
        // Metoda aperata la fiecare schimbare a sumei.
        // Date de intrare: event e
        this.setState({
            suma: e.target.value
        });
    }
    
    saveDonatie(e){
        // Metoda care trimite datele necesare salvarii sper backend.
        e.preventDefault()
        var data = {
            nume: this.state.nume,
            descriere: this.state.descriere,
            suma: this.state.suma, 
        };
        
        this.setState({
            submitted: true,
        })
        console.log(data);
        
        PropupDataService.create(data)
        .then(response =>{
            this.setState({
                submitted: true
            });
        })
        .catch(e => {
            console.log(e);
        });
    }
    
    newDonatie(){
        // Resetarea meniului de donatie
        this.setState({
            nume: "",
            descriere: "",
            suma: "0",
            
            submitted: false
        })
    }
    
    render(){
        return(
            <div className="submit-form">
            <center>
                {this.state.submitted ? (
                    <h2> Donatia a fost trimisa cu succes. </h2>
                ) : (
                    <div className="container">
                      <div className="card">
                        <article className="card-body mx-auto" style={{maxWidth: "400"}}>
                        
                        
                            <form onSubmit={this.saveDonatie}>
                              <div className="btn-group-vertical">
                    
                                  <div className="row">
                                      <button type="button" value = "1" onClick = {this.onChangeSuma} className="btn btn-danger col" style={{margin: "5px"}}>1$</button>
                                      <button type="button" value = "5" onClick = {this.onChangeSuma} className="btn btn-danger col" style={{margin: "5px"}}>5$</button>
                                      <div className="w-100"></div>
                                      <button type="button" value = "10" onClick = {this.onChangeSuma} className="btn btn-danger col" style={{margin: "5px"}}>10$</button>
                                      <button type="button" value = "50" onClick = {this.onChangeSuma} className="btn btn-danger col" style={{margin: "5px"}}>50$</button>
                                  </div>
                              </div>
                    
                              <p className="divider-text">
                                    <span className=""></span>
                                </p>
                    
                              <div className="form-group input-group">
                                <input type="input" className="form-control" onChange = {this.onChangeSuma} placeholder={this.state.suma} id="other"/>
                              </div>
                              
                              <hr/>
                    
                              <div className="form-group input-group">
                                <input type="input" onChange = {this.onChangeNume} className="form-control" placeholder="Nume" id="other"/>
                              </div>
                              
                              <div className="form-group input-group">
                                <input type="input" onChange = {this.onChangeDescriere} className="form-control" placeholder="Mesaj" id="other"/>
                              </div>
                
                              <div className="form-group">
                                <button type="submit"  className="btn btn-primary btn-block"> Submit </button>
                              </div>
                              
                              <script
                                 src="//checkout.stripe.com/v2/checkout.js"
                                 className="stripe-button"
                                 data-key="<%= key %>" 
                                 data-amount="7000" 
                                 data-currency="usd" 
                                 data-name="Gautam Sharma" 
                                 data-description="Buy React.js Complete Course" 
                                 data-locale="auto" > 
                                </script> 
                              
                            </form>
                            
                            
                        </article>
                      </div>
                    </div>
                )}
            </center>
            </div>
        )
    }
    
}
