import React, {Component} from 'react';
import Sidebar from "./sidebar";
import Avatar from "./avatar"
import EditForm from "./editForm";
import Axios from 'axios';
export default class Edit extends Component {
    constructor(props){
        super(props);
        this.state={
            provider:{}, 
            file:"",
           }
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
        })
    }
     componentDidMount(){
        Axios.get("/api/auth/").then(res=>{
            if(res.data==0)this.props.history.push("/login");
        })
        Axios.get(`/api/providers/${this.props.match.params.id}`).then(res=>{
            this.setState({
                provider:res.data
            })
        })
    }
    onSave=()=>{
        let data = new FormData();
        data.append('id',this.props.match.params.id);
        data.append('isp',this.state.provider.isp);
        data.append('desc',this.state.provider.desc);
        data.append('ref_link',this.state.provider.ref_link);
        data.append('file',this.state.file)
        console.log("DATA: ",data);
        for (var [key,value] in data.entries() ){
            console.log("KEY",key)
        }
        Axios.post("/providers/",data).then((res)=>{
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
    handleFile = (e)=>{
        this.setState({
            file:e.target.files[0]
        },()=>{console.log(this.state)})
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
                        onFile = {this.handleFile}
                        values={this.state.provider}/>
                    </div>
                </div> 
            </div>
        )
    }
}