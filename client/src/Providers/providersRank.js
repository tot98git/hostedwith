import React,{Component} from 'react';
import ProvidersCard from './providersCard';
import Axios from 'axios';

export default class ProvidersRank extends Component{
    constructor(props){
        super(props);
        this.state={
            providers:[]
        }
    }
    componentDidMount(){
        Axios.get('/providers/').then((res)=>{
            this.setState({providers:res.data})
        })
    }
    onClick=(id,name)=>{
        this.props.onClick(id,name);
    }
    render(){
        const style = {
            wrapper:{
                width:"80%",
                margin:"auto"
            }
        }
        return(
            <div style={style.wrapper}>
                <h1>Top web hosting providers</h1>
                {
                    this.state.providers.map((elem,index)=>{
                        return(
                            <ProvidersCard name={elem.isp} id={elem._id} onClick={this.onClick} title={elem.isp} rank={index+1} mode="light"/>
                        )
                    })
                }
            </div>
        )
    }
}