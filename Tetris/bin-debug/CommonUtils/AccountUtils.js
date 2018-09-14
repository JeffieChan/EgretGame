var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CommonUtils;
(function (CommonUtils) {
    var AccountUtils = (function () {
        function AccountUtils() {
        }
        AccountUtils.getAccountData = function () {
            return this.accountData;
        };
        AccountUtils.updateWxJsCode = function (jsCode) {
            this.wxUserData.code = jsCode;
        };
        AccountUtils.setAccountData = function (accountData) {
            this.accountData = accountData;
        };
        AccountUtils.getwxUserData = function () {
            return this.wxUserData;
        };
        AccountUtils.setwxUserData = function (wxUserData) {
            this.wxUserData = wxUserData;
        };
        return AccountUtils;
    }());
    CommonUtils.AccountUtils = AccountUtils;
    __reflect(AccountUtils.prototype, "CommonUtils.AccountUtils");
})(CommonUtils || (CommonUtils = {}));
//# sourceMappingURL=AccountUtils.js.map