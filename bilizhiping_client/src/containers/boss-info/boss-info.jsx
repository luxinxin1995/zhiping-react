// boss信息完善的路由容器组件
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { NavBar,InputItem,TextareaItem,Button } from "antd-mobile";
import HeaderSelect from '../../components/header-select/header-select';
import { Redirect } from "react-router-dom";
import { updateUser } from "../../redux/actions";
class BossInfo extends Component {
    state = {
        header:'',
        post:'',
        company:'',
        salary:'',
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
                <NavBar>BOSS信息完善</NavBar>
                <HeaderSelect setHeader={this.setHeader}/>
                {msg ? <p className='error-msg'>{msg}</p> : null}
                <InputItem placeholder="请输入招聘职位" onChange={val => this.handleChange('post', val)}>招聘职位：</InputItem>
                <InputItem placeholder="请输入公司名称" onChange={val => this.handleChange('company', val)}>公司名称：</InputItem>
                <InputItem placeholder="请输入职位薪资" onChange={val => this.handleChange('salary', val)}>职位薪资：</InputItem>
                <TextareaItem title="职位要求：" rows={3} onChange={val => this.handleChange('info', val)}></TextareaItem>
                <Button className="button_width" type="primary" onClick={this.saveInfo}>保&nbsp;&nbsp;&nbsp;存</Button>
            </div>
        )
    }
}
export default connect(
    state => ({user:state.user}),
    {updateUser}
)(BossInfo)
