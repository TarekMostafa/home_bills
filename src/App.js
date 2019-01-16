import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import NavigationBar from './NavigationBar';
import Home from './Home';
import Bills from './Bill/Bills';

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <NavigationBar />
          <Route path="/" exact component={Home}></Route>
          <Route path="/bills" exact component={Bills}></Route>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
