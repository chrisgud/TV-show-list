import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import TVShowGrid from '../TVShowGrid';
import API from '../../utils/API';
import './style.css';

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
    return (
      <div id="search-page-div">
        <div id="search-title">
        SEARCH
        </div>
        <div id="search-div">
          <TextField 
            name="searchText"
            id="search-text"
            value={this.state.searchText}
            onChange={this.onTextChange}
            floatinglabeltext="Search for TV Show"
            fullWidth={true}
          />
        </div>

        <br />

        <div>
          {this.state.results.length > 0 ? (
            <TVShowGrid results={this.state.results}/>
          ) : null}
        </div>
      </div>
    )
  }
}

export default SearchBar;