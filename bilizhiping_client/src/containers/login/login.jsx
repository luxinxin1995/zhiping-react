import React, { Component } from 'react'
// 登录的路由组件
import Logo from '../../components/logo/logo.jsx';
import { NavBar,WingBlank,List,InputItem,WhiteSpace,Button } from "antd-mobile";
export default class Login extends Component {
    state = {
        username:'',
        password:''
    }
    login(){
        console.log(this.state)
    }
    toRegister(){
        this.props.history.replace('/register')
    }
    handleChange(name,val){
        this.setState({
            [name]:val
        })
    }
    render() {
        return (
            <div>
                <NavBar>哔&nbsp;哩&nbsp;直&nbsp;聘</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        <WhiteSpace/>
                        <InputItem placeholder="请输入用户名" onChange={val => this.handleChange('username',val)}>用户名：</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder="请输入密码" onChange={val => this.handleChange('password',val)} type="password">密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <WhiteSpace/>
                        <Button type="primary" onClick={this.login.bind(this)}>登&nbsp;&nbsp;&nbsp;录</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toRegister.bind(this)}>还没有账户？</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
