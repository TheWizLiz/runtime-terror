import React, { Component } from 'react';
import QrReader from 'react-qr-reader';
import UpdateKills from "./UpdateKills";
 
class QRScan extends Component {
  constructor(props){
      super(props)
      this.state = {
          result: "Aim Camera at QR Code"
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