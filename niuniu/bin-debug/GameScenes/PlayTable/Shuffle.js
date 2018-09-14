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
        var Shuuffle = (function (_super) {
            __extends(Shuuffle, _super);
            function Shuuffle(setting, view) {
                var _this = _super.call(this) || this;
                _this._clipWidth = 306;
                _this._clipHeight = 183;
                _this.pokerWidth = 78;
                _this.duration = 300;
                _this.setting = setting;
                _this.view = view;
                _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                return _this;
            }
            Shuuffle.prototype.onAddToStage = function (event) {
                this.load(this.initMovieClip);
                // this.cacheAsBitmap = true;
            };
            Shuuffle.prototype.initMovieClip = function () {
                var mcDataFactory = new egret.MovieClipDataFactory(this._mcData, this._mcTexture);
                this.role = new egret.MovieClip(mcDataFactory.generateMovieClipData(this.setting.name));
                this.role.anchorOffsetX = this._clipWidth / 2;
                this.role.anchorOffsetY = this._clipHeight / 2;
                this.role.x = Settings.GameSettingUtils.gameSetting.globalWidth / 2;
                this.role.y = Settings.GameSettingUtils.gameSetting.globalHeight / 2 + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
                this.addChild(this.role);
                this.role.visible = false;
            };
            Shuuffle.prototype.shufflePoker = function () {
                var _this = this;
                var self = this;
                this.role.visible = true;
                this.role.gotoAndPlay(0, 1);
                this.role.addEventListener(egret.Event.COMPLETE, function () {
                    egret.Tween.get(self.role)
                        .to({ rotation: -90 }, Settings.GameSettingUtils.timeSetting.pokerRotationInterval)
                        .wait(Settings.GameSettingUtils.timeSetting.pokerWaitInterval)
                        .to({ x: _this.setting.pointY + _this._clipHeight / 2 - _this.role.height - _this.pokerWidth, y: _this.setting.pointY + _this._clipWidth / 2 - _this.role.width - _this.setting.padding + (_this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2 }, _this.duration)
                        .call(function () {
                        self.role.visible = false;
                        self.role.rotation = 0;
                        self.role.x = Settings.GameSettingUtils.gameSetting.globalWidth / 2;
                        self.role.y = Settings.GameSettingUtils.gameSetting.globalHeight / 2 + (_this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
                        self.view.drawPokerBg(52);
                        self.view.startPutBet();
                        self.view.showStartBet();
                        self.view.presenter.startSendPokerCountdown();
                        self.view.betCoinContainer.checkBetNum(0, self.view.presenter.currentBonus, self.view.presenter.maxOdds);
                    });
                }, this);
            };
            Shuuffle.prototype.load = function (callback) {
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
                var request = new egret.URLRequest("resource/assets/images/animaition/洗牌.png");
                loader.load(request);
                var loader = new egret.URLLoader();
                loader.addEventListener(egret.Event.COMPLETE, function loadOver(evt) {
                    var loader = evt.currentTarget;
                    this._mcData = JSON.parse(loader.data);
                    check();
                }, this);
                loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
                var request = new egret.URLRequest("resource/assets/images/animaition/洗牌.json");
                loader.load(request);
            };
            return Shuuffle;
        }(egret.DisplayObjectContainer));
        PlayTable.Shuuffle = Shuuffle;
        __reflect(Shuuffle.prototype, "GameScenes.PlayTable.Shuuffle");
    })(PlayTable = GameScenes.PlayTable || (GameScenes.PlayTable = {}));
})(GameScenes || (GameScenes = {}));
//# sourceMappingURL=Shuffle.js.map