import React from 'react';
import Particles from "react-particles-js"
import Logo from "./img/hostedwith_logo2.png"
import {Facebook} from 'mdi-material-ui'
import {Twitter} from 'mdi-material-ui'
import {Instagram} from 'mdi-material-ui'

export default (props)=>{
    const {
        fb,
        tw,
        ig,
        copyright
    }=props;
    const style={
        wrapper:{
            width:"90vw",
            background:" #360033",/* fallback for old browsers */
            background: "-webkit-linear-gradient(to right, #0b8793, #360033)",  /* Chrome 10-25, Safari 5.1-6 */
            background: "linear-gradient(to right, #0b8793, #360033) ",/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            margin:"0 auto",
            color:"white",
            bottom:"0px",
            borderRadius:"2% 2% 0 0",
            padding:"0.5%"
        },
        container:{
            width:"100%",
            display:"inline-flex",
            justifyContent:"space-between",
            alignItems:"center"
        }

    }
    return(
        <div style={style.wrapper}>
            <div style={style.container}>
            <div className="logo-wrapper">
            <img src={Logo}/>
            </div>
            <div className="centered-text">
                {copyright}
            </div>
            <div className="social-links">
                { fb!=""?<div><a href={fb}><Facebook/></a></div>:null} 
                {tw!=""?<div><a href={tw}><Twitter/></a></div>:null} 
                {ig!=""?<div><a href={ig}><Instagram/></a></div>:null} 
            </div>
            </div>
        </div>
    )
}