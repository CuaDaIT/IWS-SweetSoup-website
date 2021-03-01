import React, {Component} from 'react';
import '../style/comment.css'
import axios from 'axios'

export default class UserReview extends Component{

    constructor(props){
        super(props)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.state={
            soup: {}
        }
    }
    componentDidMount(){
        axios.get('http://localhost:5000/sweetsoup/'+this.props.comment['soup_id'])
        .then(res => {
            this.setState({soup: res.data})
        }).catch((error)=>console.log(error))
    }
    render(){
        const style = {
            height: '100px',
            width: '100px',
            borderRadius: '100%',
            backgroundPosition: 'center',
            backgroundImage: 'url("'+this.state.soup['img1']+'")',
            backgroundSize: 'cover'
        }
        if(this.props.orientation === 'vel'){
            return(
                <div className='comment'>
                    <h3>{this.props.comment['name']}</h3>
                    <p>{this.props.comment['comment']}</p>
                </div>
            )
        }else{
            return(
                <div className='comment-hol'>
                    <div style={style} ></div>
                    <h3>{this.props.comment['name']}</h3>
                    <p>{this.props.comment['comment']}</p>
                </div>
            )
        }
    }
}