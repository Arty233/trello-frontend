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
    {
      axios
        .get("http://localhost:3001/logged_in", { withCredentials: true })
        .then(response => {
          console.log(response);
          if (
            response.data.logged_in &&
            this.state.loggedInStatus === "NOT_LOGGED_IN"
          ) {
            this.setState({
              loggedInStatus: "LOGGED_IN",
              user: response.data.user
            });
          } else if (
            !response.data.logged_in &&
            (this.state.loggedInStatus === "LOGGED_IN")
          ) {
            this.setState({
              loggedInStatus: "NOT_LOGGED_IN",
              user: {}
            });
          }
        })
        .catch(error => {
          console.log("check login error", error);
        });
    }
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


//TODO:
//fix login bugs
//make logout