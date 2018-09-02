import React,{Component} from 'react';
import Header from "../Header";
import ProvidersRank from "./providersRank";
export default class Providers extends Component{
    constructor(props){
        super(props);
    }
    onClick=(id,name)=>{
        this.props.history.push({
            pathname:'/providers/'+name,
            state:{id:id}
        })
    }
    render(){
        return(
            <div className="providersWrapper">
                <Header/>
                <ProvidersRank onClick={this.onClick}/>
            </div>
        )
    }
}