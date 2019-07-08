import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from "react-router-dom";
import Cookies from 'js-cookie'
import BossInfo from '../boss-info/boss-info'
import DaShenInfo from '../dashen-info/dashen-info'
import NotFound from '../../components/not-found/not-found.jsx'
import DaShen from '../dashen/dashen'
import Boss from '../boss/boss'
import Personal from '../personal/personal'
import Message from '../message/message'
import NavFooter from '../../components/nav-footer/nav-footer'
import Chat from '../chat/chat'
import { getRedirectTo } from '../../utils/index'
import { getUser } from "../../redux/actions";
import { NavBar } from "antd-mobile";

class Main extends Component {
    //	给组件对象添加属性 
    navList = [
        {
            path: '/boss', // 路由路径
            component: Boss,
            title: '大神列表',
            icon: 'dashen',
            text: '大神',
        },
        {
            path: '/dashen', // 路由路径
            component: DaShen,
            title: '老板列表',
            icon: 'laoban',
            text: '老板',
        },
        {
            path: '/message', // 路由路径
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息',
        },
        {
            path: '/personal', // 路由路径
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人',
        }
    ]

    componentDidMount() {
        // 登录过（cookie中有userid）发送请求获取对应的user
        const userid = Cookies.get('userid')
        const { _id } = this.props.user
        if (userid && !_id) {
            // 发送异步请求，获取user
            this.props.getUser()
        }
    }
    render() {
        // 读取cookie中的userid
        const userid = Cookies.get('userid')
        // 没有，跳转/login
        if (!userid) {
            return <Redirect to="/login"></Redirect>
        }
        // 有，读取redux中的user状态
        const { user, unReadCount } = this.props
        // 如果user中没有_id,返回null（不做任何显示）
        if (!user._id) {
            return null
        } else {
            // 反之，显示对应的界面
            // 根据user的type和header来计算出一个重定向的路由路径，并自动重定向
            let path = this.props.location.pathname
            if (path === '/') {
                path = getRedirectTo(user.type, user.header)
                return <Redirect to={path}></Redirect>
            }
        }
        //	得到当前的 nav
        const { navList } = this;
        const path = this.props.location.pathname
        const currentNav = navList.find(nav => nav.path === path)
        if (currentNav) {
            if (user.type === 'boss') {
                navList[1].hide = true
            } else {
                navList[0].hide = true
            }
        }
        return (
            <div>
                {currentNav ? <NavBar className='stick-top'>{currentNav.title}</NavBar> : null}
                <Switch>
                    {
                        navList.map((nav) => <Route key={nav.path} path={nav.path} component={nav.component}></Route>)
                    }
                    <Route path="/bossInfo" component={BossInfo}></Route>
                    <Route path="/dashenInfo" component={DaShenInfo}></Route>
                    <Route path="/chat/:userid" component={Chat}></Route>
                    <Route component={NotFound}></Route>
                </Switch>
                {currentNav ? <NavFooter navList={navList} unReadCount={unReadCount} /> : null}
            </div>
        )
    }
}
export default connect(
    state => ({ user: state.user, unReadCount: state.chat.unReadCount }),
    { getUser }
)(Main)

/**
 * 1.实现自动登录
 * cookie中有userid：发送请求获取对应的user
 * cookie中没有userid：跳转/login
 *
 * 2.已登录，如果请求根路径
 * 根据user的type和header来计算出一个重定向的路由路径，并自动重定向
 */