import React from 'react';
import Box from "./rankBox";
export default (props)=>{
    const{
        mode,
        title,
        rank,
        onClick,
        name,
        growth,
        oldgrowth,
        percentage,
        country,
        id
    }=props;
    const modeSelected={
        light:{
            background: "#D8D8D8",
            borderRadius: "1px"
        },
        dark:{
            backgroundImage: "linear-gradient(-180deg, #002F66 0%, #001A44 100%)",
            boxShadow: "1px 2px 4px 0 rgba(0,0,0,0.50)",
            borderRadius: "1px",
        }
    }
    const style={
        wrapper:{
            width:"90%",
            margin:"auto"

        },
        container:{
            width:"100%",
            display:"inline-flex",
            justifyContent:"space-evenly",
              alignItems:"center",
            boxSizing:"border-box",
            padding:"1%",
            margin:"1%",
            ...modeSelected[mode]
        },
        rankNumber:{
            width:"5%",
            height:"5%",
            textAlign:"center",
            backgroundColor:"black",
            fontSize:"1vw"
        },
        title:{
            color:"white",
            fontSize:"1vw",
            textShadow:"1px 1px 1px black"
        }
    }
    const onClickHandler=()=>{
        onClick(id,name)
    }
    return(
        <div style={style.wrapper}>
            <div style={style.container}>
                <div style={style.rankNumber}>
                    <h1>{rank}</h1>
                </div>
                <div className="link" onClick={onClickHandler}style={style.title}>
                    <h1>{title}</h1>
                </div>
                <Box cat="Percentage" level={"medium"} content={parseFloat(percentage).toFixed(2)+"%"}/>
                <Box cat="Growth" level={growth>oldgrowth?"positive":"negative"} content={parseFloat(growth).toFixed(2)+"%"}/>
                <Box cat="Country" level={"neutral"} content={country}/>
            </div>
        </div>
    )
}