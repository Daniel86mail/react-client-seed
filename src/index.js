import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, BrowserRouter as Router } from 'react-router-dom';

import style from './app.css'; // eslint-disable-line no-unused-vars

const AComp = () => <div>#Hello A World!!!!@@</div>;
const BComp = () => <div>#Hello B World!!!!@@</div>;

ReactDOM.render((
    <Router>
        <Route default path="/a" component={AComp} />
        <Route path="/b" component={BComp} />
        <Route exact path="/">
            <Redirect to="/a" />
        </Route>
    </Router>
), document.getElementById('root'));
