// 消息列表
import React, { Component } from 'react'
import { connect } from 'react-redux';
class Message extends Component {
    render() {
        return (
            <div>
                Message
            </div>
        )
    }
}
export default connect(
    state => ({
        
    })
)(Message)