import React from "react";
import Form from "react-bootstrap/Form";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Button from "react-bootstrap/Button";

function Gamecreation(){
    return(
        <div classname="Gamecreation">
            <div class="container">
                <h1 class="font-weight-light">Create a Game</h1>

                <br/>

                <Form>
                    <Form.Group controlId="gameInformation">
                        <Form.Label>Game Information</Form.Label>
                        <Form.Control placeholder="Game Title" />
                        <Form.Control type="date" placeholder="Game Date" />
                        <Form.Control type="time" placeholder="Game Time" />
                        <Form.Control placeholder="Game Location" />
                    </Form.Group>

                    <Form.Group controlId="registrationInformation">
                        <Form.Label>Registration Information</Form.Label>
                        <Form.Control type="date" placeholder="Registration Release Date" />
                        <Form.Control type="time" placeholder="Registration Release Time" />
                    </Form.Group>

                    <Form.Group controlId="rulesMeetingInfo">
                        <Form.Label>Rules Meeting Information</Form.Label>
                        <Form.Control type="date" placeholder="Date" />
                        <Form.Control type="time" placeholder="Time Start" />
                        <Form.Control type="time" placeholder="Time End" />
                        <Form.Control placeholder="Location/Zoom Link" />
                    </Form.Group>

                    <Form.Group controlId="gameLogistics">
                        <Form.Label>Game Logistics</Form.Label>
                        <Form.Control placeholder="Maximum Number of Participants" />
                        <Form.Control placeholder="Number of Particpants Allowed to Select Team Preference" />
                    </Form.Group>

                    <Form.Group controlId="gameProperties">
                        <Form.Label>Game Properties</Form.Label>
                        <Form.Control placeholder="Number of Bandanas" />
                        <Form.Control placeholder="Number of Blasters" />
                        <Form.Control placeholder="Number of Wristbands" />
                    </Form.Group>

                    <Form.Group controlId="gameAttibutes">
                        <Form.Label>Game Attributes</Form.Label>
                        <Form.Control placeholder="Attribute Name" />
                        <Form.Control placeholder="Attribute Datatype" />
                        <Form.Control placeholder="Reward Name" />
                        <Form.Control placeholder="Reward Datatype" />
                    </Form.Group>

                    <p>Require player ID?</p>
                    <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                        <ToggleButton value={1}>Opponent</ToggleButton>
                        <ToggleButton value={2}>Team Member</ToggleButton>
                        <ToggleButton value={3}>Both</ToggleButton>
                        <ToggleButton value={4}>Neither</ToggleButton>
                    </ToggleButtonGroup>

                    <br/>
                    <br/>

                    <p>Require player ID?</p>
                    <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                        <ToggleButton value={1}>Yes</ToggleButton>
                        <ToggleButton value={2}>No</ToggleButton>
                    </ToggleButtonGroup>

                    <br/>
                    <br/>

                    <Form.Group controlId="instances">
                        <Form.Label>How many instances until a human switches to zombie?</Form.Label>
                        <Form.Control placeholder="Enter here..." />
                        <Form.Label>How many instances until a zombie switches to human?</Form.Label>
                        <Form.Control placeholder="Enter here..." />
                    </Form.Group>

                    <Button variant="primary">Create Game</Button>{' '}

                </Form>

            </div>
        </div>
    );
}

export default Gamecreation;