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
        var IconUI = (function (_super) {
            __extends(IconUI, _super);
            function IconUI(setting) {
                var _this = _super.call(this) || this;
                _this.setting = setting;
                _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                return _this;
            }
            IconUI.prototype.onAddToStage = function () {
                this.cacheAsBitmap = true;
                this.icon = CommonUtils.BitmapUtils.createBitmapByName(this.setting.iconName);
                this.addChild(this.icon);
                this.icon.x = this.setting.left;
                if (this.setting.iconName == "系统庄_png") {
                    this.icon.y = this.setting.top + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
                }
                else {
                    this.icon.y = this.setting.top + 24;
                }
            };
            return IconUI;
        }(egret.DisplayObjectContainer));
        PlayTable.IconUI = IconUI;
        __reflect(IconUI.prototype, "GameScenes.PlayTable.IconUI");
    })(PlayTable = GameScenes.PlayTable || (GameScenes.PlayTable = {}));
})(GameScenes || (GameScenes = {}));
//# sourceMappingURL=IconUI.js.map