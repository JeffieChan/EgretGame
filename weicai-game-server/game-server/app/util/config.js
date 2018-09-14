var API_BASE_URL = 'http://123.206.174.209:81'; //api请求地址
module.exports = {
    REDIS_CONN_CONFIG: {
        host: '123.206.174.209',
        port: '6379',
        password: 'gudi0417'
    }, //redis连接信息
    REDIS_DATA_KEY: {
        WCG_666_USER_LIST: 'wcg-666-userlist', //666当前连接用户列表HASH KEY
        WCG_666_BET_LIST_PREFIX: 'wcg-666-betlist-' //每期下注数据列表（只记录选项和下注总额）
    },
    API_URL: {
        CHECK_USERTOKEN: API_BASE_URL + '/Account/CheckUserToken', //校验TOKEN
        GET_ACCOUNT_SUMMARY: API_BASE_URL + '/Account/GetAccountSummary', //获取帐号概要信息
        GAME_666_BET: API_BASE_URL + '/OtherGame/Game_666_Bet' //666下注
    },
    SYSTEM_TOKEN: 'wcg-666-system', //系统用户token（用于转发系统消息推送）
    STATUS_CODE: {
        OK: 200, //正常
        ALREADY_CONNECT: 201, //当前已连接
        FAIL: 500 //失败/异常
    },
    MSG_TYPE: {
        BET: 'bet', //下注
        FREEZE: 'freeze', //停止下注
        UNFREEZE: 'unfreeze', //可下注
        RESULT: 'result' //开奖结果
    }
};