import React, { Component } from 'react'
import Header from './../../Components/Header/Header'
import Slide from './../../Components/Slides/Slide'
import Footer from './../../Components/Footer/Footer'
import SlidebarProduct from './../../Components/SlidebarProduct/SlidebarProduct'
export default class HomePage extends Component {
    render() {
        return (
            <>
                <div className="home">
                    <Header />
                    <Slide />
                </div>
                <SlidebarProduct />
                <Footer />
            </>
        )
    }
}
