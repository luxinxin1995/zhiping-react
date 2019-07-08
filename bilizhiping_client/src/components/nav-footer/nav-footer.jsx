import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TabBar } from "antd-mobile";
import { withRouter } from "react-router-dom";
const Item = TabBar.Item

// withRouter：在非路由组件中使用路由库的api
class NavFooter extends Component {
    static propTypes = {
        navList: PropTypes.array.isRequired,
        unReadCount: PropTypes.number.isRequired
    }
    render() {
        // nav.hide = true/false hide 代表当前项应该被隐藏
        let { navList,unReadCount } = this.props
        navList = navList.filter(nav => !nav.hide) // 回调函数返回值为 true, 当前元素就会留下, 否则不留
        //	当前请求的路径
        const { pathname } = this.props.location
        return (
            <TabBar>
                {
                    navList.map((nav) => (
                        <Item
                            key={nav.path}
                            badge={nav.path === '/message' ? unReadCount : 0}
                            title={nav.text}
                            icon={{ uri: require(`./images/${nav.icon}.png`) }}
                            selectedIcon={{ uri: require(`./images/${nav.icon}-selected.png`) }}
                            selected={pathname === nav.path}
                            onPress={() => {
                                this.props.history.replace(nav.path)
                            }}
                        />
                    ))
                }
            </TabBar>
        )
    }
}
// 向外暴露withRouter()包装产生的组件，在非路由组件中使用路由库的api
export default withRouter(NavFooter)