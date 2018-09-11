import React from 'react';
import Item from "./ProvidersItem"
import {Pagination} from 'antd';
export default (props)=>{
    const{
        type,
        title,
        filter,
        filterOnChange,
        filterValue,
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
    const onChange=(e)=>{
        filterOnChange(e)
    }
    let regex = filterValue?filterValue.toLowerCase():null;
    return(
    
        <div style={style.wrapper}>   
            <h1 style={style.title}>{title}</h1>
            {filter?
            <div style={style.filterCont}>
                <input style={style.input} value={filterValue} onChange={filterOnChange?onChange:""}name="filter" placeholder="Filter by name..."/>
            </div>:null}
            <div>
                {
                    providers.filter(el=>{return !filterValue||filterValue==""?true:el.isp.toLowerCase().includes(filterValue.toLowerCase())}).map((elem,index)=>{
                        return(
                            <Item key={index} id={elem._id }name={elem.isp} type={type}/>
                        )
                    })
                }
            </div>
            {!filter?<Pagination hideOnSinglePage={true} total={providers.length}  pageSize={5}/>:null}
        </div>
    )
}