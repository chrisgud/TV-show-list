import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

var moment = require('moment');

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
  render() {
    const shows = this.props.results;

    console.log(this.props.results);

    return (
      <GridList cols={8}>
        {shows.map(result => (
          <GridListTile 
            key={result.show.image}
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