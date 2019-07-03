import ajax from './ajax'
// 注册
export const reqRegister = (user) => ajax('/register',user,'POST')
// 登录
export const reqLogin = (user) => ajax('/login',user,'POST')
// 更新用户
export const reqUpdateUser = (user) => ajax('/update',user,'POST')
// 获取用户信息
export const reqGetUser = () => ajax('/user')
// 根据用户类型获取用户列表
export const reqUsersByType = (type) => ajax('/list',{type})
// 获取消息列表
export const reqChatMsgList = () => ajax('/msglist')
// 修改消息为已读
export const reqReadMsg = (from) => ajax('/readmsg',{from},'POST')
