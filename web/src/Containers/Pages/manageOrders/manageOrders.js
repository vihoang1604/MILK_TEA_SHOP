import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import Moment from 'react-moment';
import swal from 'sweetalert';
import Auth from '../../../helpers/Authentication';
import { ORDER } from '../../../Constants/actionType';
import Header from "./../../Components/Header/Header"
import callApi from '../../../Utils/CallAPI';
import "./../Contacts/Contants"
import "./manageOrders.css"

class manageOrders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            status: 4,
            message: ""
        }
    }

    componentDidMount() {
        this.handlesavecancelorder();
        this.props.onOrder();
    }

    checkorderbyuser = (email) => {
        const style = null
        if (Auth.user().Email === email) {
            return style;
        } else {
            const style = 'display-manage-order'
            return style
        }
    }

    handleinputcancelorder = (e) => {
        this.setState({
            message: e.target.value,
        })
    }

    getidorder = (idOrder, e) => {
        this.setState({
            id: idOrder
        })
    }

    handlesavecancelorder = (e) => {
        let { status, id, message } = this.state;
        let order = {
            status,
            message,
        }
        callApi(`orders/${id}`, "PUT", order)
            .then(response => {
                swal({
                    title: 'Hủy thành công',
                    icon: 'success'
                })
            })
            .catch(e => {
                console.log(e);
            })
    }

    render() {
        var { orders } = this.props;
        return (
            <div className="super_container">
                <div className="home">
                    <Header />
                    <div className="home_container">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="home_content">
                                        <h1>Đơn hàng của tôi</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contact ">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 contact_col">
                                {
                                    orders ?
                                        orders.map((order, index) => {
                                            return (
                                                <section key={index} className={`${this.checkorderbyuser(order.customer.email)}`}>
                                                    <table className="table table-light">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">#</th>
                                                                <th scope="col">Ngày đặt hàng: <Moment format="DD/MM/YYYY HH:mm">{order.orderDate}</Moment><br />Địa chỉ: {order.deliveryAddress}</th>
                                                                <th scope="col">Tình trạng: {order.status === 1 ? "Chờ xác nhận" : order.status === 2 ? "Chờ ship" : order.status === 3 ? "Đã nhận" : order.status === 4 ? "Đã hủy" : order.status === 5 ? "Từ chối" : "Lỗi"}</th>
                                                                {(order.status === 4 || order.status === 5) ? <th scope="col" colSpan="2" >Lý do: {order.message === "" ? "không có ghi chú nào" : order.message}</th> : <th />}
                                                                <th scope="col">Tổng giá đơn hàng: {order.totalPrice}</th>
                                                                <th scope="col"><span data-toggle="modal" onClick={(e) => this.getidorder(order.id, e)} data-target="#exampleModal"  >{order.status === 1 ? <button type="button" className="btn btn-dark">Hủy</button> : order.status === 2 || order.status === 3 || order.status === 4 || order.status === 5 ? "" : ""}</span></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                order.orderDetails.map((item, i) => {
                                                                    return (
                                                                        <>
                                                                            <tr key={i}>
                                                                                <td ><img className="imaga-manage-order" src={item.productImage} alt="" /></td>
                                                                                <td>{item.productName}</td>
                                                                                <td>Size: {item.sizeName}</td>
                                                                                <td>Giá: {item.price}</td>
                                                                                <td>SL: {item.quantity}</td>
                                                                                <td>Tổng: {item.totalPrice}</td>
                                                                            </tr>
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                    <hr />
                                                </section>
                                            )
                                        }
                                        ) : <Redirect to="/Products" />
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Nhập lý do</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <input onChange={this.handleinputcancelorder} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Lý do..." />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handlesavecancelorder}>Gửi</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        orders: state.orders.orders
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onOrder: () => {
            dispatch({ type: ORDER })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(manageOrders);
