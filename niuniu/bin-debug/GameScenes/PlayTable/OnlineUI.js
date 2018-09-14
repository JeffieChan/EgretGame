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
        var OnlineUI = (function (_super) {
            __extends(OnlineUI, _super);
            function OnlineUI(setting) {
                var _this = _super.call(this) || this;
                _this.setting = setting;
                _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                return _this;
            }
            OnlineUI.prototype.onAddToStage = function () {
                this.cacheAsBitmap = true;
                this.icon = CommonUtils.BitmapUtils.createBitmapByName(this.setting.iconName);
                this.addChild(this.icon);
                this.icon.x = this.setting.left;
                this.icon.y = this.setting.top + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
                this.txt = new egret.TextField();
                this.addChild(this.txt);
                this.txt.textAlign = egret.HorizontalAlign.CENTER;
                this.txt.verticalAlign = egret.VerticalAlign.MIDDLE;
                this.txt.size = this.setting.textSize;
                this.txt.fontFamily = this.setting.font;
                this.txt.textColor = this.setting.textColor;
                this.txt.text = "在线" + "\n" + "0";
                this.txt.width = this.icon.width;
                this.txt.x = this.icon.x + (this.icon.width - this.txt.width) / 2;
                this.txt.y = this.icon.y + (this.icon.height - this.txt.height) / 2;
                // this.visible = false;
            };
            OnlineUI.prototype.setOnlinePeoples = function (count) {
                this.txt.text = "";
                this.txt.text = "在线" + "\n" + count.toString();
                this.txt.x = this.icon.x + (this.icon.width - this.txt.width) / 2;
                this.txt.y = this.icon.y + (this.icon.height - this.txt.height) / 2;
            };
            return OnlineUI;
        }(egret.DisplayObjectContainer));
        PlayTable.OnlineUI = OnlineUI;
        __reflect(OnlineUI.prototype, "GameScenes.PlayTable.OnlineUI");
    })(PlayTable = GameScenes.PlayTable || (GameScenes.PlayTable = {}));
})(GameScenes || (GameScenes = {}));
//# sourceMappingURL=OnlineUI.js.map