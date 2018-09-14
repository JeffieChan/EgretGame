module GameScenes.PlayTable {
    export class BetStatisticsUI extends egret.DisplayObjectContainer {
        private setting: Settings.BetStatisticsSetting;
        private bg: egret.Bitmap;
        private title: egret.TextField;
        public player1TF: GameScenes.PlayTable.BetStatisticsPlayerUI;
        public player2TF: GameScenes.PlayTable.BetStatisticsPlayerUI;
        public player3TF: GameScenes.PlayTable.BetStatisticsPlayerUI;
        public player4TF: GameScenes.PlayTable.BetStatisticsPlayerUI;
        public player5TF: GameScenes.PlayTable.BetStatisticsPlayerUI;



        public constructor(setting: Settings.BetStatisticsSetting) {
            super();
            this.setting = setting;
            this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        private onAddToStage() {

            this.drawBg();
            this.drawTitle();
            this.drawPlayer1TF();
            this.drawPlayer2TF();
            this.drawPlayer3TF();
            this.drawPlayer4TF();
            this.drawPlayer5TF();

        }

        private drawBg() {
            this.cacheAsBitmap = true;
            this.bg = CommonUtils.BitmapUtils.createBitmapByName(this.setting.iconName);
            this.addChild(this.bg);
            this.bg.x = this.setting.left;
            this.bg.y = this.setting.top+(this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight)/2;
        }
        private drawTitle() {
            this.title = new egret.TextField();
            this.addChild(this.title);
            this.title.size = this.setting.textSize;
            this.title.textColor = this.setting.textColor;
            this.title.textAlign = egret.HorizontalAlign.CENTER;
            this.title.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.title.text = this.setting.title;
            this.title.x = this.bg.x + (this.bg.width - this.title.width) / 2;
            this.title.y = this.bg.y + this.setting.titlePaddingToTop;
        }

        private drawPlayer1TF() {
            this.player1TF = new GameScenes.PlayTable.BetStatisticsPlayerUI(this.setting.play1Name, this.setting);      
            this.addChild(this.player1TF);
            this.player1TF.y = this.setting.play1NameTop+(this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight)/2;
        }
        private drawPlayer2TF() {
            this.player2TF = new GameScenes.PlayTable.BetStatisticsPlayerUI(this.setting.play2Name, this.setting);
            this.addChild(this.player2TF);
            this.player2TF.y = this.setting.play1NameTop+this.setting.betNumTFTopPadding+(this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight)/2;
        }
        private drawPlayer3TF() {
            this.player3TF = new GameScenes.PlayTable.BetStatisticsPlayerUI(this.setting.play3Name, this.setting);
            this.addChild(this.player3TF);
            this.player3TF.y = this.setting.play1NameTop+2*this.setting.betNumTFTopPadding+(this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight)/2;
        }
        private drawPlayer4TF() {
            this.player4TF = new GameScenes.PlayTable.BetStatisticsPlayerUI(this.setting.play4Name, this.setting);
            this.addChild(this.player4TF);
            this.player4TF.y = this.setting.play1NameTop+3*this.setting.betNumTFTopPadding+(this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight)/2;
        }
        private drawPlayer5TF() {
            this.player5TF = new GameScenes.PlayTable.BetStatisticsPlayerUI(this.setting.play5Name, this.setting);
            this.addChild(this.player5TF);
            this.player5TF.y = this.setting.play1NameTop+4*this.setting.betNumTFTopPadding+(this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight)/2;
        }
    }
}
