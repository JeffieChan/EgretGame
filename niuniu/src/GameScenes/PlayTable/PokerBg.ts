module GameScenes.PlayTable {
    export class PokerBg extends egret.DisplayObjectContainer {
        private setting: Settings.PokerSetting;
        public pokerArr: Array<egret.Bitmap>;
        private pokerPadding: number = 30;
        private cardCount: number;
        public sendCards0: Array<any>
        public sendCards1: Array<any>
        public sendCards2: Array<any>
        public sendCards3: Array<any>

        public constructor(setting: Settings.PokerSetting, cardCound: number) {
            super();
            this.setting = setting;
            this.cardCount = cardCound;
            this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage() {
            this.createPoker();
            this.sendCards0 = new Array();
            this.sendCards1 = new Array();
            this.sendCards2 = new Array();
            this.sendCards3 = new Array();
        }

        public dealCard(cardIndex: number, loc: egret.Point): void {
            if (this.cardCount == 52) {
                var cards = Math.floor(cardIndex / 4);
                egret.Tween.get(this.pokerArr[51 - cardIndex])
                    .to({ x: loc.x + cards * this.pokerPadding, y: loc.y }, 300)
                    .call(() => { this.setChildIndex(this.pokerArr[51 - cardIndex], cardIndex); });
                switch (loc.x) {
                    case 34.5:
                        this.sendCards0.push(this.pokerArr[51 - cardIndex]);
                        break;
                    case 279.5:
                        this.sendCards1.push(this.pokerArr[51 - cardIndex]);
                        break;
                    case 520.5:
                        this.sendCards2.push(this.pokerArr[51 - cardIndex]);
                        break;
                    case 392:
                        this.sendCards3.push(this.pokerArr[51 - cardIndex]);
                        break;

                    default:
                        break;
                }
            }

        }
        public refreshCards() {

            for (var i = 0; i < this.cardCount - 1; i++) {
                this.setChildIndex(this.pokerArr[i], i);
            }
        }

        public createPoker() {
            // this.cacheAsBitmap = true;
            this.pokerArr = new Array();
            for (var i = 0; i < this.cardCount; i++) {
                var poker = CommonUtils.BitmapUtils.createBitmapByName(this.setting.iconName);
                poker.x = this.setting.left;
                poker.y = this.setting.top - Math.floor(i / 13) * this.setting.padding + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
                this.addChild(poker);
                this.pokerArr.push(poker);
            }


        }
    }
}