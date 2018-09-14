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
    var OtherScene = (function (_super) {
        __extends(OtherScene, _super);
        function OtherScene(setting) {
            return _super.call(this, setting) || this;
        }
        OtherScene.prototype.getPresenter = function () {
            return this.presenter;
        };
        OtherScene.prototype.setUserToken = function (userToken) {
            this.presenter.setUserToken(userToken);
        };
        OtherScene.prototype.initStyle = function () {
            _super.prototype.initStyle.call(this);
            this.drawTitle(this.setting.title);
        };
        OtherScene.prototype.drawTitle = function (titleSetting) {
            this.title = new SceneTitle(titleSetting, this.setting.closeIcon);
            this.addFixedChild(this.title);
        };
        return OtherScene;
    }(GameScenes.OtherBaseScene));
    GameScenes.OtherScene = OtherScene;
    __reflect(OtherScene.prototype, "GameScenes.OtherScene");
})(GameScenes || (GameScenes = {}));
var SceneTitle = (function (_super) {
    __extends(SceneTitle, _super);
    function SceneTitle(setting, extraData) {
        var _this = _super.call(this) || this;
        _this.setting = setting;
        _this.extraData = extraData;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    SceneTitle.prototype.onAddToStage = function () {
        var _this = this;
        this.cacheAsBitmap = true;
        var txtTitle = new egret.TextField();
        txtTitle.textColor = this.setting.textColor;
        txtTitle.size = this.setting.textSize;
        txtTitle.width = Settings.GameSettingUtils.gameSetting.globalWidth;
        txtTitle.height = this.setting.titleHeight;
        txtTitle.textAlign = egret.HorizontalAlign.CENTER;
        txtTitle.verticalAlign = egret.VerticalAlign.MIDDLE;
        txtTitle.text = this.getTitleText();
        this.addChild(txtTitle);
        txtTitle.y = this.setting.top + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
        var backBtn = CommonUtils.BitmapUtils.createBitmapByName("关闭按钮_png");
        this.addChild(backBtn);
        backBtn.x = 633;
        backBtn.y = 130 + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
        backBtn.touchEnabled = true;
        backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            //TODO: 返回上页
            GameScenes.GameSceneManger.destoryScene(_this.parent);
        }, this);
    };
    SceneTitle.prototype.getTitleText = function () {
        var title = this.setting.titleText;
        if (!this.extraData)
            return title;
        for (var p in this.extraData) {
            var pname = p.toString();
            var pStr = "#" + pname + "#";
            title = title.replace(pStr, this.extraData[p]);
        }
        return title;
    };
    return SceneTitle;
}(egret.DisplayObjectContainer));
__reflect(SceneTitle.prototype, "SceneTitle");
//# sourceMappingURL=OtherScene.js.map