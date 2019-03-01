import React, { Component } from 'react';
import { Grid, Fab, Tooltip, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';

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
    dialogBillId: null,
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
            <Tooltip title="Refresh" aria-label="Refresh">
              <Fab color="secondary" aria-label="Refresh" className={classes.fab}
              size="small" onClick={this.handleRefresh}>
                <RefreshIcon />
              </Fab>
            </Tooltip>
            <Tooltip title="Add New Bill" aria-label="Add">
              <Fab color="primary" aria-label="Add" className={classes.fab}
              size="small" onClick={() => this.showBillDialog("Add", null)}>
                <AddIcon />
              </Fab>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid container alignItems='center' justify='center' direction='column'>
          <BillsTable bills={this.state.bills} onEditBill={this.showBillDialog}
          onDeleteBill={this.showBillDialog} onShowBill={this.showBillDialog}/>
        </Grid>
        { this.state.isDialogOpen ?
          <BillDialog title={this.state.dialogTitle} onClose={() => this.showBillDialog("Close", null)}
          onAction={this.state.dialogAction} id={this.state.dialogBillId} type={this.state.dialogType} />
          : null
        }
      </React.Fragment>
    );
  } //render

  showBillDialog = (type, bill) => {
    switch (type) {
      case "Add":
        this.setState({isDialogOpen: true, dialogTitle: "Add New Bill",
        dialogType: "Add", dialogBillId: null, dialogAction: this.handleAdd});
        break;
      case "Edit":
        this.setState({isDialogOpen: true, dialogTitle: "Edit Bill",
        dialogType: "Edit", dialogBillId:bill._id, dialogAction: this.handleEdit});
        break;
      case "Delete":
        this.setState({isDialogOpen: true, dialogTitle: "Delete Bill",
        dialogType: "Delete", dialogBillId:bill._id, dialogAction: this.handleDelete});
        break;
      case "Show":
        this.setState({isDialogOpen: true, dialogTitle: "Show Bill",
        dialogType: "Show", dialogBillId:bill._id, dialogAction: null});
        break;
      default:
        this.setState({isDialogOpen: false, dialogTitle: "",
        dialogType: "", dialogBillId: null, dialogAction: null});
    }
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

  handleRefresh = () => {
    this.getBills();
  }
}

BillsComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles) (BillsComponent);
