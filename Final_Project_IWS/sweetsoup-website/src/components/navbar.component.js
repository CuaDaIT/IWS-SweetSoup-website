import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../style/navbar.css'

export default class Navbar extends Component{

    render(){
        return(
        <nav id='navbar' className="navbar navbar-drak bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand"></Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav ">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="navbar-item">
          <Link to="/menu" className="nav-link">Menu</Link>
          </li>
          <li className="navbar-item">
          <Link to="/cart" className="nav-link">Cart</Link>
          </li>
        </ul>
        </div>
      </nav>
      );
    }
}