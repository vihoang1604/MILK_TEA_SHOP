import React, { Component } from 'react'
import "./Cart.css"
import Header from "./../../Components/Header/Header"
import { Table } from 'react-bootstrap'
import { Link } from "react-router-dom"
import ShoppingCart from '../../../helpers/Cart'
import Auth from '../../../helpers/Authentication'
import { Redirect } from 'react-router-dom'
export default class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        this.setState({
            products: ShoppingCart.getProductsInCart()
        })
    }

    removeItem = (productSizeId, e) => {
        e.preventDefault()
        ShoppingCart.removeItem(productSizeId)
        this.setState({ products: ShoppingCart.getProductsInCart() })
    }

    render() {
        if(!Auth.check()) {
            return < Redirect to="/"/>
        }
        let { products } = this.state;
        return (
            <div>
                <Header />
                <div className="departments">
                    <div className="container">
                        <div className="row">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Hình ảnh</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Size</th>
                                        <th>Số lượng</th>
                                        <th>Tổng Giá</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (products.length ? products.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td><img className="imagacart" src={item.image} alt="" /></td>
                                                    <td>{item.name}</td>
                                                    <td>{item.sizeName}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.price * item.quantity}<sup>đ</sup></td>
                                                    <td><a href="/delete" onClick={(e) => this.removeItem(item.selectedSizeId, e)} >| Xóa</a></td>
                                                </tr>
                                            )
                                        }) : <tr><td className="text-center" colSpan="7">Giỏ hàng trống</td></tr>)
                                    }
                                </tbody>
                            </Table>
                            {products.length ? <div className="button info_button button_pay"><Link to="/Order"><span>Đặt Hàng</span><span>Đặt Hàng</span></Link></div> : <div className="button info_button button_pay"><Link to="/products"><span>Mua Hàng</span><span>Mua Hàng</span></Link></div>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
