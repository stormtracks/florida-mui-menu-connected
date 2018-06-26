import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";

import { Route } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import compose from "recompose/compose";

import withRoot from "./../withRoot";
import Home from "../components/Home";
import Admin from "./Admin";
import ShowTheLocation from "./../components/ShowTheLocation";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton1: {
    marginLeft: -12,
    marginRight: 100
  },
  menuButton2: {
    marginLeft: -12,
    marginRight: 20
  },
  link: {
    textDecoration: "none"
  }
};

class MenuAppBar extends React.Component {
  state = {
    anchorEl1: null,
    anchorEl2: null
  };

  handleMenu = event => {
    this.setState({ anchorEl1: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl1: null });
  };

  handleMenuAdmin = event => {
    this.setState({ anchorEl2: event.currentTarget });
  };

  handleCloseAdmin = () => {
    this.setState({ anchorEl2: null });
  };

  render() {
    const { classes, selectedKey } = this.props;
    const { anchorEl1, anchorEl2 } = this.state;

    console.log("selectedKey = ", selectedKey);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              Title
            </Typography>
            <div>
              <Typography
                className={classes.menuButton1}
                aria-owns={anchorEl1 ? "menu-appbar1" : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                Menu
              </Typography>
              <Menu
                id="menu-appbar1"
                anchorEl={anchorEl1}
                open={Boolean(anchorEl1)}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>
                  <Link className={classes.link} to="/">
                    Home
                  </Link>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <Link
                    className={classes.link}
                    to={{ pathname: `/${selectedKey}/sec1` }}
                  >
                    Sec 1
                  </Link>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <Link
                    className={classes.link}
                    to={{ pathname: `/${selectedKey}/sec2` }}
                  >
                    Sec 2
                  </Link>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <Link
                    className={classes.link}
                    to={{ pathname: `/${selectedKey}/sec3` }}
                  >
                    Sec 3
                  </Link>
                </MenuItem>
              </Menu>
            </div>

            <div>
              <IconButton
                className={classes.menuButton2}
                aria-owns={anchorEl2 ? "menu-appbar2" : null}
                aria-haspopup="true"
                onClick={this.handleMenuAdmin}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar2"
                anchorEl={anchorEl2}
                open={Boolean(anchorEl2)}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                onClose={this.handleCloseAdmin}
              >
                <MenuItem onClick={this.handleCloseAdmin}>
                  <Link className={classes.link} to="/admin">
                    Admin
                  </Link>
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>

        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/admin" component={Admin} />

          <Route path={`/${selectedKey}/sec1`} component={ShowTheLocation} />
          <Route path={`/${selectedKey}/sec2`} component={ShowTheLocation} />
          <Route path={`/${selectedKey}/sec3`} component={ShowTheLocation} />
        </div>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedKey: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  const { selectedKey } = state;
  return {
    selectedKey
  };
}

// This concept is shown in
// the material-ui AppFrame

/*
export default compose(
  withStyles(styles, {
    name: 'AppFrame',
  }),
  connect(state => ({
    uiTheme: state.theme,
  })),
)(AppFrame);
*/

const part = compose(
  withStyles(styles, {
    name: "MenuAppBar"
  }),
  connect(mapStateToProps)
)(MenuAppBar);

export default withRoot(part);

//export default connect(mapStateToProps)(MenuAppBar);
//export default withRoot(withStyles(styles)(MenuAppBar));
