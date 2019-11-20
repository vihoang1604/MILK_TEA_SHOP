import React, { Component } from 'react'
import "./Contacts.css"
import Header from "./../../Components/Header/Header"
import Footer from "./../../Components/Footer/Footer"
import Map from "./../../Components/Maps/Maps"
export default class Contants extends Component {
    render() {
        return (
            <div className="super_container">
                <div className="home">
                    <Header />
                    <div className="home_container">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="home_content">
                                        <div className="home_title">Liên Hệ</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contact">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 contact_col">
                                <div className="contact_form">
                                    <div className="contact_form_container">
                                        <form action="#" id="contact_form" className="contact_form">
                                            <input type="text" id="contact_input" className="contact_input" placeholder="Họ & Tên" required="required" />
                                            <input type="email" id="contact_email" className="contact_input" placeholder="E-mail của bạn" required="required" />
                                            <input type="text" id="contact_subject" className="contact_input" placeholder="Tiêu đề" required="required" />
                                            <textarea className="contact_input contact_textarea" id="contact_textarea" placeholder="Nôi dung" required="required" />
                                            <button className="contact_button" id="contact_button">Gửi</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 contact_col">
                                <div className="info_form_container">
                                    <div className="info_form_title">Địa Chỉ</div>
                                    <div className="contact_info_list">
                                        <ul>
                                            <h6>Hà Nội </h6>
                                            <li>99 Tô Hiến Thành, TP.Hà Nội</li>
                                        </ul>
                                        <br />
                                        <ul>
                                            <h6>Đà Nẵng </h6>
                                            <li>220 Nguyễn Hữa Thọ, TP.Đà Nẵng</li>
                                        </ul>
                                        <br />
                                        <ul>
                                            <h6>Quy Nhơn </h6>
                                            <li>22 Hùng Vương, TP.Quy Nhơn</li>
                                        </ul>
                                        <br />
                                        <ul>
                                            <h6>Nha Trang </h6>
                                            <li>50 Bá Đạo, TP.Quy Nhơn</li>
                                        </ul>
                                        <br />
                                        <ul>
                                            <h6>Hồ Chí Minh </h6>
                                            <li>113 Thủ Đức, TP.Hồ Chí Minh</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <Map />
                <Footer />
            </div>
        )
    }
}
