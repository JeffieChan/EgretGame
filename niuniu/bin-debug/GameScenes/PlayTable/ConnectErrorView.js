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
        var ConnectErrorView = (function (_super) {
            __extends(ConnectErrorView, _super);
            function ConnectErrorView() {
                var _this = _super.call(this) || this;
                _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                return _this;
            }
            ConnectErrorView.prototype.onAddToStage = function () {
                this.drawBg();
                this.drawBgView();
                this.drawTitle();
                this.drawAlertText();
                this.drawBtn();
            };
            ConnectErrorView.prototype.drawBg = function () {
                var bg = new egret.Shape();
                bg.graphics.beginFill(0x000000, 0.5);
                bg.graphics.drawRect(0, 0, Settings.GameSettingUtils.gameSetting.globalWidth, this.stage.stageHeight);
                bg.graphics.endFill();
                this.addChild(bg);
            };
            ConnectErrorView.prototype.drawBgView = function () {
                this.bitmap = CommonUtils.BitmapUtils.createBitmapByName("网络错误框_png");
                this.addChild(this.bitmap);
                this.bitmap.x = (Settings.GameSettingUtils.gameSetting.globalWidth - this.bitmap.width) / 2;
                this.bitmap.y = (Settings.GameSettingUtils.gameSetting.globalHeight - this.bitmap.height) / 2 + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
            };
            ConnectErrorView.prototype.drawTitle = function () {
                var txtTitle = new egret.TextField();
                txtTitle.textColor = 0xffffff;
                txtTitle.size = 35;
                txtTitle.width = Settings.GameSettingUtils.gameSetting.globalWidth;
                txtTitle.textAlign = egret.HorizontalAlign.CENTER;
                txtTitle.verticalAlign = egret.VerticalAlign.MIDDLE;
                txtTitle.text = "提示";
                this.addChild(txtTitle);
                txtTitle.y = 503 + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
            };
            ConnectErrorView.prototype.drawAlertText = function () {
                var textField = new egret.TextField;
                this.addChild(textField);
                textField.size = 24;
                textField.textColor = 0xa86d3d;
                textField.textAlign = egret.HorizontalAlign.LEFT;
                textField.verticalAlign = egret.VerticalAlign.MIDDLE;
                textField.fontFamily = "苹方";
                textField.text = "断线重连中,请耐心等待...";
                textField.y = 619 + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
                textField.x = (Settings.GameSettingUtils.gameSetting.globalWidth - textField.width) / 2;
            };
            ConnectErrorView.prototype.drawBtn = function () {
                this.exitBtn = CommonUtils.BitmapUtils.createBitmapByName("按钮_png");
                this.exitBtn.touchEnabled = true;
                this.exitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeGame, this);
                this.addChild(this.exitBtn);
                this.exitBtn.y = 715 + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
                this.exitBtn.x = (Settings.GameSettingUtils.gameSetting.globalWidth - this.exitBtn.width) / 2;
                var textField = new egret.TextField;
                this.addChild(textField);
                textField.size = 22;
                textField.textColor = 0xffffff;
                textField.textAlign = egret.HorizontalAlign.LEFT;
                textField.verticalAlign = egret.VerticalAlign.MIDDLE;
                textField.fontFamily = "苹方";
                textField.text = "退出游戏";
                textField.y = this.exitBtn.y + (this.exitBtn.height - textField.height) / 2;
                textField.x = this.exitBtn.x + (this.exitBtn.width - textField.width) / 2;
            };
            ConnectErrorView.prototype.closeGame = function () {
                GameScenes.GameSceneManger.destoryScene(this);
                NativeClose();
                ocClick();
                Server.Connector.getGameClient().close();
            };
            return ConnectErrorView;
        }(egret.DisplayObjectContainer));
        PlayTable.ConnectErrorView = ConnectErrorView;
        __reflect(ConnectErrorView.prototype, "GameScenes.PlayTable.ConnectErrorView");
    })(PlayTable = GameScenes.PlayTable || (GameScenes.PlayTable = {}));
})(GameScenes || (GameScenes = {}));
//# sourceMappingURL=ConnectErrorView.js.map