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
    var TrendPresenter = (function (_super) {
        __extends(TrendPresenter, _super);
        function TrendPresenter(view) {
            var _this = _super.call(this) || this;
            _this.view = view;
            return _this;
        }
        TrendPresenter.prototype.getTrend = function () {
            Server.Connector.getGameClient().getTrend(this);
        };
        TrendPresenter.prototype.onGetTrendFailed = function (data) {
        };
        TrendPresenter.prototype.onGetTrendSuccess = function (data) {
            this.view.setTrendRowData(data.Data);
        };
        return TrendPresenter;
    }(GameScenes.BasePresenter));
    GameScenes.TrendPresenter = TrendPresenter;
    __reflect(TrendPresenter.prototype, "GameScenes.TrendPresenter");
})(GameScenes || (GameScenes = {}));
//# sourceMappingURL=TrendPresenter.js.map