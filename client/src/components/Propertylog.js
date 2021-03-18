import React from "react";
import Table from "react-bootstrap/Table";
import Card from 'react-bootstrap/Card'

function Propertylog() {
    return (
        <div classname="Propertylog">
            <div class="container">
                <div class="row align-items-center my-5">
                    <h1 class="font-weight-light">Property Log</h1>

                    <Card>
                        <Card.Header>Bandanas Available: X</Card.Header>
                    </Card>

                    <Card>
                        <Card.Header>Blasters Available: X</Card.Header>
                    </Card>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Player ID</th>
                                <th>Bandana ID</th>
                                <th>Blaster ID</th>
                                <th>Add Row</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            <tr>
                                <td>1234567</td>
                                <td>1234</td>
                                <td>4321</td>
                                <td></td>
                            </tr>

                            <tr>
                                <td>2345678</td>
                                <td>2345</td>
                                <td>5431</td>
                                <td></td>
                            </tr>

                            <tr>
                                <td>3456789</td>
                                <td>3456</td>
                                <td>6543</td>
                                <td></td>
                            </tr>

                            <tr>
                                <td>4567890</td>
                                <td>4567</td>
                                <td>7654</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </Table> 
                
                
                </div> 
            </div>
        </div>
    );
}