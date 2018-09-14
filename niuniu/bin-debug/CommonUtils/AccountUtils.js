var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CommonUtils;
(function (CommonUtils) {
    var AccountUtils = (function () {
        function AccountUtils() {
        }
        AccountUtils.getAccountToken = function () {
            if (!this.accountToken) {
                this.accountToken = document.getElementById("userToken").attributes["value"].value;
            }
            return this.accountToken;
        };
        return AccountUtils;
    }());
    CommonUtils.AccountUtils = AccountUtils;
    __reflect(AccountUtils.prototype, "CommonUtils.AccountUtils");
})(CommonUtils || (CommonUtils = {}));
//# sourceMappingURL=AccountUtils.js.map