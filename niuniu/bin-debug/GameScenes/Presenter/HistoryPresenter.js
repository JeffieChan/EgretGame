var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameScenes;
(function (GameScenes) {
    var HistoryPresenter = (function (_super) {
        __extends(HistoryPresenter, _super);
        function HistoryPresenter(view) {
            var _this = _super.call(this) || this;
            _this.view = view;
            _this.historyData = new Array();
            return _this;
        }
        HistoryPresenter.prototype.getHistoryRecord = function (scheduleId) {
            Server.Connector.getGameClient().getHistoryRecord(scheduleId, 10, this);
        };
        HistoryPresenter.prototype.getMoreHistoryRecord = function (scheduleId) {
            Server.Connector.getGameClient().getHistoryRecord(scheduleId, 10, this);
        };
        HistoryPresenter.prototype.onGetHistoryRecordFailed = function (data) {
        };
        HistoryPresenter.prototype.onGetHistoryRecordSuccess = function (data) {
            var _this = this;
            if (data && data.length > 0) {
                data.forEach(function (val) {
                    _this.historyData.push(val);
                });
            }
            this.view.setHistoryRowData(data);
        };
        return HistoryPresenter;
    }(GameScenes.BasePresenter));
    GameScenes.HistoryPresenter = HistoryPresenter;
    __reflect(HistoryPresenter.prototype, "GameScenes.HistoryPresenter");
})(GameScenes || (GameScenes = {}));
//# sourceMappingURL=HistoryPresenter.js.map