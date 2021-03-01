import React, {Component} from 'react'
import '../style/soup.css'
// import SoupCards from './soupcards.component'
import { Link } from 'react-router-dom'
import UserReview from './userR.component'
import axios from 'axios'

export default class Soup extends Component{
    constructor(props){
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
        this.changeBlack = this.changeBlack.bind(this)
        this.changeBlue = this.changeBlue.bind(this)
        this.submit = this.submit.bind(this)

        this.state = {
            lsoups: [],
            comment: [],
            soup: {}
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/sweetsoup/')
        .then(response=>{
            this.setState({lsoups: response.data})
        }).catch((error)=>{
            console.log(error)
        })
        axios.get('http://localhost:5000/comment/'+this.props.match.params.id)
        .then(response => {
            this.setState({comment: response.data})
        }).catch((error)=>{
            console.log(error)
        })
        axios.get('http://localhost:5000/sweetsoup/'+this.props.match.params.id)
        .then(response=>{
            this.setState({soup: response.data})
        }).catch((error)=>{
            console.log(error)
        })
    }

    
    onSubmit(){
        let a = document.querySelector('#quantity').value;
        if(a!=='0'){
            document.querySelector('#toCart').classList.add('active')
            document.querySelector('#toCart').classList.remove('inactive')
            document.querySelector('#red').classList.add('inactive')
            document.querySelector('#red').classList.remove('active')
        }else{
            document.querySelector('#red').classList.add('active')
            document.querySelector('#red').classList.remove('inactive')
            return
        }
        let item = {
            'soup': this.state.soup,
            'quantity': a
        }
        let s = JSON.parse(localStorage.getItem('goods'))
        if(s.length===0){
            s.push(item)
        }else{
            s.forEach(element => {
                if(element['soup']['name']===this.state.soup['name']){
                    element['quantity'] = parseInt(element['quantity']) + parseInt(a)
                }else{
                    s.push(item)
                    console.log('a')
                }
            });
        }
        localStorage.setItem('goods',JSON.stringify(s))           
    }

    changeBlack(){
        document.querySelector('.big').style.backgroundImage = 'url("'+this.state.soup['img2']+'")';
    }
    
    changeBlue(){
        document.querySelector('.big').style.backgroundImage = 'url("'+this.state.soup['img1']+'")'; 
    }

    submit(){
        let name = document.querySelector('#name').value
        let email = document.querySelector('#email').value
        let comt = document.querySelector('#comment').value
        if(name.length === 0||email.length===0||comt.length===0){
            document.querySelector('#ss').style.display = 'block'
            return
        }else{
            document.querySelector('#ss').style.display = 'none'
        }
        let comment = {
            'soup_id': this.state.soup['_id'],
            'name': name,
            'email': email,
            'comment': comt,
        }

        axios.post('http://localhost:5000/comment/add',comment)
        .then(res => console.log(res.data))

        window.location.href = '/menu/'+this.state.soup['_id']
    }


    render(){
        function activeDes(e) {
            document.querySelector('.b').style.borderBottom = '1px solid green'
            document.querySelector('.a').style.borderBottom = 'none'
            document.querySelector('.des').classList.remove('inactive')
            document.querySelector('.des').classList.add('active')
            document.querySelector('.rating').classList.remove('active')
            document.querySelector('.rating').classList.add('inactive')
        } 

        function activeRating(e) {
            document.querySelector('.a').style.borderBottom = '1px solid green'
            document.querySelector('.b').style.borderBottom = 'white'
            document.querySelector('.rating').classList.remove('inactive')
            document.querySelector('.rating').classList.add('active')
            document.querySelector('.des').classList.remove('active')
            document.querySelector('.des').classList.add('inactive')
        }

        // function loadHot(arr){
        //     let limit = arr.length
        //     let hot = []
        //     if(limit > 4){
        //         limit = 4;
        //     }
        //     for(let i= 0; i<limit ;i++){
        //         hot.push(arr[i])
        //     }
        //     return hot
        // }
        return(
            <div className='body'>
                {/* <div className='bestSeller'><h2 style={{textAlign: 'start'}}>Hot Deal</h2>
                {loadHot(this.state.lsoups).map((soup)=>{
                    return <SoupCards soup={soup}/>
                })}</div> */}
                <div className='product'>
                    <div id='toCart' className='inactive'>Added!<button><Link to='/cart'>View Cart</Link></button>
                    </div>
                    <div className='order'>
                        <div className='image'>
                            <div className='big' style={{backgroundImage: 'url('+this.state.soup['img1']+')'}}></div>
                            <div className='small'>
                                <div id='a' onClick={this.changeBlue} style={{backgroundImage: 'url("'+this.state.soup['img1']+'")'}}></div>
                                <div id='b' onClick={this.changeBlack} style={{backgroundImage: 'url("'+this.state.soup['img2']+'")'}}></div>
                            </div>
                        </div>
                        <div className='order-info'>
                            <h2>{this.state.soup['name']}</h2>
                            <h3>{this.state.soup['price']}₫</h3>
                            <br/><p id='red' className='inactive' style={{backgroundColor: 'Red'}}>Please choose the number of product before adding cart</p>
                            <div style={{display: 'flex'}}>
                                <input id='quantity' className='form-control' style={{textAlign: 'center'}} type='Number' min='0' defaultValue='0'></input>
                                <button id='btn' className='form-control' style={{backgroundColor: 'green', color: 'white'}} type='submit' onClick={this.onSubmit}>Order</button>
                            </div>
                        </div>
                    </div>
                    <div className='info'>
                        <ul>
                            <li className='form-control a'  onClick={activeDes}>Description
                            </li>
                            <li className='form-control b' style={{borderBottom: '1px solid green'}} onClick={activeRating}>User Comment
                            </li>
                        </ul>
                                
                        <div className='des active'>
                            <h2>Description</h2>
                            <br/>
                            <p>{this.state.soup['description']}</p>
                            <br/>
                            <img src={this.state.soup['img2']} alt='referend'/>
                        </div>
                        <div className='rating inactive'>
                            <h2>Comment</h2>
                            {this.state.comment.map(function(comment){
                                return <UserReview orientation='vel' comment={comment}/>
                            })}
                            <h3 style={{marginTop: '20px', fontSize: '1.3em'}}>Add your comment</h3>
                            <div>
                                <p id='ss' style={{backgroundColor:'red',color:'white',display:'none'}}>Please fill to all require fiels(*)</p>
                                <p>Name(*)</p>
                                <input id="name" className='form-control'></input>
                                <p>Email(*)</p>
                                <input id='email' className='form-control'></input>
                                <p>Comment(*)</p>
                                <input id='comment' className='form-control'></input>
                                <button className='form-control' type='submit' onClick={this.submit} style={{backgroundColor: 'Green', color: 'white', marginTop: '20px'}}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}