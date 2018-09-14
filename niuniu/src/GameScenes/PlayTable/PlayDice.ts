module GameScenes.PlayTable {
    export class PlayDice extends egret.DisplayObjectContainer {
        private setting: Settings.DiceSetting;
        private view: PlayTableScene;
        private _mcData: any;
        private _mcTexture: egret.Texture;
        private role1: egret.MovieClip;
        private role2: egret.MovieClip;
        private timer: egret.Timer;
        private playDiceInterval: number = Settings.GameSettingUtils.timeSetting.playDiceInterval;
        private diceMoveInterval = Settings.GameSettingUtils.timeSetting.diceMoveInterval;

        public constructor(setting: Settings.DiceSetting, view: PlayTableScene) {
            super();
            this.view = view;
            this.setting = setting;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        private onAddToStage(event: egret.Event) {
            this.load(this.initMovieClip);
            this.timer = new egret.Timer(this.playDiceInterval, 1);
        }
        private initMovieClip() {
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


        }

        public play(data: Array<number>) {
            this.role1.visible = true;
            this.role2.visible = true;

            this.role1.gotoAndPlay(0, 1.5);
            this.role2.gotoAndPlay(0, 1.5);
            var roleX: number = Math.random() * (this.setting.areaWidth - this.role1.width) + this.setting.left;
            var roleY: number = Math.random() * (this.setting.areaHeight - this.role1.height) + this.setting.top + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
            var role1X: number = Math.random() * (this.setting.areaWidth - this.role2.width) + this.setting.left;
            var role1Y: number = Math.random() * (this.setting.areaHeight - this.role2.height) + this.setting.top + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
            egret.Tween.get(this.role1).to({ x: roleX, y: roleY }, this.diceMoveInterval)
                .to({ x: Math.random() * (this.setting.areaWidth - this.role1.width) + this.setting.left, y: Math.random() * (this.setting.areaHeight - this.role1.height) + this.setting.top + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2 }, this.diceMoveInterval)
                .to({ x: Math.random() * (this.setting.areaWidth - this.role1.width) + this.setting.left, y: Math.random() * (this.setting.areaHeight - this.role1.height) + this.setting.top + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2 }, this.diceMoveInterval);
            egret.Tween.get(this.role2).to({ x: role1X, y: role1Y }, this.diceMoveInterval)
                .to({ x: Math.random() * (this.setting.areaWidth - this.role2.width) + this.setting.left, y: Math.random() * (this.setting.areaHeight - this.role2.height) + this.setting.top + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2 }, this.diceMoveInterval)
                .to({ x: Math.random() * (this.setting.areaWidth - this.role2.width) + this.setting.left, y: Math.random() * (this.setting.areaHeight - this.role2.height) + this.setting.top + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2 }, this.diceMoveInterval);


            this.role1.once(egret.Event.COMPLETE, () => {
                this.role1.visible = false;
                this.role2.visible = false;
                this.role1.x = this.setting.pointX;
                this.role1.y = this.setting.pointY + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
                this.role2.x = this.setting.pointX;
                this.role2.y = this.setting.pointY + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;

                this.drawDice(data);
            }, this);


        }

        private drawDice(data: Array<number>) {
            let self = this;
            var dice1 = CommonUtils.BitmapUtils.createBitmapByName(data[0] + "_png");
            this.addChild(dice1);
            dice1.x = this.setting.left + this.setting.dicePaddingX;
            dice1.y = this.setting.top + this.setting.dicePaddingY + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
            var dice2 = CommonUtils.BitmapUtils.createBitmapByName(data[1] + "_png");
            this.addChild(dice2);
            dice2.x = this.setting.left + this.setting.dicePaddingX + dice1.width + this.setting.dicePadding;
            dice2.y = this.setting.top + this.setting.dicePaddingY + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;

            this.timer.once(egret.TimerEvent.TIMER_COMPLETE, () => {
                this.removeChild(dice1);
                this.removeChild(dice2);
                dice1 = null;
                dice2 = null;
                self.view.presenter.showPlyerCover();

            }, this);
            this.timer.reset();
            this.timer.start();



        }
        protected load(callback: Function) {
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

        }
    }
}