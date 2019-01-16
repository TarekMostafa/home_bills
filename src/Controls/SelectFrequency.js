import React, { Component } from 'react';
import { Select, MenuItem, InputLabel, Input } from '@material-ui/core';

class SelectFrequency extends Component {
  state = {
    frequencies : ['None', 'Daily', 'Weekly', 'Monthly',
                'Bi-Monthly', 'Quarterly', '3 Per Annum', 'Semi-Annual',
                'Annual'],
  }

  constructor(props) {
    super(props);
    this.state[props.name] = props.value;
  }

  render () {
    return (
      <React.Fragment>
        <InputLabel htmlFor="Freq">Frequency</InputLabel>
        <Select input={<Input id="Freq" name={this.props.name} readOnly={this.props.readOnly}/>}
          value={this.state[this.props.name]} onChange={this.handleChange}>
          {this.getFrequenciesMenuItem()}
        </Select>
      </React.Fragment>
    );
  }//render

  getFrequenciesMenuItem () {
      return this.state.frequencies.map((item,index) => {
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

export default SelectFrequency;
