import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { TextField, FormControlLabel, FormControl, Checkbox, Grid, FormHelperText } from '@material-ui/core';
import _ from 'lodash';

import SelectFrequency from '../Controls/SelectFrequency';
import SelectCurrency from '../Controls/SelectCurrency';
import SelectStatus from '../Controls/SelectStatus';
import BillItems from '../Controls/Items';

const styles = theme => ({
  formControl: {
    //marginTop: theme.spacing.unit,
    minWidth: 120,
  },
  textField: {
    //marginTop: theme.spacing.unit,
    width: 200,
  }
});

const initialState = {
  nameError: "",
  freqError: "",
  currError: "",
  startDateError: "",
  statusError: "",
  itemsError: ""
}

class BillDialog extends React.Component {
  state = {
    id: 0,
    name: "",
    frequency: "",
    currency: "",
    startDate: "",
    status: "",
    defaultAmount: 0,
    transRequired: "No",
    items: [],
    ...initialState
  };

  constructor(props) {
    super(props);
    if(! _.isNil(props.bill)){
      if(!_.isNil(props.bill.id)){
        this.state.id = props.bill.id;
      }
      if(!_.isNil(props.bill.name)){
        this.state.name = props.bill.name;
      }
      if(!_.isNil(props.bill.frequency)) {
        this.state.frequency = props.bill.frequency;
      }
      if(!_.isNil(props.bill.currency)) {
        this.state.currency = props.bill.currency;
      }
      if(!_.isNil(props.bill.startDate)) {
        this.state.startDate = props.bill.startDate;
      }
      if(!_.isNil(props.bill.status)) {
        this.state.status = props.bill.status;
      }
      if(!_.isNil(props.bill.defaultAmount)) {
        this.state.defaultAmount = props.bill.defaultAmount;
      }
      if(!_.isNil(props.bill.transRequired)) {
        this.state.transRequired = props.bill.transRequired;
      }
      if(!_.isNil(props.bill.items)) {
        this.state.items = props.bill.items;
      }
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Dialog disableBackdropClick disableEscapeKeyDown maxWidth="sm"
        open={this.props.open} scroll={"body"}>
        <DialogTitle id="confirmation-dialog-title">{this.props.title}</DialogTitle>
        <DialogContent>
          <form>
            <Grid container>
              <Grid item xs={12}>
                <TextField required name="name" label="Name" className={classes.textField}
                  margin="normal" onChange={this.handleChange} error={this.state.nameError !== ""}
                  helperText={this.state.nameError} value={this.state.name}
                  InputProps={{readOnly: this.isFieldReadOnly()}}/>
              </Grid>
              <Grid item xs={6}>
                <FormControl required className={classes.formControl} error={this.state.freqError !== ""}>
                  <SelectFrequency name="frequency" onChange={this.handleChange} value={this.state.frequency}
                  readOnly={this.isFieldReadOnly()}/>
                  <FormHelperText>{this.state.freqError}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
              </Grid>
              <Grid item xs={6}>
                <FormControl required className={classes.formControl} error={this.state.currError !== ""}>
                  <SelectCurrency name="currency" onChange={this.handleChange} value={this.state.currency}
                  readOnly={this.isFieldReadOnly()}/>
                  <FormHelperText>{this.state.currError}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField name="defaultAmount" label="Default Amount" type="number"
                  className={classes.textField} margin="normal"
                  onChange={this.handleChange} value={this.state.defaultAmount}
                  InputProps={{readOnly: this.isFieldReadOnly()}}/>
              </Grid>
              <Grid item xs={6}>
                <TextField name="startDate" label="Start Date" type="date" required
                  className={classes.textField} InputLabelProps={{shrink: true}}
                  onChange={this.handleChange} error={this.state.startDateError !== ""}
                  helperText={this.state.startDateError} value={this.state.startDate}
                  InputProps={{readOnly: this.isFieldReadOnly()}}/>
              </Grid>
              <Grid item xs={6}>
                <FormControl required className={classes.formControl} error={this.state.statusError !== ""}>
                  <SelectStatus name="status" onChange={this.handleChange} value={this.state.status}
                  readOnly={this.isFieldReadOnly()}/>
                  <FormHelperText>{this.state.statusError}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox name="transRequired" onChange={this.handleChange}
                    checked={this.state.transRequired==="Yes"?true:false}
                    disabled={this.isFieldReadOnly()}/>
                  }
                  label="Bill item is required with every bill transaction"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={this.state.itemsError !== ""}>
                  <BillItems name="items" onChange={this.handleItemsChange} value={this.state.items}
                  readOnly={this.isFieldReadOnly()}/>
                  <FormHelperText>{this.state.itemsError}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.handleCancel}>
            Cancel
          </Button>
          {
            this.props.type === "Show" ? null :
            <Button color="primary" onClick={this.handleAction}>
              { this.props.type === "Delete" ? "Delete" : "Save" }
            </Button>
          }

        </DialogActions>
      </Dialog>
    );
  } //render

  handleCancel = () => {
    this.props.onClose();
  }

  validateForm = () => {
    let isValid = true;
    this.setState({...initialState});
    // Check Bill Name
    if(!this.state.name) {
      this.setState({nameError: "Invalid bill name"});
      isValid = false;
    }
    // Check Bill Frequency
    if(!this.state.frequency) {
      this.setState({freqError: "Bill frequency is required"});
      isValid = false;
    }
    // Check Bill currency
    if(!this.state.currency) {
      this.setState({currError: "Bill currency is required"});
      isValid = false;
    }
    // Check Start date
    if(!this.state.startDate) {
      this.setState({startDateError: "Bill start date is required"});
      isValid = false;
    }
    // Check Bill status
    if(!this.state.status) {
      this.setState({statusError: "Bill status is required"});
      isValid = false;
    }
    // Check Bill Items against transRequired field
    if(this.state.transRequired==="Yes" && this.state.items.length === 0) {
      this.setState({itemsError: "At least one item must be entered"});
      isValid = false;
    }
    return isValid;
  }

  isFieldReadOnly = () => {
    if(this.props.type === "Add") {
      return false;
    } else if (this.props.type === "Edit") {
      return false;
    } else {
      return true;
    }
  }

  handleAction = () => {
    if(this.validateForm()){
      this.props.onAction(this.state);
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : (event.target.type==='checkbox' ? (event.target.checked?"Yes":"No") : event.target.value)
    });
  }

  handleItemsChange = (items) => {
    this.setState({items});
  }

}

BillDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  bill: PropTypes.object,
  open: PropTypes.bool,
  title: PropTypes.string,
  onClose: PropTypes.func,
  onAction: PropTypes.func,
  type: PropTypes.oneOf(['Add', 'Edit', 'Delete', 'Show'])
};

BillDialog.defaultProps = {
  open: false,
  title: "undefined Title",
  type: "Show"
}

export default withStyles(styles)(BillDialog);
