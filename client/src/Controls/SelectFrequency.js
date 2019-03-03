import React, { Component } from 'react';
import { Select, MenuItem, InputLabel, Input } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class SelectFrequency extends Component {
  render () {
    return (
      <React.Fragment>
        <InputLabel htmlFor="Freq">Frequency</InputLabel>
        <Select input={<Input id="Freq" name={this.props.name} readOnly={this.props.readOnly}/>}
          value={this.props.value} onChange={this.handleChange}>
          {this.getFrequenciesMenuItem()}
        </Select>
      </React.Fragment>
    );
  }//render

  getFrequenciesMenuItem () {
      return this.props.frequencies.map((item,index) => {
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

const mapStateToProps = (state) => {
  return {
    frequencies: state.lookup.frequencies
  }
}

SelectFrequency.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func
};

SelectFrequency.defaultProps = {
  value: "",
  readOnly: false
}

export default connect(mapStateToProps)(SelectFrequency);
