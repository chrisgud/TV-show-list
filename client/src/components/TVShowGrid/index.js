import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridList, GridTile } from '@material-ui/core/GridList';
import IconButton from '@material-ui/core/IconButton';
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
    const { results } = this.props;

    if(results) {
      resultsContent = (
        <GridList cols={3}>
          {results.map(result => (
            <GridTile
              title={"TV Show title"}
              key={result.id}
              subtitle={"TV Show years"}
              actionIcon={
                <IconButton onClick={() => this.handleOpen("Result")}>
                  Zoom button
                </IconButton>
              }
            >
              Results go here.
            </GridTile>
          ))}
        </GridList>
      )
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