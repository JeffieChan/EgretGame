var crc = require('crc');

module.exports.dispatch = function(uid, connectors) {
    console.debug('------------------------------uid----------' + uid);
    if (uid == undefined) {
        //理论上uid不应该是undifined，此处代码主要解决当前部分情况下的异常
        return connectors[0];
    } else {
        var index = Math.abs(crc.crc32(uid)) % connectors.length;
        // return connectors[index];
        return connectors[0];
    }
};