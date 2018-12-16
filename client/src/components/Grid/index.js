// client.src.components.Grid.index.js

import React, { Component } from 'react';
import { connect } from "react-redux";

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import {
  postToUserWatchList,
  removeFromUserWatchList,
  searchUserInfo,
} from "../../actions/authActions";
import "./style.css";

const moment = require('moment');

const gridTileStyle = {
  backgroundColor: 'black'
}

const dialogStyle = {
  width: "auto",
  height: "auto"
}

const cardStyle = {
  width: "auto",
  height: "auto"
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

  componentDidMount() {
    // this.props.getCurrentUser();
    this.props.searchUserInfo();
  }

  handleOpen = result => {
    this.setState({ open: true, currentResult: result });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  addToWatchList = show => {
    this.props.postToUserWatchList(show, this.props.searchUserInfo)
  }

  removeFromWatchListButtonFunction = show => {
    this.props.removeFromUserWatchList(show, this.props.searchUserInfo)
  }

  render() {
    const shows = this.props.results;
    const actions = [
      <Button label="Close" primary={true} onClick={this.handleClose} />
    ]

    return (
      <GridList cols={7}>

        {shows.map(result => (
          <GridListTile
            key={result.show.id}
            id="grid-list-tile"
            style={gridTileStyle}
            onClick={() => this.handleOpen(result)}
          >
            {result.show.image ? (
              <img
                style={imgStyle}
                src={result.show.image.medium}
                alt={result.show.name}
              />
            ) : (
                <img style={imgStyle}
                  src="https://cdn1.iconfinder.com/data/icons/media-exercise-and-cool-stuff/500/TV_white-512.png"
                  alt={result.show.name}
                  layout-fill="true"
                />
              )}isAuthenticated
            <GridListTileBar
              title={result.show.name}
              subtitle={<span>{moment(result.show.premiered).format('YYYY')} {result.show.network 
                ? (<span>• {result.show.network.name}</span>) : (null)}</span>}
              actionIcon={
                <IconButton color="secondary" className="">
                  {
                    this.props.auth.isAuthenticated === true
                      && this.props.auth.profile.includes(result.show.id) 
                      ?(
                        <RemoveIcon
                          onClick={() => this.removeFromWatchListButtonFunction(result)}
                        />
                      ) :
                      (
                        <AddIcon
                          onClick={() => this.addToWatchList(result)}
                        />
                      )}
                </IconButton>
              }
            />
          </GridListTile>
        ))}

        <Dialog
          id="modal-popup"
          actions={actions}
          //modal={false}
          open={this.state.open}
          onClose={this.handleClose}
          style={dialogStyle}
        ><div>
            {this.state.currentResult ? (
              <Card
                className="showModal"
                style={cardStyle}
                id="modal-card"
              >
                <CardHeader
                  title={this.state.currentResult.show.name}
                  subheader={<span>{moment(this.state.currentResult.show.premiered).format('YYYY')} {this.state.currentResult.show.network ? (<span>• {this.state.currentResult.show.network.name}</span>) : (null)}</span>}
                />
                <CardContent>
                  <b>Summary</b>: {this.state.currentResult.show.summary.replace(/<\/?[^>]+(>|$)/g, "")}
                  <br />
                  <br />
                  {this.state.currentResult.show.officialSite ? (<span><b>Official Site</b>: <a href={this.state.currentResult.show.officialSite} target="_blank">Click here</a></span>) : (null)}
                </CardContent>
              </Card>
            ) : (null)
            }</div>
        </Dialog>

      </GridList>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    postToUserWatchList,
    removeFromUserWatchList,
    searchUserInfo,
  }
)(Grid);
