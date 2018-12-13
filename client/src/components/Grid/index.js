import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import {
  postToUserWatchList
} from "../../actions/authActions";
import Dashboard from '../../pages/Dashboard';

const moment = require('moment');

const gridTileStyle = {
  backgroundColor: 'black'
}


const imgStyle = {
  height: '100%',
  width: 'auto',
  display: 'block',
  margin: 'auto'
}

class Grid extends Component {

  addToWatchList = show => {
    console.log(show)
    this.props.postToUserWatchList(show)
  }

  render() {
    const shows = this.props.results;

    console.log(this.props.results);

    return (
      <GridList cols={8}>
        {shows.map(result => (
          <GridListTile 
            key={result.show.id}
            style={gridTileStyle}
          >
            {result.show.image ? (
              <img style={imgStyle} src={result.show.image.medium} alt={result.show.name} />
            ) : (
              <img style={imgStyle} src="//via.placeholder.com/128x160" alt={result.show.name} layout-fill />
            )}
            <GridListTileBar 
              title={result.show.name}
              subtitle={<span>{moment(result.show.premiered).format('YYYY')} {result.show.network ? (<span>• {result.show.network.name}</span>) : (null)}</span>}
              actionIcon={
                <IconButton color="primary" classname="">
                  <AddIcon
                    onClick={() => this.addToWatchList(result)}
                  />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    )
  }
}

Dashboard.propTypes = {
  addToWatchList: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { postToUserWatchList }
)(Grid);
