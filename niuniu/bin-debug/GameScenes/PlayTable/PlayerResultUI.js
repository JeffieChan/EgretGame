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
    var PlayTable;
    (function (PlayTable) {
        var PlayerResultUI = (function (_super) {
            __extends(PlayerResultUI, _super);
            function PlayerResultUI() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return PlayerResultUI;
        }(egret.DisplayObjectContainer));
        PlayTable.PlayerResultUI = PlayerResultUI;
        __reflect(PlayerResultUI.prototype, "GameScenes.PlayTable.PlayerResultUI");
    })(PlayTable = GameScenes.PlayTable || (GameScenes.PlayTable = {}));
})(GameScenes || (GameScenes = {}));
//# sourceMappingURL=PlayerResultUI.js.map