import React, {Component} from 'react';
import Sidebar from "./sidebar";
import Avatar from "./avatar"
import EditForm from "./editForm";
import Axios from 'axios';
export default class Edit extends Component {
    constructor(props){
        super(props);
        this.state={
            provider:{},        }
        this.style={
            wrapper:{
                display:"flex",
                height:"100vh"
            },
            mainWrapper:{
                width:"100%",
                padding:"2%",
            }
        }
    }
    onChange=(e)=>{
        this.setState({
            provider:{...this.state.provider,[e.target.name]:e.target.value}
        },()=>{console.log(this.state)})
    }
    componentDidMount(){
        Axios.get(`/providers/${this.props.match.params.id}`).then(res=>{
            console.log(res);
            this.setState({
                provider:res.data
            })
        })
    }
    onSave=()=>{
        Axios.post("/providers/",{id:this.props.match.params.id,values:this.state.provider}).then((res)=>{
            if(res.data==1){
                this.props.history.replace("/cms");
            }
        })
    }
    onDelete=()=>{
        Axios.delete(`/providers/${this.props.match.params.id}`).then((res)=>{
            if(res.data==1){
                this.props.history.replace("/cms");
            }
        })
    }
    onDiscard=()=>{
        this.props.history.replace("/cms")
    }
    render(){
        return(
            <div style={this.style.wrapper}>
                <Sidebar/>
                <div style={this.style.mainWrapper}>
                    <Avatar/>
                    <div> 
                        <h1>Edit providers info</h1>
                        <EditForm 
                        onSave={this.onSave}
                        onDelete={this.onDelete}
                        onDiscard={this.onDiscard}
                        onChange={this.onChange}
                        values={this.state.provider}/>
                    </div>
                </div> 
            </div>
        )
    }
}