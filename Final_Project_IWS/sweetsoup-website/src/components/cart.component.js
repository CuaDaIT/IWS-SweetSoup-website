import React, {Component} from 'react'
import '../style/cart.css'
import Axios from 'axios'

export default class Carts extends Component{

    constructor(props){
        super(props)

        this.componentDidMount = this.componentDidMount.bind(this)
        this.updatePrice = this.updatePrice.bind(this)

        this.state = {
            price: 0,
            order: {}
        }
    }

    deleteNode(e){
        let index = e.currentTarget.parentNode.parentNode.rowIndex
        let a = JSON.parse(localStorage.getItem('goods'))
        a.splice(index-1,1)
        localStorage.setItem('goods',JSON.stringify(a))
        e.currentTarget.parentNode.parentNode.remove()
    }

    componentDidMount(){
        let a = document.querySelectorAll('.price')
        let cost = 0
        a.forEach((b)=>{
            cost += parseFloat(b.innerHTML)
        })
        this.setState({price: cost})
    }

    updatePrice(){
        let a = document.querySelectorAll('.price')
        let cost = 0
        a.forEach((b)=>{
            cost += parseFloat(b.innerHTML)
        })
        document.querySelector('#cost').innerHTML = cost
        document.querySelector('#total').innerHTML = parseInt(document.querySelector('#ship').innerHTML) + parseInt(document.querySelector('#cost').innerHTML)
    }

    submit(){
        let t = true
        let a = document.querySelectorAll('.fill')
        a.forEach(element => {
            if(element.value.length === 0){
                document.querySelector('.warning').classList.add('active')
                document.querySelector('.warning').classList.remove('inactive')
                t = false
            }else{
                document.querySelector('.warning').classList.remove('active')
                document.querySelector('.warning').classList.add('inactive')
            }
        });
        if(t){
            
        let sl = document.querySelectorAll('.number')
        let number = 0
        sl.forEach(e => {
            number += parseInt(e.innerHTML)
        })
        console.log(number)
        let order = {
            'name': a[0].value,
            'phone': a[1].value,
            'email': a[2].value,
            'location': a[3].value,
            'quantity': number,
            'total_price': document.querySelector('#total').innerHTML,
        }
        console.log(order)
        Axios.post('http://localhost:5000/order/add',order)
        .then(res => console.log(res.data))

        localStorage.removeItem('goods')

        window.alert("Success! Moving to home page...")
        window.location.href = '/'
        }else{
            return
        }
    }

    render(){
        let a = new Date().toLocaleString()
        let lst = JSON.parse(localStorage.getItem('goods'))

        return(
            <div className='body-cart'>

                <h2>Cart</h2>
                <p>Posted on {a}</p>
                <div className='all-cart'>
                    <table id='tablecart' className="table table-hover" onChange={this.updatePrice}>
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col"><input type='button' value='Update' onClick={this.updatePrice}></input></th>
                            </tr>
                        </thead>
                        <tbody>
                            {lst.map((soup,index)=>{
                                return <tr key={index}>
                                    <td>{soup['soup']['name']}</td>
                                    <td className='price'>{soup['soup']['price']*soup['quantity']}</td>
                                    <td className='number'>{soup['quantity']}</td>
                                    <td><input type='button' value='delete' onClick={this.deleteNode}></input></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                <div style={{display:'flex',justifyContent: 'space-between'}}>
                    <div style={{width: '60%'}}>
                        <p>Full Name(*)</p>
                        <div className='userInfo' style={{}}>
                            <input className='form-control fill' placeholder='Enter your name'></input>
                        </div>
                        <p>Phone(*)</p>
                        <div className='userInfo' style={{}}>
                            <input className='form-control fill' placeholder='Enter your phone'></input>
                        </div>
                        <p>Email(*)</p>
                        <div className='userInfo' style={{}}>
                            <input className='form-control fill' placeholder='Enter your email'></input>
                        </div>
                        <p>Location(*)</p>
                        <div className='userInfo' style={{}}>
                            <input className='form-control fill' placeholder='Enter your location'></input>
                        </div>
                    </div>
                    <div className='payment'>
                        <div className='warning inactive' style={{backgroundColor: 'Red'}}>Please fill all the field with (*)</div>
                        <h3>Payment Info</h3>
                            <div id='infop' style={{display: 'flex', flexFlow: 'row wrap'}}>                                
                                <div className='w30 h50 d'>Cost</div><div className='w70 h50' id='cost'>{this.state.price}</div><br/>
                                <div className='w30 h50 d'>Deliver</div><div className='w70 h50' id='ship'>15000</div><br/>
                                <div className='w30 h50 d'>Total</div><div className='w70 h50' id='total'>{this.state.price+15000}₫</div><br/>
                            </div>
                        <button style={{width: '100%'}} onClick={this.submit}>Pay</button>
                    </div>
                </div>
            </div>
        )
    }
}