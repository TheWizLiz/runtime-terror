import React from "react";
import { Row, Col, Jumbotron } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import UpdateForm from './UpdateForm.js'

class UpdateGameManager extends React.Component {
  render() {
    return (
      <div>
        <Card style={{ width: '25rem' }}>
          <Card.Body>
            <h1>Update Game</h1>
            <p>                                                                  </p>
              <Row>
              <Col><UpdateForm /></Col>
              </Row>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default UpdateGameManager;
