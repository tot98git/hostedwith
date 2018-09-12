import React,{Component} from 'react';
import Avatar from "./avatar";
import ProvidersList from "./ProvidersList";
import Axios from 'axios';
import Frame from "./frame.js"
export default class CMS extends Component{
    constructor(props){
        super(props);
        this.state={
            providers:[],
            filterValue:"",
            page:1
        }
        this
    }
    componentDidMount(){
        Axios.get("/api/providers").then((res)=>{
            this.setState({providers:res.data},()=>{console.log()})
        })
    
        Axios.get('/api/auth/').then(res=>{
            console.log("RES",res);
            res.data==0?this.props.history.push("/login"):null
        })
    }
    handleLogOut=()=>{
        Axios.get("/api/auth/logout").then(res=>{
            res.data==1?this.props.history.push("/login"):null
        })
    }
    handleFilterChange=(e)=>{
        this.setState({
            filterValue:e.target.value
        })
    }
    onPaginationChanged=(page,pageSize)=>{
        this.setState({
            page:page
        })
    }
    render(){
        return(
            <Frame
                content={
                    <div>
                        <Avatar logout={this.handleLogOut}/>
                        <div>
                            <ProvidersList filterValue={this.state.filterValue} filterOnChange={this.handleFilterChange} providers={this.state.providers} filter={true} title="Edit exisisting providers" type="old"/>    
                        </div>  
                        <div style={{width:"50%"}}>
                            <ProvidersList providers={this.state.providers.filter((el,index)=>{return (el.desc==""||!el.desc)&&(index>=(this.state.page-1)*5&&index<this.state.page*5)})} filter={false} type="new" title="New Providers"/>
                        </div>
                    </div>
                }
            />
        )
    }
}