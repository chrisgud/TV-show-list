import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
<<<<<<< HEAD
//import CardActions from '@material-ui/core/CardActions';
//import Collapse from '@material-ui/core/Collapse';
//import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
//import Typography from '@material-ui/core/Typography';
=======
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
>>>>>>> adb6a4cccbb389ee2e51cce0ecef33fcf04a775b
import AddIcon from '@material-ui/icons/Add';
import {
  postToUserWatchList
} from "../../actions/authActions";
import Dashboard from '../../pages/Dashboard';
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
              <img style={imgStyle} src={result.show.image.medium} alt={result.show.name} />
            ) : (
                <img style={imgStyle} src="https://cdn1.iconfinder.com/data/icons/media-exercise-and-cool-stuff/500/TV_white-512.png" alt={result.show.name} layout-fill="true" />
              )}
            <GridListTileBar
              title={result.show.name}
              subtitle={<span>{moment(result.show.premiered).format('YYYY')} {result.show.network ? (<span>• {result.show.network.name}</span>) : (null)}</span>}
              actionIcon={
                <IconButton color="secondary" className="">
                  <AddIcon
                    onClick={() => this.addToWatchList(result)}
                  />
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
