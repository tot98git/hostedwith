import React from 'react';
import {Spin} from 'antd';
export default (props)=>{
    const{
        list
    }=props;
    const style={
        statsWrapper:{
            clear:"both",
            width:"50vw",
            margin:"auto",
            textAlign:'center',
            postion:"relative",
           
        },
        title:{
            fontFamily:"Hiragino Sans GB, sans-serif",
            backgroundColor:"white",
            boxShadow:"1px 1px 1px rgba(1,1,1,0.2)",
            fontWeight:"lighter",
            fontSize:"100%", //FALLBACK
            fontSize:"2vw",
            fontFamily:"Open Sans, sans-serif"
        },
        statsContainer:{
            justifyContent:"space-between",
            marginTop:"2%",
            display:"flex",
            flexDirection:"column",
            width:"70%",
            margin:"auto"
        },
        statsItem:{
            display:"inline-flex",
            justifyContent:"center",
            alignItems:"center",
            margin:"1%",
            backgroundColor:"white",
            boxShadow:"1px 1px 1px rgba(1,1,1,0.2)",
        },
        statsWeb:{
            fontSize:"1.5vw",
            color:"#0b8793",
            fontWeight:"bolder",
            textShadow:"0.5px 0.5px 0.2px #EBEFF1",
            width:"50%"
        },
        statsWebPseudo:{
            width:"100%",
            postion:"absolute",
            height:"3px",
            background:" #360033",/* fallback for old browsers */
            background: "-webkit-linear-gradient(to right, #0b8793, #360033)",  /* Chrome 10-25, Safari 5.1-6 */
            background: "linear-gradient(to right, #0b8793, #360033) ",/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+,*/
        },
        statsProvider:{
            fontSize:"1vw",
            margin:"2%",
            width:"20%",
            color:"white",
            background:" #360033",/* fallback for old browsers */
            background: "-webkit-linear-gradient(to right, #0b8793, #360033)",  /* Chrome 10-25, Safari 5.1-6 */
            background: "linear-gradient(to right, #0b8793, #360033) ",/* W3C, IE 10+/ Ed*/
            padding:"1%",
            borderRadius:"5px",
            boxShadow:"1px 1px 1px  black",
            textShadow:"1px 1px 1px black",
            position:"relative",
            overflow:"hidden"
        },
        statsProviderPseudo:{
            position:"absolute",
            width:"100%",
            height:"100%",
            backgroundColor: "#00566b",
            backgroundImage: `url("https://www.transparenttextures.com/patterns/45-degree-fabric-light.png")`,
            top:'0',
            left:"0"
        }
    }
    return(
        <div className="stats-list" style={style.statsWrapper}>
        <h1 style={style.title}>LAST TEN <strong>SEARCHES</strong></h1>
            <div style={style.statsContainer}>
            {list.length==0?<Spin/>:
                list.map((elem,index)=>{
                    return(
                    <div key={index} className="stats-item" style={style.statsItem}>
                    <div style={style.statsWeb}>{elem.url}
                        {/*<div style={style.statsWebPseudo}></div>*/}
                    </div>
                        <div style={style.statsProvider}><span style={{position:"relative",zIndex:"2"}}>{elem.isp}</span>
                            <div style={style.statsProviderPseudo}></div>
                        </div>
                    </div>
                    )
                })
            }         
            </div>
      </div>
    )
}