import React, { Component } from "react";
import PropupDataService from "../services/propup.service";

export default class AddDonation extends Component {
    constructor(props) {
        super(props);
        this.onChangeNume = this.onChangeNume.bind(this);
        this.onChangeDescriere = this.onChangeDescriere.bind(this);
        this.onChangeSuma = this.onChangeSuma.bind(this);
        this.saveDonatie = this.saveDonatie.bind(this);
        this.newDonatie = this.newDonatie.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.scriptLoaded = this.scriptLoaded.bind(this);
        
        this.state = {
            nume: "",
            descriere: "",
            suma: "0",
            
            submitted: false,
            
        }
    }

    componentWillMount() {
      const script = document.createElement("script");
      script.src = "https://checkout.stripe.com/v2/checkout.js";
      script.async = true;
        script.setAttribute("className", "stripe-button");
        script.setAttribute("data-key", "pk_test_51HpuO9HVcUXloEFQsaklizjrJNIIk1l1W3DetO5thRHaIlerOKRGZJYbVwrOmvd7x0LxuagTq8STsfMtG2YA9goG00ZHmO35aC");
        script.setAttribute("data-amount", "7000");
        script.setAttribute("data-currency", "usd");
        script.setAttribute("data-name", "Gautam Sharma");
        script.setAttribute("data-description", "Buy React.js Complete Course");
        script.setAttribute("data-locale", "auto");
      script.onload = () => this.scriptLoaded();
    
      document.body.appendChild(script);
    }
    
    
    scriptLoaded() {}
    

    
    
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
                    <div className="container" style={{maxWidth: "330px"}}>
                      <div className="card">
                        <article className="card-body mx-auto" style={{maxWidth: "400"}}>
                        
                        
                            <form onSubmit={this.saveDonatie} action="payment" method="POST">
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
                

                              
                              <script
                                src="https://checkout.stripe.com/v2/checkout.js"
                                className="stripe-button"
                                data-key="pk_test_51HpuO9HVcUXloEFQsaklizjrJNIIk1l1W3DetO5thRHaIlerOKRGZJYbVwrOmvd7x0LxuagTq8STsfMtG2YA9goG00ZHmO35aC" 
                                data-amount={this.state.suma}
                                data-currency="usd" 
                                data-name={this.state.nume} 
                                data-description={this.state.descriere} 
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
