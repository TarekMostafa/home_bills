import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Fab, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 500,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    }
  }
});

class BillsTable extends Component {

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Name</CustomTableCell>
            <CustomTableCell>Frequency</CustomTableCell>
            <CustomTableCell>Currency</CustomTableCell>
            <CustomTableCell>Start Date</CustomTableCell>
            <CustomTableCell>Status</CustomTableCell>
            <CustomTableCell>Last Paid Date</CustomTableCell>
            <CustomTableCell></CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.getTableRows()}
        </TableBody>
      </Table>
    </Paper>
    );
  }//render

  getTableRows = () => {
    return this.props.bills.map(bill => {
      return (
        <TableRow className={this.props.classes.row} key={bill._id}>
          <CustomTableCell>{bill.name}</CustomTableCell>
          <CustomTableCell>{bill.frequency}</CustomTableCell>
          <CustomTableCell>{bill.currency}</CustomTableCell>
          <CustomTableCell>{bill.startDate.toString().substring(0,10)}</CustomTableCell>
          <CustomTableCell>{bill.status}</CustomTableCell>
          <CustomTableCell>
            {bill.lastPaidDate.toString().substring(0,4) === "1970" ? "" :
             bill.lastPaidDate.toString().substring(0,10)}
          </CustomTableCell>
          <CustomTableCell>
          <Tooltip title="Show Bill" aria-label="Show">
            <Fab aria-label="Show"  size="small"
              onClick={ () => {this.handleShowBill(bill)} }>
              <VisibilityIcon />
            </Fab>
          </Tooltip>
            <Tooltip title="Edit Bill" aria-label="Edit">
              <Fab color="primary" aria-label="Edit" size="small"
                onClick={ () => {this.handleEditBill(bill)} }>
                <EditIcon />
              </Fab>
            </Tooltip>
            <Tooltip title="Delete Bill" aria-label="Delete">
              <Fab color="secondary" aria-label="Delete"  size="small"
                onClick={ () => {this.handleDeleteBill(bill)} }>
                <DeleteIcon />
              </Fab>
            </Tooltip>
          </CustomTableCell>
        </TableRow>
      );
    })
  }//getTableRows

  handleEditBill = (bill) => {
    this.props.onEditBill("Edit", bill);
  }

  handleDeleteBill = (bill) => {
    this.props.onDeleteBill("Delete", bill);
  }

  handleShowBill = (bill) => {
    this.props.onShowBill("Show", bill);
  }

}

BillsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BillsTable);
