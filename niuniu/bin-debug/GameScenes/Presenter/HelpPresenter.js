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
    var HelpPresenter = (function (_super) {
        __extends(HelpPresenter, _super);
        function HelpPresenter(view) {
            var _this = _super.call(this) || this;
            _this.view = view;
            return _this;
        }
        return HelpPresenter;
    }(GameScenes.BasePresenter));
    GameScenes.HelpPresenter = HelpPresenter;
    __reflect(HelpPresenter.prototype, "GameScenes.HelpPresenter");
})(GameScenes || (GameScenes = {}));
//# sourceMappingURL=HelpPresenter.js.map