import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PRODUCT } from '../../../Constants/actionType';
import "./ListProducts.css"
import ItemProduct from "./../../Components/ItemProduct/ItemProduct"
import Header from './../../Components/Header/Header'
import Footer from './../../Components/Footer/Footer'

class ListProducts extends Component {
    componentDidMount() {
        this.props.onProduct();
    }
    render() {
        var { products } = this.props;
        return (
            <div>
                <Header />
                <div className="doctors">
                    <div className="doctors_image"><img src="images/doctors.jpg" alt="" /></div>
                    <div className="container">
                        <div className="row">
                            <div className="col text-center">
                                <div className="section_title">Thế giới trà sữa OMS</div>
                                <div className="section_subtitle">Bạn có biết</div>
                            </div>
                        </div>
                        {products.length > 0 ?
                            <div className="row doctors_row">
                                {
                                    products ?
                                        products.map((product, index) => {
                                            return (
                                                <ItemProduct key={index} product={product} />
                                            )
                                        }
                                        ) : ''
                                }
                            </div> :
                            <div>
                                <h1 id="product">Không có sản phẩm nào</h1>
                            </div>
                        }
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        products: state.products.products
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onProduct: () => {
            dispatch({ type: PRODUCT })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListProducts);
