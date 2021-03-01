import React, {Component} from 'react';
import '../style/home.css'
import SoupCards from './soupcards.component'
import UserReview from './userR.component'
import axios from 'axios'

export default class Home extends Component{

    constructor(props){
        super(props)

        this.state = {
            soups: [],
            comment: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/sweetsoup/')
        .then(response=>{
            this.setState({soups: response.data})
        }).catch((error)=>{
            console.log(error)
        })
        axios.get('http://localhost:5000/comment/')
        .then(response => {
            this.setState({comment: response.data})
        }).catch((error)=>{
            console.log(error)
        })
    }

    render(){
        if(localStorage.getItem('goods')===null){
            localStorage.setItem('goods', JSON.stringify([]))
        }

        function loadHot(arr){
            let limit = arr.length
            let hot = []
            if(limit > 4){
                limit = 4;
            }
            for(let i= 0; i<limit ;i++){
                hot.push(arr[i])
            }
            return hot
        }

        function loadcmt(arr){
            let limit = arr.length
            let hot = []
            if(limit > 4){
                limit = 4;
            }
            for(let i= 0; i<limit ;i++){
                hot.push(arr[i])
            }
            return hot
        }

        return(
            <div>
                <div className='header'>
                    <div className="header-img"></div>
                    <div id='title'>
                        <h1>Soup's Ba Tun</h1>
                        <p>Discover and order some of the best sweetsoup-handmade in VietNam</p>
                        <div id='searchbox'>
                            <input className='form-control' type='Text' placeholder='Enter soup name...'></input><button id='btn_search' className='form-control'>Search</button>
                        </div>
                    </div>
                </div>
                <div className='foodShow'>
                    <h2>Best Seller</h2>
                    <div className='containner'>{loadHot(this.state.soups).map((soup)=>{
                        return <SoupCards orientation='vel' soup={soup}/>
                    })}</div>
                </div>
                <div className='news'>
                    <h2>User Review</h2>
                    <div className='container-review'>{loadcmt(this.state.comment).map(function(comment){
                                return <UserReview comment={comment}/>
                            })}</div>
                </div>
                <h2 style={{marginTop: '20px'}}>Gallery</h2>
                <div className='gallery'>
                    {this.state.soups.map(function(soup){
                        return <div className='gallery-img' style={{backgroundImage: 'url("'+soup['img2']+'")'}}/>
                    })}
                </div>
            </div>
        )
    }
}