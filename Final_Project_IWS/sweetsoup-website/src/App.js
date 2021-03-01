import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from './components/navbar.component'
import Home from './components/home.component'
import Menu from './components/menu.component'
import Footer from './components/footer.component'
import Soup from './components/soup.component'
import Carts from './components/cart.component';

function App() {
  return (
    <Router>
      <NavBar />
      <Route path="/" exact component={Home} />
      <Route path='/menu' exact component={Menu} />
      <Route path='/menu/:id' exact render={(props)=><Soup {...props}/>} />
      <Route path='/cart' exact component={Carts}/>
      <Footer/>
    </Router>
  );
}

export default App;
