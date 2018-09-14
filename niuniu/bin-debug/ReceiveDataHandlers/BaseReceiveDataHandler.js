var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ReceiveDataHandlers;
(function (ReceiveDataHandlers) {
    var BaseReceiveDataHandler = (function () {
        function BaseReceiveDataHandler(scene) {
            this.scene = scene;
        }
        BaseReceiveDataHandler.prototype.handleReceiveData = function (data) {
            if (!data)
                return true;
            if (!data.msg)
                return true;
            var obj = null;
            try {
                obj = eval("(" + data.msg + ")");
            }
            catch (err) {
                if (!this.failedCallback) {
                    this.failedCallback("返回数据的data.msg不是json格式");
                }
                return true;
            }
            if (!obj) {
                if (!this.failedCallback) {
                    this.failedCallback("返回数据的data.msg没有被成功解析为对象");
                }
                return true;
            }
            // 不设type代表支持所有的
            if (this.supportedType == "") {
                if (this.successCallback)
                    this.successCallback(obj.data);
                return true;
            }
            if (obj.type != this.supportedType)
                return false;
            if (this.successCallback)
                this.successCallback(obj.data);
            return true;
        };
        return BaseReceiveDataHandler;
    }());
    ReceiveDataHandlers.BaseReceiveDataHandler = BaseReceiveDataHandler;
    __reflect(BaseReceiveDataHandler.prototype, "ReceiveDataHandlers.BaseReceiveDataHandler", ["ReceiveDataHandlers.IReceiveDataHandler"]);
})(ReceiveDataHandlers || (ReceiveDataHandlers = {}));
//# sourceMappingURL=BaseReceiveDataHandler.js.map