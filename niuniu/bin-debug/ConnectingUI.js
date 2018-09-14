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
var ConnectingUI = (function (_super) {
    __extends(ConnectingUI, _super);
    function ConnectingUI() {
        var _this = _super.call(this) || this;
        _this.paddingToBottom = 594;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.timer = new egret.Timer(3000, 1);
        _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.removeAlert, _this);
        return _this;
    }
    ConnectingUI.prototype.onAddToStage = function (evt) {
        this.bg = CommonUtils.BitmapUtils.createBitmapByName("系统弹出框_png");
        this.textField = new egret.TextField;
        this.textField.size = 30;
        this.textField.bold = true;
        this.addChild(this.bg);
        this.addChild(this.textField);
        this.bg.x = (this.stage.stageWidth - this.bg.width) / 2;
        this.visible = false;
    };
    ConnectingUI.prototype.setConnectText = function (msg, type) {
        this.visible = true;
        if (typeof msg === 'number') {
            if (type == 1) {
                this.textField.textFlow = [{ text: "余额不足，至少需", style: { "textColor": 0xffffff } },
                    { text: CommonUtils.NumberUtils.formatNumber(msg), style: { "textColor": 0xffd801 } },
                    { text: "猜豆哦~", style: { "textColor": 0xffffff } }];
            }
            if (type == 2) {
                this.textField.textFlow = [{ text: "本轮最多还可投", style: { "textColor": 0xffffff } },
                    { text: CommonUtils.NumberUtils.formatNumber(msg), style: { "textColor": 0xffd801 } },
                    { text: "猜豆哦~", style: { "textColor": 0xffffff } }];
            }
            this.bg.width = this.textField.width + 50;
            this.bg.x = (this.stage.stageWidth - this.bg.width) / 2;
        }
        else {
            this.textField.text = msg;
        }
        this.textField.x = (this.stage.stageWidth - this.textField.width) / 2;
        this.textField.y = this.bg.y + (this.bg.height - this.textField.height) / 2;
        this.timer.reset();
        this.timer.start();
    };
    ConnectingUI.prototype.removeAlert = function () {
        this.timer.stop();
        this.visible = false;
    };
    return ConnectingUI;
}(egret.DisplayObjectContainer));
__reflect(ConnectingUI.prototype, "ConnectingUI");
//# sourceMappingURL=ConnectingUI.js.map