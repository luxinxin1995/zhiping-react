var express = require('express');
var router = express.Router();
// md5加密
const md5 = require('blueimp-md5')
// 引入用户数据模块
const UserModel = require('../db/modules.js').UserModel
// 查询时过滤出指定属性
const filter = { password: 0 }
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// 注册路由：用户注册
/**
a)	path 为: /register
b)	请求方式为: POST
c)	接收 username 和 password 参数
d)	admin 是已注册用户
e)	注册成功返回: {code: 0, data: {_id: 'abc', username: ‘xxx’, password:’123’}
f)	注册失败返回: {code: 1, msg: '此用户已存在'}
 *  */
router.post('/register', function (req, res) {
  const { username, password, type } = req.body;
  UserModel.findOne({ username }, function (err, user) {
    if (user) {
      res.send({
        code: 1,
        msg: '该用户已存在，请重新注册！'
      })
    } else {
      new UserModel({
        username,
        password: md5(password),
        type
      }).save(function (err, user) {
        // 持久化cookie，浏览器会保存在本地文件
        res.cookie('userid', user._id, { maxAge: 1000 * 60 * 60 * 24 * 7 });
        res.send({
          code: 0,
          msg: '注册成功！',
          data: {
            _id: user._id,
            username,
            type
          }
        })
      })
    }
  })
})

// 登录路由
router.post('/login', function (req, res) {
  const { username, password } = req.body;
  // filter 密码不做返回
  UserModel.findOne({ username, password: md5(password) }, filter, function (err, user) {
    if (!user) {
      res.send({
        code: 1,
        msg: '用户名或密码错误！'
      })
    } else {
      res.cookie('userid', user._id, { maxAge: 1000 * 60 * 60 * 24 * 7 });
      res.send({
        code: 0,
        msg: '登录成功！',
        data: user
      })
    }
  })
})

// 更新用户信息路由
router.post('/update', function (req, res) {
  // 得到请求cookie的userid
  const userid = req.cookies.userid;
  if (!userid) {
    return res.send({
      code: 1,
      msg: '请前往登录！'
    })
  }
  const user = req.body
  UserModel.findByIdAndUpdate({ _id: userid }, user, function (err, old_user) {
    if (!old_user) {
      // 通知浏览器删除useridde cookie
      res.clearCookie('userid')
      res.send({
        code: 1,
        msg: '请前往登录！'
      })
    } else {
      // 得到数据库原有的数据
      const { _id, username, type } = old_user
      // 合并用户信息
      // 	assign(obj1, obj2, obj3,...) // 将多个指定的对象进行合并, 返回一个合并后的对象
      const data = Object.assign(user, { _id, username, type })
      res.send({
        code: 0,
        data,
        msg: '修改个人信息成功！'
      })
    }
  })
})
module.exports = router;
