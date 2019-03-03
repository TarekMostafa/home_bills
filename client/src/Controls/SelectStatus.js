import React, { Component } from 'react';
import { Select, MenuItem, InputLabel, Input } from '@material-ui/core';
import PropTypes from 'prop-types';

class SelectStatus extends Component {
  state = {
    statuses: ['', 'Active', 'Inactive', 'Closed']
  }

  render () {
    return (
      <React.Fragment>
        <InputLabel htmlFor="status">Status</InputLabel>
        <Select input={<Input id="status" name={this.props.name} readOnly={this.props.readOnly}/>}
          value={this.props.value} onChange={this.handleChange}>
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
    this.props.onChange(event);
  }
}

SelectStatus.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func
};

SelectStatus.defaultProps = {
  value: "",
  readOnly: false
}

export default SelectStatus;
