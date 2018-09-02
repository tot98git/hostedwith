import React from 'react';
import {Link} from 'react-router-dom';
export default ()=>{
    const style={
        wrapper:{
            backgroundColor:"#0B0440",
            height:"100%",
            overflow:"auto",
            color:"white",
            padding:"3%",
            boxSizing:"border-box",
            fontSize:"1vw"
         }
    }
    return(
        <div style={style.wrapper}>
            <div>
                LOGO
            </div>
            <div>
                <div>
                    <h1><Link to="/cms">Providers</Link></h1>
                </div>
                <div>
                    <h1><Link to="/cms/settings">Settings</Link></h1>
                </div>
            </div>
        </div>
    )
}