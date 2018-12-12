import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

var moment = require('moment');

class Grid extends Component {
  render() {
    const shows = this.props.results;

    return (
      <GridList cols={3}>
        {shows.map(result => (
          <GridListTile key={result.show.id}>
            {result.show.image ? (
              <img src={result.show.image.medium} alt={result.show.name} />
            ) : (
              <img src="//via.placeholder.com/128x160" alt={result.show.name} />
            )}
            <GridListTileBar 
              title={result.show.name}
              subtitle={<span>{moment(result.show.premiered).format('YYYY')} {result.show.network ? (<span>• {result.show.network.name}</span>) : (null)}</span>}
              actionIcon={
                <IconButton color="primary" classname="">
                  <AddIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    )
  }
}

export default Grid;