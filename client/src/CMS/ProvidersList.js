import React from 'react';
import Item from "./ProvidersItem"
export default (props)=>{
    const{
        type,
        title,
        filter,
        providers
    }=props;
    const style={
        wrapper:{
            width:"100%",
            padding:"1%"
        },
        filterCont:{
            display:"inline-flex",
        },
        input:{
            padding:"2%",
            boxSizing:"border-box",
            margin:"1%"
        },
        title:{
            fontSize:"2vw"
        }
    }
    return(
        <div style={style.wrapper}>   
            <h1 style={style.title}>{title}</h1>
            {filter?
            <div style={style.filterCont}>
                <input style={style.input} name="filter" placeholder="Filter by name..."/>
                <input style={style.input} name="filter"/>
                <input style={style.input} name="filter"/>

            </div>:null}
            <div>
                {
                    providers.map((elem,index)=>{
                        return(
                            <Item key={index} id={elem._id }name={elem.isp} type={type}/>
                        )
                    })
                }
            </div>
        </div>
    )
}