import React from 'react';
import Logo from "./img/hostedwith_logo2.png"
export default  ()=>{
    const style = {
        container:{ 
        width:"100%",
        overflow:"auto",
        padding:"2%",
        boxSizing:"border-box",
        position:"relative"
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
            justifyContent:"space-between"
        }

    }
    return(
        <div style={style.container}>
            <div className="logo-wrapper" style={style.logo}>
                <img style={style.imgWrapper}src={Logo}/>
            </div>
            <div className="menu-wrapper" style={style.menuWrapper}>
                <div className="menu-item">
                    Home
                </div>
                <div className="menu-item">
                    HOSTING PROVIDERS
                </div>
                <div className="menu-item">
                    COUPONS
                </div>
            </div>
        </div>
    )
}