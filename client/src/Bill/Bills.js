import React, { Component } from 'react';
import { Grid, Fab, Tooltip, Typography } from '@material-ui/core';
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
  typo: {
    marginTop: theme.spacing.unit,
  }
});

class BillsComponent extends Component {
  state = {
    bills : [],
    isDialogOpen: false,
    dialogTitle: "",
    dialogType: "",
    dialogBillId: 0,
    dialogAction: null
  };

  getBills = () => {
    fetch('/api/bills')
      .then(res => res.json())
      .then(bills => this.setState({bills}));
  }

  componentDidMount() {
    this.getBills();
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container direction='row'>
          <Grid item xs={10} align='center'>
            <Typography variant="h4" className={classes.typo}>Bills</Typography>
          </Grid>
          <Grid item xs={2} align='right'>
            <Tooltip title="Add New Bill" aria-label="Add">
              <Fab color="primary" aria-label="Add" className={classes.fab}
                size="small" onClick={this.handleAddBillDialog}>
                <AddIcon />
              </Fab>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid container alignItems='center' justify='center' direction='column'>
          <BillsTable bills={this.state.bills} onEditBill={this.handleEditBillDialog}
          onDeleteBill={this.handleDeleteBillDialog} onShowBill={this.handleShowBillDialog}/>
        </Grid>
        { this.state.isDialogOpen ?
          <BillDialog title={this.state.dialogTitle} open={true} onClose={this.handleClose}
          onAction={this.state.dialogAction}
          id={this.state.dialogBillId} type={this.state.dialogType} /> : null
        }
      </React.Fragment>
    );
  } //render

  handleAddBillDialog = () => {
    this.setState({
      isDialogOpen: true,
      dialogTitle: "Add New Bill",
      dialogType: "Add",
      dialogBillId: null,
      dialogAction: this.handleAdd
    });
  }

  handleEditBillDialog = (bill) => {
    this.setState({
      isDialogOpen: true,
      dialogTitle: "Edit Bill",
      dialogType: "Edit",
      dialogBill:bill,
      dialogAction: this.handleEdit
    });
  }

  handleDeleteBillDialog = (bill) => {
    this.setState({
      isDialogOpen: true,
      dialogTitle: "Delete Bill",
      dialogType: "Delete",
      dialogBillId:bill._id,
      dialogAction: this.handleDelete
    });
  }

  handleShowBillDialog = (bill) => {
    this.setState({
      isDialogOpen: true,
      dialogTitle: "Show Bill",
      dialogType: "Show",
      dialogBillId:bill._id,
      dialogAction: null
    });
  }

  handleClose = () => {
    this.setState({
      isDialogOpen: false
    });
  }

  handleAdd = (bill) => {
    fetch('/api/bills', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bill)
    }).then(res => {
      this.setState({isDialogOpen: false});
      this.getBills();
    })
  }

  handleEdit = (bill) => {
    fetch('/api/bills/'+bill._id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bill)
    }).then(res => {
      this.setState({isDialogOpen: false});
      this.getBills();
    })
  }

  handleDelete = (bill) => {
    fetch('/api/bills/'+bill._id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => {
      this.setState({isDialogOpen: false});
      this.getBills();
    })
  }
}

BillsComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles) (BillsComponent);
