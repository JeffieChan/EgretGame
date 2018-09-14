module GameScenes.PlayTable{

    export class BetPanelUIContainer extends egret.DisplayObjectContainer{
        private betPanelList:Models.BetPanelList;
        private betPanelUIList:BetPanelUI[];
        private setting:Settings.BetPanelSetting;
        private scale:number;
        private currIndex:number;
        private totalCount:number;
        private offsetX:number;
        public constructor(betPanelList:Models.BetPanelList,setting:Settings.BetPanelSetting,cleanTempData?:boolean){
            super();
            this.betPanelList = betPanelList;
            this.setting = setting;
            this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
            this.offsetX = 0;
        }
        public setConfirmedBetValues(confirmBetNumbers:Models.ConfirmBetNumber[]){
            this.betPanelUIList.forEach((panel)=>{
                panel.setConfirmedBetValues(confirmBetNumbers);
            });
        }
        public cleanTotalBetNumber(){
            this.betPanelUIList.forEach((panel)=>{
                panel.cleanTotalBetNumber();
            });
        }
        public cleanConfirmedNumber(){
            this.betPanelUIList.forEach((panel)=>{
                panel.cleanConfirmedNumber();
            });
        }
        public addTotalBetNumber(bp:TransmissionPackage.BetItem){
            this.betPanelUIList.forEach((panel)=>{
                panel.addTotalBetNumber(bp);
            });
        }
        public getBetList():TransmissionPackage.BetItem[]{
            if(!this.betPanelUIList){
                return [];
            }
            let bl:TransmissionPackage.BetItem[] = [];
            this.betPanelUIList.forEach((bp)=>{
                let betPanelBets = bp.getBetList();
                if(betPanelBets == null)
                    return;
                betPanelBets.forEach((val)=>{
                    bl.push(val);
                });
            });
            return bl;
        }
        public setOnBetSuccessHandle(handle:(coinValue:number)=>void){
            this.betPanelUIList.forEach((val,index,array)=>{
                val.setOnBetSuccessHandle(handle);
            });
        }
        public setBetValueCheckFailedHandle(handle:(coinValue:Number,errmsg:any,isTextFlow?:boolean)=>void){
            this.betPanelUIList.forEach((val,index,array)=>{
                val.setOnBetCheckFailed(handle);
            });
        }
        private onAddToStage(evt:egret.Event){
            this.currIndex = 0;
            this.totalCount = this.betPanelList.BetPanels.length;
            this.scale = this.parent.width / this.setting.panelWidth;
            this.betPanelUIList = [];
            this.betPanelList.BetPanels.forEach((val,index,array)=>{
                let bpui = new BetPanelUI(val,this.setting);
                this.betPanelUIList.push(bpui);
                this.addChild(bpui);
                bpui.x = this.setting.panelWidth * index;
            });
            this.x = 0;
            this.y = this.setting.top;
        }

        public setCurrentCoinValue(coinValue:number){
            this.betPanelUIList.forEach((val)=>{
                val.setCurrentCoinValue(coinValue);
            });
        }

        public cleanBetNumber(){
            this.betPanelUIList.forEach((val)=>{
                val.clearBetNumber();
            });
        }

        public confirmBetNumber(){
            this.betPanelUIList.forEach((val)=>{
                val.confirmBetNumber();
            });
        }
        public moveBack(){        
            this.moveRelated(this.currIndex,-1);
        }
        public moveLeft(){
            this.currIndex ++;
            this.currIndex = this.currIndex % this.betPanelUIList.length;
            this.moveRelated(this.currIndex,0);
        }
        public moveRight(){
            this.currIndex --;
            this.currIndex =( this.currIndex + this.betPanelUIList.length )% this.betPanelUIList.length;
            this.moveRelated(this.currIndex,1);
        }
        public setOffsetPos(offsetX){
            this.offsetX = offsetX;
        }
        public moveRelated(nextIndex:number,direction:number){
            let currIndex = direction == 0 ? (nextIndex - 1 + this.betPanelUIList.length) % this.betPanelUIList.length : (nextIndex + 1) % this.betPanelUIList.length;
            if(direction == -1) currIndex = this.currIndex
            if(currIndex < 0) currIndex += this.betPanelUIList.length;
            let curr = this.betPanelUIList[currIndex];
            let leftIndex = currIndex - 1;
            if(leftIndex < 0) leftIndex += this.betPanelUIList.length;
            let left = this.betPanelUIList[leftIndex];
            let rightIndex = currIndex + 1;
            if(rightIndex >= this.betPanelUIList.length) rightIndex -= this.betPanelUIList.length;
            let right = this.betPanelUIList[rightIndex];
            // move left
            let currPos = 0;
            let leftPos = 0;
            let rightPos = 0;
            if(direction == 0 || direction == 1){
                left.x = - this.setting.panelWidth;
                right.x = this.setting.panelWidth;
                curr.x = 0;
            }
            if(direction == 0){
                currPos = - this.setting.panelWidth;
                rightPos = 0;
                leftPos =  - this.setting.panelWidth * 2;
            }else if(direction == -1){
                currPos = 0;
                rightPos = this.setting.panelWidth;
                leftPos = -this.setting.panelWidth;
            }else{
                currPos = this.setting.panelWidth;
                rightPos =  this.setting.panelWidth * 2;
                leftPos = 0;
            }
            egret.Tween.get( curr ).to( {x: currPos,y:curr.y}, 300, egret.Ease.sineIn );
            egret.Tween.get( left ).to( {x: leftPos,y:curr.y}, 300, egret.Ease.sineIn );
            egret.Tween.get( right ).to( {x: rightPos,y:curr.y}, 300, egret.Ease.sineIn );
        }

        public getBetSum():number{
            let sum = 0;
            this.betPanelUIList.forEach((val)=>{
                sum += val.getBetValue();
            });
            return sum;
        }

        public canBetMore(betValue:number){
            let sum = 0;
            this.betPanelUIList.forEach((val)=>{
                sum += val.getTotalBetAndConfirmSum();
            });
            return (betValue + sum <= this.betPanelList.MaxBet);
        }
        public getMaxBetLimit(){
            return this.betPanelList.MaxBet;
        }
        
    }
    class BetPanelUI extends egret.DisplayObjectContainer{
        private currentCoinValue:number;
        private betPanel:Models.BetPanel;
        private txtTitle:egret.TextField;
        private setting:Settings.BetPanelSetting;
        private betCells:BetCellUI[][];
        private betSuccessHandle:(coinValue:number)=>void;
        private onBetCheckFailed:(coinValue:number,errmsg:any,isTextFlow?:boolean)=>void;
        
        public constructor(betPanel:Models.BetPanel,setting:Settings.BetPanelSetting){
            super();
            this.betPanel = betPanel;
            this.setting = setting;
            this.currentCoinValue = 0;
            this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        }
        public setConfirmedBetValues(confirmBetNumbers:Models.ConfirmBetNumber[]){
            if(!confirmBetNumbers) return;
            if(confirmBetNumbers.length == 0) return;

            let valInited = false;
            confirmBetNumbers.forEach((val,index)=>{
                valInited = false;
                for(let i = 0; i < this.betCells.length ; i++){
                    let row = this.betCells[i];
                    for(let j = 0; j < row.length; j++){
                        if(row[j].initConfirmNumber(val)){
                            valInited = true;
                            break;
                        }
                    }
                    if(valInited)
                        break;
                }
            });
        }
        public cleanTotalBetNumber(){
            this.betCells.forEach((row)=>{
                if(!row)
                    return;
                row.forEach((cell)=>{
                    cell.cleanTotalBetNumber();
                });
            });
        }
        public cleanConfirmedNumber(){
            this.betCells.forEach((row)=>{
                if(!row)
                    return;
                row.forEach((cell)=>{
                    cell.cleanConfirmedNumber();
                });
            });
        }
        public addTotalBetNumber(bp:TransmissionPackage.BetItem){
            if(!this.betCells){
                return [];
            }
            this.betCells.forEach((row)=>{
                if(!row)
                    return;
                row.forEach((cell)=>{
                    cell.addTotalBetNumber(bp);
                });
            });
        }
        public getBetList():TransmissionPackage.BetItem[]{
            if(!this.betCells){
                return [];
            }
            let bl:TransmissionPackage.BetItem[] = [];
            this.betCells.forEach((row)=>{
                if(!row)
                    return;
                row.forEach((cell)=>{
                    let bp:TransmissionPackage.BetItem = cell.getBetPackage();
                    if(bp.ConfirmNumber == 0)
                        return;
                    bl.push(cell.getBetPackage());
                });
            });
            return bl;
        }
        public setCurrentCoinValue(val:number){
            this.currentCoinValue = val;
        }
        public setOnBetSuccessHandle(handle:(coinValue:number)=>void){
            this.betSuccessHandle = handle;
        }
        public setOnBetCheckFailed(handler:(coinValue:number,errmsg:any)=>void){
            this.onBetCheckFailed = handler;
        }
        public clearBetNumber(){
            this.betCells.forEach((row)=>{
                row.forEach((cell)=>{
                    cell.clearBetNumber();
                });
            })
        }
        public confirmBetNumber(){
            this.betCells.forEach((row)=>{
                row.forEach((cell)=>{
                    cell.confirm();
                });
            });
        }
        public getBetValue(){
            let betSum = 0;
            this.betCells.forEach((row)=>{
                row.forEach((cell)=>{
                    betSum += cell.getBetNumber();
                });
            });
            return betSum;
        }
        public getTotalBetAndConfirmSum(){
            let betSum = 0;
            let confirmSum = 0;
            this.betCells.forEach((row)=>{
                row.forEach((cell)=>{
                    betSum += cell.getBetNumber();
                    confirmSum += cell.getConfirmNumber();
                });
            });
            return betSum + confirmSum;
        }
        private onAddToStage(evt:egret.Event){
            this.betCells = [];
            this.txtTitle = new egret.TextField;
            this.txtTitle.textColor = 0xFFFFFF;
            this.txtTitle.size = this.setting.titleSize;
            this.txtTitle.text = this.betPanel.Title;
            this.txtTitle.x = this.setting.padding;
            this.addChild(this.txtTitle);
            
            let cellWidth = (this.setting.panelWidth - this.setting.padding * 2 - this.setting.cellPadding * (this.betPanel.CellCount - 1)) / this.betPanel.CellCount;
            let cellsTop = this.setting.titleSize + 20;
            this.betPanel.BetCellRows.forEach((row,ri,array)=>{
                let rowTop = cellsTop + (this.setting.cellHeight + this.setting.cellPadding) * ri ;
                let currCW = (row.LayoutType == "fullLine") ? this.setting.panelWidth - this.setting.padding * 2:cellWidth;
                this.betCells[ri] = [];
                row.RowValues.forEach((cell,ci,cells)=>{
                    let cellLeft = this.setting.padding + (this.setting.cellPadding + cellWidth) * ci;
                    this.betCells[ri][ci] = new BetCellUI(cell,this.betPanel.Name,currCW,this.setting.cellHeight,this.setting.cellBgColor,this.setting.cellBgAlpha);
                    this.addChild(this.betCells[ri][ci]);
                    if(cell.BetNumber > 0){
                        this.betCells[ri][ci].addTotalBetNumber({OptionId:cell.Value,ConfirmNumber:cell.BetNumber});
                    }
                    this.betCells[ri][ci].touchEnabled = true;
                    this.betCells[ri][ci].addEventListener(egret.TouchEvent.TOUCH_TAP,(evt:egret.TouchEvent)=>{
                        if(this.betCells[ri][ci].isBetted()){

                            if(!this.betCells[ri][ci].canBetMore(this.currentCoinValue)){

                                let textFlow = <Array<egret.ITextElement>>[
                                    {text:"单项投注金额已超出   最大金额："}
                                    ,{text:cell.MaxBet,style:{textColor:0xFF0000}}
                                ];
                                this.onBetCheckFailed(this.currentCoinValue, textFlow,true);
                                return false;
                            }
                            
                            if(!(<BetPanelUIContainer>this.parent).canBetMore(this.currentCoinValue)){
                                let textFlow = <Array<egret.ITextElement>>[
                                    {text:"单期投注金额已超出   最大金额："}
                                    ,{text:(<BetPanelUIContainer>this.parent).getMaxBetLimit(),style:{textColor:0xFF0000}}
                                ];
                                this.onBetCheckFailed(this.currentCoinValue,textFlow,true);
                                return false;
                            }
                            
                            if((<BetPanelUIContainer>this.parent).getBetSum() + this.currentCoinValue > ViewModels.GameData.getAccountBonus()){
                                this.onBetCheckFailed(this.currentCoinValue,"猜豆余额不足");
                                return false;
                            }
                            this.betCells[ri][ci].bet(this.currentCoinValue);
                            egret.Tween.get( this.betCells[ri][ci] ).to( {scaleX:1.05,scaleY:1.05}, 50 ).to( {scaleX:1,scaleY:1}, 50);
                            if(this.betSuccessHandle != null) this.betSuccessHandle(this.currentCoinValue);
                        }
                    },this);
                    this.betCells[ri][ci].x = cellLeft + this.betCells[ri][ci].anchorOffsetX;
                    this.betCells[ri][ci].y = rowTop + this.betCells[ri][ci].anchorOffsetY;
                    this.betCells[ri][ci].setMyBetNumber(0,0);
                });
            });
            
        }
    }
    class BetCellUI extends egret.DisplayObjectContainer{
        private cellWidth:number;
        private cellHeight:number;
        private bgColor:number;
        private bgAlpha:number;
        private radius = 30;
        private betCell:Models.BetCell;
        private panelType:string;
        private txtTotalBetNumber:egret.TextField;
        private txtMyBetNumber:egret.TextField;
        private betNumber:number;
        private confirmNumber:number;
        private totalBetNumber:number;
        private betted:boolean;
        private settedBg:egret.Shape;
        private normalBg:egret.Shape;
        private setted:boolean;
        private static sumPosX:number = 18;
        private static sumPosY:number = 12;
        private static sumSize:number = 18;
        private static betNumberColor:number = 0xd7a959;
        public isBetted(){
            return this.betted;
        }
        public constructor(betCell:Models.BetCell,panelType:string,cellWidth:number,cellHeight:number,bgColor:number,bgAlpha:number){
            super();
            this.cellWidth = cellWidth;        
            this.cellHeight = cellHeight;
            this.anchorOffsetX = this.cellWidth / 2;
            this.anchorOffsetY = this.cellHeight / 2;
            this.bgAlpha = bgAlpha;
            this.bgColor = bgColor;
            this.betCell = betCell;
            this.panelType = panelType;
            this.betNumber = 0;
            this.confirmNumber = 0;
            this.betted = true;
            this.setted = false;
            this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        }
        private onAddToStage(evt:egret.Event){
            this.normalBg = new egret.Shape;
            this.normalBg.graphics.beginFill(this.bgColor,this.bgAlpha);
            this.normalBg.graphics.lineStyle(1,0x333333);
            this.normalBg.graphics.drawRoundRect(0,0,this.cellWidth,this.cellHeight,this.radius);
            this.normalBg.graphics.endFill();
            this.addChild(this.normalBg);
            this.settedBg = new egret.Shape;
            this.settedBg.graphics.beginFill(this.bgColor,0.6);
            this.settedBg.graphics.lineStyle(1,0x333333);
            this.settedBg.graphics.drawRoundRect(0,0,this.cellWidth,this.cellHeight,this.radius);
            this.settedBg.graphics.endFill();
            let cellValText = new egret.TextField;
            this.addChild(cellValText);
            cellValText.x = 25;
            cellValText.y = 38;
            cellValText.size = 30;
            cellValText.text = (this.betCell.Text == null || this.betCell.Text == "") ? this.betCell.Value.replace(this.panelType,""): this.betCell.Text;
            this.txtTotalBetNumber = new egret.TextField;
            this.addChild(this.txtTotalBetNumber);
            this.txtTotalBetNumber.textColor = BetCellUI.betNumberColor;
            this.txtTotalBetNumber.size = BetCellUI.sumSize;
            this.txtTotalBetNumber.x = BetCellUI.sumPosX;
            this.txtTotalBetNumber.y = BetCellUI.sumPosY;
            this.totalBetNumber = 0;
            
            let txtOdd = new egret.TextField;
            txtOdd.text = this.betCell.Odds.toString() + " 倍";
            txtOdd.textColor = 0xFFFFFF;
            txtOdd.size = 18;
            this.addChild(txtOdd);
            txtOdd.y = 12;
            txtOdd.x = this.cellWidth - 14 - txtOdd.width;        
            
            this.txtMyBetNumber = new egret.TextField;
            this.txtMyBetNumber.textColor = 0xd7a959;
            this.txtMyBetNumber.size = 18;
            this.txtMyBetNumber.text = " ";
            this.addChild(this.txtMyBetNumber);
            this.txtMyBetNumber.x = this.cellWidth - 14 - this.txtMyBetNumber.width;
            this.txtMyBetNumber.y = this.cellHeight - 12 - this.txtMyBetNumber.height;

            let desLeft = cellValText.x + cellValText.width + 15;
            if(this.betCell.Description != null){
                this.betCell.Description.forEach((val,index,array)=>{
                    let des = new egret.TextField;
                    des.x = desLeft;
                    des.y = 27 + 25 * index;
                    des.text = val;
                    des.size = 20;
                    des.fontFamily = "苹方";
                    des.textColor = 0x85d797;
                    this.addChild(des);
                });
            }
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onMouseDown,this);
            this.addEventListener(egret.TouchEvent.TOUCH_END,this.onMouseUp,this);
        }
        private startX = 0;
        private onMouseDown(evt:egret.TouchEvent){
            this.betted = false;
            this.startX = evt.localX;
        }
        private onMouseUp(evt:egret.TouchEvent){
            if(Math.abs(evt.localX - this.startX) <= 25){
                this.betted = true;
                return;
            }

        }
        private showTotalBetNumber(){
            if(this.totalBetNumber == 0){
                this.txtTotalBetNumber.text = "";
                return;
            }
            this.txtTotalBetNumber.text = this.totalBetNumber.toString();
        }
        public cleanTotalBetNumber(){
            this.totalBetNumber = 0;
            this.showTotalBetNumber();
        }
        public cleanConfirmedNumber(){
            this.confirmNumber = 0;
            this.showMyBetNumber();
        }
        public addTotalBetNumber(bp:TransmissionPackage.BetItem){
            if(this.betCell.Value.toString() != bp.OptionId.toString())
                return;
            this.totalBetNumber += +bp.ConfirmNumber;
            this.showTotalBetNumber();
            this.popupNumber(bp.ConfirmNumber);
        }
        private popupNumber(betNumber:number){
            let directionX = Math.random()+0.5;
            let directionY = Math.random()+0.5;
            let lbl:eui.Label = new eui.Label;        
            lbl.text = "+" + betNumber.toString();
            lbl.size = BetCellUI.sumSize;
            lbl.x = BetCellUI.sumPosX;
            lbl.y = BetCellUI.sumSize;
            lbl.scaleY = 0;
            lbl.scaleX = 0;
            lbl.alpha = 0;
            lbl.anchorOffsetY = BetCellUI.sumSize;
            lbl.textColor =  BetCellUI.betNumberColor;
            this.addChild(lbl);
            egret.Tween.get( lbl ).to( {scaleY:1,scaleX:1,alpha:0.8}, 100)
                                    .to( {x:lbl.x + lbl.size * directionX,y:lbl.y - lbl.size * directionY,alpha:.6}, 600)
                                    .to( {x:lbl.x + lbl.size * directionX * 1.5,y:lbl.y - lbl.size * directionY * 1.5,alpha:0}, 600)
                                    .call(()=>{
                                        this.removeChild(lbl);
                                    },this);
        }
        private resetBg(){
            
            if(this.betNumber == 0){
                if(this.setted == false){
                    return;
                }
                this.setted = false;
                this.removeChild(this.settedBg);
                this.addChild(this.normalBg);
                this.setChildIndex(this.normalBg,0);
                return;
            }
            if(this.setted == true)
                return;
            this.setted = true;
            this.removeChild(this.normalBg);
            this.addChild(this.settedBg);
            this.setChildIndex(this.settedBg,0);
        }
        private showMyBetNumber(){
            this.resetBg();
            this.txtMyBetNumber.text = this.confirmNumber.toString() + " / " + this.betNumber.toString();
            this.txtMyBetNumber.x = this.cellWidth - 14 - this.txtMyBetNumber.width;
            this.txtMyBetNumber.textColor = (this.confirmNumber <= 0 && this.betNumber <= 0)?0x1d4528:0xd7a959;
        }
        public setMyBetNumber(betNumber:number,confirmNumber:number){
            this.betNumber = betNumber;
            this.confirmNumber = confirmNumber;
            this.showMyBetNumber();
        }
        public clearBetNumber(){
            if(this.betNumber == 0)
                return;
            this.betNumber = 0;
            this.showMyBetNumber();
        }
        public bet(betNumber:number){
            this.betNumber += betNumber;
            this.showMyBetNumber();
        }
        public confirm(){
            this.confirmNumber += this.betNumber;
            this.betNumber = 0;
            this.showMyBetNumber();
        }
        public getBetPackage():TransmissionPackage.BetItem{
            let bp = new TransmissionPackage.BetItem();
            bp.OptionId = this.betCell.Value;
            bp.ConfirmNumber = this.betNumber;
            return bp;
        }
        public canBetMore(betValue:number){
            return (betValue + this.betNumber + this.confirmNumber <= this.betCell.MaxBet);
        }
        public getBetNumber(){
            return this.betNumber;
        }
        public getConfirmNumber(){
            return this.confirmNumber;
        }
        public initConfirmNumber(confirmBetNumber:Models.ConfirmBetNumber):boolean{
            if(this.betCell.Value != confirmBetNumber.OptionId.toString())
                return false;
            this.totalBetNumber = confirmBetNumber.ConfirmNumber;
            this.showTotalBetNumber();
            this.setMyBetNumber(0,confirmBetNumber.ConfirmNumber);
        }
    }
    
}