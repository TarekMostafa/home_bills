import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions,
          TextField, Grid, Button, InputAdornment } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility'

const initialErrorState = {
  usernameError: "",
  passwordError: ""
}

const initialState = {
  username: "",
  password: "",
  ...initialErrorState
}

class LoginDialog extends Component {
  state = {
    ...initialState
  }

  render() {
    return (
      <Dialog maxWidth="sm" open={this.props.open} onClose={this.handleClose}>
        <DialogTitle color="primary">{"Login to your account"}</DialogTitle>
        <DialogContent>
          <form autoComplete="off">
            <Grid container>
              <Grid item xs={12}>
                <TextField label="Name" margin="normal" fullWidth name="username"
                  onChange={this.handleChange} helperText={this.state.usernameError}
                  error={this.state.usernameError !== ""} value={this.state.username}
                  InputProps={{ startAdornment: (
                  <InputAdornment position="start"><AccountCircle color="primary"/></InputAdornment>
                  )}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Password" type="password" margin="normal" fullWidth name="password"
                  onChange={this.handleChange} helperText={this.state.passwordError}
                  error={this.state.passwordError !== ""} value={this.state.password}
                  InputProps={{ startAdornment: (
                  <InputAdornment position="start"><Visibility color="primary"/></InputAdornment>
                  )}}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" color="primary" fullWidth onClick={this.handleLogin} >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    );
  }//render

  validateForm() {
    let isValid = true;
    this.setState({
      ...initialErrorState
    });
    // Check username
    if(!this.state.username) {
      this.setState({usernameError: "Invalid username"});
      isValid = false;
    }
    // Check password
    if(!this.state.password) {
      this.setState({passwordError: "Invalid password"});
      isValid = false;
    }
    return isValid;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  handleLogin = () => {
    if(this.validateForm()) {
      this.props.onLogin(this.state.username);
      this.setState({
        ...initialState
      });
    }
  }

  handleClose = () => {
    this.props.onClose();
    this.setState({
      ...initialState
    });
  }

}

LoginDialog.propTypes = {
  open: PropTypes.bool,
  onLogin: PropTypes.func,
  onClose: PropTypes.func
}

LoginDialog.defaultProps = {
  open: false
}

export default LoginDialog;
