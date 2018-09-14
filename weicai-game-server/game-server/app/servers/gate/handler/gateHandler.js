var dispatcher = require('../../../util/dispatcher');
var CONFIG = require('../../../util/config');
var request = require('request');

module.exports = function(app) {
    return new Handler(app);
};

var Handler = function(app) {
    this.app = app;
};

var handler = Handler.prototype;

/**
 * Gate handler that dispatch user to connectors.
 *
 * @param {Object} msg message from client
 * @param {Object} session
 * @param {Function} next next stemp callback
 *
 */
handler.queryEntry = function(msg, session, next) {
    var uid = msg.uid;
    if (!uid) {
        next(null, { code: CONFIG.STATUS_CODE.FAIL, msg: '请传入usertoken！' });
        return;
    }
    var self = this;
    if (msg.uid == CONFIG.SYSTEM_TOKEN) {
        //获取所有连接服务器
        var connectors = self.app.getServersByType('connector');
        if (!connectors || connectors.length === 0) {
            next(null, { code: CONFIG.STATUS_CODE.FAIL, msg: '连接服务器为空！' });
            return;
        }
        // 分配连接服务器并返回相应连接信息
        var res = dispatcher.dispatch(uid, connectors);
        next(null, { code: CONFIG.STATUS_CODE.OK, msg: 'connector server分配成功！', data: { host: res.host, port: res.clientPort } });
    } else {
        //校验token（请求api）
        request.post({
                url: CONFIG.API_URL.CHECK_USERTOKEN,
                headers: { application: 'pomelo', userToken: uid, deviceNo: 'pomelo' },
                form: { userToken: uid }
            },
            function(error, response, body) {
                if (!error && response.statusCode == CONFIG.STATUS_CODE.OK) {
                    body = JSON.parse(body);
                    var status = body.State;
                    if (status != 'success') {
                        next(null, { code: CONFIG.STATUS_CODE.FAIL, msg: 'token校验失败！' });
                        return;
                    } else {
                        //获取所有连接服务器
                        var connectors = self.app.getServersByType('connector');
                        if (!connectors || connectors.length === 0) {
                            next(null, { code: CONFIG.STATUS_CODE.FAIL, msg: '连接服务器为空！' });
                            return;
                        }
                        // 分配连接服务器并返回相应连接信息
                        var res = dispatcher.dispatch(uid, connectors);
                        next(null, { code: CONFIG.STATUS_CODE.OK, msg: 'connector server分配成功！', data: { host: res.host, port: res.clientPort } });
                    }
                } else {
                    next(null, { code: CONFIG.STATUS_CODE.FAIL, msg: 'token校验异常！' });
                    return;
                }
            }
        );
    }
};