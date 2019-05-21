import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Login from './../components/Login';
import Setting from './../components/Setting';
import HomeSetting from './../components/Homesetting';
import Employees from './../components/Employees';
import Payroll from './../components/Payroll';
import Report from './../components/Report';
import './App.css';

class App extends Component {

  render() {

    return (
      <HashRouter>
        <div className="App">
          <Route path="/" exact component={Login} />
          <Route path="/setting" component={Setting} />
          <Route path="/payroll" exact component={Payroll} />
          <Route path="/employees" component={Employees} />
          <Route path="/reports" component={Report} />
          <Route path="/personal-settings" component={HomeSetting} />
          {/* <Route path="/return" component={Success} /> */}
        </div>
      </HashRouter>
    );
  }
}

export default App;
