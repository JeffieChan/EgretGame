module GameScenes.PlayTable {
    export class BetStatisticsPlayerUI extends egret.DisplayObjectContainer {
        private setting: Settings.BetStatisticsSetting
        private playerName: string;
        public betNumTF: egret.TextField;
        public constructor(name: string, setting: Settings.BetStatisticsSetting) {
            super();
            this.playerName = name;
            this.setting = setting;
            this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        private onAddToStage() {
            let nameTF = new egret.TextField;
            this.addChild(nameTF);
            nameTF.size = this.setting.textSize;
            nameTF.textColor = this.setting.textColor;
            nameTF.textAlign = egret.HorizontalAlign.LEFT;
            nameTF.text = this.playerName;
            nameTF.x = this.setting.playerTFLeftPadding;
            nameTF.width = this.setting.playerTFWidth;

            this.betNumTF = new egret.TextField;
            this.addChild(this.betNumTF);
            this.betNumTF.size = this.setting.textSize;
            this.betNumTF.textColor = this.setting.numberColor;
            this.betNumTF.textAlign = egret.HorizontalAlign.LEFT;
            this.betNumTF.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.betNumTF.text = "0";
            this.betNumTF.x = this.setting.playerTFLeftPadding+this.setting.playerTFWidth+this.setting.betNumTFLeftPadding;
           



        }
        public setBetNum(num: number) {
            if(num.toString().length>=7){
            this.betNumTF.text = CommonUtils.NumberUtils.shortNumber(num);

            }else{
            this.betNumTF.text = CommonUtils.NumberUtils.formatNumber(num);

            }
        }
    }
}