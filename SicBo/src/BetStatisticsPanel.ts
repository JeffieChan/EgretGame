class BetStatisticsPanel extends egret.DisplayObjectContainer {
	private setting:Settings.BetStatisticsSetting;
	private betNumber:number;
	private confirmNumber:number;
	private txtBetNumbers:egret.TextField;
	private txtBonus:egret.TextField;
	private bonus:number;
	public constructor(setting:Settings.BetStatisticsSetting) {
		super();
		this.setting = setting;
		this.betNumber = 0;
		this.confirmNumber = 0;
		this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
	}
	private onAddToStage(evt:egret.Event){
		this.drawBg();
		let lblText = new egret.TextField();
		lblText.size = this.setting.textSize;
		lblText.textColor = this.setting.textColor;
		lblText.fontFamily = this.setting.font;
		lblText.text = "本期已投注";
		this.addChild(lblText);
		lblText.x = 380;
		lblText.y = 18;
		this.y = this.setting.bottom;
		lblText = new egret.TextField();
		lblText.size = this.setting.textSize;
		lblText.textColor = this.setting.textColor;
		lblText.fontFamily = this.setting.font;
		lblText.text = "可投注";
		this.addChild(lblText);
		lblText.x = 35;
		lblText.y = 18;
		this.y = this.setting.bottom;


		this.txtBetNumbers = new egret.TextField;
		this.txtBetNumbers.size = this.setting.textSize;
		this.txtBetNumbers.textColor = this.setting.numberColor;
		this.txtBetNumbers.fontFamily = this.setting.font;
		this.addChild(this.txtBetNumbers);
		this.txtBetNumbers.x = 500;
		this.txtBetNumbers.y = 13;
		this.txtBetNumbers.width = 220;
		this.txtBetNumbers.height = 35;
		this.txtBetNumbers.textAlign = egret.HorizontalAlign.CENTER;
		this.txtBetNumbers.verticalAlign = egret.VerticalAlign.MIDDLE;
		let betNumberBg = new egret.Shape();
		betNumberBg.graphics.lineStyle(1,this.setting.numberBorderColor,1);
		betNumberBg.graphics.drawRoundRect(500,13,220,35,10,10);
		this.addChild(betNumberBg);

		this.txtBonus = new egret.TextField;
		this.txtBonus.size = this.setting.textSize;
		this.txtBonus.textColor = this.setting.numberColor;
		this.txtBonus.fontFamily = this.setting.font;
		this.addChild(this.txtBonus);
		this.txtBonus.x = 106;
		this.txtBonus.y = 13;
		this.txtBonus.width = 220;
		this.txtBonus.height = 35;
		this.txtBonus.textAlign = egret.HorizontalAlign.CENTER;
		this.txtBonus.verticalAlign = egret.VerticalAlign.MIDDLE;betNumberBg = new egret.Shape();
		betNumberBg.graphics.lineStyle(1,this.setting.numberBorderColor,1);
		betNumberBg.graphics.drawRoundRect(106,13,220,35,10,10);
		this.addChild(betNumberBg);


		this.showNumbers();
	}
	private drawBg(){
		let bg = new egret.Shape();
		bg.graphics.beginFill(this.setting.bgColor,this.setting.bgAlpha);
		bg.graphics.drawRect(0,0,Settings.GameSettingUtils.gameSetting.globalWidth,this.setting.panelHeight);
		bg.graphics.endFill();
		this.addChild(bg);
	}
	private showNumbers(){
		this.txtBetNumbers.text = this.confirmNumber.toString()+" / "+this.betNumber.toString();
	}
	public bet(betValue:number){
		this.betNumber += betValue;
		this.subBonus(betValue);
		this.showNumbers();
	}
	public confirmBetNumber():number{
		let tmp = this.betNumber;
		this.confirmNumber += this.betNumber;
		this.betNumber = 0;
		this.showNumbers();
		return tmp;
	}
	public clearBetNumber(){
		this.addBonus(this.betNumber);
		this.betNumber = 0;
		this.showNumbers();
	}
	public cleanConfirmNumber(){
		this.confirmNumber = 0;
		this.showNumbers();
	}
	public setBonus(bonus:number){
		this.bonus = bonus - this.betNumber;
		this.showBonus();
	}
	private addBonus(bonus:number){
		this.bonus += bonus;
		this.showBonus();
	}
	private subBonus(bonus:number){
		this.bonus -= bonus;
		this.showBonus();
	}
	private showBonus(){
		this.txtBonus.text = this.bonus.toString();
	}
}