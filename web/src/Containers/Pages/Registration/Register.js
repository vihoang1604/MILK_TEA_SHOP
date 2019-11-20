import React, { Component } from 'react';
import { connect } from 'react-redux';
import './css/popuo-box.css';
import './css/style.css';
import { REGISTER_REQUEST } from './../../../Constants/actionType';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { FormError } from './FormError';
import { Link } from "react-router-dom";
import { ROLE_CUSTOMER } from '../../../Constants/auth';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: '',
      txtEmail: '',
      txtDateOfBirth: '',
      txtAddress: '',
      txtPassword: '',
      txtPasswordReset: '',
      txtPhone: '',
      txtGender: '',
      formErrorstxtName: '',
      formErrorstxtEmail: '',
      formErrorstxtDateOfBirth: '',
      formErrorstxtAddress: '',
      formErrorstxtPassword: '',
      formErrorstxtPasswordReset: '',
      formErrorstxtPhone: '',
      formErrorstxtGender: '',
      txtNameValid: false,
      txtEmailValid: false,
      txtDateOfBirthValid: false,
      txtAddressValid: false,
      txtPasswordValid: false,
      txtPasswordResetValid: false,
      txtPhoneValid: false,
      txtGenderValid: false,
      formValid: false
    };
  }
  validateField(fieldName, value) {
    let fieldValidationErrorstxtName = this.state.formErrorstxtName;
    let fieldValidationErrorstxtEmail = this.state.formErrorstxtEmail;
    let fieldValidationErrorstxtDateOfBirth = this.state.formErrorstxtDateOfBirth;
    let fieldValidationErrorstxtAddress = this.state.formErrorstxtAddress;
    let fieldValidationErrorstxtPassword = this.state.formErrorstxtPassword;
    let fieldValidationErrorstxtPasswordReset = this.state.formErrorstxtPasswordReset;
    let fieldValidationErrorstxtPhone = this.state.formErrorstxtPhone;
    let fieldValidationErrorstxtGender = this.state.formErrortxtGender;

    let txtNameValid = this.state.txtNameValid;
    let txtEmailValid = this.state.txtEmailValid;
    let txtDateOfBirthValid = this.state.txtDateOfBirthValid;
    let txtAddressValid = this.state.txtAddressValid;
    let txtPasswordValid = this.state.txtPasswordValid;
    let txtPasswordResetValid = this.state.txtPasswordResetValid;
    let txtPhoneValid = this.state.txtPhoneValid;
    let txtGenderValid = this.state.txtGenderValid;

    switch (fieldName) {
      case "txtEmail":
        txtEmailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) && value !== '';
        fieldValidationErrorstxtEmail = txtEmailValid ? "" : "Bạn chưa nhập đúng Kiểu email (e.g. mail@example.com)";
        break;
      case "txtName":
        txtNameValid = value.match(/([\D])$/i) && value.match(/([\S])$/i) && value.length >= 2 && value !== '';
        fieldValidationErrorstxtName = txtNameValid ? "" : "Bạn chưa nhập đủ tên bạn";
        break;
      case "txtPhone":
        txtPhoneValid = value.match(/([\d])$/i) && value.length >= 10 && value.length <= 11 && value !== '';
        fieldValidationErrorstxtPhone = txtPhoneValid ? "" : "Số điện thoại từ 10 đến 11 số";
        break;
      case "txtAddress":
        txtAddressValid = value.length >= 3 && value !== '';
        fieldValidationErrorstxtAddress = txtAddressValid ? "" : "Bạn chưa nhập đủ địa chỉ của bạn";
        break;
      case "txtPassword":
        txtPasswordValid = value.length >= 8 && value.length <= 30 && value !== '';
        fieldValidationErrorstxtPassword = txtPasswordValid ? "" : "Mật khẩu từ 8 đến 30 kí tự";
        break;
      case "txtPasswordReset":
        txtPasswordResetValid = value === this.state.txtPassword;
        fieldValidationErrorstxtPasswordReset = txtPasswordResetValid ? "" : "Mật khẩu không khớp";
        break;
      case "txtGender":
        txtGenderValid = value !== '';
        fieldValidationErrorstxtGender = txtGenderValid ? "" : "Bạn chưa chọn giới tính";
        break;
      case "txtDateOfBirth":
        txtDateOfBirthValid = value.match(/^\d{4}-\d{2}-\d{2}$/) && value !== '';
        let date = new Date(); //Chưa đủ 15 tuổi không cho đặt
        fieldValidationErrorstxtDateOfBirth = (!txtDateOfBirthValid || new Date(value) >= date.setDate(date.getDate() - 365 * 15)) ? "Bạn chưa nhập ngày tháng(e.g. dd-mm-yyyy)" : "";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrorstxtName: fieldValidationErrorstxtName,
        formErrorstxtEmail: fieldValidationErrorstxtEmail,
        formErrorstxtDateOfBirth: fieldValidationErrorstxtDateOfBirth,
        formErrorstxtAddress: fieldValidationErrorstxtAddress,
        formErrorstxtPassword: fieldValidationErrorstxtPassword,
        formErrorstxtPasswordReset: fieldValidationErrorstxtPasswordReset,
        formErrorstxtPhone: fieldValidationErrorstxtPhone,
        formErrorstxtGender: fieldValidationErrorstxtGender,

        txtNameValid: txtNameValid,
        txtEmailValid: txtEmailValid,
        txtDateOfBirthValid: txtDateOfBirthValid,
        txtAddressValid: txtAddressValid,
        txtPasswordValid: txtPasswordValid,
        txtPasswordResetValid: txtPasswordResetValid,
        txtPhoneValid: txtPhoneValid,
        txtGenderValid: txtGenderValid
      },
      this.validateForm
    );
  }
  validateForm() {
    this.setState(
      {
        formValid: this.state.txtNameValid && this.state.txtEmailValid && this.state.txtDateOfBirthValid
          && this.state.txtAddressValid && this.state.txtPasswordValid && this.state.txtPasswordResetValid
          && this.state.txtPhoneValid && this.state.txtGenderValid
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
    const { txtName, txtEmail, txtDateOfBirth, txtAddress, txtPhone, txtGender, txtPassword } = this.state;
    var user = {
      email: txtEmail,
      password: txtPassword,
      name: txtName,
      dateOfBirth: txtDateOfBirth,
      gender: txtGender,
      address: txtAddress,
      phoneNumber: txtPhone,
      roleIds: [ROLE_CUSTOMER]
    };
    this.props.onRegister(user);
  };

  render() {
    const { txtName, txtEmail, txtDateOfBirth, txtPhone, txtAddress, txtGender, txtPassword, txtPasswordReset } = this.state;
    const { message } = this.props;
    return (
      <div id="content">
        <div className="w3layoutscontaineragileits" id="main-content">
          <h2>Đăng Ký</h2>
          <p className="errorMessage">{message}</p>
          <Form action="#" method="post" ref={c => { this.form = c }} onSubmit={this.onSave}>
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <Input
                  className="user"
                  type="text"
                  name="txtName"
                  placeholder="Họ Tên"
                  required=""
                  value={txtName || ''}
                  onChange={this.onChange}
                  onFocus={this.removeApiError}
                  ref={c => { this.userInput = c }}
                />
                <FormError formErrors={this.state.formErrorstxtName} />
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <Input
                  type="email"
                  name="txtEmail"
                  placeholder="Email"
                  required=""
                  onFocus={this.removeApiError}
                  ref={c => { this.userInput = c }}
                  value={txtEmail || ''}
                  onChange={this.onChange}
                />
                <FormError formErrors={this.state.formErrorstxtEmail} />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <Input
                  type="text"
                  name="txtPhone"
                  placeholder="Số điện thoại"
                  required=""
                  value={txtPhone || ''}
                  onChange={this.onChange}
                  onFocus={this.removeApiError}
                  ref={c => { this.userInput = c }}
                />
                <FormError formErrors={this.state.formErrorstxtPhone} />
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <Input
                  type="date"
                  name="txtDateOfBirth"
                  placeholder="Ngày sinh"
                  value={txtDateOfBirth || ''}
                  onChange={this.onChange}
                />
                <FormError formErrors={this.state.formErrorstxtDateOfBirth} />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <Input
                  type="text"
                  name="txtAddress"
                  value={txtAddress || ''}
                  placeholder="Địa Chỉ"
                  required=""
                  onChange={this.onChange}
                  onFocus={this.removeApiError}
                  ref={c => { this.userInput = c }}
                />
                <FormError formErrors={this.state.formErrorstxtAddress} />
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <select id="Gender" name="txtGender"
                  value={txtGender || ''}
                  onChange={this.onChange}
                  onFocus={this.removeApiError}
                  ref={c => { this.userInput = c }}
                >
                  <option value="">Giới Tính</option>
                  <option value="1">Nam</option>
                  <option value="2">Nữ</option>
                  <option value="0">Khác</option>
                </select>
                <FormError formErrors={this.state.formErrorstxtGender} />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <Input
                  type="password"
                  name="txtPassword"
                  value={txtPassword || ''}
                  placeholder="Mật khẩu"
                  required=""
                  onChange={this.onChange}
                  onFocus={this.removeApiError}
                  ref={c => { this.userInput = c }}
                />
                <FormError formErrors={this.state.formErrorstxtPassword} />
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <Input
                  type="password"
                  name="txtPasswordReset"
                  value={txtPasswordReset || ''}
                  placeholder="Nhập lại Mật khẩu"
                  required=""
                  onChange={this.onChange}
                  onFocus={this.removeApiError}
                  ref={c => { this.userInput = c }}
                />
                <FormError formErrors={this.state.formErrorstxtPasswordReset} />
              </div>
            </div>
            <br /><br />
            <div className="aitssendbuttonw3ls">
              <input type="submit" disabled={!this.state.formValid} value="Đăng kí" />
              <p> Đi đến đăng nhập tài khoản <span>→</span> <Link to="/Login" className="w3_play_icon1">Tại đây</Link></p>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    message: state.auth.message
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onRegister: (user) => {
      dispatch({ type: REGISTER_REQUEST, user })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);