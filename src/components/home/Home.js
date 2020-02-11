import React, { Component } from 'react';
import Registration from '../auth/Registration';
import Login from '../auth/Login';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldRegister: false
        };
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState(state => ({
            shouldRegister: !state.shouldRegister
        }));
    }

    handleSuccessfulAuth(data) {
        this.props.handleLogin(data);
        this.props.history.push("/board");
    }
    render() {
        const shouldRegister = this.state.shouldRegister;
        return (
            <div>
                <h1>Home</h1>
                <h1>Status: {this.props.loggedInStatus}</h1>
                {shouldRegister ? (
                    <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
                ) : (
                        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
                    )}
                    <button onClick={this.handleClick}>I'm new here</button>



            </div>
        )
    }
}