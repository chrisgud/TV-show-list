import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class SimpleMenu extends Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };



    render() {  
        const { anchorEl } = this.state;
    return (

        <div>
            <Button
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleClick}
            >
                Menu
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
            >
                <MenuItem onClick={this.handleClose}>
                    <a href="home">Home</a>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                    <a href="search">Search</a>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                    <a href="watch-list">Watch List</a>                
                </MenuItem>
            </Menu>
        </div>
    )
  }
}

export default SimpleMenu;