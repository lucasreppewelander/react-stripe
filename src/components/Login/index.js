import React, { Component } from 'react';
import './Login.scss';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            credentials: {
                username: null,
                password: null
            }
        }

        this.login = this.login.bind(this);
    }

    setvalue(type, e) {
        let state = this.state.credentials;
        state[type] = e.target.value;
        this.setState({ credentials: state });
    }

    login() {
        localStorage.setItem('user', `${this.state.credentials.username}-${this.state.credentials.password}`);
        this.props.router.push('/');
    }

    render() {
        return (
            <div className="login-box">
                <h1>React Stripe application</h1>
                <div className="inner-box">
                    <div className="field">
                        <label className="label">
                            Username
                        </label>
                        <p className="control">
                            <input className="input" type="text" onChange={this.setvalue.bind(this, 'username')} />
                        </p>
                    </div>

                    <div className="field">
                        <label className="label">
                            Password
                        </label>
                        <p className="control">
                            <input className="input" type="password" onChange={this.setvalue.bind(this, 'password')} />
                        </p>
                    </div>

                    <button
                        onClick={this.login}
                        className="button is-primary"
                    >
                        Login
                    </button>
                    <button className="button is-light">Cancel</button>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    // prop: React.PropTypes.[type of property (object,bool,string,func)]
};

export default Login;