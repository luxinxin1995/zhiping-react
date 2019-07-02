// 包含n个操作数据库集合数据的model模块
/**

 * 1.	连接数据库

1.1. 引入 mongoose

1.2. 连接指定数据库(URL 只有数据库是变化的)

1.3. 获取连接对象

1.4. 绑定连接完成的监听(用来提示连接成功)

2.	定义出对应特定集合的 Model 并向外暴露

2.1. 字义 Schema(描述文档结构)

2.2. 定义 Model(与集合对应, 可以操作集合)

2.3. 向外暴露 Model
 */
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/bilizhipin')
const conn = mongoose.connection
conn.on('connected',() => {
    console.log('db connect success!')
})

const userSchema = mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    type:{
        type:String,
        require:true
    },
    header:{
        type:String //头像
    },
    post:{
        type:String //职位
    },
    info:{
        type:String //个人简介
    },
    company:{
        type:String //公司
    },
    salary:{
        type:String //薪资
    }
})
const UserModel = mongoose.model('user',userSchema)
exports.UserModel = UserModel

// 定义chats集合的文档结构
const chatSchema = mongoose.Schema({
    from:{
        type:String,//发送用户id
        require:true
    },
    to:{
        type:String,//接收用户的id
        require:true
    },
    chat_id:{
        type:String,//from和to组成的字符串
        require:true
    },
    content:{
        type:String,//内容
        require:true
    },
    read:{
        type:Boolean,//标识是否已读
        defalut:false
    },
    create_time:{
        type:Number//创建时间
    }
})
const ChatModel = mongoose.model('chat',chatSchema)
exports.ChatModel = ChatModel