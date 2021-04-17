import React, { Component } from "react";
import QrReader from 'react-qr-reader';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class PropertyLog extends Component {
    constructor(props){
        super(props)
        this.state = {
            result: "Aim Camera at QR Code",
            prevResult: "",
            showComponent: false,
            username: '',
            bandanaID: 0,
            blasterID: 0,
            prevBandanaID: 0,
            prevBlasterID: 0,
            loggingError: '',
            kills: 0,
            game: 1,
            isLoading: true,
            scanned: false
        }
        this.handleScan=this.handleScan.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
   
    handleScan = data => {
      if (data) {
        this.setState({
          result: data,
          scanned: true,
          username: this.state.result
        })
      }
    }
    
    handleError = err => {
      console.error(err)
    }

    handleInputChange (e) {
        const target = e.target
        const name = target.name
    
        this.setState({ [name]: target.value })
    }

    handleSubmit (e) {
        e.preventDefault()
        
        fetch("http://localhost:5000/api/games/updateBlasterBandana", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                username: this.state.username,
                blasterID: this.state.blasterID,
                bandanaID: this.state.bandanaID
              })
            })
            .then(res => res.json())
            .then(json => {
              if(json.success){
                this.setState({
                  prevResult: this.state.result,
                  isLoading: false,
                  scanned: false,
                  username: '',
                  prevBandanaID: this.state.bandanaID,
                  prevBlasterID: this.state.blasterID,
                  bandanaID: 0,
                  blasterID: 0,
                  showComponent: false
                })
              }
            })
            .catch(err => console.error(err))
    }
  
    render() {
      const { showComponent } = this.state;
      if(this.state.isLoading == true){
        return (
            <React.Fragment>
                <div classname="PropertyLog">
                    <div class="container">
                        <h1 class="font-weight-light">Property Log</h1>

                        <br/>

                        <Form onChange={this.handleInputChange} onSubmit={this.handleSubmit}>
                          <Form.Control name="username" placeholder="Username" value={this.state.username} />
                          <Form.Control name="bandanaID" placeholder="Bandana ID" value={this.state.bandanaID} />
                          <Form.Control name="blasterID" placeholder="Blaster ID" value={this.state.blasterID} />
                          <Button variant="primary" type="submit">Submit</Button>{' '}
                        </Form>

                        <br/>
                    
                        <Button onClick={() => this.setState({showComponent:!showComponent})}>Click to use QR Code Scanner</Button>
                            {this.state.showComponent ? 
                                <QrReader 
                                delay={150}
                                onError={this.handleError}
                                onScan={this.handleScan}
                                facingMode={'environment'}
                                style={{ width: 500, height: 500}}
                                /> :
                                null
                            }
                            
                            {this.state.showComponent ?
                                <p class="font-weight-light"> {this.state.result}</p> :
                                null
                            }
    
                    </div> 
                </div> 

            </React.Fragment>
        )
      } else {
        return(
          <div class = "container">
            <h1 class="font-weight-light">Property Log</h1>
            {/*<Button onClick={() => this.setState({result:"Aim Camera at QR Code"}, {isLoading: true}, {showComponent: true})}>Click to Log another User</Button>*/}
            <p class="font-weight-light">Bandana {this.state.prevBandanaID} and Blaster {this.state.prevBlasterID} logged to {this.state.prevResult}</p>
          </div>
        )
      }
    }
}


export default PropertyLog;
