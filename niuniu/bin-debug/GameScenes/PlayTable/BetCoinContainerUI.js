var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameScenes;
(function (GameScenes) {
    var PlayTable;
    (function (PlayTable) {
        var BetCoinContainerUI = (function (_super) {
            __extends(BetCoinContainerUI, _super);
            function BetCoinContainerUI() {
                var _this = _super.call(this) || this;
                _this.betBitmapIndex = 0;
                _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                return _this;
            }
            BetCoinContainerUI.getCoinContainerSetting = function () {
                if (!this._coinContainerSetting) {
                    this._coinContainerSetting = RES.getRes(this.configFile);
                }
                return this._coinContainerSetting;
            };
            BetCoinContainerUI.prototype.loadCoins = function () {
                this.drawCoins();
                this.registCoinEvents();
            };
            BetCoinContainerUI.prototype.onAddToStage = function (event) {
                this.drawBg();
            };
            BetCoinContainerUI.prototype.registCoinEvents = function () {
                var _this = this;
                this.coinUIList.forEach(function (val, index) {
                    val.touchEnabled = true;
                    val.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
                        _this.unactivateAllCoin();
                        val.activated = true;
                        _this.resetCoinListStyle(true);
                    }, _this);
                });
            };
            BetCoinContainerUI.prototype.checkBetNum = function (myBetNum, totleBetNum, maxOdds) {
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
                this.coinUIList.forEach(function (val, index) {
                    val.activated = false;
                    val.touchEnabled = true;
                    val.scaleX = val.scaleY = 1;
                    val.canClick = true;
                    val.resetStyle();
                });
                this.resetBet(this.betBitmapIndex);
            };
            BetCoinContainerUI.prototype.drawBg = function () {
                var bg = CommonUtils.BitmapUtils.createBitmapByName(BetCoinContainerUI.getCoinContainerSetting().backgroundImage);
                bg.x = (Settings.GameSettingUtils.gameSetting.globalWidth - bg.width) / 2;
                if (this.stage.stageHeight == 1624) {
                    bg.height = bg.height * 1.5;
                }
                this.addChild(bg);
            };
            BetCoinContainerUI.prototype.drawCoins = function () {
                var _this = this;
                this.coinUIList = [];
                var coinWidth = BetCoinContainerUI.getCoinContainerSetting().normalWidth;
                var coinWidthSum = BetCoinContainerUI.getCoinContainerSetting().normalWidth * BetCoinContainerUI.getCoinContainerSetting().coins.length;
                var cp = (Settings.GameSettingUtils.gameSetting.globalWidth - BetCoinContainerUI.getCoinContainerSetting().padding * 2 - coinWidthSum) / (BetCoinContainerUI.getCoinContainerSetting().coins.length + 1);
                var currPos = BetCoinContainerUI.getCoinContainerSetting().padding;
                BetCoinContainerUI.getCoinContainerSetting().coins.forEach(function (val, index) {
                    _this.coinUIList[index] = new CoinUI(val, _this.optionNumList[index], index, _this);
                    _this.addChild(_this.coinUIList[index]);
                    currPos += (cp + coinWidth / 2);
                    _this.coinUIList[index].width = BetCoinContainerUI.getCoinContainerSetting().normalWidth;
                    _this.coinUIList[index].height = BetCoinContainerUI.getCoinContainerSetting().normalHeight;
                    _this.coinUIList[index].x = currPos;
                    _this.coinUIList[index].y = _this.coinUIList[index].height * 0.7;
                    currPos += coinWidth / 2;
                });
                this.resetCoinListStyle(false);
            };
            BetCoinContainerUI.prototype.resetCoinListStyle = function (animate) {
                var _this = this;
                this.coinUIList.forEach(function (val, index) {
                    var scale = 1;
                    if (val.activated) {
                        scale = BetCoinContainerUI.getCoinContainerSetting().activatedScale;
                        switch (index) {
                            case 0:
                                _this.betNum = _this.optionNumList[0];
                                _this.betBitmapIndex = 0;
                                break;
                            case 1:
                                _this.betNum = _this.optionNumList[1];
                                _this.betBitmapIndex = 1;
                                break;
                            case 2:
                                _this.betNum = _this.optionNumList[2];
                                _this.betBitmapIndex = 2;
                                break;
                            case 3:
                                _this.betNum = _this.optionNumList[3];
                                _this.betBitmapIndex = 3;
                                break;
                            default:
                                break;
                        }
                    }
                    if (animate) {
                        if (val.scaleX == scale) {
                            val.resetStyle();
                        }
                        else {
                            egret.Tween.get(val).to({ scaleX: scale + 0.1, scaleY: scale + 0.1 }, 130).to({ scaleX: scale, scaleY: scale }, 20).call(function () { val.resetStyle(); });
                        }
                    }
                    else {
                        val.scaleX = scale;
                        val.scaleY = scale;
                        val.resetStyle();
                    }
                });
            };
            BetCoinContainerUI.prototype.unactivateAllCoin = function () {
                this.coinUIList.forEach(function (val, index) {
                    val.activated = false;
                });
            };
            BetCoinContainerUI.prototype.unTouchEable = function () {
                this.coinUIList.forEach(function (val, index) {
                    val.activated = false;
                    val.touchEnabled = false;
                    val.canClick = false;
                    val.scaleX = val.scaleY = 1;
                    val.resetStyle();
                });
            };
            BetCoinContainerUI.prototype.setBetCoinUnActivate = function (indexes) {
                this.coinUIList.forEach(function (val, index) {
                    if (index == indexes) {
                        val.activated = false;
                        val.touchEnabled = false;
                        val.scaleX = val.scaleY = 1;
                        val.canClick = false;
                        val.resetStyle();
                    }
                });
            };
            BetCoinContainerUI.prototype.resetBet = function (i) {
                var _this = this;
                this.coinUIList.forEach(function (val, index) {
                    val.canClick = true;
                    val.touchEnabled = true;
                    val.activated = false;
                    val.resetStyle();
                    if (i == index) {
                        val.activated = true;
                        _this.resetCoinListStyle(true);
                    }
                });
            };
            BetCoinContainerUI.configFile = "coinContainerSetting_json";
            return BetCoinContainerUI;
        }(egret.Sprite));
        PlayTable.BetCoinContainerUI = BetCoinContainerUI;
        __reflect(BetCoinContainerUI.prototype, "GameScenes.PlayTable.BetCoinContainerUI");
        var CoinUI = (function (_super) {
            __extends(CoinUI, _super);
            function CoinUI(coin, betNum, index, container) {
                var _this = _super.call(this) || this;
                _this.betNum = betNum;
                _this.index = index;
                _this.coin = coin;
                _this.activated = false;
                _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                return _this;
            }
            CoinUI.prototype.resetStyle = function (can) {
                if (this.canClick) {
                    if (this.activated) {
                        this.normalImage.visible = false;
                        this.activatedImage.visible = true;
                        this.unActivatedImage.visible = false;
                    }
                    else {
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
                }
                else {
                    this.normalImage.visible = false;
                    this.activatedImage.visible = false;
                    this.unActivatedImage.visible = true;
                    this.text.strokeColor = 0x464646;
                }
            };
            CoinUI.prototype.onAddToStage = function (event) {
                this.drawCoin();
            };
            CoinUI.prototype.drawCoin = function () {
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
            };
            return CoinUI;
        }(egret.Sprite));
        __reflect(CoinUI.prototype, "CoinUI");
    })(PlayTable = GameScenes.PlayTable || (GameScenes.PlayTable = {}));
})(GameScenes || (GameScenes = {}));
//# sourceMappingURL=BetCoinContainerUI.js.map