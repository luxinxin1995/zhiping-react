// 包含n个reducer函数：根据旧的state和指定的action返回一个新的state
import { combineReducers } from 'redux';

function xy(state = 0, action) {
    return state
}
function xyz(state = 0, action) {
    return state
}
export default combineReducers({
    xy, xyz
})
// 向外暴露的状态结构{xy:0,xyz:0}