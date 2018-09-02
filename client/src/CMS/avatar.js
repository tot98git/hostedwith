import React from 'react';
export default (props)=>{
    const {
        logout
    }=props;
    const style={
        wrapper:{
            position:"relative",
            top:0,
            display:'inline-flex',
            width:'100%',
            justifyContent:"space-between"
        }
    }
    const onLogout=()=>{
        logout();
    }
    return(
        <div style={style.wrapper}>
            <div>
            </div>
            <div>
                Hi owen
            </div>
            <div className="link" onClick={onLogout}>
                Logout
            </div>
        </div>
    )
}