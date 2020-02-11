import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './home/Home';
import Board from './board/Board';
import axios from 'axios';


export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  checkLogingStatus() {
    axios.get("http://localhost:3001/logged_in",
      { withCredentials: true }
    )
    .then(res => {
      console.log("logged in?", res)
    })
    .catch(err => {
      console.log("check login error", err);
    });
  }

  componentDidMount() {
    this.checkLogingStatus()
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data
    });
  }

  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path={"/"}
              render={props => (
                <Home {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />
              )} />
            <Route
              exact
              path={"/board"}
              render={props => (
                <Board {...props} loggedInStatus={this.state.loggedInStatus} />
              )} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
