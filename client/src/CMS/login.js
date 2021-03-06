import React,{Component} from 'react';
import axios from 'axios';
export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            username:null,
            password:null
        }
    }
    componentDidMount(){
        axios.get("/api/auth").then(res=>{
            res.data==1?this.props.history.replace("/cms"):null
        })
    }
    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleLogin=(e)=>{
        axios.post("/api/auth/",{username:this.state.username,password:this.state.password}).then((res)=>{
            if(res.data===1){
                localStorage.setItem('auth',1);
                this.props.history.replace("/cms")
            }
        })
    }

    render(){
        return(
            <div className="loginWrapper">
                <div className="loginBlock">
                    <h1>Login to CMS</h1>
                    <div className="loginBlockItem">
                        <input type="text" onChange={this.onChange} name="username" placeholder="Username"/>
                    </div>
                    <div className="loginBlockItem">
                        <input type="password" onChange={this.onChange} name="password" placeholder="Password"/>
                    </div>
                    <div className="loginBlockItem">
                        <button onClick={this.handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        )
    }
}