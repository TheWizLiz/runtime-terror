import React, { Component } from 'react';
import Button from "react-bootstrap/Button";
import QRScan from './QRScan';

class CompDisplayer extends Component {
    state = {showComponent: false}

    render() {
        const { showComponent } = this.state;
        return (
          <div>
            <Button onClick={() => this.setState({showComponent:!showComponent})}>Click to use QR Code Scanner</Button>
            {this.state.showComponent ?
               <QRScan /> :
               null
            }
          </div>
        );
      }

}

export default CompDisplayer;