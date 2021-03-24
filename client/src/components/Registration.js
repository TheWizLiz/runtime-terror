import React from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Button from "react-bootstrap/Button";

function Registration(){
    return(
        <div classname="Registration">
            <div class="container">
                <h1 class="font-weight-light">Register for Game</h1>

                <br/>

                <p>Do you want to be considered for the original horde?</p>
                    <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                        <ToggleButton value={1}>Yes</ToggleButton>
                        <ToggleButton value={2}>No</ToggleButton>
                    </ToggleButtonGroup>

                <br/>
                <br/>

                <p>Do you want to recieve text and email notifications?</p>
                    <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                        <ToggleButton value={1}>Yes</ToggleButton>
                        <ToggleButton value={2}>No</ToggleButton>
                    </ToggleButtonGroup>

                <br/>
                <br/>

                <Button variant="primary">Submit</Button>{' '}
                    
            </div>
        </div>
    )
}

export default Registration;