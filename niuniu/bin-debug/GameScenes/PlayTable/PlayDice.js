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
        var PlayDice = (function (_super) {
            __extends(PlayDice, _super);
            function PlayDice(setting, view) {
                var _this = _super.call(this) || this;
                _this.playDiceInterval = Settings.GameSettingUtils.timeSetting.playDiceInterval;
                _this.diceMoveInterval = Settings.GameSettingUtils.timeSetting.diceMoveInterval;
                _this.view = view;
                _this.setting = setting;
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                return _this;
            }
            PlayDice.prototype.onAddToStage = function (event) {
                this.load(this.initMovieClip);
                this.timer = new egret.Timer(this.playDiceInterval, 1);
            };
            PlayDice.prototype.initMovieClip = function () {
                var mcDataFactory = new egret.MovieClipDataFactory(this._mcData, this._mcTexture);
                this.role1 = new egret.MovieClip(mcDataFactory.generateMovieClipData(this.setting.name));
                this.role1.x = this.setting.pointX;
                this.role1.y = this.setting.pointY;
                this.role2 = new egret.MovieClip(mcDataFactory.generateMovieClipData(this.setting.name));
                this.role2.x = this.setting.pointX;
                this.role2.y = this.setting.pointY;
                this.addChild(this.role1);
                this.addChild(this.role2);
                this.role1.visible = false;
                this.role2.visible = false;
            };
            PlayDice.prototype.play = function (data) {
                var _this = this;
                this.role1.visible = true;
                this.role2.visible = true;
                this.role1.gotoAndPlay(0, 1.5);
                this.role2.gotoAndPlay(0, 1.5);
                var roleX = Math.random() * (this.setting.areaWidth - this.role1.width) + this.setting.left;
                var roleY = Math.random() * (this.setting.areaHeight - this.role1.height) + this.setting.top + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
                var role1X = Math.random() * (this.setting.areaWidth - this.role2.width) + this.setting.left;
                var role1Y = Math.random() * (this.setting.areaHeight - this.role2.height) + this.setting.top + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
                egret.Tween.get(this.role1).to({ x: roleX, y: roleY }, this.diceMoveInterval)
                    .to({ x: Math.random() * (this.setting.areaWidth - this.role1.width) + this.setting.left, y: Math.random() * (this.setting.areaHeight - this.role1.height) + this.setting.top + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2 }, this.diceMoveInterval)
                    .to({ x: Math.random() * (this.setting.areaWidth - this.role1.width) + this.setting.left, y: Math.random() * (this.setting.areaHeight - this.role1.height) + this.setting.top + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2 }, this.diceMoveInterval);
                egret.Tween.get(this.role2).to({ x: role1X, y: role1Y }, this.diceMoveInterval)
                    .to({ x: Math.random() * (this.setting.areaWidth - this.role2.width) + this.setting.left, y: Math.random() * (this.setting.areaHeight - this.role2.height) + this.setting.top + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2 }, this.diceMoveInterval)
                    .to({ x: Math.random() * (this.setting.areaWidth - this.role2.width) + this.setting.left, y: Math.random() * (this.setting.areaHeight - this.role2.height) + this.setting.top + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2 }, this.diceMoveInterval);
                this.role1.once(egret.Event.COMPLETE, function () {
                    _this.role1.visible = false;
                    _this.role2.visible = false;
                    _this.role1.x = _this.setting.pointX;
                    _this.role1.y = _this.setting.pointY + (_this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
                    _this.role2.x = _this.setting.pointX;
                    _this.role2.y = _this.setting.pointY + (_this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
                    _this.drawDice(data);
                }, this);
            };
            PlayDice.prototype.drawDice = function (data) {
                var _this = this;
                var self = this;
                var dice1 = CommonUtils.BitmapUtils.createBitmapByName(data[0] + "_png");
                this.addChild(dice1);
                dice1.x = this.setting.left + this.setting.dicePaddingX;
                dice1.y = this.setting.top + this.setting.dicePaddingY + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
                var dice2 = CommonUtils.BitmapUtils.createBitmapByName(data[1] + "_png");
                this.addChild(dice2);
                dice2.x = this.setting.left + this.setting.dicePaddingX + dice1.width + this.setting.dicePadding;
                dice2.y = this.setting.top + this.setting.dicePaddingY + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
                this.timer.once(egret.TimerEvent.TIMER_COMPLETE, function () {
                    _this.removeChild(dice1);
                    _this.removeChild(dice2);
                    dice1 = null;
                    dice2 = null;
                    self.view.presenter.showPlyerCover();
                }, this);
                this.timer.reset();
                this.timer.start();
            };
            PlayDice.prototype.load = function (callback) {
                var count = 0;
                var self = this;
                var check = function () {
                    count++;
                    if (count == 2) {
                        callback.call(self);
                    }
                };
                var loader = new egret.URLLoader();
                loader.addEventListener(egret.Event.COMPLETE, function loadOver(e) {
                    var loader = e.currentTarget;
                    this._mcTexture = loader.data;
                    check();
                }, this);
                loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
                var request = new egret.URLRequest(this.setting.pngUrl);
                loader.load(request);
                var loader = new egret.URLLoader();
                loader.addEventListener(egret.Event.COMPLETE, function loadOver(evt) {
                    var loader = evt.currentTarget;
                    this._mcData = JSON.parse(loader.data);
                    check();
                }, this);
                loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
                var request = new egret.URLRequest(this.setting.jsonUrl);
                loader.load(request);
            };
            return PlayDice;
        }(egret.DisplayObjectContainer));
        PlayTable.PlayDice = PlayDice;
        __reflect(PlayDice.prototype, "GameScenes.PlayTable.PlayDice");
    })(PlayTable = GameScenes.PlayTable || (GameScenes.PlayTable = {}));
})(GameScenes || (GameScenes = {}));
//# sourceMappingURL=PlayDice.js.map