import React,{Component} from 'react';
import RankBox from "../Providers/rankBox";
import Progress from '@material-ui/core/CircularProgress';
export default (props)=>{
    const{
        divWidth,
        clicked,
        onClick,
        url,
        onChange,
        loader,
        onFocus
    }=props;
    const clickedStyle = {
        true:{
            width:"0%",
            opacity:"0"
        },
        false:{
            width:loader==false&&clicked==true?"100%":"85%",
            borderRadius:loader==false&&clicked==true?"1%":"5px 0px 0px 5px",
            textAlign:loader==false&&clicked==true?"center":"",
            opacity:"1"
        }
    }
    const style={
        div:{
            width:divWidth,
            margin:"auto"
        },
        container:{
            width:"100%",
            display:"inline-flex",
            justifyContent:"center"
        },
        input:{
            padding:"2%",
            boxSizing:"border-box",
            float:"left",
            fontSize:"120%",
            border:"none",
            borderBottom:"1px solid gray",
            ...clickedStyle[loader]
        },
        button:{
            padding:"2%",
            fontSize:"1vw",
            boxSizing:"border-box",
            borderRadius:clicked?"5px":"0px 5px 5px 0px",
            float:"right",
            border:"none",
            fontSize:"120%",
            background:" #360033",/* fallback for old browsers */
            background: "-webkit-linear-gradient(to right, #0b8793, #360033)",  /* Chrome 10-25, Safari 5.1-6 */
            background: "linear-gradient(to right, #0b8793, #360033) ",/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+,*/
            color:"white",
            fontWeight:"bold",
            overflow:'auto',
            display:loader==false&&clicked==true?"none":"inherit",
            ...loader==false&&clicked==true?clickedStyle[true]:""

        },
        btnSpan:{
            textAlign:"center",
            fontSize:"1vwx"
        }
    }
    const handleButtonClick=(e)=>{
        e.persist(); 
        onClick(e);
    }
    const inputOnChange=(e)=>{
        onChange(e);
    }
    const inputOnFocus=()=>{
        onFocus();
    }
    return(
        <div style={style.div}>
            <div style={style.container}>
                <input style={style.input} onFocus={loader==false&&clicked==true?inputOnFocus:null} onChange={inputOnChange} name="url" value={url} type="text" />
                <button onClick={handleButtonClick} style={style.button}>
                    {loader?<Progress color="secondary" size={20}/>:
                        <span style={style.btnSpan}>Search</span>
                    }
                </button>
            </div>
        </div>
    )
}
