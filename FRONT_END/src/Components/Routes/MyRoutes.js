import React, { Component } from 'react';
import Login from '../Login';
import List from '../List';
// import Home from '../Home';
import { Route } from "react-router-dom";
import Register from '../Register';
import History from '../History';

class MyRoutes extends Component {
    render() {
        return (
            <div>
               {/* <Route path="/" exact component={Home} /> */}
               <Route path="/login" exact component={Login} />
               {/* <Route path="/" exact component={Login} /> */}
               <Route path="/register" exact component={Register} />
               <Route path="/history" exact component={History} />
               <Route path="/list" exact component={List} />
            </div>
        );
    }
}

export default MyRoutes;