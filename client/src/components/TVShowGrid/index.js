import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '../Grid';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

class TVShowGrid extends Component {
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

  render() {
    let resultsContent;
    const shows = this.props.results;
    console.log(shows);

    if(shows) {
      resultsContent = <Grid results={shows} />
    } else {
      resultsContent = null;
    }

    const actions = [
      <Button label="Close" primary={true} onClick={this.handleClose} />
    ]

    return (
      <div>
        {resultsContent}
        <Dialog 
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestclose={this.handleClose}
        >
        Result display.
        </Dialog>
      </div>
    )
  }
}

TVShowGrid.propTypes = {
  results: PropTypes.array.isRequired
}

export default TVShowGrid;