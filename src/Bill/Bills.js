import React, { Component } from 'react';
import { Grid, Fab, Tooltip } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

import BillsTable from './BillsTable';
import BillDialog from './BillDialog';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  grow: {
    flexGrow: 1,
  }
});

class BillsComponent extends Component {
  state = {
    bills : [],
    isDialogOpen: false,
    dialogTitle: "",
    dialogType: "",
    dialogBill: {},
    dialogAction: null
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container direction='row'>
          <h2 className={classes.grow}>Bills</h2>
          <Tooltip title="Add New Bill" aria-label="Add">
            <Fab color="primary" aria-label="Add" className={classes.fab}
              size="small" onClick={this.handleAddBillDialog}>
              <AddIcon />
            </Fab>
          </Tooltip>
        </Grid>
        <Grid container alignItems='center' justify='center' direction='column'>
          <BillsTable bills={this.state.bills} onEditBill={this.handleEditBillDialog}
          onDeleteBill={this.handleDeleteBillDialog} onShowBill={this.handleShowBillDialog}/>
        </Grid>
        { this.state.isDialogOpen ?
          <BillDialog title={this.state.dialogTitle} open={true} onClose={this.handleClose}
          onAction={this.state.dialogAction}
          bill={this.state.dialogBill} type={this.state.dialogType} /> : null
        }
      </React.Fragment>
    );
  } //render

  handleAddBillDialog = () => {
    this.setState({
      isDialogOpen: true,
      dialogTitle: "Add New Bill",
      dialogType: "Add",
      dialogBill: {},
      dialogAction: this.handleSave
    });
  }

  handleEditBillDialog = (bill) => {
    this.setState({
      isDialogOpen: true,
      dialogTitle: "Edit Bill",
      dialogType: "Edit",
      dialogBill:bill,
      dialogAction: this.handleSave
    });
  }

  handleDeleteBillDialog = (bill) => {
    this.setState({
      isDialogOpen: true,
      dialogTitle: "Delete Bill",
      dialogType: "Delete",
      dialogBill:bill,
      dialogAction: this.handleDelete
    });
  }

  handleShowBillDialog = (bill) => {
    this.setState({
      isDialogOpen: true,
      dialogTitle: "Show Bill",
      dialogType: "Show",
      dialogBill:bill,
      dialogAction: null
    });
  }

  handleClose = () => {
    this.setState({
      isDialogOpen: false
    });
  }

  handleSave = (bill) => {
    bill.id = this.state.bills.length+1;
    let bills = [...this.state.bills, bill];
    this.setState({
      bills,
      isDialogOpen: false
    })
  }

  handleDelete = (bill) => {
    console.log(bill);
    let bills = this.state.bills.filter( (item) => item.id !== bill.id );
    this.setState({
      bills,
      isDialogOpen: false
    })
  }
}

BillsComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles) (BillsComponent);
