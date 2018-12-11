import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import TVShowGrid from "../components/TVShowGrid";
import { logoutUser, getCurrentUser, getCurrentUsersWatchList, getCurrentUserFavoriteShows } from "../actions/authActions";

const theme = createMuiTheme();

class WatchList extends Component {
  state = {
    results: [
      {
        title: "The Office",
        year: 2006,
        image: "",
        network: "NBC"
      }
    ]
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <TVShowGrid results={this.state.results}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default WatchList;