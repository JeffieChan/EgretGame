module GameScenes.PlayTable {
    export class PlayerPosition extends egret.DisplayObjectContainer {
        private setting: Settings.PlayerPositionSetting;
        public bitmap: egret.Bitmap;
        public cover: egret.Bitmap;
        private betTF: egret.TextField;
        public coverView: egret.Bitmap;
        public constructor(setting: Settings.PlayerPositionSetting) {
            super();
            this.setting = setting;
            this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        private onAddToStage() {
            this.drawPositionView();
            this.drawBetTF();
        }
        private drawPositionView() {
            this.bitmap = CommonUtils.BitmapUtils.createBitmapByName(this.setting.iconName);
            this.addChild(this.bitmap);
            this.bitmap.x = this.setting.left;
            this.bitmap.y = this.setting.top + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;

            this.coverView = CommonUtils.BitmapUtils.createBitmapByName(this.setting.coverIconName);
            this.addChild(this.coverView);
            this.coverView.visible = false;
            this.coverView.x = this.setting.left;
            this.coverView.y = this.setting.top + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;

            this.cover = CommonUtils.BitmapUtils.createBitmapByName("发牌方遮罩_png");
            this.addChild(this.cover);
            this.cover.x = this.bitmap.x - 30;
            this.cover.y = this.bitmap.y - 30;
            this.cover.width = this.bitmap.width + 60;
            this.cover.height = this.bitmap.height + 60;
            this.cover.visible = false;

        }
        public showCover() {

            egret.Tween.get(this.coverView)
                .call(() => {
                    this.coverView.alpha = 0;
                    this.coverView.visible = true;
                }).to({ alpha: 1 }, 500)
        }
        public hideCover() {
            egret.Tween.get(this.coverView).to({ alpha: 0 }, 500).call(()=>{this.coverView.visible=false});
        }
        private drawBetTF() {
            this.betTF = new egret.TextField();
            this.addChild(this.betTF);
            this.betTF.size = this.setting.textSize;
            this.betTF.textColor = this.setting.textColor;
            this.betTF.textAlign = egret.HorizontalAlign.LEFT;
            this.betTF.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.betTF.text = "0";
            this.betTF.fontFamily = this.setting.font;
            this.betTF.x = this.setting.left + this.setting.textX;
            this.betTF.y = this.setting.top + (this.setting.titleHeight - this.betTF.height) / 2 + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;


        }
        public setTotleBet(num: number) {

            // this.betTF.text = CommonUtils.NumberUtils.formatNumber(num);
            if (num.toString().length >= 7) {
                this.betTF.text = CommonUtils.NumberUtils.shortNumber(num);

            } else {
                this.betTF.text = CommonUtils.NumberUtils.formatNumber(num);

            }
        }
    }
}