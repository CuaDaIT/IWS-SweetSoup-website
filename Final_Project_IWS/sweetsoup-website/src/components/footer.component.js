import React,{ Component } from "react";
import '../style/app.css'


export default class Footer extends Component{

    render(){
        return(
            <div className='footerpage'>
                    <div className='location'>
                      <h3>Location</h3>
                      <br/>
                      <p>Km 9, Nguyễn Trãi, P. Trung Văn, Q. Nam Từ Liêm, Tp. Hà Nội</p>
                    </div>
                    <div className='contact'>
                      <h3>Follow us on</h3>
                      <div className="footer-social-icons">
                        <ul className="social-icons">
                            <li><a href="https://facebook.com/" className="social-icon"> <i className="fa fa-facebook"></i></a></li>
                            <li><a href="https://twitter.com/" className="social-icon"> <i className="fa fa-twitter"></i></a></li>
                            <li><a href="https://www.instagram.com/" className="social-icon"> <i className="fa fa-instagram"></i></a></li>
                            <li><a href="https://yt.be/" className="social-icon"> <i className="fa fa-youtube"></i></a></li>
                        </ul>
                      </div>
                    </div>
                </div>
        );
    }
}