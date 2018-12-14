import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import {
  postToUserWatchList
} from "../../actions/authActions";
import Dashboard from '../../pages/Dashboard';

const moment = require('moment');

const gridTileStyle = {
  backgroundColor: 'black'
}

const dialogStyle = {
  width: 1000,
  height: 1000
}

const cardStyle = {
  width: 400
}


const imgStyle = {
  height: '100%',
  width: 'auto',
  display: 'block',
  margin: 'auto'
}

class Grid extends Component {
  state = {
    open: false,
    currentResult: ''
  }

  handleOpen = result => {
    this.setState({ open: true, currentResult: result });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  addToWatchList = show => {
    console.log(show)
    this.props.postToUserWatchList(show)
  }

  render() {
    const shows = this.props.results;
    console.log(shows);
    const actions = [
      <Button label="Close" primary={true} onClick={this.handleClose} />
    ]

    return (
      <GridList cols={8}>

        {shows.map(result => (
          <GridListTile 
            key={result.show.id}
            style={gridTileStyle}
            onClick={() => this.handleOpen(result)}
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

        <Dialog 
            actions={actions}
            modal={false}
            open={this.state.open}
            onClose={this.handleClose}
            style={dialogStyle}
          >
          {this.state.currentResult ? (
            <Card 
              className="showModal"
              style={cardStyle}
            >
              <CardHeader
                title={this.state.currentResult.show.name}
                subheader={moment(this.state.currentResult.show.premiered).format('YYYY')}
              />
              <CardMedia
                className="modalImage"
                image={this.state.currentResult.show.image.medium}
                title={this.state.currentResult.show.name}
              />
              <CardContent>
                {this.state.currentResult.show.summary}
              </CardContent>
            </Card>
          ) : (null)
          }
          </Dialog>

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
