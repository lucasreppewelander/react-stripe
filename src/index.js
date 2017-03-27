import { Router, Route, Link, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import React from 'react';

import App from 'components/App';
import Login from 'components/Login';

import 'index.html';
import 'index.scss';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App} />
        <Route path="/login" component={Login} />
    </Router>,
    document.getElementById('root')
);