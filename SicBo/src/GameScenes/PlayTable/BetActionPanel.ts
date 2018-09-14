module GameScenes.PlayTable{
	export class BetActionPanel extends egret.DisplayObjectContainer {
		private setting:Settings.BetActionPanelSetting;
		private btnBetClean:BetCleanBtnUI;
		private btnBetConfirm:BetConfirmBtnUI;
		private betCoinList:BetCoinListUI;
		private btnCurrentCoin:BetCoinUI;
		private currentCoinTapEvent:(coinValue)=>void;
		private clearTapEvent:()=>void;
		private confirmTapEvent:()=>void;
		private panelMask:egret.Shape;
		private bg:egret.Shape;
		public constructor(setting:Settings.BetActionPanelSetting) {
			super();
			this.setting = setting;
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		}
		public enableConfirm(){
			this.btnBetConfirm.enableButton();
		}
		public disableConfirm(){
			this.btnBetConfirm.disableButton();
		}
		public setClearTapEvent(handle:()=>void){
			this.clearTapEvent = handle;
		}
		public setCurrentCoinTapEvent(handle:(coinValue)=>void){
			this.currentCoinTapEvent = handle;
		}
		public setConfirmTapEvent(handle:()=>void){
			this.confirmTapEvent = handle;
		}
		private onAddToStage(evt:egret.Event){
			this.drawBg();
			this.y = this.setting.panelHeight;
			this.drawBtnClean();
			this.drawBtnConfirm();
			this.drawBtnCurrentCoin();
			this.drawPanelMask();
			this.drawCoinList();
			this.panelMask.visible = false;
			this.setChildIndex(this.bg,0);
			this.setChildIndex(this.btnBetClean,1);
			this.setChildIndex(this.btnBetConfirm,2);
			this.setChildIndex(this.panelMask,3);
			this.setChildIndex(this.btnCurrentCoin,4);
			this.setChildIndex(this.betCoinList,5);
		}
		private hideCoinList(){
			let self = this;
			self.panelMask.visible = false;
			this.betCoinList.hide();
		}
		private toogleBetCoinList(){
			let self = this;
			self.panelMask.visible = !self.panelMask.visible;
			this.betCoinList.toogle();
		}
		private drawBg(){
			this.bg = new egret.Shape();
			this.bg.graphics.beginFill(this.setting.bgColor);
			this.bg.graphics.drawRect(0,0,Settings.GameSettingUtils.gameSetting.globalWidth,this.setting.panelHeight);
			this.bg.graphics.endFill();
			this.addChild(this.bg);
		}
		public getSelectedCoinValue():number{
			return this.btnCurrentCoin.getCoinValue();
		}
		private drawPanelMask(){
			this.panelMask = new egret.Shape();
			this.addChild(this.panelMask);
			this.panelMask.graphics.beginFill(0x000000);
			this.panelMask.graphics.drawRect(-2000,-2000,5000,5000);
			this.panelMask.graphics.endFill();
			this.panelMask.touchEnabled = true;
			this.panelMask.alpha = 0.6;
			this.panelMask.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
				this.hideCoinList();
			},this);
		}
		private drawBtnClean(){
			this.btnBetClean = new BetCleanBtnUI();
			this.addChild(this.btnBetClean);
			this.btnBetClean.x = 20;
			this.btnBetClean.y = (this.height - this.btnBetClean.height) / 2;
			this.btnBetClean.touchEnabled = true;
			this.btnBetClean.addEventListener(egret.TouchEvent.TOUCH_TAP,(evt:egret.TouchEvent)=>{
				if(this.clearTapEvent != null)
					this.clearTapEvent();
			},this);
		}
		private drawBtnConfirm(){
			this.btnBetConfirm = new BetConfirmBtnUI();
			this.addChild(this.btnBetConfirm);
			this.btnBetConfirm.x = this.width - this.btnBetConfirm.width - 20;
			this.btnBetConfirm.y = (this.height - this.btnBetConfirm.height) / 2;
			this.btnBetConfirm.touchEnabled = true;
			this.btnBetConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP,(evt:egret.TouchEvent)=>{
				if(this.confirmTapEvent != null)
					this.confirmTapEvent();
			},this);
		}
		private drawBtnCurrentCoin(){

			this.btnCurrentCoin = new BetCoinUI(0);
			this.addChild(this.btnCurrentCoin);
			this.btnCurrentCoin.anchorOffsetX = this.btnCurrentCoin.width / 2;
			this.btnCurrentCoin.anchorOffsetY = this.btnCurrentCoin.height / 2;
			this.btnCurrentCoin.x = this.width / 2;
			this.btnCurrentCoin.y = this.setting.panelHeight / 2;
			this.btnCurrentCoin.setCoinValue(this.setting.supportedBetValue[0]);
			if(this.currentCoinTapEvent != null) this.currentCoinTapEvent(this.setting.supportedBetValue[0]);
			this.btnCurrentCoin.touchEnabled = true;
			this.btnCurrentCoin.addEventListener(egret.TouchEvent.TOUCH_TAP,(evt:egret.TouchEvent)=>{
				evt.stopImmediatePropagation();
				this.toogleBetCoinList();
			},this);

		}
		private drawCoinList(){

			this.betCoinList = new BetCoinListUI(this.setting.supportedBetValue);
			this.addChild(this.betCoinList);
			this.betCoinList.y = - this.betCoinList.getPanelHeight();
			this.betCoinList.setOrgY (- this.betCoinList.getPanelHeight()) ;
			this.betCoinList.setCoinTapHandler((selectedValue:number)=>{
				this.hideCoinList();
				this.btnCurrentCoin.setCoinValue(selectedValue);
				if(this.currentCoinTapEvent != null) this.currentCoinTapEvent(selectedValue);
				egret.Tween.get( this.btnCurrentCoin ,)
						.to({scaleX:1.1 ,scaleY:1.1 } , 100).to({scaleX:1 ,scaleY:1 } , 100);			
			});
			this.betCoinList.selectCoin(0);
			let msk = new egret.Shape;
			msk.graphics.beginFill(0x000000);
			msk.graphics.drawRect(0,0,this.betCoinList.width,this.betCoinList.getPanelHeight() + 100);
			msk.graphics.endFill();
			msk.y = this.betCoinList.y - 100;
			this.addChild(msk);
			this.betCoinList.mask = msk;
			this.betCoinList.hideNoAnmit();
		}
	}
	class BetCoinListUI extends egret.DisplayObjectContainer{
		private orgY:number;
		private supportedBetValues:number[];
		private coinList:BetCoinUI[];
		private tapListener:(selectedNumber:number)=>void;
		private panelHeight = 120;
		public constructor(supportedBetValues:number[]){
			super();
			this.supportedBetValues = supportedBetValues;
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		}
		public toogle(){
			if(this.visible){
				this.hide();
			}else{
				this.show();
			}
		}
		public hideNoAnmit(){
			this.visible = false;
		}
		public hide(){			
			egret.Tween.get(this).to({y: this.orgY - 5},50).to({y:this.orgY + 50},100);
			egret.Tween.get(this).to({alpha:0.6},30).to({alpha:0},120).call(function(){this.visible = false;});
		}
		public show(){
			this.y = this.orgY + 50;
			this.visible = true;
			egret.Tween.get(this).to({y: this.orgY - 5},100).to({y:this.orgY},50);
			egret.Tween.get(this).to({alpha:1},150);
		}
		public setCoinTapHandler(tapListener:(selectedNumber:number)=>void){
			this.tapListener = tapListener;
		}
		public selectCoin(index:number){
			this.coinList[index].selectCoin(null);
		}
		public setOrgY(orgY:number){
			this.orgY = orgY;
		}
		public getPanelHeight(){
			return this.panelHeight;
		}
		private onAddToStage(evt:egret.Event){
			this.drawBg();
			this.coinList = [];
			var coinWidth = this.width / this.supportedBetValues.length;
			this.supportedBetValues.forEach((val,index)=>{
				this.coinList[index] = new BetCoinUI(1);
				this.addChild(this.coinList[index]);
				this.coinList[index].anchorOffsetX = this.coinList[index].width / 2;
				this.coinList[index].anchorOffsetY = this.coinList[index].height / 2;
				this.coinList[index].setCoinValue(val);
				this.coinList[index].x = coinWidth * index + coinWidth/ 2;
				this.coinList[index].y = 60;
				this.coinList[index].touchEnabled = true;
				let self = this;
				this.coinList[index].addEventListener(egret.TouchEvent.TOUCH_TAP,(evt:egret.TouchEvent)=>{
					this.unselectAllCoin(index);
					this.coinList[index].selectCoin(function(){self.tapListener(val)});
				},this);
			});
		}
		private unselectAllCoin(skipIndex:number){
			this.coinList.forEach((val,index)=>{				
				if(index == skipIndex)
					return;
				val.unselectCoin();
			});
		}
		private drawBg(){
			let bg = new egret.Shape();
			bg.graphics.beginFill(0xFFFFFF);
			bg.graphics.drawRect(0,0,Settings.GameSettingUtils.gameSetting.globalWidth,this.panelHeight);
			bg.graphics.endFill();
			this.addChild(bg);
		}
	}
	class BetCoinUI extends egret.DisplayObjectContainer{
		private coinValue:number;
		private tapEvent;
		private style:number;
		private orgY:number;
		private unselectBg:egret.Shape;
		private unselectText:egret.TextField;
		private selectBg:egret.Shape;
		private selectText:egret.TextField;
		public constructor(style:number){
			super();
			this.style = style;
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		}
		private onAddToStage(evt:egret.Event){
			if(this.style == 0){
				let bg = CommonUtils.BitmapUtils.createBitmapByName("icon_bet_coin_png");
				this.addChild(bg);
				this.unselectText = new egret.TextField;
				this.unselectText.textColor = 0xf43921;
				this.addChild(this.unselectText);
				this.selectText = new egret.TextField;
				this.selectText.textColor = 0xf43921;
				this.touchEnabled = true;
				return;
			}

			let radius = 45;
			let fontColor = 0xffffff;
			let fontBorder = 0xc42b14;
			// 未选中
			this.unselectBg = new egret.Shape;
			this.unselectBg.graphics.beginFill(0xef4d34);
			this.unselectBg.graphics.lineStyle(3,0xfc7b69)
			this.unselectBg.graphics.drawCircle(radius,radius,radius);
			this.unselectBg.graphics.endFill();
			this.unselectText = new egret.TextField;
			this.unselectText.textColor = fontColor;
			this.unselectText.stroke = 4;
			this.unselectText.strokeColor = 0xc52a16;
			this.addChild(this.unselectBg);
			this.addChild(this.unselectText);

			// 选中状态
			this.selectBg = new egret.Shape;
			this.selectBg.graphics.beginFill(0xfb694c);
			this.selectBg.graphics.lineStyle(3,0xffa893)
			this.selectBg.graphics.drawCircle(radius,radius,radius);
			this.selectBg.graphics.endFill();
			this.selectText = new egret.TextField;
			this.selectText.textColor = fontColor;
			this.selectText.stroke = 4;
			this.selectText.strokeColor = 0xe93b1f;
			
			this.touchEnabled = true;

		}
		public getCoinValue(){
			return this.coinValue;
		}
		public setCoinValue(coinValue:number){
			this.coinValue = coinValue;
			this.showCoinValue(this.unselectText);
			this.showCoinValue(this.selectText);
		}
		private showCoinValue(textField:egret.TextField){
			if(this.style == 0){
				textField.size = 25;
				textField.text = this.coinValue.toString();
				while(textField.width > 44){
					textField.size --;
				}
				textField.y = (this.height - textField.height) / 2;
				textField.x = (this.width - textField.width) / 2;
				return;
			}
			textField.size = 30;
			textField.text = this.coinValue.toString();
			while(textField.width > 50){
				textField.size --;
			}
			textField.y = (this.height - textField.height) / 2 - 2;
			textField.x = (this.width - textField.width) / 2 - 2;
		}
		public selectCoin(onChanged:Function){
			if(this.contains(this.unselectBg))
				this.removeChild(this.unselectBg);
			if(this.contains(this.unselectText))
				this.removeChild(this.unselectText);
			this.addChild(this.selectBg);
			this.addChild(this.selectText);
			egret.Tween.get( this)
				.to({scaleX:1.2 ,scaleY:1.2 } , 100).call(function(){
				if(onChanged)
					onChanged();
				});
			egret.Tween.get( this )
				.to({ y: 60 - 28 } , 100);
		}
		public unselectCoin(){
			if(this.contains(this.selectBg))
				this.removeChild(this.selectBg);
			if(this.contains(this.selectText))
				this.removeChild(this.selectText);
			this.addChild(this.unselectBg);
			this.addChild(this.unselectText);
			egret.Tween.get( this ).to({scaleX:1 ,scaleY:1 } , 100);
			egret.Tween.get( this ).to({y:60} , 100);
		}
	}
	abstract class BaseActionButton extends egret.DisplayObjectContainer{
		public constructor(){
			super();
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		}
		private onAddToStage(evt:egret.Event){
			this.drawButton();
			this.setEnableStyle();
		}
		public enableButton(){
			this.touchEnabled = true;
			this.setEnableStyle();
		}
		public disableButton(){
			this.touchEnabled = false;
			this.setDisableStyle();
		}
		protected abstract drawButton();
		protected abstract setEnableStyle();
		protected abstract setDisableStyle();
	}
	class BetCleanBtnUI extends BaseActionButton{
		protected drawButton(){
			this.setEnableStyle();
		}
		protected setEnableStyle(){
			let bg = new egret.Shape();
			bg.graphics.beginFill(0x3d4e3f);
			bg.graphics.lineStyle(1,0x4d675f);
			bg.graphics.drawRoundRect(0,0,160,64,10,10);
			bg.graphics.endFill();
			this.addChild(bg);
			let lblText = new egret.TextField;
			lblText.fontFamily = "苹方";
			lblText.width = 160;
			lblText.height = 64;
			lblText.size = 28;
			lblText.textColor = 0x010102;
			lblText.textAlign = egret.HorizontalAlign.CENTER;
			lblText.verticalAlign = egret.VerticalAlign.MIDDLE;
			lblText.text = "清空";
			this.addChild(lblText);
			return;
		}
		protected setDisableStyle(){
			return;
		}
	}
	class BetConfirmBtnUI extends BaseActionButton{
		private bg:egret.Shape;
		private lblText:egret.TextField;
		protected drawButton(){
			this.setEnableStyle();
		}
		private cleanStyle(){
			this.removeChild(this.bg);
			this.removeChild(this.lblText);
		}
		protected setEnableStyle(){
			this.bg = new egret.Shape();
			this.bg.graphics.beginFill(0xe81816);
			this.bg.graphics.lineStyle(1,0xff6546);
			this.bg.graphics.drawRoundRect(0,0,160,64,10,10);
			this.bg.graphics.endFill();
			this.addChild(this.bg);
			this.lblText = new egret.TextField;
			this.lblText.fontFamily = "苹方";
			this.lblText.width = 160;
			this.lblText.height = 64;
			this.lblText.size = 28;
			this.lblText.textColor = 0xffffff;
			this.lblText.textAlign = egret.HorizontalAlign.CENTER;
			this.lblText.verticalAlign = egret.VerticalAlign.MIDDLE;
			this.lblText.text = "确定";
			this.addChild(this.lblText);
			return;
		}
		protected setDisableStyle(){
			let bg = new egret.Shape();
			bg.graphics.beginFill(0xa0a0a0);
			bg.graphics.lineStyle(1,0x362e2b);
			bg.graphics.drawRoundRect(0,0,160,64,10,10);
			bg.graphics.endFill();
			this.addChild(bg);
			let lblText = new egret.TextField;
			lblText.fontFamily = "苹方";
			lblText.width = 160;
			lblText.height = 64;
			lblText.size = 28;
			lblText.textColor = 0x222021;
			lblText.textAlign = egret.HorizontalAlign.CENTER;
			lblText.verticalAlign = egret.VerticalAlign.MIDDLE;
			lblText.text = "确定";
			this.addChild(lblText);
			return;
		}
	}
}