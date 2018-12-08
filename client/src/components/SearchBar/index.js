import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import API from '../../utils/API';

class SearchBar extends Component {
  state = {
    searchText: '',
    amount: 15,
    results: []
  }

  onTextChange = e => {
    const val = e.target.value;
    this.setState({[e.target.name]: val}, () => {
      if(val === '') {
        this.setState({results: []});
      } else {
        API.get(`${this.state.searchText}`)
          .then(res => this.setState({results: res.data}))
          .catch(err => console.log(err));
      }
    });
  }

  render() {
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
      </div>
    )
  }
}

export default SearchBar;