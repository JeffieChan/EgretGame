module GameScenes.PlayTable {
    export class Shuuffle extends egret.DisplayObjectContainer {
        private setting: Settings.ShuffleSetting;
        private view: PlayTableScene;
        private _mcData: any;
        private _mcTexture: egret.Texture;
        public role: egret.MovieClip;
        private _clipWidth: number = 306;
        private _clipHeight: number = 183;
        private pokerWidth: number = 78;
        private duration: number = 300;
        public constructor(setting: Settings.ShuffleSetting, view: PlayTableScene) {
            super();
            this.setting = setting;
            this.view = view;
            this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        private onAddToStage(event: egret.Event) {
            this.load(this.initMovieClip);
            // this.cacheAsBitmap = true;
        }
        private initMovieClip() {
            var mcDataFactory = new egret.MovieClipDataFactory(this._mcData, this._mcTexture);
            this.role = new egret.MovieClip(mcDataFactory.generateMovieClipData(this.setting.name));
            this.role.anchorOffsetX = this._clipWidth / 2;
            this.role.anchorOffsetY = this._clipHeight / 2;
            this.role.x = Settings.GameSettingUtils.gameSetting.globalWidth / 2;
            this.role.y = Settings.GameSettingUtils.gameSetting.globalHeight / 2 + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
            this.addChild(this.role);
            this.role.visible = false;

        }
        public shufflePoker() {
            let self = this;
            this.role.visible = true;
            this.role.gotoAndPlay(0, 1);
            this.role.addEventListener(egret.Event.COMPLETE, () => {
                egret.Tween.get(self.role)
                    .to({ rotation: -90 }, Settings.GameSettingUtils.timeSetting.pokerRotationInterval)
                    .wait(Settings.GameSettingUtils.timeSetting.pokerWaitInterval)
                    .to({ x: this.setting.pointY + this._clipHeight / 2 - this.role.height - this.pokerWidth, y: this.setting.pointY + this._clipWidth / 2 - this.role.width - this.setting.padding + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2 }, this.duration)
                    .call(() => {
                        self.role.visible = false;
                        self.role.rotation = 0;
                        self.role.x = Settings.GameSettingUtils.gameSetting.globalWidth / 2;
                        self.role.y = Settings.GameSettingUtils.gameSetting.globalHeight / 2 + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
                        self.view.drawPokerBg(52);
                        self.view.startPutBet();
                        self.view.showStartBet();
                        self.view.presenter.startSendPokerCountdown();
                        self.view.betCoinContainer.checkBetNum(0, self.view.presenter.currentBonus, self.view.presenter.maxOdds);

                    });
            }, this);
        }


        private load(callback: Function) {
            var count: number = 0;
            var self = this;

            var check = function () {
                count++;
                if (count == 2) {
                    callback.call(self);
                }
            }

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

        }
    }
}