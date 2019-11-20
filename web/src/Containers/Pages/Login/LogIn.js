import React, { Component } from 'react'
import './Login.css'
import './../Registration/css/style.css'
import './../Registration/css/popuo-box.css'
import { FormError } from '../Registration/FormError'
import { LOGIN_REQUEST } from '../../../Constants/actionType'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import Auth from '../../../helpers/Authentication'
import { Redirect } from 'react-router-dom'
import { HOMEPAGE } from '../../../Config/config.js'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtEmail: '',
            txtPassword: '',
            formErrorstxtEmail: '',
            formErrorstxtPassword: '',
            txtEmailValid: false,
            txtPasswordValid: false,
            formValid: false,
            loginErrorMessage: ''
        };
    }

    componentDidMount() {
        if (Auth.check()) {
            window.location.replace(HOMEPAGE)
            return <Redirect to="/" />
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            loginErrorMessage: nextProps.auth.message
        })
    }

    validateField(fieldName, value) {
        let fieldValidationErrorstxtEmail = this.state.formErrorstxtEmail;
        let fieldValidationErrorstxtPassword = this.state.formErrorstxtPassword;

        let txtEmailValid = this.state.txtEmailValid;
        let txtPasswordValid = this.state.txtPasswordValid;

        switch (fieldName) {
            case "txtEmail":
                txtEmailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) && value !== '';
                fieldValidationErrorstxtEmail = txtEmailValid ? "" : "Bạn chưa nhập đúng Kiểu email (e.g. mail@example.com)";//txtEmailValid ? "" : " is invalid (e.g. mail@example.com)";
                break;

            case "txtPassword":
                txtPasswordValid = value.length >= 8 && value.length <= 30 && value !== '';
                fieldValidationErrorstxtPassword = txtPasswordValid ? "" : "Mật khẩu từ 8 đến 30 kí tự";
                break;

            default:
                break;
        }
        this.setState(
            {
                formErrorstxtEmail: fieldValidationErrorstxtEmail,
                formErrorstxtPassword: fieldValidationErrorstxtPassword,

                txtEmailValid: txtEmailValid,
                txtPasswordValid: txtPasswordValid,
            },
            this.validateForm
        );
    }
    validateForm() {
        this.setState(
            {
                formValid: this.state.txtEmailValid && this.state.txtPasswordValid
            }
        );
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    };
    
    onSave = (e) => {
        e.preventDefault();
        const { txtEmail, txtPassword }
            = this.state;
        var user = {
            Email: txtEmail,
            Password: txtPassword,
        };
        this.props.onLogin(user.Email, user.Password);
    };

    render() {
        const { txtEmail, txtPassword, formValid, loginErrorMessage } = this.state
        return (
            <div>
                <div className="w3layoutscontaineragileits" id="ContenLogin">
                    <h2>Đăng Nhập</h2>
                    <p className="errorMessage">{loginErrorMessage}</p>
                    <form action="#" method="post" onSubmit={this.onSave}>
                        <input type="email"
                            id="LoginEmail"
                            name="txtEmail"
                            placeholder="Email"
                            onFocus={this.removeApiError}
                            ref={c => { this.userInput = c }}
                            value={txtEmail || ''}
                            onChange={this.onChange} />
                        <FormError formErrors={this.state.formErrorstxtEmail} />
                        <input type="password"
                            id="LoginPass"
                            name="txtPassword"
                            value={txtPassword || ''}
                            placeholder="Mật khẩu"
                            onChange={this.onChange}
                            onFocus={this.removeApiError}
                            ref={c => { this.userInput = c }} />
                        <FormError formErrors={this.state.formErrorstxtPassword} />
                        <ul className="agileinfotickwthree">
                            <li id="forgot">
                                <a href="#q"  >Quên Mật khẩu?</a>
                            </li>
                        </ul>
                        <div className="aitssendbuttonw3ls">
                            <input type="submit" disabled={!formValid} value="ĐĂNG NHẬP" />
                            <p> Đi đến đăng Ký tại đây <span>→</span> <Link to="/Registration" className="w3_play_icon1">Tại đây</Link> </p>
                            <div className="clear"></div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) => {
            dispatch({ type: LOGIN_REQUEST, email, password })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
