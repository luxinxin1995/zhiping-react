import React, { Component } from 'react';
import Logo from '../../components/logo/logo.jsx';
import { NavBar,WingBlank,List,InputItem,WhiteSpace,Radio,Button } from "antd-mobile";
const ListItem = List.Item
// 注册的路由组件
export default class Register extends Component {
    state = {
        username:'',
        password:'',
        confirmPassword:'',
        type:'boss'
    }
    register(){
        console.log(this.state)
    }
    toLogin(){
        // 跳转到登录界面
        this.props.history.replace('/login')
    }
    // 输入数据的改变：更新对应的状态
    handleChange(name,val){
        this.setState({
            // [name]变量
            [name]: val //属性名不是name，而是name的值
        })
    }
    render() {
        const {type} = this.state;
        return (
            <div>
                <NavBar>哔&nbsp;哩&nbsp;直&nbsp;聘</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        <WhiteSpace/>
                        <InputItem placeholder="请输入用户名" onChange={val => this.handleChange('username',val)}>用户名：</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder="请输入密码" type="password" onChange={val => this.handleChange('password',val)}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder="请再次输入密码" type="password" onChange={val => this.handleChange('confirmPassword',val)}>确认密码：</InputItem>
                        <WhiteSpace/>
                        <ListItem>
                            <span>用户类型：&nbsp;&nbsp;</span>
                            <Radio checked={type === 'dashen'} onChange={() => this.handleChange('type','dashen')}>大神</Radio>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={type === 'boss'} onChange={() => this.handleChange('type','boss')}>老板</Radio>
                        </ListItem>
                        <WhiteSpace/>
                        <Button type="primary" onClick={this.register.bind(this)}>注&nbsp;&nbsp;&nbsp;册</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toLogin.bind(this)}>已有账户？</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
