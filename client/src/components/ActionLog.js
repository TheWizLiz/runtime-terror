import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import QRScan from "./QRScan";
import PlayerQRCode from "./PlayerQRCode";

class ActionLog extends Component{
    constructor(props){
        super(props)
        this.state = {
            playerid: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleInputChange (e) {
        const target = e.target
        const name = target.name
    
        this.setState({ [name]: target.value })
      }

    handleSubmit (e) {
        e.preventDefault()

        fetch("http://localhost:5000/api/games/addDeaths", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: this.state.playerid
            })
            })
            .then(res => res.json())
            .then(json => {
            if(json.success){
                this.setState({
                playerid: "",
                })
            }
            })
            .catch(err => console.error(err))
    }

    render(){
        return(
            <div classname="ActionLog">
                <div class="container">
                    
                    <h1 class="font-weight-light">Action Log</h1>

                    <PlayerQRCode />

                    {/*<Form>
                        <Form.Label>Current Game</Form.Label>
                        <Form.Control placeholder="Game Title" />
                        <Form.Label>Time Remaining:</Form.Label>
                        <Form.Control type="time" placeholder="Game Time" />
                        <Form.Label>Current Team:</Form.Label>
                        <Form.Control placeholder="Team Name" />
                    </Form>*/}

                    <br/>

                    <h1 class="font-weight-light">Log Kill</h1>

                    <Form onChange={this.handleInputChange} onSubmit={this.handleSubmit}>
                        <Form.Control name="playerid" placeholder="User of ID of Killed Player" value={this.state.playerid} />
                        <Button variant="primary" type="submit">Log Kill</Button>{' '}
                    </Form>

                    <br/>

                    <h1 class="font-weight-light">Scan QR Code</h1>

                    <QRScan />

                    <br/>

                    <Button variant="primary" href="tel:352-474-8358">Contact an Administrator</Button>{' '}

                </div>
            </div>
        );
    }
}

export default ActionLog;