import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./SlidebarProduct.css"
import Flickity from 'react-flickity-component'

const flickityOptions = {
    initialIndex: 2
}
class SlidebarProduct extends Component {
    render() {
        return (
            <div className="departments">
                <div className="container">
                    <div className="row">
                        <div className="col text-center">
                            <div className="section_title">Thế giới trà sữa đang chờ bạn</div>
                            <div className="section_subtitle">Bạn có biết</div>
                            <center>
                                <div className="button info_button button_slide"><Link to="/Products" ><span>Click vào đây ngay</span><span>Click vào đây ngay</span></Link></div>
                            </center>
                        </div>
                    </div>
                    <div className="row dept_row">
                        <div className="col">
                            <div className="dept_slider_container_outer">
                                <div className="dept_slider_container">
                                    <Flickity
                                        elementType={'div'} // default 'div'
                                        options={flickityOptions} // takes flickity options {}
                                        disableImagesLoaded={false} // default false
                                        reloadOnUpdate // default false
                                        static // default false
                                    >
                                        <img className="imageSlide" src="http://gongcha.com.vn/wp-content/uploads/2019/04/TS-Dong-Phuong-My-Nhan-1.png" alt="" />
                                        <img className="imageSlide" src="http://gongcha.com.vn/wp-content/uploads/2019/06/Oolong-Long-Nhan.png" alt="" />
                                        <img className="imageSlide" src="http://gongcha.com.vn/wp-content/uploads/2019/04/TS-Dong-Phuong-My-Nhan-1.png" alt="" />
                                        <img className="imageSlide" src="http://gongcha.com.vn/wp-content/uploads/2019/06/Sua-Tuoi-Long-Nhan.png" alt="" />
                                        <img className="imageSlide" src="http://gongcha.com.vn/wp-content/uploads/2019/06/Oolong-Long-Nhan.png" alt="" />
                                    </Flickity>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default SlidebarProduct;