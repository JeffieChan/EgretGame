module GameScenes.PlayTable {
    export class CountDownTimer extends egret.DisplayObjectContainer {
        private setting: Settings.CountDownTimerSetting;
        private clock: egret.Bitmap;
        private bg: egret.Bitmap;
        private timerTF: egret.TextField;
        public countNum: egret.Bitmap;
        private countdownRes: any[];
        public constructor(setting: Settings.CountDownTimerSetting) {
            super();
            this.setting = setting;
            this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        private onAddToStage() {
            this.drawClock();
            this.drawBg();
            this.setChildIndex(this.clock, this.numChildren - 1);
            this.drawTimerTF();
            this.countNum = new egret.Bitmap();
            this.countNum.y = 517 + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
            this.addChild(this.countNum);
            this.countNum.visible = false;
            this.countdownRes = [];
            for (let i = 1; i <= 5; i++) {
                this.countdownRes[i] = RES.getRes("倒计时" + i.toString() + "_png");
            }
            this.cacheAsBitmap = true;

        }
        private drawClock() {
            this.clock = CommonUtils.BitmapUtils.createBitmapByName(this.setting.iconName);
            this.addChild(this.clock);
            this.clock.x = this.setting.left;
            this.clock.y = this.setting.top + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
        }
        private drawBg() {
            this.bg = CommonUtils.BitmapUtils.createBitmapByName(this.setting.bgIconName);
            this.addChild(this.bg);
            this.bg.x = 21;
            this.bg.y = this.setting.top + (this.clock.height - this.bg.height) / 2 + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
        }
        private drawTimerTF() {
            this.timerTF = new egret.TextField();
            this.addChild(this.timerTF);
            this.timerTF.size = this.setting.textSize;
            this.timerTF.textColor = this.setting.textColor;
            this.timerTF.textAlign = egret.HorizontalAlign.CENTER;
            this.timerTF.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.timerTF.text = " ";
            this.timerTF.fontFamily = this.setting.font;
            this.timerTF.x = this.bg.x + (this.bg.width - this.timerTF.width) / 2;
            this.timerTF.y = this.bg.y + (this.bg.height - this.timerTF.height) / 2;
        }


        public showCountdownSeconds(seconds: number, type: Model.RoundState) {
            seconds = (seconds < 0 ? 0 : seconds);

            this.timerTF.text = "下注倒计时 " + seconds.toString() + "s";
            this.timerTF.textColor = ((seconds <= 5) ? this.setting.noticeColor : this.setting.textColor);
            this.timerTF.x = this.bg.x + (this.bg.width - this.timerTF.width) / 2 + 10;
            this.timerTF.y = this.bg.y + (this.bg.height - this.timerTF.height) / 2;

            this.showCountDown(seconds);
        }

        private showCountDown(second: number) {
            if (second > 5 || second < 1) {
                this.countNum.visible = false;
                return;
            }


            this.countNum.visible = true;
            let texture = this.countdownRes[second];
            console.log(texture);
            this.countNum.texture = texture;
            console.log(this.countNum);
            this.countNum.x = (750 - this.countNum.width) / 2;
        }
    }
}