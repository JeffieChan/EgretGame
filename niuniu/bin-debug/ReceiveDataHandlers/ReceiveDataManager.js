var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ReceiveDataHandlers;
(function (ReceiveDataHandlers) {
    var ReceiveDataManager = (function () {
        function ReceiveDataManager() {
        }
        ReceiveDataManager.pushHandler = function (handler) {
            if (!ReceiveDataManager.handlers)
                ReceiveDataManager.handlers = [];
            ReceiveDataManager.handlers.push(handler);
        };
        ReceiveDataManager.handleManager = function (data) {
            if (!ReceiveDataManager.handlers)
                return;
            for (var i = 0; i < ReceiveDataManager.handlers.length; i++) {
                if (ReceiveDataManager.handlers[i].handleReceiveData(data))
                    return;
            }
        };
        ReceiveDataManager.initBusinessHandlers = function (scene) {
            if (!ReceiveDataManager.handlers)
                ReceiveDataManager.handlers = [];
            // ReceiveDataManager.pushHandler(new ReceiveDataHandlers.BetReceiveDataHandler(scene));
            // ReceiveDataManager.pushHandler(new ReceiveDataHandlers.FreezeScheduleReceiveDataHandler(scene));
            // ReceiveDataManager.pushHandler(new ReceiveDataHandlers.ResultReceiveDataHandler(scene));
            // ReceiveDataManager.pushHandler(new ReceiveDataHandlers.UnfreezeScheduleReceiveDataHandler(scene));
            // // 默认handler，重要：需要放到最后
            // ReceiveDataManager.pushHandler(new ReceiveDataHandlers.DefaultReceiveDataHandler(scene));
        };
        return ReceiveDataManager;
    }());
    ReceiveDataHandlers.ReceiveDataManager = ReceiveDataManager;
    __reflect(ReceiveDataManager.prototype, "ReceiveDataHandlers.ReceiveDataManager");
})(ReceiveDataHandlers || (ReceiveDataHandlers = {}));
//# sourceMappingURL=ReceiveDataManager.js.map