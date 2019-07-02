const { ChatModel } = require('../db/modules.js')
module.exports = function (server) {
    //	得到 IO 对象
    const io = require('socket.io')(server)
    //	监视连接(当有一个客户连接上时回调)
    io.on('connection', function (socket) {
        console.log('soketio connected')
        //	绑定 sendMsg 监听, 接收客户端发送的消息 
        socket.on('sendMsg', function ({ from, to, content }) {
            console.log('服务器接收到浏览器的消息', { from, to, content })
            // 处理数据（保存消息），准备chatMsg对象相关数据
            const chat_id = [from, to].sort().join('_') //from_to或to_from
            const create_time = Date.now()
            new ChatModel({ from, to, content, chat_id, create_time }).save(function (err, chatMsg) {
                //	向客户端发送消息(名称, 数据)
                io.emit('receiveMsg', chatMsg)
            })
        })
    })
}
