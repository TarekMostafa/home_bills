import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';

import NavigationBar from './Navigation/NavigationBar';
import Home from './Home';
import Bills from './Bill/Bills';
import BillsTransactions from './Bill/BillsTransactions';

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <NavigationBar />
          <Switch>
            {
              this.props.user ?
              <React.Fragment>
                <Route path="/" exact component={Home}></Route>
                <Route path="/bills" exact component={Bills}></Route>
                <Route path="/billsTransactions" exact component={BillsTransactions}></Route>
              </React.Fragment>
              : <Route path="/" component={Home}></Route>
            }
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.loggedUser
	}
}

export default connect(mapStateToProps)(App);
