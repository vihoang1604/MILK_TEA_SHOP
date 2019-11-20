import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FETCH_ORDERS } from '../../../constants/order.actiontypes';
import OrderItem from './OrderItem/OrderItem';
import { Spinner } from 'reactstrap';
import { Empty } from 'antd';
import './OrderList.css';
class OrderList extends Component {

  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    const { fetched, error, message, orders } = this.props.dataOrder;

    return (
      <>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Order List</h3>
          </div>
          <div className="panel-body">
            {error ?
              <div>An error occur: {message}</div> : (fetched ? <div>
                <table className="table table-bordered table-stripped">
                  <thead>
                    <tr height="50">
                      <th>#</th>
                      <th>Order Date</th>
                      <th>Customer</th>
                      <th>Phone</th>
                      <th>Delivery Address</th>
                      <th>Total Quantity</th>
                      <th>Total Price</th>
                      <th>Note</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>

                  </thead>
                  <tbody>
                    {(orders.length > 0 ? orders.map((orders, index) => (
                      <OrderItem
                        key={index}
                        orders={orders}
                        index={index + 1}
                      />
                    )) :
                      <tr>
                        <td colSpan="10" className="text-center">
                          <Empty />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div> : <div className="text-center"><Spinner color="primary" /></div>
              )}
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataOrder: state.orders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: () => {
      dispatch({ type: FETCH_ORDERS })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
