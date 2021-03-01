import React, {Component} from 'react'
import '../style/menu.css'
import SoupCards from './soupcards.component'
import 'react-dropdown/style.css'
import axios from 'axios'

export default class Menu extends Component{
    constructor(props){
        super(props)

        this.state = {
            soups: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/sweetsoup/')
        .then(response=>{
            this.setState({soups: response.data})
        }).catch((error)=>{
            console.log(error)
        })
    }

    render(){
        return(
            <div className='containner-menu'>
                <h2>All Product</h2>
                <div className='head-menu'>
                    <p>Showing all result</p>
                </div>
                <div className='containner'>{this.state.soups.map(function(soup, index) {
                        return <SoupCards orientation='vel' soup={soup}/>
                    })}</div>
            </div>
        );
    }
}



