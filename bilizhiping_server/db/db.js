// 使用mongoose操作mongodb数据库
/**

 * 1.	连接数据库

1.1. 引入 mongoose

1.2. 连接指定数据库(URL 只有数据库是变化的)

1.3. 获取连接对象

1.4. 绑定连接完成的监听(用来提示连接成功)

2.	得到对应特定集合的 Model

2.1. 字义 Schema(描述文档结构)

2.2. 定义 Model(与集合对应, 可以操作集合)

3.	通过 Model 或其实例对集合数据进行 CRUD 操作

3.1. 通过 Model 实例的 save()添加数据

3.2. 通过 Model 的 find()/findOne()查询多个或一个数据

3.3. 通过 Model 的 findByIdAndUpdate()更新某个数据

3.4. 通过 Model 的 remove()删除匹配的数据

 */
const md5 = require('blueimp-md5')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bilizhipin');
const conn = mongoose.connection;
conn.on('connected',function () {
    console.log('数据库连接成功！')
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
    }
})

const UserModel = mongoose.model('user',userSchema)

// 新增
function save_test() {
    // user数据对象
    const user = {
        username:'lxx',
        password:md5('123'),
        type:'dashen'
    }
    const userModel = new UserModel(user)

    // 保存到数据库
    userModel.save(function (err,user) {
        console.log('save',err,user)
    })
}
// save_test()

// 查找
function find_test() {
    // 查找所有
    UserModel.find(function (err,users) {
        console.log('find',err,users)
    })
    // 查找一个
    UserModel.findOne({_id:'5d12dce6e3e91032c41ab22c'},function (err,user) {
        // 匹配到返回指定user，否则返回null
        console.log('findOne',err,user)
    })
}
// find_test()

// 修改
function update_test() {
    UserModel.findByIdAndUpdate({_id:'5d12dce6e3e91032c41ab22c'},{username:'Tom'},function (err,user) {
        console.log('findByIdAndUpdate',err,user)
    })
}
// update_test()

// 删除
function remove_test() {
    UserModel.remove({_id:'5d12dce6e3e91032c41ab22c'},function (err,result) {
        console.log('remove',err,result)
    })
}
// remove_test()