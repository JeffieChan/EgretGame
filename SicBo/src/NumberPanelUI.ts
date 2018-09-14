class NumberPanelUI extends egret.DisplayObjectContainer{
	private setting:Settings.NumberPanelSetting;
	private txtRoundNumber:egret.TextField;
	private txtSumNumber:egret.TextField;
	private rltBS:ResultItemUI;
	private rltSD:ResultItemUI;
	private dices:GameScenes.utils.Dice[];
	public constructor(setting:Settings.NumberPanelSetting) {
		super();
		this.setting = setting;
		this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
	}
	private onAddToStage(evt:egret.Event){
		this.x = this.setting.left;
		this.y = this.setting.top;
		let bg = CommonUtils.BitmapUtils.createBitmapByName(this.setting.bgImage);
		this.addChild(bg);
		this.txtRoundNumber = new egret.TextField;
		this.txtRoundNumber.fontFamily = this.setting.font;
		this.txtRoundNumber.textColor = this.setting.textColor;
		this.txtRoundNumber.size = this.setting.textSize;
		this.txtRoundNumber.width = 185;
		this.txtRoundNumber.x = 10;
		this.txtRoundNumber.y = 40;
		this.txtRoundNumber.bold = false;
		this.txtRoundNumber.textAlign = egret.HorizontalAlign.CENTER;
		this.addChild(this.txtRoundNumber);

		this.dices = [];
		this.dices[0] = new GameScenes.utils.Dice(0);
		this.dices[1] = new GameScenes.utils.Dice(0);
		this.dices[2] = new GameScenes.utils.Dice(0);
		this.addChild(this.dices[0]);
		this.addChild(this.dices[1]);
		this.addChild(this.dices[2]);
		this.dices[0].y = 18;
		this.dices[0].x = 205;
		this.dices[1].y = 18;
		this.dices[1].x = this.dices[0].x + this.dices[0].width + 10;
		this.dices[2].y = 18;
		this.dices[2].x = this.dices[1].x + this.dices[1].width + 10;
		let lblSum = new egret.TextField;
		lblSum.fontFamily = this.setting.font;
		lblSum.textColor = this.setting.textColor;
		lblSum.size = this.setting.textSize;
		lblSum.x = 437;
		lblSum.y = 58;
		lblSum.bold = false;
		lblSum.text = "和值";
		this.addChild(lblSum);

		this.txtSumNumber = new egret.TextField;
		this.txtSumNumber.fontFamily = this.setting.font;
		this.txtSumNumber.textColor = this.setting.textColor;
		this.txtSumNumber.size = this.setting.textSize;
		this.txtSumNumber.x = 487;
		this.txtSumNumber.y = 58;
		this.txtSumNumber.bold = false;
		this.txtSumNumber.textAlign = egret.HorizontalAlign.CENTER;
		this.txtSumNumber.text = ConstsValue.UNKNOWN;
		this.addChild(this.txtSumNumber);

		this.rltBS = new ResultItemUI(this.setting);
		this.addChild(this.rltBS);
		this.rltBS.x = 436;
		this.rltBS.y = 20;

		this.rltSD = new ResultItemUI(this.setting);
		this.addChild(this.rltSD);
		this.rltSD.x = 480;
		this.rltSD.y = 20;
	}
	public setRoundData(roundData){
		this.txtRoundNumber.text = roundData.ScheduleName + "期";	
		this.txtSumNumber.text = (roundData == null || roundData.SumValue == null || roundData.SumValue == 0)? ConstsValue.UNKNOWN : roundData.SumValue.toString();	
		this.dices[0].setValue(roundData.Value1);
		this.dices[1].setValue(roundData.Value2);
		this.dices[2].setValue(roundData.Value3);
		this.rltBS.setResultText(this.formatBigOrSmall(roundData.BigOrSmall));
		this.rltSD.setResultText(this.formatSingleOrDouble(roundData.SingleOrDouble));
	}
	private formatSingleOrDouble(strVal):string{
		if(!strVal)
			return "?";
		if(strVal == "double")
			return "双";
		if(strVal == "single")
			return "单";
		return "?"
	}
	private formatBigOrSmall(strVal):string{
		if(!strVal)
			return "?";
		if(strVal == "small")
			return "小";
		if(strVal == "big")
			return "大";
		return "?"
	}
}
class ResultItemUI extends egret.DisplayObjectContainer{
	private txtFiled:egret.TextField;
	private setting:Settings.NumberPanelSetting;
	public constructor(setting:Settings.NumberPanelSetting){		
		super();
		this.setting = setting;
		this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
	}

	private onAddToStage(evt:egret.Event){
		let radius = 16;
		let bg = new egret.Shape;
		bg.graphics.beginFill(0x000000,0.15);
		bg.graphics.drawCircle(radius,radius,radius);
		bg.graphics.endFill();
		bg.graphics.lineStyle(1,0x333333);
		bg.graphics.drawCircle(radius,radius,radius);
		this.addChild(bg);
		this.txtFiled = new egret.TextField;
		this.txtFiled.text = ConstsValue.UNKNOWN;
		this.txtFiled.size = this.setting.textSize;
		this.txtFiled.textColor = this.setting.textColor;
		this.txtFiled.width = radius * 2;
		this.txtFiled.height = radius * 2;
		this.txtFiled.textAlign = egret.HorizontalAlign.CENTER;
		this.txtFiled.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.addChild(this.txtFiled);
	}

	public setResultText(rltText:string){
		this.txtFiled.text = rltText;
	}
}
class RoundData{
	private roundNumber:string;
	private result:number[];
	private sum:number;
	private bs:string;
	private sd:string;
	public getRoundNumber(){return this.roundNumber;}
	public getResult(){return this.result;}
	public getResultValue(index:number){return this.result[index];}
	public getSum(){return this.sum;}
	public getBS(){return this.bs;}
	public getSD(){return this.sd;}
	public constructor(scheduleData:any){
		this.roundNumber = scheduleData.ScheduleName;
		this.result = [scheduleData.Value1,scheduleData.Value2,scheduleData.Value3];
		this.initResult();
	}
	private initResult(){
		let sum = 0;
		for(let i = 0; i < this.result.length; i++){
			sum += this.result[i];
		}
		this.sum = sum;
		if(this.sum == 0){
			this.bs = ConstsValue.UNKNOWN;
			this.sd = ConstsValue.UNKNOWN;
			return;
		}
		this.bs = this.sum <= 10?"小":"大";
		this.sd = this.sum % 2 == 0 ? "双":"单";
	}

}