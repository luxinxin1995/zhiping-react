import { reqRegister, reqLogin } from '../api/index'
import { AUTH_SUCCESS, ERROR_MSG } from "./action-types";

// 授权成功的同步action
const authSuccess = (user) => ({
    type: AUTH_SUCCESS,
    data: user
})
// 错误提示信息的同步action
const errorMsg = (msg) => ({
    type: ERROR_MSG,
    data:msg
})

// 包含n个action creater，异步action，同步action
export const register = ({ username, password, confirmPassword, type }) => {
    if (!username || !password || !type) {
        return errorMsg('用户名密码必须输入！')
    }
    if (password !== confirmPassword) {
        return errorMsg('两次密码输入不一致！')
    }
    return async dispatch => {
        const response = await reqRegister({ username, password, type })
        const result = response.data
        if (result.code === 0) {
            // 分发成功的action
            dispatch(authSuccess(result.data))
        } else {
            dispatch(errorMsg(result.msg))
        }
    }
}
export const login = ({ username, password }) => {
    if (!username || !password) {
        return errorMsg('用户和密码必须输入！')
    }
    return async dispatch => {
        const response = await reqLogin({ username, password })
        const result = response.data
        if (result.code === 0) {
            // 分发成功的action
            dispatch(authSuccess(result.data))
        } else {
            dispatch(errorMsg(result.msg))
        }
    }
}