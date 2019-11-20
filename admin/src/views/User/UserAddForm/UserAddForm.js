import React, { Component } from "react";
import { connect } from "react-redux";
import { ADD_USER } from "../../../constants/user.actiontypes";
import {
  Collapse,
  Button,
  CardBody,
  Card,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col
} from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./UserAddForm.css";

class UserAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      dateOfBirth: new Date(),
      gender: "",
      email: "",
      address: "",
      phoneNumber: "",
      roles: ""
    };
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  onChangeDateTime = date => {
    this.setState({
      dateOfBirth: date
    });
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSave = e => {
    var { name, dateOfBirth, gender, email, address, phoneNumber, roles } = this.state;
    e.preventDefault();
    var user = {
      name: name,
      dateOfBirth: dateOfBirth,
      gender: gender,
      email: email,
      address: address,
      phoneNumber: phoneNumber,
      roles: roles
    };
    this.props.onAdUser(user);
  };

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  render() {
    return (
      <div>
        <Button
          color="primary"
          onClick={this.toggle}
          style={{ marginBottom: "1rem" }}
        >
          <i className="fas fa-plus-circle" /> Add New User
        </Button>
        <Collapse isOpen={this.state.collapse}>
          	<Card>
            	<CardBody>
                    <Form>
                        <Row>
                            <Col xs="6">
                              <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text" name="name" placeholder="Name ..." />
                              </FormGroup>

                              <FormGroup>
                                <Row>
                                  <Col xs='4'>
                                    <Label for="dateOfBirth">Date of Birth</Label>
                                    <br></br>
                                    <DatePicker
                                      className="form-control"
                                      name="dateOfBirth"
                                      selected={this.state.dateOfBirth}
                                      onChange={this.onChangeDateTime}
                                    />
                                  </Col>
                                  <Col xs='8'>
                                    <Label for="description">Gender</Label>
                                    <select name="gender" className="form-control" required>
                                        <option value="1" >Male</option>
                                        <option value="2" >Female</option>
                                        <option value="3" >Other</option>
                                    </select>
                                  </Col>
                                </Row>
                              </FormGroup>
                              <FormGroup>
                                <Label for="address">Address</Label>
                                <Input type="text" name="address" placeholder="Address ..." />
                              </FormGroup>
                            </Col>
                            <Col xs="6">
                              <Row>
                                  <Col xs="12">
                                    <FormGroup>
                                      <Label for="role">Role</Label>
                                      <select name="role" className="form-control" required>
                                          <option value="1" >Customer</option>
                                          <option value="2" >Shipper</option>
                                      </select>
                                    </FormGroup>
                                    <FormGroup>
                                      <Row>
                                        <Col xs='6'>
                                          <Label for="email">Email</Label>
                                          <Input type="email" name="email" placeholder="Email ..." />
                                        </Col>
                                        <Col xs='6'>
                                          <Label for="address">Phone Number</Label>
                                          <Input type="number" name="address" placeholder="Phone Number ..." />
                                        </Col>
                                      </Row>
                                    </FormGroup>
                                  </Col>
                                  <Col xs='12' className="mt-20 float-right">
                                    <Button type="submit" color="success">
                                      <i className="fas fa-check-circle" /> Add
                                    </Button>{' '}
                                    <Button color="danger" onClick={this.toggle}>
                                      <i className="fa fa-ban" /> Cancel
                                    </Button>
                                  </Col>
                              </Row>
                            </Col>
                        </Row>
                    </Form>
            	</CardBody>
          	</Card>
        </Collapse>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddUser: user => {
      dispatch({ type: ADD_USER, user });
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(UserAddForm);
