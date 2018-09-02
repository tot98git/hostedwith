import React from 'react';
import Button from "../Providers/rankBox";
export default (props)=>{
    const{
        values,
        onChange,
        onSave,
        onDelete,
        onDiscard
    }=props;
    console.log(values.ref_link)
    const style={
        wrapper:{
            width:"100%"
        },
        titleContainer:{
            width:"100%",
            position:"relative"
        },
        input:{
            width:"100%",
            fontSize:"1vw",
            padding:"1%",
            resize:"none"
        },
        btnsContainer:{
            width:"20%",
            display:'inline-flex',
            float:"right",
        },
        btns:{
            margin:"1%",
            textAlign:"center"
        }
        
    }
    const onSaveHandler=()=>{
        onSave();
    }
    const onDeleteHandler=()=>{
        onDelete();
    }
    const onDiscardHandler=()=>{
        onDiscard();
    }
    const onChangeHandler=(e)=>{
        onChange(e)
    }
        return(
            <div style={style.wrapper}>
                <div style={style.titleContainer}>
                    <input type="text" onChange={onChangeHandler} name="isp" value={values.isp} style={style.input} placeholder="Title.."/>
                </div>
                <div>
                    <textarea value={values.desc} name="desc" onChange={onChangeHandler} style={style.input}rows="5"/>
                </div>  
                <div style={style.titleContainer}>
                    <input  value={values.ref_link} style={style.input} name="ref_link" type="text" onChange={onChangeHandler} placeholder="Referral link:"/>
                </div>
                <div style={style.btnsContainer}>
                   <Button onClick={onDeleteHandler} propStyle={style.btns} content="Delete provider info" level="negative"/>
                    <Button onClick={onDiscardHandler} propStyle={style.btns} content="Discard changes" level="medium"/>
                    <Button onClick={onSaveHandler} propStyle={style.btns} content="Save changes" level="positive"/>
                </div>
            </div>       
        )
}