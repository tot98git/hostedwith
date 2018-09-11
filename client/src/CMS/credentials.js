import React,{Component} from 'react';
import Frame from "./frame"
import Button from "../Providers/rankBox";
import Axios from 'axios';
import {Input,Modal,Button as AButton} from "antd"
export default class Credentials extends Component {
    constructor(props){
        super(props);
        this.state={
            username:"",
            password:"",
            newusername:"",
            newpassword:"",
            visible:false,
            confirmLoading:false
        }
    }
    onSubmit=()=>{
        this.setState({
            visible:true
        })
    }
    onSave = ()=>{
        this.setState({confirmLoading:true});
        Axios.post("/auth/credentials",{username:this.state.username,password:this.state.password,newusername:this.state.newusername,newpassword:this.state.newpassword}).then(res=>{
            if(res.data==1)this.setState({
                confirmLoading:false,
                visible:false
            })
        })
    }
    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    onCancel=()=>{
        this.setState({
            visible:false,
            confirmLoading:false
        })
    }
    render(){
        return(
            <Frame
                content={
                    <div className="credentials-wrapper">
                        <div className="credentials-items-wrapper">
                            <h3>New Username</h3>
                            <Input onChange={this.onChange} placeholder="Leave it blank if you don't want to change it" type="text" name="newusername"/>
                        </div>
                        <div className="credentials-items-wrapper">
                            <h3>New Password</h3>
                            <Input onChange={this.onChange} placeholder="Leave it blank if you don't want to change it" type="password" name="newpassword"/>
                        </div>
                        <Modal
                            title="Confirm changes"
                            visible={this.state.visible}
                            onOk={this.onSave}
                            confirmLoading={this.state.confirmLoading}
                            onCancel={this.onCancel}
                        >   
                            <span>Please type in your account info to confirm changes:</span>
                            <Input style={{marginBottom:"1%"}} placeholder="username" onChange={this.onChange} name="username" type="text"/>
                            <Input placeholder="password" name="password" onChange={this.onChange} type="password"/>
                        </Modal>
                        <Button content="Save changes" onClick={this.onSubmit} style={{padding:"1%"}} level="positive"/>
                    </div>
                }
            />
        )
    }
}