import React, { Component } from 'react';
import QrReader from 'react-qr-reader';
import UpdateKills from "./UpdateKills";
 
class QRScan extends Component {
  constructor(props){
      super(props)
      this.state = {
          result: "Aim Camera at QR Code",
          prevResult: ""
      }
      this.handleScan=this.handleScan.bind(this)
  }
 
  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
    }
  }
  
  handleError = err => {
    console.error(err)
  }

  componentDidUpdate () {
    if (this.state.result !== "Aim Camera at QR Code" && this.state.prevResult !== this.state.result) {
      fetch("http://localhost:5000/api/games/addDeaths", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: this.state.result
        })
      })
      .then(res => res.json())
      .then(json => {
        if(json.success){
          this.setState({
            isLoading: false,
            username: '',
            prevResult: this.state.result
          })
        }
      })
      .catch(err => console.error(err))
  }
  
}

  render() {
    return (
        <React.Fragment>
            <div>
                <QrReader
                delay={150}
                onError={this.handleError}
                onScan={this.handleScan}
                facingMode={'environment'}
                style={{ width: '100%' }}
                />
                <h2>{this.state.result}</h2>
            </div>

            <div>
                {this.state.result !== "Aim Camera at QR Code" ? (
                    <UpdateKills />

                ) : (
                    null
                )}
            </div>
        </React.Fragment>
        
    )
  }
}

export default QRScan;