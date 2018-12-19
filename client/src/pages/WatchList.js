import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Watching from '../components/WatchList/Watching'
import Watched from '../components/WatchList/Watched'
import WantToWatch from '../components/WatchList/WantToWatch'
import { connect } from "react-redux";

import { getCurrentUsersWatchList } from "../actions/authActions";

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

  componentDidMount() {
    this.props.getCurrentUsersWatchList();
  }

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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentUsersWatchList }
)(WatchList);