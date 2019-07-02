import React, { Component } from 'react'
import { connect } from 'react-redux';
import { NavBar, List, InputItem } from 'antd-mobile'
import { sendMsg } from "../../redux/actions";
const Item = List.Item

class Chat extends Component {
    state = {
        content:''
    }
    handleSend = () => {
        // 收集数据
        const from = this.props.user._id
        const to = this.props.match.params.userid
        const content = this.state.content.trim()
        // 发送请求（发消息）
        if (content) {
            this.props.sendMsg({
                from,to,content
            })
        }
        // 清除输入数据
        this.setState({
            content:''
        })
    }
    render() {
        return (
            <div id='chat-page'>
                <NavBar>aa</NavBar>
                <List>
                    <Item thumb={require('../../assets/images/头像1.png')}>你好</Item>
                    <Item thumb={require('../../assets/images/头像1.png')} > 你好 2 </Item>
                    <Item className='chat-me' extra='我' > 很好 </Item>
                    <Item className='chat-me' extra='我' > 很好 2 </Item>
                </List>
                <div className='am-tab-bar'>
                    <InputItem value = {this.state.content} placeholder="请输入" onChange={val => this.setState({content:val})} extra={ <span onClick={this.handleSend}>发送</span> } />
                </div>
            </div>
        )
    }
}
export default connect(
    state => ({user:state.user}),
    {sendMsg}
)(Chat)
