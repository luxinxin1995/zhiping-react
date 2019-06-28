// boss信息完善的路由容器组件
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { NavBar,InputItem,TextareaItem,Button } from "antd-mobile";
import HeaderSelect from '../../components/header-select/header-select'
import { Redirect } from "react-router-dom";
import { updateUser } from "../../redux/actions";
class DaShenInfo extends Component {
    state = {
        header:'',
        post:'',
        info:''
    }
    setHeader = (header) => {
        this.setState({
            header
        })
    }
    handleChange(name,val){
        this.setState({
            [name]:val
        })
    }
    saveInfo = () => {
        this.props.updateUser(this.state)
    }
    render() {
        const {header,type,msg} = this.props.user
        if (header) {
            const path = type === 'dashen'?'/dashen':'/boss'
            return <Redirect to={path}></Redirect>
        }
        return (
            <div>
                <NavBar>大神信息完善</NavBar>
                <HeaderSelect setHeader={this.setHeader}/>
                {msg ? <p className='error-msg'>{msg}</p> : null}
                <InputItem placeholder="请输入求职岗位" onChange={val => this.handleChange('post', val)}>求职岗位：</InputItem>
                <TextareaItem title="个人介绍：" rows={3} onChange={val => this.handleChange('info', val)}></TextareaItem>
                <Button className="button_width" type="primary" onClick={this.saveInfo}>保&nbsp;&nbsp;&nbsp;存</Button>
            </div>
        )
    }
}
export default connect(
    state => ({user:state.user}),
    {updateUser}
)(DaShenInfo)
