import React, { Component } from 'react'
import "./Order.css"
import { Button, ButtonToolbar, InputGroup, FormControl } from 'react-bootstrap'
import Header from "./../../Components/Header/Header"
import "./../Contacts/Contants"
import Auth from '../../../helpers/Authentication'
import callApi from '../../../Utils/CallAPI'
import ShoppingCart from '../../../helpers/Cart'
import { ToastSuccess, ToastWarning } from '../../../Utils/Toastify'
import { Redirect } from 'react-router-dom'


export default class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusClass: 'dislay-address',
            note: "",
            deliveryAddress: "",
            shipFee: 10000,
            products: []
        }
    }

    changeStyleAdress = () => {
        this.setState({
            statusClass: ''
        })
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        this.setState({
            deliveryAddress: Auth.user().Address,
            products: ShoppingCart.getProductsInCart()
        })
    }

    handleBooking = (e) => {
        e.preventDefault();
        let { deliveryAddress, note, products } = this.state;
        let order = {
            userId: Auth.user().UserId,
            deliveryAddress,
            note,
            orderDetails: products.map(item => {
                return {
                    productSizeId: item.selectedSizeId,
                    quantity: item.quantity,
                    price: item.price
                }
            })
        }
        console.log(order);
        if (Auth.check()) {
            callApi("orders", "POST", order)
                .then(response => {
                    ShoppingCart.remove()
                    ToastSuccess("Đặt hàng thành công!")
                    setTimeout(() => {
                        window.location.replace("/manageOrders")
                    }, 1000)
                })
                .catch(e => {
                    ToastWarning(e.message)
                })
        } else {
            ToastWarning("Vui lòng đăng nhập để tiếp tục!")
        }
    }

    render() {
        const { products, statusClass, shipFee, note, deliveryAddress } = this.state
        return (
            <div className="super_container">
                <div className="header">
                    <Header />
                </div>
                <div className="order-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 contact_col">
                                <div className="contact_form">
                                    <div className="contact_form_container">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Hình ảnh</th>
                                                    <th scope="col">Tên sản phẩm</th>
                                                    <th scope="col">Số lượng</th>
                                                    <th scope="col">Giá</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {products.length ? products.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td><img className="imaga-order" src={item.image} alt="" /></td>
                                                            <td>{item.name}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>{item.price * item.quantity}</td>
                                                        </tr>
                                                    )
                                                }) : <tr><td className="text-center" colSpan="7">Giỏ hàng trống</td></tr>}
                                            </tbody>
                                        </table>
                                        <input type="text" name="note" className="contact_input" placeholder="Ghi chú" onChange={this.handleInputChange} defaultValue={note} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 note_col">
                                <div className="info_form_container">
                                    <div className="info_form_title">CHI TIẾT ĐƠN HÀNG</div>
                                    <div className="contact_info_list">
                                        <ul>
                                            <li>Họ và tên: {Auth.user().Name}</li>
                                            <li>Địa chỉ: {Auth.user().Address}<span onClick={this.changeStyleAdress} > | Thay đổi</span></li>
                                            <li className={`${statusClass}`}><div className="input-group mb-3">
                                                <InputGroup className="mb-3 vorch_input">
                                                    <FormControl
                                                        name="deliveryAddress"
                                                        defaultValue={deliveryAddress}
                                                        placeholder="Thay đổi địa chỉ"
                                                        aria-label="Thay đổi địa chỉ"
                                                        aria-describedby="basic-addon2"
                                                        onChange={this.handleInputChange}
                                                    />
                                                </InputGroup>
                                            </div></li>
                                            <li>Số điện thoại: {Auth.user().PhoneNumber}</li>
                                            <li>Email: {Auth.user().Email}</li>
                                            <hr />
                                            <li>Phí giao hàng: {shipFee}<sup>đ</sup></li>
                                            <li><div className="input-group mb-3">
                                                <InputGroup className="mb-3 vorch_input">
                                                    <FormControl
                                                        placeholder="Mã giảm giá"
                                                        aria-label="Mã giảm giá"
                                                        aria-describedby="basic-addon2"
                                                    />
                                                    <InputGroup.Append>
                                                        <Button variant="outline-primary">Áp dụng</Button>
                                                    </InputGroup.Append>
                                                </InputGroup>
                                            </div></li>
                                            <li>TỔNG CỘNG: {ShoppingCart.getTotalPrice(shipFee)}<sup>đ</sup></li>
                                        </ul>
                                        <center><ButtonToolbar className="order-button">
                                            {ShoppingCart.count() ? <Button onClick={this.handleBooking} variant="outline-success">Đặt hàng</Button> : <div className="button info_button button_pay"><Redirect to="/products"><span>Mua Hàng</span><span>Mua Hàng</span></Redirect></div>}
                                        </ButtonToolbar>
                                        </center>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}