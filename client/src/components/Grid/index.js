import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import IconButton from '@material-ui/core/IconButton';

class Grid extends Component {
  render() {
    const shows = this.props.results;

    return (
      <GridList cols={3}>
        {shows.map(result => (
          <GridListTile
            title={result.show.name}
            key={result.show.id}
            subtitle={result.show.premiered}
            actionIcon={
              <IconButton onClick={() => this.handleOpen("Result")}>
                Zoom button
              </IconButton>
            }
          >
            {result.show.image ? (
              <img src={result.show.image.medium} alt={result.show.name} />
            ) : (
              <img src="//via.placeholder.com/128x160" alt={result.show.name} />
            )}
            {result.show.name}
          </GridListTile>
        ))}
      </GridList>
    )
  }
}

export default Grid;