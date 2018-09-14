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
    var OtherBaseScene = (function (_super) {
        __extends(OtherBaseScene, _super);
        function OtherBaseScene(setting) {
            var _this = _super.call(this) || this;
            _this.setting = setting;
            return _this;
        }
        OtherBaseScene.prototype.initStyle = function () {
            this.drawBg();
        };
        OtherBaseScene.prototype.drawBg = function () {
            var bg = new egret.Shape();
            bg.graphics.beginFill(this.setting.bgColor, this.setting.alpha);
            bg.graphics.drawRect(0, 0, Settings.GameSettingUtils.gameSetting.globalWidth, this.stage.stageHeight);
            bg.graphics.endFill();
            this.addFixedChild(bg);
            var bitmap = CommonUtils.BitmapUtils.createBitmapByName(this.setting.icon);
            this.addFixedChild(bitmap);
            bitmap.x = ((Settings.GameSettingUtils.gameSetting.globalWidth - bitmap.width) / 2) * Settings.GameSettingUtils.globalScale;
            bitmap.y = ((this.stage.stageHeight - bitmap.height) / 2) * Settings.GameSettingUtils.globalScale;
        };
        OtherBaseScene.prototype.addFixedChild = function (child) {
            this.addChild(child);
            child.scaleX = Settings.GameSettingUtils.globalScale;
            child.scaleY = Settings.GameSettingUtils.globalScale;
            child.x = child.x * Settings.GameSettingUtils.globalScale;
            child.y = child.y * Settings.GameSettingUtils.globalScale;
        };
        OtherBaseScene.prototype.addFixedToBottomChild = function (child) {
            child.scaleX = Settings.GameSettingUtils.globalScale;
            child.scaleY = Settings.GameSettingUtils.globalScale;
            child.x = child.x * Settings.GameSettingUtils.globalScale;
            child.y = this.height - child.y * Settings.GameSettingUtils.globalScale;
        };
        return OtherBaseScene;
    }(egret.DisplayObjectContainer));
    GameScenes.OtherBaseScene = OtherBaseScene;
    __reflect(OtherBaseScene.prototype, "GameScenes.OtherBaseScene");
})(GameScenes || (GameScenes = {}));
//# sourceMappingURL=OtherBaseScene.js.map