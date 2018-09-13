import React from 'react';
import Logo from "./img/hostedwith_logo2.png"
import {Link} from "react-router-dom"
export default  (props)=>{
    const {
        itemColor
    }=props;
    const style = {
        container:{ 
        width:"100%",
        padding:"2%",
        boxSizing:"border-box",
        position:"relative",
        minWidth:"50vw"
    },
        logo:{
            width:"15vw",
            float:"left",
            position:"relative",
            left:"3%",
            userSelect:"none"
        },
        imgWrapper:{
            width:"100%"
        },
        menuWrapper:{
            width:"40vw",
            float:"right",
            display:"inline-flex",
            justifyContent:"space-between",
            color:itemColor?itemColor:"white"
        }

    }
    return(
        <div style={style.container}>
            <div className="logo-wrapper" style={style.logo}>
                <img style={style.imgWrapper}src={Logo}/>
            </div>
            <div className="menu-wrapper" style={style.menuWrapper}>
                <Link to="/">
                    <div className="menu-item">
                        Home
                    </div>
                </Link>
                <Link to="/providers">
                    <div className="menu-item">
                        HOSTING PROVIDERS
                    </div>
                </Link>
                <div className="menu-item">
                    COUPONS
                </div>
            </div>
        </div>
    )
}