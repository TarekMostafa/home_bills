import React, {Component} from 'react';
import { Button, Avatar, Tooltip, Menu, MenuItem } from '@material-ui/core';
import Person from '@material-ui/icons/Person'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'

import LoginDialog from './LoginDialog';

class Login extends Component {
  state = {
    isLoginDialogOpen: false,
    username: null,
    anchorEl: null
  }

  render() {
    return (
      <React.Fragment>
        {this.state.username?
          <React.Fragment>
          <Tooltip title={this.state.username}>
            <Avatar><Person color="inherit"/></Avatar>
          </Tooltip>
          <ArrowDropDown onClick={this.handleDropDown}/>
          </React.Fragment>:
          <Button color="inherit" onClick={this.handleLoginBtn}>{"Login"}</Button>
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
    this.setState({
      isLoginDialogOpen: false,
      username
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
    this.setState({
      anchorEl: null,
      username: null
    });
  }

}

export default Login
