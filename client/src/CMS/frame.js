import React from 'react';
import Sidebar from "./sidebar";
export default (props)=>{
    const{
        content
    }=props;
    const style={
        wrapper:{
            display:"flex",
            height:"100vh"
        },
        mainWrapper:{
            width:"100%",
            padding:"2%"
        },

    }
    return(
        <div style={style.wrapper}>
                <Sidebar/>
                <div style={style.mainWrapper}>   
                    {content}
                </div>
            </div>  
    )
}