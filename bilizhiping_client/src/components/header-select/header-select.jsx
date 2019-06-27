import React, { Component } from 'react'
import { List,Grid } from 'antd-mobile'
import PropTypes from 'prop-types'
export default class HeaderSelect extends Component {
    static propsTypes = {
        setHeader: PropTypes.func.isRequired
    }
    state = {
        icon:null,//图片对象，默认为空
    }
    constructor(props) {
        super(props)
        // 准备需要显示的头像列表数据
        this.headerList = [];
        for (let i = 1; i < 21; i++) {
            const text = `头像${i}`        
            this.headerList.push({
                text,
                icon:require(`../../assets/images/${text}.png`)
            })
        }
    }
    
    handleClick = ({text,icon}) => {
        // 更新当前组件状态
        this.setState({icon})
        // 调用函数更新父组件状态
        this.props.setHeader(text)
    }
    render() {
        const {icon} = this.state
        const listHeader = !icon ? '请选择头像' : (
            <div>
                已选择头像：<img src={icon} alt=""/>
            </div>
        )
        return (
            <div>
                <List renderHeader={() => listHeader}>
                    <Grid data={this.headerList} columnNum={5} onClick={this.selectHeader} onClick={this.handleClick}/>
                </List>
            </div>
        )
    }
}
