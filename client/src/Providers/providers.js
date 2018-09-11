import React,{Component} from 'react';
import Header from "../Header";
import ProvidersRank from "./providersRank";
import Axios from 'axios';
import Footer from "../Footer";
export default class Providers extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    onClick=(id,name)=>{
        this.props.history.push({
            pathname:'/providers/'+name,
            state:{id:id}
        })
    }
    render(){
        const style = {
            display:"flex",
            height:"100vh",
            flexDirection:"column",
            alignContent:"space-between",
            background:localStorage.getItem('mode')=="dark"?" #360033":"#ffffff",
            backgroundImage:localStorage.getItem('mode')=="dark"?
            "-webkit-linear-gradient(to right, #0b8793, #360033)"
            :
            `url("https://www.transparenttextures.com/patterns/brilliant.png")`,
            backgroundImage:localStorage.getItem('mode')=="dark"?"linear-gradient(to right, #0b8793, #360033)"
            :`url("https://www.transparenttextures.com/patterns/brilliant.png")`
        }
        return(
            <div className="providersWrapper" style={style}>
                <Header itemColor={localStorage.getItem('mode')=="dark"?"white":"#044c6d"}/>
                <ProvidersRank onClick={this.onClick}/>
                <Footer/>
            </div>
        )
    }
}