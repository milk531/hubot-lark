'use strict'

const {Adapter,TextMessage,EnterMessage,LeaveMessage,User} = require.main.require('hubot/es2015');

class Lark extends Adapter {
    constructor(robot) {
        super(robot);
    }

    send(envelope, ...strings) {
        this.robot.logger.info("Send");
    }

    reply(envelope, ...strings) {
        this.robot.logger.info(envelope);
        this.robot.logger.info(strings[0]);
        this.robot.logger.info("Reply");
    }

    run() {
        this.robot.logger.info(`[startup] Lark adapter in use`);
        this.robot.logger.info(`[startup] Respond to name: ${this.robot.name}`)
        this.emit("connected");

        this.robot.router.post('/hubot/chatsecrets/:room', (req, res) =>{
            room   = req.params.room
            data   = if req.body.payload? then JSON.parse req.body.payload else req.body
            secret = data.secret

            robot.messageRoom room, "I have a secret: #{secret}"

            res.send 'OK'
        });
        const user = new User(1001, {
            name: 'Sample User'
        });
        const message = new TextMessage(user, 'nibbler sandbox list', 'MSG-001');
        this.robot.receive(message);
    }
}


exports.use = (robot) => new Lark(robot);