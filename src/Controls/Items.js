import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Chip, Paper, Grid, InputLabel } from '@material-ui/core';

const styles = theme => ({
  textField: {
    marginTop: theme.spacing.unit,
    width: 200,
  },
  paper: {
   display: 'flex',
   justifyContent: 'center',
   flexWrap: 'wrap',
   padding: theme.spacing.unit / 2,
 }
});

class Items extends Component {
  state = {
  }

  constructor(props) {
    super(props);
    this.state[props.name] = props.value;
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid item xs={12}>
        {
          this.props.readOnly ? <InputLabel>Items</InputLabel> :
          <TextField name="txtItem" label="Item" className={classes.textField}
            margin="normal" helperText="Type the item and then press enter"
            onKeyPress = { this.onKeyPress }/>
        }
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}> {this.displayItems()} </Paper>
        </Grid>
      </React.Fragment>
    )
  }//render

  onKeyPress = event => {
    if(event.key === 'Enter'){
      let items = [...this.state[this.props.name], event.target.value];
      this.setState({ [this.props.name]: items });
      this.props.onChange(items);
      event.target.value = '';
      event.preventDefault();
    }
  }

  displayItems = () => {
    return this.state[this.props.name].map(data => {
      return (
        this.props.readOnly ? <Chip key={data} label={data}/> :
        <Chip key={data} label={data} onDelete={ () => {this.handleDeleteItem(data)} }/>
      );
    })
  }

  handleDeleteItem = data => {
    let items = [...this.state[this.props.name]];
    items = items.filter(item => item !== data);
    this.setState({ [this.props.name]: items });
    this.props.onChange(items);
  }
}

Items.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Items);
