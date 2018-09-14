module GameScenes.PlayTable{
	export class ProgressBarUI extends egret.DisplayObjectContainer{
		private static readonly DOTCOUNT:number = 5;
		private setting:Settings.ProgressBarSetting;
		private countdownSeconds:number;
		private progressText:ProgressTextUI;
		private timer:egret.Timer;
		private description:string;
		private scheduleData:any;
		private preScheduleData:any;
		private dotCount:number;
		public constructor(setting:Settings.ProgressBarSetting) {
			super();
			this.setting = setting;
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		}
		private onAddToStage(evt:egret.Event){
			var bg = new egret.Shape;
			bg.graphics.beginFill(this.setting.bgColor,this.setting.bgAlpha);
			bg.graphics.drawRect(0,0,Settings.GameSettingUtils.gameSetting.globalWidth,this.setting.barHeight);
			bg.graphics.endFill();
			this.addChild(bg);
			this.x = 0;
			this.y = this.setting.top;

			this.timer = new egret.Timer(1000,0);
			this.timer.addEventListener(egret.TimerEvent.TIMER,this.doCountdown,this);         //计时  

			this.progressText = new ProgressTextUI(this.setting);
			this.addChild(this.progressText);		
		}
		public setDescription(desc:string){
			this.description = desc;
		}
		public setScheduleData(scheduleData:any){
			this.scheduleData = scheduleData;
			this.countdownSeconds = scheduleData.CountDown;
			this.displayProgress();
		}
		public setPreScheduleData(preScheduleData:any){
			this.preScheduleData = preScheduleData;
			this.displayProgress();
		}
				
		public startCountdown(){
			this.dotCount = 0;
			this.timer.start();
		}
		private doCountdown(){
			this.dotCount ++;
			this.dotCount = this.dotCount % ProgressBarUI.DOTCOUNT;
			this.countdownSeconds --;
			if(this.countdownSeconds == 0){
				this.dotCount = 0;
			}
			this.displayProgress();
		}
		public displayProgress(){
			let countdownStr = this.buildCountdownString();
			this.progressText.setText(countdownStr,true);
		}
		private buildCountdownString():any{
			if(!this.scheduleData)
				return "";
			if(this.scheduleData.State == 0 || this.scheduleData.State == 4){
				if(!this.preScheduleData)
					return [{text:"即将开始第"+ this.scheduleData.ScheduleName +"期投注，请准备！"}];
				else
					return [{text:"第"+this.preScheduleData.ScheduleName+"期已开奖，即将进入"+ this.scheduleData.ScheduleName +"期，请准备！"}];
			}
			if(this.scheduleData.State == 1){
				 return [{text:"第"+this.scheduleData.ScheduleName+"期可投注倒计时"}, {text:this.buildCountdownNumberString(),style:{textColor:0xffdd00}}];
			}			
			if(this.scheduleData.State == 2){
				 return [
					 {text:"第"+this.scheduleData.ScheduleName+"期开奖倒计时"},{text:this.buildCountdownNumberString(),style:{textColor:0xff0000}}
				 ];
			}		
			if(this.scheduleData.State == 3){
				 return [
					 {text:"第"+this.scheduleData.ScheduleName+"期正在开奖中..."}
				 ];
			}			
		}
		private buildCountdownNumberString():string{

			if (this.countdownSeconds <= 0)
				return "  00:00:00";
			let hour = Math.floor(this.countdownSeconds / 3600);
			let minute = Math.floor((this.countdownSeconds % 3600) / 60);
			let seconds = this.countdownSeconds % 60;
			return "  " + CommonUtils.NumberUtils.toStringWithPrefixNumber(hour,"0",2) 
					+ ":" + CommonUtils.NumberUtils.toStringWithPrefixNumber(minute,"0",2)  
					+ ":" + CommonUtils.NumberUtils.toStringWithPrefixNumber(seconds,"0",2)  ;
		}
		private buildDots(dotStr:string):string{
			let dots = "";
			for(let i = 0; i <= this.dotCount; i++){
				dots += dotStr;
			}
			return dots;
		}
	}
	class ProgressTextUI extends egret.DisplayObjectContainer{
		private setting:Settings.ProgressBarSetting;
		private txtProgress:egret.TextField;
		private type:number;
		public constructor(setting:Settings.ProgressBarSetting){
			super();
			this.setting = setting;
			this.type = -1;
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		}
		public setText(progressText:any,isTextFlow?:boolean){
			if(!isTextFlow)
				this.txtProgress.text = progressText;
			else
				this.txtProgress.textFlow = progressText;
		}
		private onAddToStage(evt:egret.Event){
			
			this.width = this.parent.width;
			this.txtProgress = new egret.TextField;
			this.txtProgress.size = this.setting.textSize;
			this.txtProgress.height = this.setting.barHeight;
			this.txtProgress.x = 30;
			this.txtProgress.text = "";
			this.txtProgress.verticalAlign = egret.VerticalAlign.MIDDLE;
			this.txtProgress.fontFamily = this.setting.font;
			this.txtProgress.textColor = this.setting.textColor;
			this.addChild(this.txtProgress);

		}
	}
}