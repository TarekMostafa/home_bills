import React, {Component} from 'react';
import { Button, Avatar, Tooltip, Menu, MenuItem } from '@material-ui/core';
import Person from '@material-ui/icons/Person';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import { connect } from 'react-redux';

import LoginDialog from './LoginDialog';
import { addLoggedUser, removeLoggedUser } from './Actions/currentUserActions';

class Login extends Component {
  state = {
    isLoginDialogOpen: false,
    anchorEl: null
  }

  render() {
    return (
      <React.Fragment>
        {this.props.user?
          <React.Fragment>
            <Tooltip title={this.props.user.username} onClick={this.handleDropDown}>
              <Avatar><Person color="inherit"/></Avatar>
            </Tooltip>
            <ArrowDropDown onClick={this.handleDropDown}/>
          </React.Fragment>
          :<Button color="inherit" onClick={this.handleLoginBtn}>{"Login"}</Button>
        }
        <LoginDialog open={this.state.isLoginDialogOpen} onLogin={this.handleLogin} onClose={this.handleCloseLoginDialog}/>
        <Menu open={this.state.anchorEl!==null} anchorEl={this.state.anchorEl} onClose={this.handleCloseMenu}>
            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
        </Menu>
      </React.Fragment>
    )
  }// render

  handleLoginBtn = () => {
    this.setState({
      isLoginDialogOpen: true
    });
  }

  handleCloseLoginDialog = () => {
    this.setState({
      isLoginDialogOpen: false
    });
  }

  handleLogin = (username) => {
    this.props.addLoggedUser({
      username: username
    });
    this.setState({
      isLoginDialogOpen: false
    });
  }

  handleDropDown = (event) => {
    this.setState({
      anchorEl: event.currentTarget
    });
  }

  handleCloseMenu = () => {
    this.setState({
      anchorEl: null
    });
  }

  handleLogout = () => {
    this.props.removeLoggedUser();
    this.setState({
      anchorEl: null
    });
  }

}

const mapStateToProps = (state) => {
	return {
		user: state.loggedUser
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addLoggedUser: (user) => {
			dispatch(addLoggedUser(user))
		},
    removeLoggedUser: (user) => {
      dispatch(removeLoggedUser())
    }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
