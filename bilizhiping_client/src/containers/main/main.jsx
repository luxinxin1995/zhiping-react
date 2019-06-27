import React, { Component } from 'react'
import { Switch,Route } from "react-router-dom";
import BossInfo from '../boss-info/boss-info'
import DaShenInfo from '../dashen-info/dashen-info'
export default class Main extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/bossInfo" component={BossInfo}></Route>
                    <Route path="/dashenInfo" component={DaShenInfo}></Route>
                </Switch>
            </div>
        )
    }
}
