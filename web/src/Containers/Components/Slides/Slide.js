import React, { Component } from 'react'
import './Slide.css'
import { Carousel } from 'react-bootstrap';

export default class Slide extends Component {
    render() {
        return (
            <div className="home_container">
                <div className="row">
                    <div className="col">
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="http://gongcha.com.vn/wp-content/uploads/2019/06/ECO-cover-web-03.jpg"
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="http://gongcha.com.vn/wp-content/uploads/2019/05/MT-cover.jpg"
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
            </div>
        )
    }
}
