import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Switch,Route,Redirect } from "react-router-dom";
import Cookies from 'js-cookie'
import BossInfo from '../boss-info/boss-info'
import DaShenInfo from '../dashen-info/dashen-info'
import {getRedirectTo} from '../../utils/index'
class Main extends Component {
    componentDidMount(){
        // 登录过（cookie中有userid）发送请求获取对应的user
        const userid = Cookies.get('userid')
        const {_id} = this.props.user
        if (userid && !_id) {
            // 发送异步请求，获取user
            console.log('发送ajax请求user')
        }
    }
    render() {
        // 读取cookie中的userid
        const userid = Cookies.get('userid')
        // 没有，跳转/login
        if (!userid) {
            return <Redirect to="/login"></Redirect>
        } else {
            // 有，读取redux中的user状态
            const {user} = this.props
            // 如果user中没有_id,返回null（不做任何显示）
            if (!user._id) {
                return null
            } else {
                // 反之，显示对应的界面
                // 根据user的type和header来计算出一个重定向的路由路径，并自动重定向
                const path = this.props.location.pathname
                if (path === '/') {
                    getRedirectTo(user.type,user.header)
                    return <Redirect to={path}></Redirect>
                }
            }
        }
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
export default connect(
    state => ({user:state.user})
)(Main)

/**
 * 1.实现自动登录
 * cookie中有userid：发送请求获取对应的user
 * cookie中没有userid：跳转/login
 * 
 * 2.已登录，如果请求根路径
 * 根据user的type和header来计算出一个重定向的路由路径，并自动重定向
 */