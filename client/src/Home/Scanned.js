import React from 'react';
import RankBox from "../Providers/rankBox";
import Collapse from '@material-ui/core/Collapse';
export default (props)=>{
    const {
        styles,
        result,
        onClick,
        clicked
    }=props;
    const style={
        resultsWrapper:{
            clear:"both",
            color:"black",
            position:"relative",
            width:"100%",
            overflow:"auto",
            boxShadow:"1px 0px 1px black",
            ...styles
        },
        resultsWrapperPseudo:{
            position:'absolute',
            width:"100%",
            height:"50%",
            background:" #360033",/* fallback for old browsers */
            background: "-webkit-linear-gradient(to right, #0b8793, #360033)",  /* Chrome 10-25, Safari 5.1-6 */
            background: "linear-gradient(to right, #0b8793, #360033) ",
            top:0
        },
        resultsContainer:{
            backgroundColor:"white",
            width:"90%",
            borderRadius:"5px 5px 0px 0px",
            margin:"auto",
            padding:"2%",
            marginTop:"2%",
            position:"relative",
            border:"1px solid gray",
            borderBottomWidth:"0px",
            zIndex:"1"
        },
        titleWrapper:{
            background:" #360033",/* fallback for old browsers */
            background: "-webkit-linear-gradient(to right, #0b8793, #360033)",  /* Chrome 10-25, Safari 5.1-6 */
            background: "linear-gradient(to right, #0b8793, #360033) ",
            padding:"1%",
            width:"20%",
            borderRadius:"5px",
            fontSize:"1vw"
        },
        resultsTitleWrapper:{
            margin:"auto",
            textAlign:"center",
            color:"white"
        },
        resultsInfoWrapper:{
            display:"flex",
            flexDirection:"column",
            width:"60%",
            margin:"auto",
            marginTop:"2%"
        },
        resultsInfoItem:{
            justifyContent:"center",
            paddingBottom:"1%",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            fontSize:"130%",
            fontSize:"1.5vw",
            margin:"3%",
            fontFamily:"Raleway"
     },
     rankBoxWrapper:{
         display:"inline-flex",
         justifyContent:"space-evenly"
     }
    }
    const onClickHandler=()=>{
        onClick(result._id,result.isp)
    }
    return( 
        <div style={style.resultsWrapper} className="scannedDiv">
        <Collapse in={clicked}>
        <div style={style.resultsContainer}>
            <div style={style.titleWrapper}><h2 style={style.resultsTitleWrapper}>Result</h2></div>
            <div style={style.resultsInfoWrapper}>
                <div style={style.resultsInfoItem}>
                    <span>SITE IS HOSTED WITH: <strong>{result.isp}</strong> </span>
                </div> 
                <div style={{...style.resultsInfoItem,alignItems:"left"}}>
                    <span style={{...style.titleWrapper,fontSize:"0.6vw",color:"white",width:"33%"}}>Providers details</span>
                </div>
                
                <div style={style.rankBoxWrapper}>
                        <RankBox cat={"Percentage"} level={"medium"} content={parseFloat(result.percentage).toFixed(2)+"%"}/>
                        <RankBox cat={"Growth"} level={result.growth>result.oldgrowth?"positive":"negative"} content={parseFloat(result.growth).toFixed(2)+"%"}/>
                        <RankBox cat={"Server location"} level="neutral" content={result.country}/>
                </div>
                <div className="link" onClick={onClickHandler} style={style.resultsInfoItem}>
                    <span>Read more info..</span>
                </div>
                
            </div>   
        </div>
        </Collapse>
        <div style={style.resultsWrapperPseudo}></div>
        </div>
    )
}