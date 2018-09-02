import React from 'react';
import {Link} from 'react-router-dom'
export default (props)=>{
    const {
        type,
        name,
        id
    }=props;
    const customStyle={
        new:{
            borderTop:"2px solid #0B0440"
        },
        old:{
            borderLeft:"10px solid #0B0440"
        }
    }
    const style={
        wrapper:{
            width:"100%",
            display:"inline-flex",
            justifyContent:"space-between",
            alignItems:"center",
            backgroundColor:"rgb(216,216,216)",
            boxSizing:"border-box",
            border:"1px solid rgb(151,151,151)",
            padding:"1%",
            marginTop:"2%",
            ...customStyle[type],
            fontSize:"1vw"
        }
    }
    return(
        <div style={style.wrapper}>
            <div style={style.titleWrapper}>
            <Link style={{textDecoration:"none",color:"inherit"}} to={`/cms/${id}`}><h1>{name}</h1></Link>
            </div>
            <div>
                <span>EDIT</span>
            </div>
        </div>
    )
}