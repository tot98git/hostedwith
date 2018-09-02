import React,{Component} from 'react';
import RankBox from "../Providers/rankBox";
import Header from "../Header";
import Axios from 'axios';
export default class ProviderSelected extends Component{
    constructor(props){
        super(props);
        console.log(props)
        this.state={
            provider:{},
            id:this.props.location.state?this.props.location.state.id:null
        }
    }
    componentDidMount(){
        this.state.id!=null?Axios.get(`/providers/${this.state.id}`).then((res)=>{
            this.setState({provider:res.data})
        }):null
    }
    render(){
        const style={
            wrapper:{
                color:"white",
                backgroundColor:"#0B0440",
                overflow:"auto",
                height:"100vh"
            },
            title:{
                fontSize:"1vw",
                textShadow:"1px 1px 1px black"
            },
            container:{
                width:"80%",
                margin:"auto",
                position:"relative",
                backgroundImage: "linear-gradient(-180deg, #002F66 0%, #001A44 100%)",
                boxShadow: "1px 2px 4px 0 rgba(0,0,0,0.50)",
                borderRadius: "1px"
            },
            sectionContainer:{
                width:"100",
                zIndex:"1",
                position:"relative"
            },
            pseudo:{
                position:"absolute",
                width:"100%",
                height:"100%",
                top:0,
                zIndex:"-1",
                background: "#D8D8D8",
                boxShadow:" 0 2px 4px 0 rgba(0,0,0,0.50)",
                borderRadius: "1px"
            },
            topSection:{
                width:"100%",
                display:"inline-flex",
                justifyContent:"space-evenly",
                boxSizing:"border-box",
                margin:"3%",

            },
            buttonCont:{
                boxShadow: "0 2px 4px 0 rgba(0,0,0,0.50)",
                borderRadius: "1px",
                width:"40%",
                position:"relative",
                overflow:"auto"
            },
            button:{
                width:"100%",
                height:"100%",
                background: "#869E6B",
                border:"none",
                fontSize:"2vw",
                color:"white",
                fontWeight:"bolder"
            },
            boxContainer:{
                width:"100%",
                display:"inline-flex",
                justifyContent:"space-evenly"
            },
            bottomSection:{
                display:"inline-flex",
                justifyContent:"space-between",
                alignItems:"center",
                margin:"2%",
            },
            imgContainer:{
              width:"50%"  
            },
            img:{
                width:"100%"
            },
            infoContainer:{
                width:"50%",
                fontSize:"1vw",
                padding:"2%",
                textAlign:"justify",
                textJustify:"inter-word"
            }
        }
        return(
            <div style={style.wrapper}>
                <Header/>
                <div style={style.container}>
                    <div style={style.sectionContainer}>
                        <div style={style.topSection}>
                            <div style={style.title}>
                                <h1>{this.state.provider.isp}</h1>
                            </div>
                            <div style={style.buttonCont}>
                                <button style={style.button}><a href={this.state.provider.ref_link}>Visit providers site</a></button>
                            </div>
                        </div>
                        <div style={style.boxContainer}>
                            <RankBox level="positive"/>
                            <RankBox level="positive"/>
                            <RankBox level="neutral"/>
                            <RankBox level="positive"/>
                        </div>
                        <div style={style.pseudo}>
                    </div>
                    </div>
                    <div style={style.bottomSection}>
                        <div style={style.imgContainer}>
                         <img style={style.img} src="https://www.gettyimages.ca/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg"/>
                        </div>
                        <div style={style.infoContainer}>
                            <h1>Information</h1>
                            <p>{this.state.provider.desc}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}