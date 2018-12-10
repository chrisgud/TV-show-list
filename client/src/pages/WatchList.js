import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import TVShowGrid from "../components/TVShowGrid";
import { logoutUser, getCurrentUser, getCurrentUsersWatchList, getCurrentUserFavoriteShows } from "../actions/authActions";

const theme = createMuiTheme();

class WatchList extends Component {
  state = {
    results: {}
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <TVShowGrid results={this.props.getCurrentUsersWatchList()}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default WatchList;