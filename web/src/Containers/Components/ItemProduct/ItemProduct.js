import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import "./ItemProduct.css"
import ShoppingCart from '../../../helpers/Cart'


export default class ItemProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedSize: {},
            quantity: 1,
        }
    }

    componentWillMount() {
        const { sizes } = this.props.product;
        this.setState({
            selectedSize: sizes[0]
        })
    }

    handleChangeSize = (e) => {
        let { sizes } = this.props.product;
        let selectedSize = sizes.filter(size => {
            return size.productSizeId === e.target.value
        })[0]
        this.setState({ selectedSize })
    }

    handleChangeQuantity = (e) => {
        this.setState({
            quantity: parseInt(e.target.value)
        })
    }

    handleAddToCart = (e) => {
        e.preventDefault()
        const { id, name, image } = this.props.product
        const { selectedSize, quantity } = this.state
        const item = { id, name, image, selectedSizeId: selectedSize.productSizeId, sizeName: selectedSize.sizeName, price: selectedSize.price, quantity }
        ShoppingCart.addItem(item)
    }

    render() {
        const { selectedSize, quantity } = this.state;
        const { product } = this.props;
        return (
            <div className="col-xl-3 col-md-6">
                <div className="doctor">
                    <div className="doctor_image" name="imageProduct"><img src={product.image} alt="" /></div>
                    <div className="doctor_content">
                        <div className="doctor_name" name="nameProduct"><a href={`#${product.name}`}>{product.name}</a></div>
                        <div className="doctor_price">{selectedSize.price}<sup>đ</sup></div>
                        <div className="doctor_title">{product.category.name}</div>
                        <div className="input">
                            <Form.Control as="select" name="selectedSize" defaultValue={selectedSize.productSizeId} onChange={this.handleChangeSize} className="form_Control">
                                {
                                    product.sizes.map((size, index) => {
                                        return (
                                            <option value={size.productSizeId} key={index}>{size.sizeName}</option>
                                        )
                                    })
                                }
                            </Form.Control>
                            <input className="form-control form_input" type="number" min="1" defaultValue={quantity} onChange={this.handleChangeQuantity} placeholder="Số lượng"></input>
                        </div>
                        <center>
                            <div className="button info_button button-detail"><a href="/login" onClick={this.handleAddToCart}><span>Thêm giỏ hàng</span><span>Thêm giỏ hàng</span></a></div>
                        </center>
                    </div>
                </div>
            </div>
        )
    }
}