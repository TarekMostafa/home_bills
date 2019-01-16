import React, { Component } from 'react';
import { Select, MenuItem, InputLabel, Input } from '@material-ui/core';

class SelectStatus extends Component {
  state = {
    statuses: ['Active', 'Inactive', 'Closed']
  }

  constructor(props) {
    super(props);
    this.state[props.name] = props.value;
  }

  render () {
    return (
      <React.Fragment>
        <InputLabel htmlFor="status">Status</InputLabel>
        <Select input={<Input id="status" name={this.props.name} readOnly={this.props.readOnly}/>}
          value={this.state[this.props.name]} onChange={this.handleChange}>
          {this.getStatusesMenuItem()}
        </Select>
      </React.Fragment>
    );
  }//render

  getStatusesMenuItem () {
      return this.state.statuses.map((item,index) => {
        return (
          <MenuItem value={item} key={index}>
          {item}
          </MenuItem>
        );
      }
    );
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.onChange(event);
  }
}

export default SelectStatus;
