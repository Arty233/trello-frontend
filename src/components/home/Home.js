import React, { Component } from 'react';
import Registration from '../auth/Registration';
import Login from '../auth/Login';
import './Home.css'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldRegister: false,
            buttonMessage: "Sign up"
        };
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.setbuttomText = this.setbuttomText.bind(this);
    }

    setbuttomText() {
        if (this.state.shouldRegister) {
            this.setState(state => ({
                buttonMessage: "Sign up",
            }));
        }
        else {
            this.setState(state => ({
                buttonMessage: "Sign in",
            }));

        }
    }
    handleClick() {
        this.setState(state => ({
            shouldRegister: !state.shouldRegister,
        }));
        this.setbuttomText();
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
                <div className="form">
                    {shouldRegister ? (
                        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
                    ) : (
                            <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
                        )}
                    <button onClick={this.handleClick}>{this.state.buttonMessage}</button>
                </div>


            </div>
        )
    }
}