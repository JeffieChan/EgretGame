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
        var Alert = (function (_super) {
            __extends(Alert, _super);
            function Alert(setting) {
                var _this = _super.call(this) || this;
                _this.setting = setting;
                _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                return _this;
            }
            Alert.prototype.onAddToStage = function () {
                this.drawBg();
                this.initFont();
            };
            Alert.prototype.drawBg = function () {
                this.cacheAsBitmap = true;
                this.bg = CommonUtils.BitmapUtils.createBitmapByName(this.setting.iconName);
                this.addChild(this.bg);
                this.bg.x = this.setting.left;
                this.bg.y = (Settings.GameSettingUtils.gameSetting.globalHeight - this.bg.height) / 2 + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
            };
            Alert.prototype.initFont = function () {
                this.bitmapText = new egret.BitmapText();
                this.addChild(this.bitmapText);
                this.bitmapText.font = CommonUtils.BitmapFontUtils.createBitmapFontByName(this.setting.fontName);
                this.bitmapText.text = "";
                this.bitmapText.x = (this.bg.width - this.bitmapText.width) / 2;
                this.bitmapText.y = this.bg.y + (this.bg.height - this.bitmapText.height) / 2;
                this.startBitmap = CommonUtils.BitmapUtils.createBitmapByName(this.setting.startIconName);
                this.addChild(this.startBitmap);
                this.startBitmap.visible = false;
                this.stopBitmap = CommonUtils.BitmapUtils.createBitmapByName(this.setting.stopIconName);
                this.addChild(this.stopBitmap);
                this.stopBitmap.visible = false;
            };
            Alert.prototype.showBitmapTextContent = function (text, second) {
                this.startBitmap.visible = false;
                this.stopBitmap.visible = false;
                this.bitmapText.text = "";
                if (second) {
                    this.bitmapText.text = text + second.toString();
                }
                else {
                    this.bitmapText.text = text;
                }
                this.bitmapText.x = (this.bg.width - this.bitmapText.width) / 2;
                this.bitmapText.y = this.bg.y + (this.bg.height - this.bitmapText.height) / 2;
            };
            Alert.prototype.showStartBet = function () {
                this.startBitmap.visible = true;
                this.stopBitmap.visible = false;
                this.bitmapText.text = "";
                this.startBitmap.x = (this.bg.width - this.startBitmap.width) / 2;
                this.startBitmap.y = this.bg.y + (this.bg.height - this.startBitmap.height) / 2;
            };
            Alert.prototype.showStopBet = function () {
                this.startBitmap.visible = false;
                this.stopBitmap.visible = true;
                this.bitmapText.text = "";
                this.stopBitmap.x = (this.bg.width - this.stopBitmap.width) / 2;
                this.stopBitmap.y = this.bg.y + (this.bg.height - this.stopBitmap.height) / 2;
            };
            return Alert;
        }(egret.DisplayObjectContainer));
        PlayTable.Alert = Alert;
        __reflect(Alert.prototype, "GameScenes.PlayTable.Alert");
    })(PlayTable = GameScenes.PlayTable || (GameScenes.PlayTable = {}));
})(GameScenes || (GameScenes = {}));
//# sourceMappingURL=Alert.js.map