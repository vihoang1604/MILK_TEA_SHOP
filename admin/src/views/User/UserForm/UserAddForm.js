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
import { INIT_PASSWORD } from '../../../constants/common';
import { FETCH_ROLES } from "../../../constants/role.actiontypes";

class UserAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      roleId: "",
      dateOfBirth: new Date(),
      gender: "",
      email: "",
      address: "",
      phone: "",
      roles: [],
      password: "",
      collapse: false
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount(){
    this.props.onFetchRoles();
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
    var { name, dateOfBirth, gender, email, address, phone, roleId } = this.state;
    e.preventDefault();
    var user = {
      name: name,
      dateOfBirth: dateOfBirth.toISOString(),
      gender: gender,
      email: email,
      address: address,
      phoneNumber: phone,
      roleIds: [roleId],
      password: INIT_PASSWORD,
    };
    this.props.onAddUser(user);
    this.toggle();
  };

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  render() {
    const { name, email, address, phone, gender, roleId } = this.state;
    const { roles } = this.props.data;
    return (
      <>
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
                    <Form onSubmit={this.onSave}>
                        <Row>
                            <Col xs="6">
                              <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                  type="text"
                                  name="name"
                                  placeholder="Name ..."
                                  value = { name || '' }
                                  onChange = {this.onChange}
                                  required
                                />
                              </FormGroup>

                              <FormGroup>
                                <Row>
                                  <Col xs='4'>
                                    <Label for="dateOfBirth">Date of Birth</Label>
                                    <br></br>
                                    <DatePicker
                                      className="form-control"
                                      name="dateOfBirth"
                                      selected={ this.state.dateOfBirth}
                                      onChange={ this.onChangeDateTime }
                                    />
                                  </Col>
                                  <Col xs='8'>
                                    <Label for="gender">Gender</Label>
                                    <Input type="select" name="gender" defaultValue={ gender || ''} onChange={ this.onChange } required>
                                      <option>Choose Gender</option>
                                      <option value="1" >Male</option>
                                      <option value="2" >Female</option>
                                      <option value="0" >Other</option>
                                    </Input>
                                  </Col>
                                </Row>
                              </FormGroup>
                              <FormGroup>
                                <Label for="address">Address</Label>
                                <Input
                                  type="text"
                                  name="address"
                                  placeholder="Address ..."
                                  value={ address || '' }
                                  onChange= { this.onChange }
                                  required
                                />
                              </FormGroup>
                            </Col>
                            <Col xs="6">
                              <Row>
                                  <Col xs="12">
                                    <FormGroup>
                                      <Label for="role">Role</Label>
                                      <select name="roleId" className="form-control" defaultValue={ roleId } onChange={ this.onChange } required>
                                        <option>Choose Role</option>
                                        { roles.map((data, i) => {
                                          return <option key={i} value={ data.id } >{ data.name }</option>
                                        })}
                                      </select>
                                    </FormGroup>
                                    <FormGroup>
                                      <Row>
                                        <Col xs='6'>
                                          <Label for="email">Email</Label>
                                          <Input
                                            type="email"
                                            name="email"
                                            placeholder="Email ..."
                                            value={ email || ''}
                                            onChange={ this.onChange }
                                          />
                                        </Col>
                                        <Col xs='6'>
                                          <Label for="phone">Phone Number</Label>
                                          <Input
                                            type="number"
                                            name="phone"
                                            placeholder="Phone Number ..."
                                            value={ phone || '' }
                                            onChange={ this.onChange }
                                          />
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
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data : state.roles
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddUser: user => {
      dispatch({ type: ADD_USER, user });
    },
    onFetchRoles: () => {
      dispatch({ type: FETCH_ROLES});
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(UserAddForm);
