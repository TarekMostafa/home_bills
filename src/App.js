import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import NavigationBar from './NavigationBar';
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
            <Route path="/" exact component={Home}></Route>
            <Route path="/bills" exact component={Bills}></Route>
            <Route path="/billsTransactions" exact component={BillsTransactions}></Route>
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
