var CONFIG = require('../../../util/config');
var request = require('request');
var redis = require('redis');
var chatRemote = require('../remote/chatRemote');
module.exports = function(app) {
    return new Handler(app);
};
var Handler = function(app) {
    this.app = app;
};
var handler = Handler.prototype;
/**
 * Send messages to users
 *
 * @param {Object} msg message from client
 * @param {Object} session
 * @param  {Function} next next stemp callback
 *
 */
handler.send = function(msg, session, next) {
    try {
        var _this = this;
        var content = msg.content; //消息内容
        var msgdata = JSON.parse(content); //反序列化
        var msgtype = msgdata.type;
        if (msgtype == CONFIG.MSG_TYPE.BET) {
            var uid = session.uid.split('*')[0];
            var scheduleId = msgdata.data.scheduleId;
            var betData = msgdata.data.betData;
            //处理下注信息（提交api）
            request.post({
                url: CONFIG.API_URL.GAME_666_BET,
                headers: { application: 'pomelo', userToken: uid, deviceNo: 'pomelo' },
                form: { userToken: uid, scheduleId: scheduleId, betContent: JSON.stringify(betData) }
            }, function(error, response, body) {
                body = JSON.parse(body);
                var status = body.State;
                if (status == 'success') {
                    //记录到redis
                    var client = redis.createClient(CONFIG.REDIS_CONN_CONFIG);
                    if (betData != null && betData.length > 0) {
                        for (var i = 0; i < betData.length; i++) {
                            client.hincrby(CONFIG.REDIS_DATA_KEY.WCG_666_BET_LIST_PREFIX + scheduleId.toString(), betData[i].OptionId, betData[i].BetNumber);
                        }
                    }
                    //推送给所有用户
                    var param = { msg: content, from: uid, target: "*" };
                    var rid = session.get('rid');
                    var channelService = _this.app.get('channelService');
                    channel = channelService.getChannel(rid, false);
                    channel.pushMessage('onChat', param);
                    next(null, { code: CONFIG.STATUS_CODE.OK, msg: '下注成功！', data: { totalbonus: 0, accountbonus: body.Data } });
                } else {
                    next(null, { code: CONFIG.STATUS_CODE.FAIL, msg: body.Message });
                }
            });
        } else {
            if (IsSystemMessage(msgtype)) {
                //推送系统消息（停止下注、开始下注、开奖结果）
                var uid = session.uid.split('*')[0];
                var rid = session.get('rid');
                if (msgtype == CONFIG.MSG_TYPE.UNFREEZE) {
                    //如果是开始下注，则清除刚结束的这一期的下注记录           
                    var scheduleId = msgdata.data.scheduleId;
                    var client = redis.createClient(CONFIG.REDIS_CONN_CONFIG);
                    client.del(CONFIG.REDIS_DATA_KEY.WCG_666_BET_LIST_PREFIX + scheduleId);
                }
                var channelService = _this.app.get('channelService');
                channel = channelService.getChannel(rid, false);
                if (msgtype == CONFIG.MSG_TYPE.RESULT) {
                    //开奖结果分别发送给每一个用户
                    var userList = msgdata.data.userList;
                    for (var userIndex = 0; ui < userList.length; userIndex++) {
                        var resultData = {
                            type: 'result',
                            data: {
                                valueList: msgdata.data.valueList,
                                scheduleId: msgdata.data.scheduleId,
                                bonusBalance: userList[userIndex].WinNumber,
                                nextSchedule: msgdata.data.nextSchedule
                            }
                        };
                        content = JSON.stringify(resultData);
                        console.debug('--------------------------------------------------推送' + msgtype + '消息：' + content);
                        var param = { msg: JSON.stringify(resultData), from: uid, target: userList[userIndex].UserToken };
                        channel.pushMessage('onChat', param);
                    }
                } else {
                    var param = { msg: content, from: uid, target: msg.target };
                    console.debug('--------------------------------------------------推送' + msgtype + '消息：' + content);
                    channel.pushMessage('onChat', param);
                }
                next(null, { code: CONFIG.STATUS_CODE.OK, msg: msgtype + '消息推送成功！' });
            } else {
                next(null, { code: CONFIG.STATUS_CODE.FAIL, msg: '不支持的消息类型！' });
            }
        }
    } catch (err) {
        next(null, { code: CONFIG.STATUS_CODE.FAIL, msg: '程序异常：' + err });
    }
};

/**
 * 判断是否系统消息（转发）
 * @param {String} msgType 消息类型 
 */
function IsSystemMessage(msgType) {
    if (msgType != null && msgType != '' && msgType != undefined) {
        return (msgType == CONFIG.MSG_TYPE.FREEZE || msgType == CONFIG.MSG_TYPE.UNFREEZE || msgType == CONFIG.MSG_TYPE.RESULT);
    }
}