var CONFIG = require('../../../util/config');
var request = require('request');
var redis = require('redis');
var wrapper = require('co-redis');

module.exports = function(app) {
    return new Handler(app);
};

var Handler = function(app) {
    this.app = app;
};

var handler = Handler.prototype;

/**
 * New client entry chat server.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next stemp callback
 * @return {Void}
 */
handler.enter = function(msg, session, next) {
    var self = this;
    var rid = 'weicai-game-666'; //todo:房间ID由服务端进行分配（每个房间不超过300人）
    var uid = msg.uid + '*' + rid
    var server = self.app.get('serverId'); //获取当前连接服务器名称:connector-server-1
    var sessionService = self.app.get('sessionService');
    //验证是否已连接
    if (!!sessionService.getByUid(uid)) {
        if (msg.uid == CONFIG.SYSTEM_TOKEN) {
            self.app.rpc.chat.chatRemote.kick(session, uid, server, rid, { nickname: msg.uid, headimageurl: '' }, function() {
                //重新连接进来
                self.app.rpc.chat.chatRemote.add(session, uid, server, rid, true, { nickname: CONFIG.SYSTEM_TOKEN, headimageurl: '' }, function(users) {
                    console.debug('----------------------系统用户重复接入，重连成功，server：' + server);
                    next(null, {
                        code: CONFIG.STATUS_CODE.OK,
                        msg: '系统用户重复连接成功！'
                    });
                    return;
                });
            });
        } else {
            next(null, {
                code: CONFIG.STATUS_CODE.FAIL,
                msg: '当前用户重复连接！'
            });
            return;
        }
    } else {
        if (msg.uid == CONFIG.SYSTEM_TOKEN) {
            //系统用户接入
            session.bind(uid);
            session.set('rid', rid);
            session.push('rid', function(err) {
                if (err) {
                    console.error('set rid for session service failed! error is : %j', err.stack);
                }
            });
            session.on('closed', onUserLeave.bind(null, self.app));
            //添加当前用户到channel
            self.app.rpc.chat.chatRemote.add(session, uid, server, rid, true, { nickname: CONFIG.SYSTEM_TOKEN, headimageurl: '' }, function(users) {
                next(null, {
                    code: CONFIG.STATUS_CODE.OK,
                    msg: '系统用户连接成功！'
                });
            });
        } else {
            //查询用户基本信息（头像、昵称等）
            request.post({
                url: CONFIG.API_URL.GET_ACCOUNT_SUMMARY,
                headers: {
                    application: 'pomelo',
                    userToken: uid,
                    deviceNo: 'pomelo'
                },
                form: {
                    userToken: msg.uid
                }
            }, function(error, response, body) {
                body = JSON.parse(body);
                var status = body.State;
                if (status != 'success') {
                    next(null, { code: CONFIG.STATUS_CODE.FAIL, msg: '获取用户信息失败！' });
                    return;
                } else {
                    var nickName = body.Data.AccountName; //昵称
                    var headImageUrl = body.Data.AccountIconUrl; //头像
                    session.bind(uid);
                    session.set('rid', rid);
                    session.push('rid', function(err) {
                        if (err) {
                            console.error('set rid for session service failed! error is : %j', err.stack);
                        }
                    });
                    session.on('closed', onUserLeave.bind(null, self.app));
                    //添加当前用户到channel
                    self.app.rpc.chat.chatRemote.add(session, uid, server, rid, true, { nickname: nickName, headimageurl: headImageUrl }, async function(users) {
                        var client = redis.createClient(CONFIG.REDIS_CONN_CONFIG);
                        var redisCo = wrapper(client);
                        //添加当前用户到列表（redis）
                        var userdata = { "nickname": nickName, "headimageurl": headImageUrl };
                        await redisCo.hset(CONFIG.REDIS_DATA_KEY.WCG_666_USER_LIST, uid, JSON.stringify(userdata));
                        var usercount = await redisCo.hlen(CONFIG.REDIS_DATA_KEY.WCG_666_USER_LIST);
                        var userlist = [];
                        var userlistkeys = await redisCo.hkeys(CONFIG.REDIS_DATA_KEY.WCG_666_USER_LIST);
                        for (var i = 0; i < userlistkeys.length; i++) {
                            var key = userlistkeys[i];
                            var useritem = await redisCo.hget(CONFIG.REDIS_DATA_KEY.WCG_666_USER_LIST, key);
                            userlist.push(JSON.parse(useritem));
                        }
                        redisCo.quit();
                        next(null, {
                            code: CONFIG.STATUS_CODE.OK,
                            msg: 'connector server 连接成功！',
                            data: {
                                usercount: usercount,
                                userlist: userlist
                            }
                        });
                    });
                }
            });
        }
    }
};

/**
 * User log out handler
 *
 * @param {Object} app current application
 * @param {Object} session current session object
 *
 */
var onUserLeave = function(app, session) {
    if (!session || !session.uid) {
        return;
    }
    //从redis取用户信息
    var client = redis.createClient(CONFIG.REDIS_CONN_CONFIG);
    client.hget(CONFIG.REDIS_DATA_KEY.WCG_666_USER_LIST, session.uid, function(err, data) {
        //从channel移除
        app.rpc.chat.chatRemote.kick(session, session.uid, app.get('serverId'), session.get('rid'), JSON.parse(data), function() {
            //从redis移除
            client.hdel(CONFIG.REDIS_DATA_KEY.WCG_666_USER_LIST, session.uid, redis.print);
        });
    });
};