module GameScenes.PlayTable {
    export class BetCoinContainerUI extends egret.Sprite {
        public betBitmapIndex: number = 0;
        public betNum: number;
        public optionNumList: Array<number>;
        private static readonly configFile: string = "coinContainerSetting_json";
        private static _coinContainerSetting: CoinContainerSetting;
        private static getCoinContainerSetting(): CoinContainerSetting {
            if (!this._coinContainerSetting) {
                this._coinContainerSetting = RES.getRes(this.configFile);
            }
            return this._coinContainerSetting;
        }
        private coinUIList: CoinUI[];
        public constructor() {
            super();
            this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        public loadCoins() {

            this.drawCoins();
            this.registCoinEvents();
        }
        private onAddToStage(event: egret.Event) {
            this.drawBg();
        }
        private registCoinEvents(): void {
            this.coinUIList.forEach((val, index) => {
                val.touchEnabled = true;
                val.addEventListener(egret.TouchEvent.TOUCH_TAP, (event: egret.TouchEvent) => {
                    this.unactivateAllCoin();
                    val.activated = true;
                    this.resetCoinListStyle(true);
                }, this);
            })
        }

        public checkBetNum(myBetNum: number, totleBetNum: number, maxOdds: number) {

            // if (myBetNum * maxOdds > totleBetNum + myBetNum) {
            //     this.unTouchEable();
            // } else if (myBetNum * maxOdds > totleBetNum + myBetNum) {
            //     this.setBetCoinUnActivate(this.betBitmapIndex);
            // }


            // if ((myBetNum * maxOdds + 100 * maxOdds) > totleBetNum + myBetNum) {
            //     this.unTouchEable();

            // } else if ((myBetNum * maxOdds + 500 * maxOdds) > totleBetNum - 1 + myBetNum) {
            //     if (this.betNum == 500) {
            //         this.resetBet(0);
            //         this.betBitmapIndex = 0;
            //         this.betNum = 100;
            //     }

            // } else if ((myBetNum * maxOdds + 1000 * maxOdds) > totleBetNum + myBetNum) {
            //     if (this.betNum == 1000) {
            //         this.resetBet(1);
            //         this.betBitmapIndex = 1;
            //         this.betNum = 500;
            //     }


            // } else if ((myBetNum * maxOdds + 5000 * maxOdds) > totleBetNum + myBetNum) {
            //     if (this.betNum == 5000) {
            //         this.resetBet(2);
            //         this.betNum = 1000;
            //         this.betBitmapIndex = 2;
            //     }

            // }

            // if ((myBetNum * maxOdds + 5000 * maxOdds) > totleBetNum + myBetNum) {
            //     this.setBetCoinUnActivate(3);

            // }
            // if ((myBetNum * maxOdds + 1000 * maxOdds) > totleBetNum + myBetNum) {
            //     this.setBetCoinUnActivate(2);

            // }
            // if ((myBetNum * maxOdds + 500 * maxOdds) > totleBetNum + myBetNum) {
            //     this.setBetCoinUnActivate(1);
            // }

            // if (5000 * maxOdds > totleBetNum + myBetNum) {
            //     this.setBetCoinUnActivate(3);
            // }
            // if (1000 * maxOdds > totleBetNum + myBetNum) {
            //     this.setBetCoinUnActivate(2);
            // }
            // if (500 * maxOdds > totleBetNum + myBetNum) {
            //     this.setBetCoinUnActivate(1);
            // }
            // if (100 * maxOdds > totleBetNum + myBetNum) {
            //     this.setBetCoinUnActivate(0);
            // }

            this.coinUIList.forEach((val, index) => {

                val.activated = false;
                val.touchEnabled = true;
                val.scaleX = val.scaleY = 1;
                val.canClick = true;
                val.resetStyle();

            });
            this.resetBet(this.betBitmapIndex);


        }

        private drawBg(): void {
            let bg: egret.Bitmap = CommonUtils.BitmapUtils.createBitmapByName(BetCoinContainerUI.getCoinContainerSetting().backgroundImage);
            bg.x = (Settings.GameSettingUtils.gameSetting.globalWidth - bg.width) / 2;
            if (this.stage.stageHeight == 1624) {//iphoneX的特殊处理
                bg.height = bg.height * 1.5;

            }
            this.addChild(bg);
        }
        private drawCoins(): void {
            this.coinUIList = [];
            let coinWidth: number = BetCoinContainerUI.getCoinContainerSetting().normalWidth;
            let coinWidthSum: number = BetCoinContainerUI.getCoinContainerSetting().normalWidth * BetCoinContainerUI.getCoinContainerSetting().coins.length;
            let cp: number = (Settings.GameSettingUtils.gameSetting.globalWidth - BetCoinContainerUI.getCoinContainerSetting().padding * 2 - coinWidthSum) / (BetCoinContainerUI.getCoinContainerSetting().coins.length + 1);
            let currPos = BetCoinContainerUI.getCoinContainerSetting().padding;
            BetCoinContainerUI.getCoinContainerSetting().coins.forEach((val, index) => {
                this.coinUIList[index] = new CoinUI(val, this.optionNumList[index], index, this);
                this.addChild(this.coinUIList[index]);
                currPos += (cp + coinWidth / 2);
                this.coinUIList[index].width = BetCoinContainerUI.getCoinContainerSetting().normalWidth;
                this.coinUIList[index].height = BetCoinContainerUI.getCoinContainerSetting().normalHeight;
                this.coinUIList[index].x = currPos;
                this.coinUIList[index].y = this.coinUIList[index].height * 0.7;
                currPos += coinWidth / 2;

            });
            this.resetCoinListStyle(false);
        }
        private resetCoinListStyle(animate: boolean): void {
            this.coinUIList.forEach((val, index) => {
                let scale = 1;
                if (val.activated) {
                    scale = BetCoinContainerUI.getCoinContainerSetting().activatedScale;
                    switch (index) {
                        case 0:
                            this.betNum = this.optionNumList[0];
                            this.betBitmapIndex = 0;
                            break;
                        case 1:
                            this.betNum = this.optionNumList[1];
                            this.betBitmapIndex = 1;
                            break;
                        case 2:
                            this.betNum = this.optionNumList[2];
                            this.betBitmapIndex = 2;
                            break;
                        case 3:
                            this.betNum = this.optionNumList[3];
                            this.betBitmapIndex = 3;
                            break;

                        default:
                            break;
                    }
                }
                if (animate) {
                    if (val.scaleX == scale) {
                        val.resetStyle();
                    } else {
                        egret.Tween.get(val).to({ scaleX: scale + 0.1, scaleY: scale + 0.1 }, 130).to({ scaleX: scale, scaleY: scale }, 20).call(() => { val.resetStyle(); });
                    }
                }
                else {
                    val.scaleX = scale;
                    val.scaleY = scale;
                    val.resetStyle();
                }
            });
        }
        private unactivateAllCoin(): void {
            this.coinUIList.forEach((val, index) => {
                val.activated = false;
            });
        }
        public unTouchEable() {
            this.coinUIList.forEach((val, index) => {
                val.activated = false;
                val.touchEnabled = false;
                val.canClick = false;
                val.scaleX = val.scaleY = 1;
                val.resetStyle();
            });

        }
        public setBetCoinUnActivate(indexes: number) {
            this.coinUIList.forEach((val, index) => {
                if (index == indexes) {
                    val.activated = false;
                    val.touchEnabled = false;
                    val.scaleX = val.scaleY = 1;
                    val.canClick = false;
                    val.resetStyle();
                }

            });
        }
        public resetBet(i?: number) {
            this.coinUIList.forEach((val, index) => {
                val.canClick = true;
                val.touchEnabled = true;
                val.activated = false;
                val.resetStyle();
                if (i == index) {
                    val.activated = true;
                    this.resetCoinListStyle(true);
                }


            });
        }




    }
    class CoinUI extends egret.Sprite {
        private coin: CoinItem;
        public activated: boolean;
        public canClick: boolean;
        private normalImage: egret.Bitmap;
        private activatedImage: egret.Bitmap;
        private unActivatedImage: egret.Bitmap;
        private text: egret.TextField;
        public optionNumList: Array<number>;
        private betNum: number;
        private index: number;
        private betCoinList: Array<egret.TextField>
        public constructor(coin: CoinItem, betNum: number, index: number, container: BetCoinContainerUI) {
            super();
            this.betNum = betNum;
            this.index = index;
            this.coin = coin;
            this.activated = false;
            this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        public resetStyle(can?: boolean): void {
            if (this.canClick) {
                if (this.activated) {
                    this.normalImage.visible = false;
                    this.activatedImage.visible = true;
                    this.unActivatedImage.visible = false;


                } else {
                    this.normalImage.visible = true;
                    this.activatedImage.visible = false;
                    this.unActivatedImage.visible = false;


                }
                switch (this.index) {
                    case 0:
                        this.text.strokeColor = 0x1f6b48;
                        break;
                    case 1:
                        this.text.strokeColor = 0x166478;
                        break;
                    case 2:
                        this.text.strokeColor = 0x8f312c;
                        break;
                    case 3:
                        this.text.strokeColor = 0x944725;
                        break;


                    default:
                        break;
                }
            } else {
                this.normalImage.visible = false;
                this.activatedImage.visible = false;
                this.unActivatedImage.visible = true;
                this.text.strokeColor = 0x464646;
            }

        }

        private onAddToStage(event: egret.Event) {
            this.drawCoin();
        }
        private drawCoin(): void {

            this.normalImage = CommonUtils.BitmapUtils.createBitmapByName(this.coin.coinIcon);
            this.normalImage.anchorOffsetX = this.normalImage.width / 2;
            this.normalImage.anchorOffsetY = this.normalImage.height;
            this.addChild(this.normalImage);
            this.activatedImage = CommonUtils.BitmapUtils.createBitmapByName(this.coin.activatedIcon);
            this.activatedImage.anchorOffsetX = this.activatedImage.width / 2;
            this.activatedImage.anchorOffsetY = this.activatedImage.height;
            this.addChild(this.activatedImage);
            this.unActivatedImage = CommonUtils.BitmapUtils.createBitmapByName(this.coin.unActivatedIcon);
            this.unActivatedImage.anchorOffsetX = this.unActivatedImage.width / 2;
            this.unActivatedImage.anchorOffsetY = this.unActivatedImage.height;
            this.addChild(this.unActivatedImage);

            this.text = new egret.TextField();
            this.text.size = 26;
            this.text.textColor = 0xffffff;
            this.text.text = this.betNum.toString();
            this.text.width = 109;
            this.text.anchorOffsetX = this.text.width / 2;
            this.text.anchorOffsetY = this.unActivatedImage.height - (this.unActivatedImage.height - this.text.height) / 2 + 5;
            this.text.textAlign = egret.HorizontalAlign.CENTER;
            this.text.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.text.stroke = 1;


            this.addChild(this.text);

        }


    }
    interface CoinContainerSetting {
        normalWidth: number;
        normalHeight: number;
        activatedScale: number;
        padding: number;
        backgroundImage: string;
        coins: CoinItem[];
    }
    interface CoinItem {
        coinValue: number;
        coinIcon: string;
        activatedIcon: string;
        unActivatedIcon: string;

    }
}