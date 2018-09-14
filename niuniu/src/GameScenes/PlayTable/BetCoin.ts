module GameScenes.PlayTable {
    export class BetCoin extends egret.DisplayObjectContainer {
        private betNum: number;
        private index: number
        public betBitmap: egret.Bitmap;
        private text: egret.TextField;
        public constructor(betNum: number, index: number) {
            super();
            this.betNum = betNum;
            this.index = index;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage() {
            this.drawCoin();
            this.drawBetNum();
        }
        private drawCoin() {
            switch (this.index) {
                case 0:
                    this.betBitmap = CommonUtils.BitmapUtils.createBitmapByName("小100_png");
                    break;
                case 1:
                    this.betBitmap = CommonUtils.BitmapUtils.createBitmapByName("小500_png");
                    break;
                case 2:
                   this.betBitmap = CommonUtils.BitmapUtils.createBitmapByName("小1000_png");
                    break;
                case 3:
                    this.betBitmap = CommonUtils.BitmapUtils.createBitmapByName("小5000_png");
                    break;

                default:
                    break;
            }
             
            this.addChild(this.betBitmap);

        }
        private drawBetNum() {
            this.text = new egret.TextField();
            this.text.size = 14;
            this.text.textColor = 0xffffff;
            this.text.text = this.betNum.toString();
            this.text.textAlign = egret.HorizontalAlign.CENTER;
            this.text.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.text.x = (this.betBitmap.width - this.text.width) / 2;
            this.text.y = (this.betBitmap.height - this.text.height) / 2;
            switch (this.index) {
                case 0:
                    this.text.stroke = 2;
                    this.text.strokeColor = 0x1f6b48;
                    break;
                case 1:
                    this.text.stroke = 2;
                    this.text.strokeColor = 0x166478;
                    break;
                case 2:
                    this.text.stroke = 2;
                    this.text.strokeColor = 0x8f312c;
                    break;
                case 3:
                    this.text.stroke = 2;
                    this.text.strokeColor = 0x944725;
                    break;

                default:
                    break;
            }
            this.addChild(this.text);

        }

    }
}