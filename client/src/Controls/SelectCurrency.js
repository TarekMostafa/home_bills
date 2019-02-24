import React, { Component } from 'react';
import { Select, MenuItem, InputLabel, Input } from '@material-ui/core';
import PropTypes from 'prop-types';

class SelectCurrency extends Component {
  state = {
    Currencies: [
      {code:'EGP', name:'Egyptian Pound'},
      {code:'USD', name:'American Dollar'}
    ]
  }

  constructor(props) {
    super(props);
    this.state[props.name] = props.value;
  }

  render() {
    return (
      <React.Fragment>
        <InputLabel htmlFor="currency">Currency</InputLabel>
        <Select input={<Input name={this.props.name} id="currency" readOnly={this.props.readOnly}/>}
          value={this.state[this.props.name]} onChange={this.handleChange}>
          {this.getCurrenciesMenuItem()}
        </Select>
      </React.Fragment>
    )
  }//render

  getCurrenciesMenuItem () {
      return this.state.Currencies.map((item,index) => {
        return (
          <MenuItem value={item.code} key={item.code}>
          {item.name} ({item.code})
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

SelectCurrency.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func
};

SelectCurrency.defaultProps = {
  value: "",
  readOnly: false
}

export default SelectCurrency;
