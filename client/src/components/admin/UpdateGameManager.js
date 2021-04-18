import React from "react";
import { Row, Col, Jumbotron } from 'react-bootstrap';
import UpdateForm from './UpdateForm.js'

class UpdateGameManager extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1>Update Game</h1>
          <p>                                                                  </p>
            <Row>
            <Col lg={15} lg={10}><UpdateForm /></Col>
            </Row>
        </Jumbotron>
      </div>
    )
  }
}

export default UpdateGameManager;
