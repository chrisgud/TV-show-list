import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import TVShowGrid from "../components/TVShowGrid";
// import { logoutUser, getCurrentUser, getCurrentUsersWatchList, getCurrentUserFavoriteShows } from "../actions/authActions";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

class WatchList extends Component {
  state = {
    results: [
      {
        title: "The Office",
        years: "2006-2014",
        image: "https://img.nbc.com/sites/nbcunbc/files/files/images/2016/1/19/MDot-TheOffice-640x360-MP.jpg",
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