import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CompDisplayer from "./CompDisplayer";
import PlayerQRCode from "./PlayerQRCode";

function ActionLog(){
    return(
        <div classname="ActionLog">
            <div class="container">
                
                <PlayerQRCode />

                <h1 class="font-weight-light">Action Log</h1>

                <Form>
                    <Form.Label>Current Game</Form.Label>
                    <Form.Control placeholder="Game Title" />
                    <Form.Label>Time Remaining:</Form.Label>
                    <Form.Control type="time" placeholder="Game Time" />
                    <Form.Label>Current Team:</Form.Label>
                    <Form.Control placeholder="Team Name" />
                </Form>

                <br/>

                <h1 class="font-weight-light">Log Kill</h1>

                <Form>
                    <Form.Control placeholder="User of ID of Killed Player" />
                </Form>

                <br/>

                <h1 class="font-weight-light">or</h1>

                <br/>

                <h1 class="font-weight-light">Scan QR Code</h1>

                <CompDisplayer />

                <br/>
                <br/>

                <Button variant="primary">Log Kill</Button>{' '}

                <br/>
                <br/>

                <Button variant="primary" href="tel:352-474-8358">Contact an Administrator</Button>{' '}

            </div>
        </div>
    );
}

export default ActionLog;