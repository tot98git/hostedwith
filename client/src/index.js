import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//COMPONENTS
import App from './App';
import Providers from './Providers/providers';
import ProviderSelected from './ProviderSelected/';
import CMS from "./CMS";
import Settings from "./CMS/settings";
import Login from "./CMS/login";
import Edit from "./CMS/edit";
import registerServiceWorker from './registerServiceWorker';
import {Route,Switch,HashRouter} from 'react-router-dom';
ReactDOM.render(<HashRouter>
    <Switch>
        <Route  exact path="/" component={App}/>
        <Route  exact path="/providers" component={Providers}/>
        <Route  path="/providers/:id" component={ProviderSelected}/>
        <Route  exact path="/cms/" component={CMS}/>
        <Route  path="/cms/settings" component={Settings}/>
        <Route  exact path="/cms/:id" component={Edit}/>
        <Route  path="/login/" component={Login}/>
        </Switch>
    </HashRouter>, document.getElementById('root'));
registerServiceWorker();
