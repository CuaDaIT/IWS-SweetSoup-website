import React, {Component} from 'react'
import '../style/cardsoup.css'
import { Link } from 'react-router-dom'

export default class SoupCards extends Component{

    render(){
        const style={
            backgroundImage: 'url('+this.props.soup['img1']+')',
            height: '70%',
            width: '100%'
        }

        const style2={
            backgroundImage: 'url('+this.props.soup['img1']+')',
            height: '70%',
            width: '50%'
        }

        const url = '/menu/'+this.props.soup['_id']

        if(this.props.orientation === 'vel'){
            return(
                <Link className='card' to={url}>
                    <div className='cardimg' style={style}></div>
                    <h2 className='cardName'>{this.props.soup['name']}</h2>
                    <p className='cardPrice'>{this.props.soup['price']}₫</p>
                </Link>
            )
        }else{
            return(
                <Link className='card-hol' to={url}>
                    <div className='cardimg' style={style2}></div>
                    <div className='side'>
                        <p className='cardName'>{this.props.soup['name']}</p>
                        <p className='cardPrice'>{this.props.soup['price']}₫</p>
                    </div>
                </Link>
            )
        }
    }
}