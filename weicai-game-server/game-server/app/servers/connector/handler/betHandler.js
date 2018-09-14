var CONFIG = require('../../../util/config');
var redis = require('redis');
var wrapper = require('co-redis');

module.exports = function(app) {
    return new Handler(app);
};

var Handler = function(app) {
    this.app = app;
};

var handler = Handler.prototype;

handler.get = async function(msg, session, next) {
    var scheduleId = msg.scheduleId; //期数ID
    var client = redis.createClient(CONFIG.REDIS_CONN_CONFIG);
    var redisCo = wrapper(client);
    //获取本期所有选项下注列表信息
    var optionlist = [];
    var betlistkeys = await redisCo.hkeys(CONFIG.REDIS_DATA_KEY.WCG_666_BET_LIST_PREFIX + scheduleId);
    for (var i = 0; i < betlistkeys.length; i++) {
        var key = betlistkeys[i];
        var value = await redisCo.hget(CONFIG.REDIS_DATA_KEY.WCG_666_BET_LIST_PREFIX + scheduleId, key);
        optionlist.push({ OptionId: key, BetNumber: value });
    }
    redisCo.quit();
    next(null, {
        code: CONFIG.STATUS_CODE.OK,
        msg: '下注信息获取成功！',
        data: optionlist
    });
};