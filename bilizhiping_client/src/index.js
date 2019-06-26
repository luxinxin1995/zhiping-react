import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'
import Register from './containers/register/register';
import Login from './containers/login/login';
import Main from './containers/main/main';
import './assets/css/index.less'

ReactDOM.render((
    <Provider store={store}>
        <HashRouter>
            {/* Switch路由切换，没有Switch时所有路由都会显示 */}
            <Switch>
                <Route path="/register" component={Register}></Route>
                <Route path="/login" component={Login}></Route>
                {/* 默认组件 */}
                <Route component={Main}></Route>
            </Switch>
        </HashRouter>
    </Provider>
), document.getElementById('root'));