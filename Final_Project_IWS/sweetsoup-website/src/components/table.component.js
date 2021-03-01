import React,{Component} from 'react'

export default class Table extends Component{

    constructor(props){
        super(props)

        this.deleteNode = this.deleteNode.bind(this)
    }

    deleteNode(e){
        // let a = JSON.parse(localStorage.getItem('goods'))
        // a.array.forEach(element => {
        //     if()
        // });
        e.currentTarget.parentNode.parentNode.remove()
    }

    render(){

        return(
            <tr>
                <td>{this.props.soup['soup']['name']}</td>
                <td>{this.props.soup['soup']['price']*this.props.soup['quantity']}</td>
                <td>{this.props.soup['quantity']}</td>
                <td><input type='button' value='delete' onClick={this.deleteNode}></input></td>
            </tr>
        )
    }
}