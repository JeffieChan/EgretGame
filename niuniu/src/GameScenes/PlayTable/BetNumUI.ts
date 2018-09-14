module GameScenes.PlayTable {
    export class BetNumUI extends egret.DisplayObjectContainer {
        private setting: Settings.OwnBetNumSetting;
        public betNumTF: egret.TextField;
        public bg: egret.Shape;
        private bitmap: egret.Bitmap;
        public constructor(setting: Settings.OwnBetNumSetting) {
            super();
            this.setting = setting;
            this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        private onAddToStage() {
            this.drawBitmap();
            this.drawBg();
            this.setChildIndex(this.bitmap, this.numChildren - 1);
            this.drawBetNumTF();
        }
        private drawBitmap() {
            this.cacheAsBitmap = true;
            this.bitmap = CommonUtils.BitmapUtils.createBitmapByName(this.setting.iconName);
            this.addChild(this.bitmap);
            this.bitmap.x = this.setting.left;
            this.bitmap.y = this.setting.top+(this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight)/2;
        }
        private drawBg() {
            this.bg = new egret.Shape();
            this.addChild(this.bg);
            this.bg.graphics.beginFill(this.setting.textBgColor);
            this.bg.graphics.lineStyle(1, this.setting.borderColor);
            this.bg.graphics.drawRoundRect(0, 0, this.setting.width, this.setting.height, 2 * this.setting.radius);
            this.bg.graphics.endFill();
            this.bg.x = this.bitmap.x + this.bitmap.width - this.setting.padding;
            this.bg.y = this.bitmap.y + this.setting.padding;
        }
        private drawBetNumTF() {
            this.betNumTF = new egret.TextField();
            this.addChild(this.betNumTF);
            this.betNumTF.size = this.setting.textSize;
            this.betNumTF.textColor = this.setting.textColor;
            this.betNumTF.textAlign = egret.HorizontalAlign.CENTER;
            this.betNumTF.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.betNumTF.x = this.bg.x + (this.bg.width - this.betNumTF.width) / 2;
            this.betNumTF.y = this.bg.y + (this.bg.height - this.betNumTF.height) / 2;
        }
        public setTotleBetNum(num: number) {
            if (num.toString().length >= 7) {
                this.betNumTF.text = CommonUtils.NumberUtils.shortNumber(num);

            } else {
                this.betNumTF.text = CommonUtils.NumberUtils.formatNumber(num);

            }
            this.betNumTF.x = this.bg.x + (this.bg.width - this.betNumTF.width) / 2;
            this.betNumTF.y = this.bg.y + (this.bg.height - this.betNumTF.height) / 2;
        }
    }
}