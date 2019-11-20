import React, { Component } from 'react'
import logo from './../../../Assets/image/logo/logo.png'
import iconCart from "./../../../Assets/image/icon/cart.png"
import "./Header.css"
import Auth from '../../../helpers/Authentication';
import { Link } from "react-router-dom";
import { SEARCH } from './../../../Constants/actionType';
import { connect } from 'react-redux';
import ShoppingCart from '../../../helpers/Cart';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtSearch: '',
        };
    }

    handleLogout = () => {
        Auth.logout()
    }

    onChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    }

    onSearch = (e) => {
        e.preventDefault();
        const { txtSearch } = this.state;
        var product = txtSearch;
        this.props.onSearchProduct(product);
    }

    render() {
        const { txtSearch } = this.state;
        return (
            <header className="header">
                <div>
                    <div className="header_top">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="header_top_content d-flex flex-row align-items-center justify-content-start">
                                        <div className="logo">
                                            <a href="/"><img src={logo} alt="logo" /></a>
                                        </div>
                                        <div className="header_top_extra d-flex flex-row align-items-center justify-content-start ml-auto">
                                            <div className="header_top_nav">
                                                <ul className="d-flex flex-row align-items-center justify-content-start">
                                                    {Auth.check() ?
                                                        <>
                                                            <li><Link to="/">{Auth.user().Name}</Link></li>
                                                            <li><Link to="/manageOrders">Quản lý đơn hàng</Link></li>
                                                            <li><a onClick={this.handleLogout} href="/">Đăng xuất</a></li>
                                                            <li><a href="/Cart"><img src={iconCart} alt="" />{ShoppingCart.count() || ""}</a></li>
                                                        </> :
                                                        <>
                                                            <li><Link to="/login">Đăng Nhập</Link></li>
                                                            <li><Link to="/registration">Đăng Ký</Link></li>
                                                        </>}
                                                </ul>
                                                <span className="oi oi-cart"></span>
                                            </div>
                                        </div>
                                        <div className="hamburger ml-auto"><i className="fa fa-bars" aria-hidden="true"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="header_nav" id="header_nav_pin">
                        <div className="header_nav_inner">
                            <div className="header_nav_container">
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="header_nav_content d-flex flex-row align-items-center justify-content-start">
                                                <nav className="main_nav">
                                                    <ul className="d-flex flex-row align-items-center justify-content-start">
                                                        <li className="active"><Link to="/">Trang Chủ</Link></li>
                                                        <li><Link to="/Products">Trà Sữa</Link></li>
                                                        <li><a href="/">Tin Tức</a></li>
                                                        <li><Link to="/Contacts">Liên Hệ</Link></li>
                                                    </ul>
                                                </nav>
                                                <div className="search_content d-flex flex-row align-items-center justify-content-end ml-auto">
                                                    <form action="#" id="search_container_form" className="search_container_form" onSubmit={this.onSearch}>
                                                        <input
                                                            type="text"
                                                            className="search_container_input"
                                                            name="txtSearch"
                                                            placeholder="Tìm Kiếm"
                                                            value={txtSearch}
                                                            onChange={this.onChange}
                                                        />
                                                        <button className="search_container_button"><i className="fa fa-search" aria-hidden="true"></i></button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSearchProduct: (product) => {
            dispatch({ type: SEARCH, product })
        },
    }
};

export default connect(null, mapDispatchToProps)(Header);