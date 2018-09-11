import React from 'react';
import Button from "../Providers/rankBox";
import {Input} from "antd";
export default (props)=>{
    const{
        values,
        onChange,
        onSave,
        onDelete,
        onDiscard,
        onFile
    }=props;
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
    const onSaveHandler=(e)=>{
        onSave();
    }
    const onDeleteHandler=(e)=>{
        onDelete();
    }
    const onDiscardHandler=(e)=>{
        onDiscard();
    }
    const onChangeHandler=(e)=>{
        onChange(e)
    }
    const onChangeFile=(e)=>{
        onFile(e);
    }
        return(
            <div style={style.wrapper}>
            <form action="" method="POST" enctype="multipart/form-data">
                <div style={style.titleContainer}>
                    <Input type="text" onChange={onChangeHandler} name="isp" value={values.isp} style={style.input} placeholder="Title.."/>
                </div>
                <div>
                    <Input.TextArea rows={4} value={values.desc} name="desc" onChange={onChangeHandler} style={style.input}rows="5"/>
                </div>  
                <div style={style.titleContainer}>
                    <Input  value={values.ref_link} style={style.input} name="ref_link" type="text" onChange={onChangeHandler} placeholder="Referral link:"/>
                </div>
                <div style={style.titleContainer}>
                    <Input onChange={onChangeFile} name="screenshot" type='file'/>
                </div>
                <div style={style.btnsContainer}>
                   <Button onClick={onDeleteHandler} propStyle={style.btns} content="Delete provider info" level="negative"/>
                    <Button onClick={onDiscardHandler} propStyle={style.btns} content="Discard changes" level="medium"/>
                    <Button onClick={onSaveHandler} propStyle={style.btns} content="Save changes" level="positive"/>
                </div>
            </form>
            </div>       
        )
}