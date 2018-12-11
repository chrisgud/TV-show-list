import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import SearchBar from "../components/SearchBar";
import TVShowGrid from "../components/TVShowGrid";
import API from "../utils/API";

const theme = createMuiTheme();

class Search extends Component {
  state = {
    results: {},
    error: null,
    isLoaded: false,
    shows: []
  };

  componentDidMount() {
    API.getShows(encodeURI("The Office"))
      .then(
        (result) => {
          let newShows = this.state.shows;
          newShows.push(result.data);
          console.log(newShows);
          this.setState({
            isLoaded: true,
            shows: newShows
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <SearchBar />
        </div>
      </MuiThemeProvider>
    );
/*
    const { error, isLoaded, shows } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <Container fluid>
          <Row>
            <Col size="md-12">
              <Jumbotron>
                <h1>Search Page</h1>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col size="md-12">
              <div>
                Information: {shows.map(show => <div> {show.Title} {console.log(show)} </div>)}
              </div>
            </Col>
          </Row>
        </Container>
      );
    }
    */
  }
}

export default Search;
