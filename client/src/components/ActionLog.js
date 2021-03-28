import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function ActionLog(){
    return(
        <div classname="ActionLog">
            <div class="container">
                <h1 class="font-weight-light">Game Title</h1>

                <Form>
                <Form.Label>Time Remaining:</Form.Label>
                <Form.Control type="time" placeholder="Game Time" />
                <Form.Label>Current Team:</Form.Label>
                <Form.Control placeholder="Team Name" />
                </Form>

                <br/>

                <h1 class="font-weight-light">Log Kill</h1>

                <Form>
                <Form.Control placeholder="User of ID of Killed Player" />

                <br/>

                <h1 class="font-weight-light">or</h1>

                <br/>

                <h1 class="font-weight-light">Scan QR Code</h1>
                <Button variant="primary">Log Kill</Button>{' '}

                <br/>
                <br/>

                <Button variant="primary" href="tel:123-456-7890p123">Contact an Administrator</Button>{' '}

                </Form>

            </div>
        </div>
    );
}

export default ActionLog;