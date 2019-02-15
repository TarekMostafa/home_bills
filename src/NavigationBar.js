import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { connect } from 'react-redux';

import DrawerComponent from './DrawerComponent';
import Login from './Login';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  }
};

class NavigationBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {
              this.props.user?<DrawerComponent />:null
            }
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Home Bills
            </Typography>
            <Login />
          </Toolbar>
        </AppBar>
      </div>
    );
  } //render
}

NavigationBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		user: state.auth.loggedUser
	}
}

export default connect(mapStateToProps)(withStyles(styles)(NavigationBar));
