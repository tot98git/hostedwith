import React,{Component} from 'react';
import Avatar from "./avatar";
import ProvidersList from "./ProvidersList";
import Axios from 'axios';
import Frame from "./frame.js"
export default class CMS extends Component{
    constructor(props){
        super(props);
        this.state={
            providers:[]
        }
        this
    }
    componentDidMount(){
        Axios.get("/providers").then((res)=>{
            this.setState({providers:res.data},()=>{console.log(this.state.providers.filter(el=>{return el.desc==null   }))})
        })
    
        Axios.get('/auth').then(res=>{
            res.data==0?this.props.history.push("/login"):null
        })
    }
    handleLogOut=()=>{
        Axios.get("/auth/logout").then(res=>{
            res.data==1?this.props.history.push("/login"):null
        })
    }
    render(){
        return(
            <Frame
                content={
                    <div>
                        <Avatar logout={this.handleLogOut}/>
                        <div>
                            <ProvidersList providers={this.state.providers} filter={true} title="Edit exisisting providers" type="old"/>    
                        </div>  
                        <div style={{width:"50%"}}>
                            <ProvidersList providers={this.state.providers.filter(el=>{return el.desc==""||!el.desc})} filter={false} type="new" title="New Providers"/>
                        </div>
                    </div>
                }
            />
        )
    }
}