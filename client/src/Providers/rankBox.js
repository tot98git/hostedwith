import React from 'react';
export default (props)=>{
    const{
        level,
        cat,
        content,
        propStyle,
        onClick
    }=props;
    const btnStyles={
        neutral:{
            backgroundImage: "linear-gradient(-180deg, #061739 0%, #0C0041 100%)",
            boxShadow:" 0 2px 4px 0 rgba(0,0,0,0.50)",
            borderRadius: "1px"
        },
        medium:{
            backgroundImage: "linear-gradient(-180deg, #213906 0%, #0C0041 100%)",
            boxShadow:" 0 2px 4px 0 rgba(0,0,0,0.50)",
            borderRadius: "1px",
        },
        positive:{
            backgroundImage: "linear-gradient(-180deg, #3A6F00 0%, #0C0041 100%)",
            boxShadow: "0 2px 4px 0 rgba(0,0,0,0.50)",
            borderRadius: "1px",
        },
        negative:{
            backgroundImage: "linear-gradient(-180deg, #893B11 0%, #0C0041 100%)",
            boxShadow: "0 2px 4px 0 rgba(0,0,0,0.50)",
            borderRadius: "1px",
        }
    }
    const style={
        wrapper:{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"space-around",
            backgroundColor:"#0B0440",
            padding:"2%",
            overflow:"auto",
            boxSizing:"border-box",
            color:"white",
            ...btnStyles[level],
            ...propStyle
        },
        header:{
            fontSize:"1vw",
            fontWeight:"lighter",
            textAlign:"center",
            overflow:"auto"
        },
        info:{
            fontSize:"1vw",
            fontWeight:"bolder",
            overflow:"auto"
        }
    }
    const onClickHandler=(e)=>{
        e.preventDefault();
        onClick();
    }
    return(
        <div onClick={onClick?onClickHandler:null}  style={style.wrapper}>
            {cat?<div style={style.header}>
                {cat}            
            </div>:null}
            {content?<div style={style.info}>
                {content}            
            </div>:null}
        </div>
    )
}