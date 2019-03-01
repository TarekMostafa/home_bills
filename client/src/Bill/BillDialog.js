import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { TextField, FormControlLabel, FormControl, Checkbox, Grid, FormHelperText, FormLabel } from '@material-ui/core';

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
    name: "",
    frequency: "",
    currency: "",
    startDate: "",
    status: "",
    defaultAmount: 0,
    itemsRequired: false,
    items: [],
    ...initialState
  };

  constructor(props) {
    super(props);
    if(props.id !== null){
      fetch('/api/bills/'+props.id)
      .then(res => res.json())
      .then(bill => {
        this.setState({...bill});
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Dialog disableBackdropClick disableEscapeKeyDown maxWidth="sm" open={true} scroll={"body"}>
        <DialogTitle id="confirmation-dialog-title">{this.props.title}</DialogTitle>
        <DialogContent>
          <form>
            <Grid container>
              <Grid item xs={12}>
                <TextField required name="name" label="Name" className={classes.textField}
                margin="normal" onChange={this.handleChange} error={this.state.nameError !== ""}
                helperText={this.state.nameError} value={this.state.name}
                InputProps={{readOnly: this.isFieldReadOnly("name")}}/>
              </Grid>
              <Grid item xs={6}>
                <FormControl required className={classes.formControl} error={this.state.freqError !== ""}>
                  <SelectFrequency name="frequency" onChange={this.handleChange} value={this.state.frequency}
                  readOnly={this.isFieldReadOnly("frequency")}/>
                  <FormHelperText>{this.state.freqError}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
              </Grid>
              <Grid item xs={6}>
                <FormControl required className={classes.formControl} error={this.state.currError !== ""}>
                  <SelectCurrency name="currency" onChange={this.handleChange} value={this.state.currency}
                  readOnly={this.isFieldReadOnly("currency")}/>
                  <FormHelperText>{this.state.currError}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField name="defaultAmount" label="Default Amount" type="number"
                className={classes.textField} margin="normal"
                onChange={this.handleChange} value={this.state.defaultAmount}
                InputProps={{readOnly: this.isFieldReadOnly("defaultAmount")}}/>
              </Grid>
              <Grid item xs={6}>
                <TextField name="startDate" label="Start Date" type="date" required
                className={classes.textField} InputLabelProps={{shrink: true}}
                onChange={this.handleChange} error={this.state.startDateError !== ""}
                helperText={this.state.startDateError} value={this.state.startDate.toString().substring(0,10)}
                InputProps={{readOnly: this.isFieldReadOnly("startDate")}}/>
              </Grid>
              <Grid item xs={6}>
                <FormControl required className={classes.formControl} error={this.state.statusError !== ""}>
                  <SelectStatus name="status" onChange={this.handleChange} value={this.state.status}
                  readOnly={this.isFieldReadOnly("status")}/>
                  <FormHelperText>{this.state.statusError}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel control={
                  <Checkbox name="itemsRequired" onChange={this.handleChange}
                  checked={this.state.itemsRequired}
                  disabled={this.isFieldReadOnly("itemsRequired")}/>
                  } label="Bill item is required with every bill transaction"/>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={this.state.itemsError !== ""}>
                  <Grid item xs={12}>
                    {
                    this.isFieldReadOnly("items") ? <FormLabel>Items</FormLabel> :
                    <TextField name="Item" label="Item" className={classes.textField}
                    margin="normal" helperText="Type the item and then press enter"
                    onKeyPress = { this.handleAddItem }/>
                    }
                  </Grid>
                  <BillItems name="items" onDeleteItem={this.handleDeleteItem} value={this.state.items}
                  readOnly={this.isFieldReadOnly("items")}/>
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
    // Check Bill Items against itemsRequired field
    if(this.state.itemsRequired && this.state.items.length === 0) {
      this.setState({itemsError: "At least one item must be entered"});
      isValid = false;
    }
    return isValid;
  }

  isFieldReadOnly = (fieldName) => {
    if(this.props.type === "Add") {
      return false;
    } else if (this.props.type === "Edit") {
      switch (fieldName) {
        case "name":
          return true;
        case "frequency":
          return true;
        case "currency":
          return true;
        default:
          return false;
      }
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
      [event.target.name] : (event.target.type==='checkbox' ? event.target.checked : event.target.value)
    });
  }

  handleDeleteItem = (data) => {
    let items = [...this.state.items];
    items = items.filter(item => item !== data);
    this.setState({items});
  }

  handleAddItem = event => {
    if(event.key === 'Enter'){
      event.preventDefault();
      let items = [...this.state.items, event.target.value];
      this.setState({ items });
      event.target.value = '';
    }
  }

}

BillDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string,
  title: PropTypes.string,
  onClose: PropTypes.func,
  onAction: PropTypes.func,
  type: PropTypes.oneOf(['Add', 'Edit', 'Delete', 'Show'])
};

BillDialog.defaultProps = {
  id: null,
  title: "Show Bill",
  type: "Show"
}

export default withStyles(styles)(BillDialog);
