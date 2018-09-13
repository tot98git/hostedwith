import React,{Component} from 'react';
import Frame from "./frame"
import Avatar from "./avatar";
import Button from "../Providers/rankBox";
import Axios from 'axios';
import {Input} from 'antd';
export default class Settings extends Component{
    constructor(props){
        super(props);
        this.state={
            object:{
                headline1:"",
                headline2:"",
                soc_link_fb:"",
                soc_link_ig:"",
                soc_link_tw:"",
                copyright:""
            }
        }
    }
    componentDidMount(){
        Axios.get("/api/auth").then(res=>{
            res.data==0?this.props.history.push("/login"):null
        })
        Axios.get("/api/settings").then(res=>{
            console.log('sett',res.data);
            this.setState({object:res.data[0]},()=>{
            })
        })
    }
    inputOnChange=(e)=>{
        let object = this.state.object;
        object[e.target.name]=e.target.value;
        this.setState({
            object:object
        })
    }
    onDiscard = ()=>{
        this.props.history.push('/cms')
    }
    onSave=()=>{
        Axios.post('/api/settings',this.state.object).then(res=>{
            res.data==1?this.props.history.push("/cms"):null
        })
    }
    render(){
        return(
        <Frame
            content={
                <div>  
                    <Avatar/>
                    <div className="settings-block">
                        <h3>Website settings</h3>
                        <div className="settings-item">
                            <Input type="text" name="headline1" onChange={this.inputOnChange} value={this.state.object.headline1} placeholder="Headline 1..."/>
                        </div>
                        <div className="settings-item">
                            <Input type="text" name="headline2"  onChange={this.inputOnChange} value={this.state.object.headline2} placeholder="Headline 2..."/>
                        </div>
                        <h3>Links</h3>
                        <div className="settings-item">
                            <Input type="text" name="soc_link_fb"  onChange={this.inputOnChange} value={this.state.object.soc_link_fb} placeholder="Facebook link"/>
                        </div>
                        <div className="settings-item">
                            <Input type="text" name="soc_link_ig"  onChange={this.inputOnChange} value={this.state.object.soc_link_ig} placeholder="Instagram link"/>
                        </div>
                        <div className="settings-item">
                            <Input type="text" name="soc_link_tw"  onChange={this.inputOnChange} value={this.state.object.soc_link_tw} placeholder="Twitter link"/>
                        </div>
                        <h3>Other settings</h3>
                        <div className="settings-item">
                            <Input type="text" name="copyright"  onChange={this.inputOnChange} value={this.state.object.copyright} placeholder="Copyright text"/>
                        </div>
                        <div className="settings-item">
                            <h6>Select mode:</h6>
                            <select onChange={this.inputOnChange} value={this.state.object.mode} name="mode" placeholder="Select mode..">
                                <option name="mode" value="light">Light</option>
                                <option name="mode" value="dark">Dark</option>
                            </select>
                        </div>
                        <div style={{width:"80%",display:'inline-flex',justifyContent:"space-evenly"}}>
                            <Button  onClick={this.onDiscard} content="Discard changes" level="medium"/>
                            <Button  onClick={this.onSave} content="Save changes" level="positive"/>
                        </div>
                    </div>
                </div>
                }
        />
        )
        }
}