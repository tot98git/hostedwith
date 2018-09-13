import React,{Component} from 'react';
import RankBox from "../Providers/rankBox";
import Header from "../Header";
import Footer from "../Footer";
import Axios from 'axios';
export default class ProviderSelected extends Component{
    constructor(props){
        super(props);
        this.state={
            provider:{},
            id:this.props.location.state?this.props.location.state.id:this.props.match.params.id.replace("-",' '),
            mode:this.props.location.state?"id":"string"
        }
    }
    componentDidMount(){
        this.state.id!=null?Axios.get(`/api/providers/${this.state.id}/${this.state.mode}`).then((res)=>{
            this.setState({provider:res.data})
        }):null
    }
    render(){
        const style={
            wrapper:{
                display:"flex",
                flexDirection:"column",
                alignContent:"space-between",
                color:"white",
                background:localStorage.getItem('mode')=="dark"?" #360033":"#ffffff",
                backgroundImage:localStorage.getItem('mode')=="dark"?
                 "-webkit-linear-gradient(to right, #0b8793, #360033)"
                :
                `url("https://www.transparenttextures.com/patterns/brilliant.png")`,
                backgroundImage:localStorage.getItem('mode')=="dark"?"linear-gradient(to right, #0b8793, #360033)"
                :`url("https://www.transparenttextures.com/patterns/brilliant.png")`,
                overflow:"auto",
                height:"100vh",
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
                <Header itemColor={localStorage.getItem('mode')=="dark"?"white":"#044c6d"}/>
                <div style={style.container}>
                    <div style={style.sectionContainer}>
                        <div style={style.topSection}>
                            <div style={style.title}>
                                <h1>{this.state.provider.isp}</h1>
                            </div>
                            <div style={style.buttonCont}>
                                <button style={style.button} className="link"><a href={this.state.provider.ref_link}>Visit providers site</a></button>
                            </div>
                        </div>
                        <div style={style.boxContainer}>
                            <RankBox cat="Percentage" level="medium" content={parseFloat(this.state.provider.percentage).toFixed(2)+"%"}/>
                            <RankBox cat="Growth" level={this.state.provider.growth>this.state.provider.oldgrowth?"positive":"negative"} content={parseFloat(this.state.provider.growth).toFixed(2)+"%"}/>
                            <RankBox cat="Country" level="neutral" content={this.state.provider.country}/>
                        </div>
                        <div style={style.pseudo}>
                    </div>
                    </div>
                    <div style={style.bottomSection}>
                        <div style={style.imgContainer}>
                         <img style={style.img} src={`/public/screenshots/${this.state.provider.thumb}`}/>
                        </div>
                        <div style={style.infoContainer}>
                            <h1>Information</h1>
                            <p>{this.state.provider.desc}</p>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}