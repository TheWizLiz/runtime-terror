import React from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Button from "react-bootstrap/Button";

function Registration() {
    return(
        <div classname="Registration">
            <div class="container">
                <div class="row align-items-center mt-5 mb-3">
                <h1 class="font-weight-light">Register for Game</h1>

                </div>

                <div class="row">

                <p>Do you want to be considered for the original horde?</p>
                </div>
                <div class="row">
                    <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                        <ToggleButton value={1}>Yes</ToggleButton>
                        <ToggleButton value={2}>No</ToggleButton>
                    </ToggleButtonGroup>

                </div>
                <br/>
                <br/>

                <div class="row">

                <p>Do you want to recieve text and email notifications?</p>
                </div>
                <div class="row">
                    <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                        <ToggleButton value={1}>Yes</ToggleButton>
                        <ToggleButton value={2}>No</ToggleButton>
                    </ToggleButtonGroup>

                </div>
                <div class="row mt-3">

                <Button variant="primary">Submit</Button>{' '}
                    
                </div>
            </div>
        </div>
    )
}

export default Registration;