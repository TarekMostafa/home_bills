import React, { Component } from 'react';
import { Select, MenuItem, InputLabel, Input } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class SelectCurrency extends Component {
  render() {
    return (
      <React.Fragment>
        <InputLabel htmlFor="currency">Currency</InputLabel>
        <Select input={<Input name={this.props.name} id="currency" readOnly={this.props.readOnly}/>}
          value={this.props.value} onChange={this.handleChange}>
          {this.getCurrenciesMenuItem()}
        </Select>
      </React.Fragment>
    )
  }//render

  getCurrenciesMenuItem () {
      return this.props.currencies.map((item,index) => {
        return (
          <MenuItem value={item.code} key={item.code}>
          {item.name} ({item.code})
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
    currencies: state.lookup.currencies
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

export default connect(mapStateToProps)(SelectCurrency);
