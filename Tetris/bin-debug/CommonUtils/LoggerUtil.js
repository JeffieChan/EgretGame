var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CommonUtils;
(function (CommonUtils) {
    var LoggerUtil = (function () {
        function LoggerUtil() {
        }
        LoggerUtil.log = function (data) {
            if (this.showLog) {
                console.log(data);
            }
        };
        LoggerUtil.showLog = false;
        return LoggerUtil;
    }());
    CommonUtils.LoggerUtil = LoggerUtil;
    __reflect(LoggerUtil.prototype, "CommonUtils.LoggerUtil");
})(CommonUtils || (CommonUtils = {}));
//# sourceMappingURL=LoggerUtil.js.map