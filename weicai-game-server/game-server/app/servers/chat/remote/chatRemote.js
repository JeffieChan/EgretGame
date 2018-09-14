var CONFIG = require('../../../util/config');
module.exports = function(app) {
    return new ChatRemote(app);
};

var ChatRemote = function(app) {
    this.app = app;
    this.channelService = app.get('channelService');
};

/**
 * Add user into chat channel.
 *
 * @param {String} uid unique id for user
 * @param {String} sid server id
 * @param {String} name channel name
 * @param {boolean} flag channel parameter
 *
 */
ChatRemote.prototype.add = function(uid, sid, name, flag, userinfo, cb) {
    var channel = this.channelService.getChannel(name, flag);
    var param = {
        route: 'onAdd',
        user: userinfo //当前连接进来的用户信息（昵称和头像）
    };
    if (userinfo.nickname != CONFIG.SYSTEM_TOKEN) {
        //不是系统用户，则推送给所有连接用户
        channel.pushMessage(param);
    }
    if (!!channel) {
        channel.add(uid, sid);
    }
    cb(this.get(name, flag));
};

/**
 * Get user from chat channel.
 *
 * @param {Object} opts parameters for request
 * @param {String} name channel name
 * @param {boolean} flag channel parameter
 * @return {Array} users uids in channel
 *
 */
ChatRemote.prototype.get = function(name, flag) {
    var users = [];
    var userlist = new Array();
    var channel = this.channelService.getChannel(name, flag);
    if (!!channel) {
        users = channel.getMembers();
    }
    for (var i = 0; i < users.length; i++) {
        var uid = users[i];
        useritem = channel.getMember(uid);
        userlist.push(useritem);
    }
    return userlist;
};

/**
 * Kick user out chat channel.
 *
 * @param {String} uid unique id for user
 * @param {String} sid server id
 * @param {String} name channel name
 *
 */
ChatRemote.prototype.kick = function(uid, sid, name, userinfo, cb) {
    var channel = this.channelService.getChannel(name, false);
    // leave channel
    if (!!channel) {
        channel.leave(uid, sid);
    }
    var param = {
        route: 'onLeave',
        user: userinfo //当前断开连接的用户信息（昵称和头像）
    };

    if (userinfo != null && userinfo.nickname != CONFIG.SYSTEM_TOKEN) {
        //不是系统用户，则推送给所有连接用户
        channel.pushMessage(param);
    }
    cb();
};