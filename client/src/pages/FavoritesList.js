import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import TVShowGrid from "../components/TVShowGrid";
import API from "../utils/API";

const theme = createMuiTheme();

class FavoritesList extends Component {
  state = {
    results: {}
  };

  componentDidMount() {
    API.getBook(this.props.match.params.id)
      .then(res => this.setState({ book: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          {this.state.results.length > 0 ? (
            <TVShowGrid results={this.state.results}/>
          ) : null}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default FavoritesList;
