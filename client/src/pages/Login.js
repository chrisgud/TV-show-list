import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";


class Login extends Component {
  state = {
    results: {}
  };
  

  render() {
    return (
      <Jumbotron>Login</Jumbotron>
    );
  }
}

export default Login;