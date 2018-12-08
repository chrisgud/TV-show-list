import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import SearchBar from "../components/SearchBar";
import TVShowGrid from "../components/TVShowGrid";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

const theme = createMuiTheme();

class Search extends Component {
  state = {
    results: {}
  };
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getBook(this.props.match.params.id)
      .then(res => this.setState({ book: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <SearchBar />
          {this.state.results.length > 0 ? (
            <TVShowGrid results={this.state.results}/>
          ) : null}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Search;
