var express = require('express');
var router = express.Router();
// md5加密
const md5 = require('blueimp-md5')
// 引入用户数据模块
const UserModel = require('../db/modules.js').UserModel
// 查询时过滤出指定属性
const filter = {password:0} 
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
router.post('/register',function (req,res) {
  const {username,password,type} = req.body;
  UserModel.findOne({username},function (err,user) {
    if (user) {
      res.send({
        code:1,
        msg:'该用户已存在，请重新注册！'
      })
    } else {
      new UserModel({
        username,
        password:md5(password),
        type
      }).save(function (err,user) {
        // 持久化cookie，浏览器会保存在本地文件
        res.cookie('userid',user._id,{maxAge:1000*60*60*24*7});
        res.send({
          code:0,
          msg:'注册成功！',
          data:{
            _id:user._id,
            username,
            type
          }
        })
      })
    }
  })
})

// 登录路由
router.post('/login',function (req,res) {
  const{username,password} = req.body;
  // filter 密码不做返回
  UserModel.findOne({username,password:md5(password)},filter,function (err,user) {
    if (!user) {
      res.send({
        code:1,
        msg:'用户名或密码错误！'
      })
    } else {
      res.cookie('userid',user._id,{maxAge:1000*60*60*24*7});
      res.send({
        code:0,
        msg:'登录成功！',
        data:user
      })
    }
  })
})

module.exports = router;
