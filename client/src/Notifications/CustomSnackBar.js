import React, { Component } from 'react';

import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';

import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
});

class CustomSnackBar extends Component {
  render() {
    const { classes } = this.props;
    const Icon = variantIcon[this.props.variant];

    return (
      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={this.props.open}
        autoHideDuration={6000} onClose={this.handleClose}>
        <SnackbarContent className={classes[this.props.variant]}
        message={
          <span id="message-id" className={classes.message}>
            <Icon className={classNames(classes.icon, classes.iconVariant)} />
                {this.props.message}
          </span>
        } action={[
          <IconButton key="close" aria-label="Close" color="inherit" className={classes.close}
              onClick={this.handleClose}><CloseIcon className={classes.icon}/></IconButton>
        ]} />
      </Snackbar>
    )
  }//render

  handleClose = () => {
    this.props.onClose();
  }
}

CustomSnackBar.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['info', 'success', 'error', 'warning'])
};

CustomSnackBar.defaultProps = {
  open: false,
  message: "",
  variant: "info"
}

export default withStyles(styles)(CustomSnackBar);
