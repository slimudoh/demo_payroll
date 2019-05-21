import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as constant from './constant'

class Login extends Component {

    state = {
        show: false,
        loading: true,
        error: false,
        login: false,
    }

    showPassword = () => {
        if (this.state.show === false) { 
            this.setState({
                show: true,
            })
            document.getElementById("pass").type = "text";
        } else {
            this.setState({
                show: false,
            })
            document.getElementById("pass").type = "password";
        }
    }

    checkLogin = (event) => {
        event.preventDefault();
        this.setState({
            loading: false,
        });

        const loginData = {
            email: this.email.value,
            password: this.password.value
        }

        if (constant.EMAIL !== loginData.email) {
            this.setState({
                error: true,
            });

            this.clearEmail = setTimeout(() => {
                this.setState({
                    error: false,
                    loading: true,
                });
            }, 5000)
            return;
        }

        if (constant.PASSWORD !== loginData.password) {
            this.setState({
                error: true,
            });

            this.clearPassword = setTimeout(() => {
                this.setState({
                    error: false,
                    loading: true,
                });
            }, 5000)
            return;
        }

        this.setState({
            login: true,
        })
        
    }

    componentWillUnmount() {
        if (this.clearEmail) {
            clearTimeout(this.clearEmail);
        }

        if (this.clearPassword) {
            clearTimeout(this.clearPassword);
        }
    }

    render() {
        let redirect = null;
        if (this.state.login === true) {
            redirect = <Redirect to="/payroll" />;
        }

        return (
            <div className="login_page">
            {redirect}
                <div>
                    <div className="new_logo">
                        <img src="/images/logo-white.png" alt="logo" />
                    </div>
                    <div className="login_header">
                        Welcome to <br /> Payroll
                        <div>
                            by <span className="ro">ro</span><span className="ve">vedana</span>
                        </div>
                    </div>
                    <div className="login_box">
                        <form onSubmit={this.checkLogin}>
                            <div className="login_box_input">
                                <span>Email</span>
                                <div>
                                    <input type="text" ref={email => this.email = email} />
                                </div>
                            </div>
                            <div className="login_box_input">
                                <span>Password</span>
                                <div>
                                    <input id="pass" type="password" ref={password => this.password = password}/>
                                        {
                                            this.state.show ? 
                                            <div onClick={this.showPassword}>Hide</div> : <div onClick={this.showPassword}>Show</div>
                                        }
                                </div>
                            </div>
                            {
                                this.state.error ? 
                                <div className="login_error">
                                    Your Email or Password is incorrect.
                                </div>: null
                            }                            
                            <div className="login_box_button">
                            <button>LOGIN</button>
                            {/* {
                                this.state.loading ? 
                                <button>LOGIN</button> :
                                <div className="btn_loader">
                                    <div className="spinning">
                                        <img src="/images/botton.png" alt="loading" />
                                    </div>
                                </div>
                            }                                 */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;