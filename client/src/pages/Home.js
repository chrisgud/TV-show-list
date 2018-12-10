import React, { Component } from "react";
import API from "../utils/API";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Home extends Component {

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Home</h1>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
