import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import { Empty } from 'antd';
import { confirmDelete } from '../../utils/confirmer';
import { connect } from 'react-redux';
import * as Types from '../../constants/user.actiontypes';
import Moment from 'react-moment';
import UserAddForm from './UserForm/UserAddForm';
import { Button } from 'reactstrap';

class UserList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      dateOfBirth: '',
      email: '',
      phoneNumber: '',
      joinDate: '',
      roles: ''
    };
  }

  componentDidMount(){
    this.props.fetchUsers();
    let { id, name, dateOfBirth, email, phoneNumber, joinDate, roles } = this.props.users;
    this.setState({
      id,
      name,
      dateOfBirth,
      email,
      phoneNumber,
      joinDate,
      roles
    })
  }

  onDelete = (id) => {
    confirmDelete().then((result) => {
      if (result.value) {
        this.props.onDeleteUser(id)
      }
    })
  }


  render() {
    const { fetched, error, message, users } = this.props.users;
    return (
      <>
        <UserAddForm />
        <div className="panel panel-default">
          <div className="panel-heading" style={{height: '55px'}}>
            <h3 className="panel-title" style={{paddingTop: '5px'}}>User List</h3>
          </div>
          <div className="panel-body">
            {error ?
                <div>An error occur: {message}</div> : (fetched ?
                  <table className="table table-bordered">
                      <thead>
                          <tr>
                              <th>#</th>
                              <th>Name</th>
                              <th>DoB</th>
                              <th>Email</th>
                              <th>Phone Number</th>
                              <th>Joined Date</th>
                              <th>Role</th>
                              <th>Actions</th>
                          </tr>
                      </thead>
                      <tbody>
                        {(users.length > 0 ? users.map((user, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td><Moment format="DD/MM/YYYY">{user.dateOfBirth}</Moment></td>
                            <td>{user.email}</td>
                            <td>{user.phoneNumber}</td>
                            <td><Moment format="DD/MM/YYYY">{user.joinDate}</Moment></td>
                            <td>{user.roles.map(data => data.name)}</td>
                            <td className="text-center">
                              <Button color="danger" onClick={() => this.onDelete(user.id)}><i className="fa fa-trash-o"></i></Button> &nbsp;
                            </td>
                          </tr>
                        )) :
                          <tr>
                            <td colSpan="6" className="text-center">
                              <Empty/>
                            </td>
                          </tr>
                        )}
                      </tbody>
                  </table> : <div className="text-center"><Spinner color="primary" /></div>
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => {
      dispatch({ type: Types.FETCH_USERS })
    },
    onDeleteUser: (id) => {
      dispatch({ type: Types.DELETE_USER, id})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
