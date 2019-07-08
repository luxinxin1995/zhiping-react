import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief
// 对chatMsgs按chat_id进行分组，并得到每个组的lastMsg组成的数组
/*
 * 1.找出每个聊天的lastMsg，并用一个对象容器来保存{chat_id,lastMsg}
 * 2.得到所有lastMsg的数组
 * 3.对数组进行排序（按create_time降序）
 */
function getLastMsgs(chatMsgs,userid) {
    const lastMsgObjs = {}
    chatMsgs.forEach(msg => {
        // 对msg进行个数的统计
        if (msg.to === userid && !msg.read) {
            msg.unReadCount = 1
        } else {
            msg.unReadCount = 0
        }

        // 得到msg的聊天标识id
        const chatId = msg.chat_id
        // 获取已保存的当前组件的lastMsg
        let lastMsg = lastMsgObjs[chatId]
        // 不存在
        if (!lastMsg) {
            lastMsgObjs[chatId] = msg
        } else {
            // 累加unReadCount = 已经统计的+当前msg的
            const unReadCount = lastMsg.unReadCount + msg.unReadCount
            // 如果msg比lastMsg晚，就将msg保存为lastMsg
            if (msg.create_time > lastMsg.create_time) {
                lastMsgObjs[chatId] = msg
            }
            // 累加unReadCount并保存在最新的lastMsg上
            lastMsgObjs[chatId].unReadCount = unReadCount
        }
    });
    const lastMsgs = Object.values(lastMsgObjs)
    lastMsgs.sort(function (t1, t2) {
        // < 0,则t1<t2
        return t2.create_time - t1.create_time
    })
    return lastMsgs
}

class Message extends Component {
    render() {
        const { user } = this.props
        const { users, chatMsgs } = this.props.chat
        // 对chatMsgs按chat_id进行分组
        const lastMsgs = getLastMsgs(chatMsgs,user._id)

        return (
            <List style={{ marginTop: 45, marginBottom: 50 }}>
                {lastMsgs.map(msg => {
                    const targetUserId = msg.to === user._id ? msg.from : msg.to
                    const targetUser = users[targetUserId]
                    return (
                        <Item
                            key={msg._id}
                            extra={<Badge text={msg.unReadCount} />}
                            thumb={targetUser.header ? require(`../../assets/images/${targetUser.header}.png`) : null}
                            arrow='horizontal'
                            onClick={() => this.props.history.push(`/chat/${targetUserId}`)}
                        >
                            {targetUser.username}
                            <Brief>{msg.content}</Brief>
                        </Item>
                    )
                })
                }
            </List>
        )
    }
}
export default connect(
    state => ({ user: state.user, chat: state.chat }),
)(Message)