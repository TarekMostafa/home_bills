import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Chip, Paper, Grid } from '@material-ui/core';

const styles = theme => ({
  paper: {
   display: 'flex',
   justifyContent: 'center',
   flexWrap: 'wrap',
   padding: theme.spacing.unit / 2,
 }
});

class Items extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid item xs={12}>
          <Paper className={classes.paper}> {this.displayItems()} </Paper>
        </Grid>
      </React.Fragment>
    )
  }//render

  displayItems = () => {
    return this.props.value.map(data => {
      return (
        this.props.readOnly ? <Chip key={data} label={data}/> :
        <Chip key={data} label={data} onDelete={ () => {this.handleDeleteItem(data)} }/>
      );
    })
  }

  handleDeleteItem = data => {
    this.props.onDeleteItem(data);
  }
}

Items.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string),
  readOnly: PropTypes.bool,
  onDeleteItem: PropTypes.func
};

Items.defaultProps = {
  value: [],
  readOnly: false
}

export default withStyles(styles)(Items);
