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
        var TitleUI = (function (_super) {
            __extends(TitleUI, _super);
            function TitleUI(setting) {
                var _this = _super.call(this) || this;
                _this.setting = setting;
                _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                return _this;
            }
            TitleUI.prototype.onAddToStage = function () {
                if (this.stage.stageHeight == 1624) {
                    this.TITLEPADDING = 24;
                }
                else {
                    this.TITLEPADDING = 0;
                }
                this.drawBg();
                this.drawTitle();
                this.drawIssueTF();
                this.drawBackBtn();
            };
            TitleUI.prototype.drawBg = function () {
                var bg = new egret.Shape();
                bg.graphics.beginFill(this.setting.titleBgColor, this.setting.titleBgAlpha);
                bg.graphics.drawRect(0, 0, Settings.GameSettingUtils.gameSetting.globalWidth, this.setting.titleHeight + this.TITLEPADDING);
                bg.graphics.endFill();
                this.addChild(bg);
            };
            TitleUI.prototype.drawTitle = function () {
                this.title = new egret.TextField();
                this.title.size = this.setting.textSize;
                this.title.textColor = this.setting.textColor;
                this.title.textAlign = egret.HorizontalAlign.CENTER;
                this.title.verticalAlign = egret.VerticalAlign.MIDDLE;
                this.title.fontFamily = this.setting.font;
                this.title.text = this.setting.titleText;
                this.title.x = (Settings.GameSettingUtils.gameSetting.globalWidth - this.title.width) / 2;
                this.title.y = this.setting.top + this.TITLEPADDING;
                this.addChild(this.title);
            };
            TitleUI.prototype.drawIssueTF = function () {
                this.issueTF = new egret.TextField();
                this.addChild(this.issueTF);
                this.issueTF.size = this.setting.text1Size;
                this.issueTF.textColor = this.setting.text1Color;
                this.issueTF.textAlign = egret.HorizontalAlign.CENTER;
                this.issueTF.verticalAlign = egret.VerticalAlign.MIDDLE;
                this.issueTF.fontFamily = this.setting.font;
                this.issueTF.text = " ";
                this.issueTF.x = (Settings.GameSettingUtils.gameSetting.globalWidth - this.issueTF.width) / 2;
                this.issueTF.y = this.setting.top + this.title.height + this.setting.padding + this.TITLEPADDING;
            };
            TitleUI.prototype.drawBackBtn = function () {
                this.cacheAsBitmap = true;
                this.backBtn = CommonUtils.BitmapUtils.createBitmapByName("nav-arrow_png");
                this.addChild(this.backBtn);
                this.backBtn.touchEnabled = true;
                this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    console.log("back btn tapped.");
                    NativeClose();
                    ocClick();
                    Server.Connector.getGameClient().close();
                }, this);
                this.backBtn.x = 0;
                this.backBtn.y = 0 + this.TITLEPADDING;
            };
            TitleUI.prototype.setTssue = function (text) {
                this.issueTF.text = "";
                this.issueTF.text = "第" + text + "期";
                this.issueTF.x = (Settings.GameSettingUtils.gameSetting.globalWidth - this.issueTF.width) / 2;
                this.issueTF.y = this.setting.top + this.title.height + this.setting.padding + this.TITLEPADDING;
            };
            return TitleUI;
        }(egret.DisplayObjectContainer));
        PlayTable.TitleUI = TitleUI;
        __reflect(TitleUI.prototype, "GameScenes.PlayTable.TitleUI");
    })(PlayTable = GameScenes.PlayTable || (GameScenes.PlayTable = {}));
})(GameScenes || (GameScenes = {}));
//# sourceMappingURL=TitleUI.js.map