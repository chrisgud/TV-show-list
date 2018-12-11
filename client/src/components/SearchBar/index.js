import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import TVShowGrid from '../TVShowGrid';
import API from '../../utils/API';

class SearchBar extends Component {
  state = {
    searchText: '',
    results: []
  }

  onTextChange = e => {
    const val = e.target.value;
    this.setState({[e.target.name]: val}, () => {
      if(val === '') {
        this.setState({results: []});
      } else {
        API.getShows(`${this.state.searchText}`)
          .then(res => this.setState({results: res.data}))
          .catch(err => console.log(err));
      }
    });
  }

  render() {
    console.log(this.state.results);
    return (
      <div>
        <TextField 
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          floatinglabeltext="Search for TV Show"
          fullWidth={true}
        />
        <br />
        {this.state.results.length > 0 ? (
          <TVShowGrid results={this.state.results}/>
        ) : null}
      </div>
    )
  }
}

export default SearchBar;