import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles, MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import TouchApp from '@material-ui/icons/TouchApp';
import IconButton from '@material-ui/core/IconButton';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
//import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
//import InboxIcon from "@material-ui/icons/MoveToInbox";
//import MailIcon from "@material-ui/icons/Mail";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import 'typeface-unlock';

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    backgroundColor: "white",
    borderRadius: "15px 50px",
    paddingLeft: "0.5em",
    // fontFamily: "-apple-system"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  navBar: {
    backgroundImage: "linear-gradient(45deg, #C3073F, #960731)",
    height: "6em"
  },
  icon: {
    fontSize: "48px"
  }
};

const theme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'Unlock'
    ].join(','),
  },
});

class TemporaryDrawer extends React.Component {
  state = {
    left: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };


  doSomething = (text) => {
    this.context.router.history.push('/' + text);
  };


  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          {["Home", "Search", "Watchlist", "Favorites"].map((text, index) => (
            <ListItem button key={text}>
              <Link to={`/${text}`}>
                {/* <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon> */}
                <ListItemText primary={text} />
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Account Settings", "Profile", "Logout"].map((text, index) => (
            <ListItem button key={text}>
              {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div>
        <MuiThemeProvider theme={theme}>
        <div className={classes.root} id="navBar">
          <AppBar position="static">
            <Toolbar className={classes.navBar}>
              <IconButton className={classes.TouchApp} color="inherit" aria-label="Menu">
                <TouchApp className={classes.icon} />
              </IconButton>
              <Typography variant="h2" color="black" className={classes.grow}>
                Welcome to VIST
              </Typography>
              <Button
                variant="contained"
                color="inherit"
                onClick={this.toggleDrawer("left", true)}
              >
                Menu
              </Button>
            </Toolbar>
          </AppBar>
        </div>
        </MuiThemeProvider>
        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("left", false)}
            onKeyDown={this.toggleDrawer("left", false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TemporaryDrawer);
