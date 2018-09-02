import React, { Component } from 'react';
import './styles/app.css';
import Header from "./Header"
import ActionComponent from './Home/actionComponent'
import Results from "./Home/Results"
import Scanned from "./Home/Scanned";
import Footer from "./Footer"
import Particles from 'react-particles-js';
import {Close} from 'mdi-material-ui'
import Axios from 'axios';
class App extends Component {
  constructor(){
    super();
    this.state={
      clicked:false,
      url:"",
      list:[],
      results:{},
      settings:{},
      open:false,
      loader:false
        }
  }
   async componentDidMount(){
    let sett = await Axios.get('/settings');
    let list = await Axios.get('/providers/list');
    console.log("settings: ",sett)
    this.setState({
      list:list.data,
      settings:sett.data[0]
    })
  }
  scanOnClick=(e)=>{
    this.setState({
      clicked:true,
      loader:true,
    })
    Axios.get(`/url/${encodeURI(this.state.url)}`).then(res=>{
      this.setState({
        open:true,
        results:res.data,
        loader:false
      },()=>{console.log("E: ",);})
    })
  }
  inputOnFocus=()=>{
    this.setState({
      open:false,
      loader:false,
      clicked:false
    })
  }
  inputOnChange=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  scannedMore=(id,name)=>{
    this.props.history.push({
      pathname:`/providers/${name}`,
      state:{
        id:id
      }
    })
  }
  render() {
    return (
        <div className="App" style={{
          backgroundColor:" #ffffff",
          backgroundImage: `url("https://www.transparenttextures.com/patterns/brilliant.png")`
        }}>
        <div className="upper-section">
          <Particles style={{width:'100%'}} params={{particles:{
            number:{
            value: "20"
            },
            size:{
            value:'5',
            anim:{
              speed:"100"
            }
            }
         }}}/>
        <Header/> 
          <div className="main-section">
            <h1>{this.state.settings.headline1}</h1>
            <h3>{this.state.settings.headline2}</h3>
          </div>
          <div className="action-container">
            <ActionComponent 
              loader={this.state.loader} 
              url={this.state.url} 
              onChange={this.inputOnChange} 
              onClick={this.scanOnClick} 
              clicked={this.state.clicked} 
              onFocus={this.inputOnFocus  }
              divWidth="50%"/>
          </div>
        </div>
        {<Scanned onClick={this.scannedMore} result={this.state.results} styles={{display:this.state.open?"block":"none",width:"50%",margin:"auto",backgroundColor:"rgba(1,1,1,0.1)"}}/>}
        <div className="middle-section">
          <Results  list={this.state.list}/>
        </div>
        <Footer 
          copyright={this.state.settings.copyright}
          tw={this.state.settings.soc_link_tw}
          fb={this.state.settings.soc_link_fb}
          ig={this.state.settings.soc_link_ig}
        />
      </div>
    );
  }
}

export default App;
