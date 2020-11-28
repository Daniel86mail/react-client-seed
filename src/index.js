import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, BrowserRouter as Router } from 'react-router-dom';
import A from './components/a.component';

import style from './app.scss'; // eslint-disable-line no-unused-vars

const BComp = () => (<div>Hello from B component</div>);

ReactDOM.render((
    <Router>
        <Route default path="/a" component={() => (<A msg="Hi" />)} />
        <Route path="/b" component={BComp} />
        <Route exact path="/">
            <Redirect to="/a" />
        </Route>
    </Router>
), document.getElementById('root'));
