import React, { Component } from 'react'
import { connect } from 'react-redux';
import { NavBar, Icon, List, InputItem, Grid } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
import { sendMsg, readMsg } from "../../redux/actions";
const Item = List.Item

class Chat extends Component {
    state = {
        content: '',
        isShow: false//是否显示表情列表
    }
    componentWillMount() {
        this.emojis = ['😀', '😁', '😍', '😘', '😪', '😀', '😁', '😍', '😘', '😪', '😀', '😁', '😍', '😘', '😪', '😀', '😁', '😍', '😘', '😪', '😀', '😁', '😍', '😘', '😪', '😀', '😁', '😍', '😘', '😪', '😀', '😁', '😍', '😘', '😪', '😀', '😁', '😍', '😘', '😪', '😀', '😁', '😍', '😘', '😪', '😀', '😁', '😍', '😘', '😪']
        this.emojis = this.emojis.map(value => ({ text: value }))
    }
    // 滑动到页面底部
    componentDidMount() {
        window.scrollTo(0, document.body.scrollHeight)
    }
    // 退出之前
    componentWillUnmount() {
        // 发送请求更新消息的未读状态
        const from = this.props.match.params.userid
        const to = this.props.user._id
        this.props.readMsg(from, to)
    }
    componentDidUpdate() {
        window.scrollTo(0, document.body.scrollHeight)
    }
    handleSend = () => {
        // 收集数据
        const from = this.props.user._id
        const to = this.props.match.params.userid
        const content = this.state.content.trim()
        // 发送请求（发消息）
        if (content) {
            this.props.sendMsg({
                from, to, content
            })
        }
        // 清除输入数据
        this.setState({
            content: '',
            isShow: false
        })
    }
    sendEmojo = () => {
        const isShow = !this.state.isShow
        this.setState({ isShow })
        if (isShow) {
            //	异步手动派发 resize 事件,解决表情列表显示的 bug
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))

            }, 0)
        }
    }
    render() {
        const { user } = this.props
        const { users, chatMsgs } = this.props.chat
        // 计算当前聊天的chatId
        const myId = user._id
        if (!users[myId]) {
            // 还未获取到数据，不做任何显示
            return null
        }
        const targetId = this.props.match.params.userid
        const chatId = [myId, targetId].sort().join('_')
        // 对chatMsgs过滤
        const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)
        // 得到目标用户的头像
        const targetHeader = users[targetId].header
        const targetPhoto = targetHeader ? require(`../../assets/images/${targetHeader}.png`) : null
        return (
            <div id='chat-page'>
                <NavBar icon={<Icon type="left" />} onLeftClick={() => this.props.history.go(-1)}>{users[targetId].username}</NavBar>
                <List>
                    <QueueAnim type='scale' delay={100}>
                        {msgs.map(msg => {
                            if (myId === msg.to) {
                                // 对方发给我
                                return (
                                    <Item key={msg._id} className='chat-other' thumb={targetPhoto}>{msg.content}</Item>
                                )
                            } else {
                                // 我发给对方
                                return (
                                    <Item key={msg._id} className='chat-me' extra='我'>{msg.content}</Item>
                                )
                            }
                        })}
                    </QueueAnim>
                </List>
                <div className='am-tab-bar'>
                    <InputItem value={this.state.content} placeholder="请输入" onChange={val => this.setState({ content: val })} extra={
                        <span>
                            <span className="emojo" onClick={this.sendEmojo}>🙂</span>
                            <span onClick={this.handleSend}>发送</span>
                        </span>
                    }
                    />
                    {
                        this.state.isShow ? (
                            <Grid
                                data={this.emojis}
                                columnNum={8}
                                carouselMaxRow={4}
                                isCarousel={true}
                                onClick={(item) => {
                                    this.setState({ content: this.state.content + item.text })
                                }}
                            />
                        ) : null
                    }
                </div>
            </div>
        )
    }
}
export default connect(
    state => ({ user: state.user, chat: state.chat }),
    { sendMsg, readMsg }
)(Chat)
