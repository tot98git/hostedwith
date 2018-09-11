import React,{Component} from 'react';
import ProvidersCard from './providersCard';
import { Pagination } from 'antd';
import style from "antd/dist/antd.css";
import Axios from 'axios';
import "../styles/app.css";

export default class ProvidersRank extends Component{
    constructor(props){
        super(props);
        this.state={
            providers:[],
            page:1
        }
    }
    componentDidMount(){
        Axios.get('/api/providers/').then((res)=>{
            this.setState({providers:res.data})
        })
    }
    onClick=(id,name)=>{
        this.props.onClick(id,name);
    }
    handlePagination=(page,pageSize)=>{
        this.setState({
            page:page
        })
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
                <h1>
                <span style={{color:localStorage.getItem('mode')=="dark"?"white":"#044c6d",textShadow:"1px 1px 1px gray"}}>Top web hosting providers
                </span>
                </h1>
                {
                    this.state.providers.filter((ele,index)=>{return index>=(this.state.page-1)*5&&index<this.state.page*5}).map((elem,index)=>{
                        return(
                            <ProvidersCard
                            country={elem.country} 
                            growth={elem.growth}
                            oldgrowth={elem.oldgrowth}
                            percentage={elem.percentage}
                            name={elem.isp} 
                            id={elem._id} 
                            onClick={this.onClick} 
                            title={elem.isp} 
                            rank={index+1} 
                            mode={localStorage.getItem('mode')=='light'?"dark":"light"}/>
                        )
                    })
                }
                <div style={{justifyContent:"center",display:"flex"}}>
                    <Pagination onChange={this.handlePagination} defaultCurrent={1} pageSize={5} hideOnSinglePage={true} total={this.state.providers.length}/>
                </div>
            </div>
        )
    }
}