import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Watching from '../components/WatchList/Watching'
import Watched from '../components/WatchList/Watched'
import WantToWatch from '../components/WatchList/WantToWatch'


// import { logoutUser, getCurrentUser, getCurrentUsersWatchList, getCurrentUserFavoriteShows } from "../actions/authActions";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

class WatchList extends Component {
  state = {
    results: [
      
    ]
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <br />
          <Watching />
          <br />
          <WantToWatch />
          <br />
          <Watched />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default WatchList;