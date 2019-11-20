import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form ,td} from 'reactstrap';
import Moment from 'react-moment';
import './OrderIterm.css';
import * as Types from '../../../../constants/order.actiontypes';
import DismissCheckbox from './DismissReason/DismissCheckbox';
import DismissList from './DismissReason/DismissList';

class OrderItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalDetailPtoduct: false,
      modalDismiss: false,
      orderId: '',
      status: '',
      isOther: false,
      otherMessage: '',
      reasonList: [...DismissCheckbox]
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleDetailPtoduct = this.toggleDetailPtoduct.bind(this);
    this.toggleDismiss = this.toggleDismiss.bind(this);
  }

  handleChange(e, item, index) {
    const isChecked = e.target.checked;
    let cpReasons = [...this.state.reasonList];
    cpReasons[index].checked = isChecked;
    this.setState({ reasonList: cpReasons });

    if (item.key === 'other' && isChecked) {
      this.setState({ isOther: true });
    }else {
      this.setState({ isOther: false });
    }
  }

  toggleDetailPtoduct() {
    this.setState(prevState => ({
      modalDetailPtoduct: !prevState.modalDetailPtoduct
    }));
  }

  toggleDismiss() {
    this.setState(prevState => ({
      modalDismiss: !prevState.modalDismiss
    }));
  }

  onConfirm = async (e) => {
    e.preventDefault()
    await this.setState({
      orderId: this.props.orders.id,
      status: '2'
    }, () => console.log(this.state));
    let orderId = this.state.orderId;
    let status = this.state.status;
    console.log(orderId, status);
    const dataConfirm = {
      id: orderId,
      status: status
    }
    this.props.onUpdateStatusOrderConfirm(dataConfirm);
  }

  onDismiss = async (e) => {
    const { reasonList, otherMessage } = this.state;
    let message = '';
    message = reasonList.filter(x => x.checked && x.key !== 'other').map(item => item.label).join(', ');
    message = otherMessage ? message + `,${otherMessage}` : message;
    e.preventDefault()
    await this.setState({
      orderId: this.props.orders.id,
      status: '5',
      message: message
    }, () => console.log(this.state));
    let orderId = this.state.orderId;
    let status = this.state.status;
    message = this.state.message;

    const dataDismiss = {
      id: orderId,
      status: status,
      message: message
    }
    this.props.onUpdateStatusOrderCancel(dataDismiss);
  }

  render() {
    const { customer, orderDate, orderDetails, totalPrice, status, totalQuantity, deliveryAddress, note } = this.props.orders;
    const { index } = this.props;
    const { otherMessage, reasonList, isOther } = this.state;

    var OrderStatus = {
      WaitingForConfirmation: 1,
      WaitingForShipping: 2,
      Received: 3,
      Canceled: 4,
      Refused:5,
      properties: {
        1: { name: "Not Confirm", value: 1 },
        2: { name: "Confirmed", value: 2 },
        3: { name: "Received", value: 3 },
        4: { name: "Canceled", value: 4 },
        5: { name: "Refused", value: 5 }

      }
    };
    let mainStatus = "";
    let button = '';
    var WaitingForConfirmation = OrderStatus.WaitingForConfirmation;
    var WaitingForShipping = OrderStatus.WaitingForShipping;
    var Canceled = OrderStatus.Canceled;
    var Received = OrderStatus.Received;
    var Refused = OrderStatus.Refused;

    var color=''
    switch (status) {
      case OrderStatus.properties[WaitingForConfirmation].value: {
        mainStatus = OrderStatus.properties[WaitingForConfirmation].name;
        button = '';
        color='danger'
        break;
      } case OrderStatus.properties[WaitingForShipping].value: {
        mainStatus = OrderStatus.properties[WaitingForShipping].name;
        button = 'none';
        break;

      } case OrderStatus.properties[Canceled].value: {
        mainStatus = OrderStatus.properties[Canceled].name;
        button = 'none';
        break;
      }
      case OrderStatus.properties[Received].value: {
        mainStatus = OrderStatus.properties[Received].name;
        button = 'none';
        break;
      }
      case OrderStatus.properties[Refused].value: {
        mainStatus = OrderStatus.properties[Refused].name;
        button = 'none';
        break;
      }
      default: mainStatus = '';
    }
    return (
      <tr>
        <td>{index}</td>
        <td>
          <Moment format="YYYY/MM/DD HH:mm">
            {orderDate}
          </Moment>
        </td>
        <td>{customer.name}</td>
        <td>{customer.phoneNumber}</td>
        <td>{deliveryAddress}</td>
        <td>{totalQuantity}</td>
        <td>{totalPrice}</td>
        <td>{note}</td>
        <td color={color}>{mainStatus}</td>
        <td>
          <Button color="danger" onClick={this.toggleDetailPtoduct}>View Details</Button>
          <Modal isOpen={this.state.modalDetailPtoduct} fade={false} toggle={this.toggleDetailPtoduct} >
            <div id="modal">
              <ModalHeader className="header" toggle={this.toggleDetailPtoduct}>Ordered Products </ModalHeader>
              <ModalBody>
                <table className="table table-bordered table-hover" width='700px'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product Name</th>
                      <th>Product Image</th>
                      <th>Product Size</th>
                      <th>Product Price</th>
                      <th>Quantity</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>

                    {orderDetails.map((data, i) => {
                      return <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{data.productName}</td>
                        <td><img width='50px' src={data.productImage} alt={data.productName} /></td>
                        <td>{data.sizeName}</td>
                        <td>{data.price}</td>
                        <td>{data.quantity}</td>
                        <td>{data.totalPrice}</td>
                      </tr>
                    })}
                  </tbody>
                </table>
              </ModalBody>
              <ModalFooter>
                <Form onSubmit={this.onConfirm}>
                  <Button type="submit" className="Confirm" color="primary" onClick={this.toggleDetailPtoduct} style={{ display: button }} >Confirm</Button> {''}
                </Form>
                <Button className="Confirm" color="danger" onClick={this.toggleDismiss} style={{ display: button }} >Dismiss</Button> {''}
                <Modal isOpen={this.state.modalDismiss} fade={false} toggle={this.toggleDismiss} >
                  <div id="modalDismiss">
                    <ModalHeader className="header" toggle={this.toggleDismiss}>What is the dismiss reason?</ModalHeader>
                    <ModalBody>
                      <React.Fragment>
                        {
                          reasonList.map((item, i) => (
                            <p key={item.key}>
                              <label id="Dismisslable" >
                                {item.label}
                                <DismissList name={item.label} checked={item.checked} onChange={(e) => this.handleChange(e, item, i)} />
                              </label>
                            </p>
                          ))
                        }
                      </React.Fragment>
                      {isOther && <p>
                        <label>Reason:</label>
                        <textarea
                          name="otherMessage"
                          id="input"
                          className="form-control"
                          rows="5"
                          required="required"
                          defaultValue={otherMessage}
                          onChange={(e) => this.setState({ otherMessage: e.target.value })}
                        >
                        </textarea>
                      </p>}
                    </ModalBody>
                    <ModalFooter>
                      <Form onSubmit={this.onDismiss}>
                        <Button type="submit" className="Confirm" color="danger">OK</Button> {''}
                      </Form>
                      <Button color="secondary" onClick={this.toggleDismiss}>Close</Button>
                    </ModalFooter>
                  </div>
                </Modal>
                <Button color="warning" onClick={this.toggleDetailPtoduct}>Close</Button>
              </ModalFooter>
            </div>
          </Modal>

        </td>
      </tr>
    )
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onUpdateStatusOrderConfirm: (order) => {
      dispatch({ type: Types.UPDATE_STATUS_ORDER_CONFIRM, order })
    },
    onUpdateStatusOrderCancel: (order) => {
      dispatch({ type: Types.UPDATE_STATUS_ORDER_CANCEL, order })
    }
  }
}
export default connect(null, mapDispatchToProps)(OrderItem);

