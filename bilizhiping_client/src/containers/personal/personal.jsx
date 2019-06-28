// 个人中心
import React, { Component } from 'react'
import { connect } from 'react-redux';
class Personal extends Component {
    render() {
        return (
            <div>
                Personal
            </div>
        )
    }
}
export default connect(
    state => ({

    })
)(Personal)