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
    var RootScene = (function (_super) {
        __extends(RootScene, _super);
        function RootScene(setting) {
            var _this = _super.call(this) || this;
            _this.setting = setting;
            return _this;
        }
        RootScene.prototype.initStyle = function () {
            this.drawBg();
        };
        RootScene.prototype.drawBg = function () {
            var bg = new egret.Shape();
            bg.graphics.beginFill(this.setting.bgColor, this.setting.alpha);
            bg.graphics.drawRect(0, 0, Settings.GameSettingUtils.gameSetting.globalWidth, Settings.GameSettingUtils.gameSetting.globalHeight);
            bg.graphics.endFill();
            this.addFixedChild(bg);
        };
        RootScene.prototype.addFixedChild = function (child) {
            this.addChild(child);
            child.scaleX = Settings.GameSettingUtils.globalScale;
            child.scaleY = Settings.GameSettingUtils.globalScale;
            child.x = child.x * Settings.GameSettingUtils.globalScale;
            child.y = child.y * Settings.GameSettingUtils.globalScale;
        };
        RootScene.prototype.addFixedToBottomChild = function (child) {
            child.scaleX = Settings.GameSettingUtils.globalScale;
            child.scaleY = Settings.GameSettingUtils.globalScale;
            child.x = child.x * Settings.GameSettingUtils.globalScale;
            child.y = this.height - child.y * Settings.GameSettingUtils.globalScale;
        };
        return RootScene;
    }(egret.DisplayObjectContainer));
    GameScenes.RootScene = RootScene;
    __reflect(RootScene.prototype, "GameScenes.RootScene");
})(GameScenes || (GameScenes = {}));
//# sourceMappingURL=RootScene.js.map