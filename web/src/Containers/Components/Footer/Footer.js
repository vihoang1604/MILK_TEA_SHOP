import React, { Component } from 'react'
import './Footer.css'
export default class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="copyright">
                    Bản Quyền &copy;
									<script>document.write(new Date().getFullYear());</script> PNV2020 | INTERNSHIP ORIENT <i className="fa fa-heart-o"
                        aria-hidden="true" />
                </div>
            </footer>
        )
    }
}