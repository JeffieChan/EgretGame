module GameScenes {
	export abstract class BaseScene extends GameScenes.RootScene {
		private title:SceneTitle;
		protected extraData:any;
		protected presenter:any;
        protected warnPanel:utils.MessagePanelUI;
		public constructor(setting?:any) {
			super(setting);
            this.warnPanel = new utils.MessagePanelUI(this,486,100,30,20,null,250);
		}
		public getPresenter():any{
			return this.presenter;
		}
		public setUserToken(userToken:string){
			this.presenter.setUserToken(userToken);
		}
		protected initStyle(){
			super.initStyle();
			this.drawTitle(this.setting.title);
		}

		protected drawTitle(titleSetting:Settings.TitleSetting){
			this.title = new SceneTitle(titleSetting,this.extraData);
			this.addFixedChild(this.title);
		}
		
		protected getTitleHeight():number{
			return this.title.height;
		}
		public warn(message:any, isTextFlow?:boolean,delaySeconds?:number){
			this.warnPanel.show(message,isTextFlow,delaySeconds);
			console.info("报警信息：" + message);
		}
		public error(message:string){
			console.info("错误信息：" + message);
		}
	}
	class SceneTitle extends egret.DisplayObjectContainer{
		private setting:Settings.TitleSetting;
		private extraData:any;
		public constructor(setting:Settings.TitleSetting,extraData?:any){
			super();
			this.setting = setting;
			this.extraData = extraData;
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		}
		private onAddToStage(evt:egret.Event){
			let bg = new egret.Shape;
			bg.graphics.beginFill(this.setting.titleBgColor,this.setting.titleBgAlpha);
			bg.graphics.drawRect(0,0,Settings.GameSettingUtils.gameSetting.globalWidth, this.setting.titleHeight);
			bg.graphics.endFill();
			this.addChild(bg);
			let txtTitle = new egret.TextField;
			txtTitle.width = Settings.GameSettingUtils.gameSetting.globalWidth;
			txtTitle.height = this.setting.titleHeight;
			txtTitle.text = this.getTitleText();
			txtTitle.textColor = this.setting.textColor;
			txtTitle.verticalAlign = egret.VerticalAlign.MIDDLE;
			txtTitle.textAlign = egret.HorizontalAlign.CENTER;
			txtTitle.size = this.setting.textSize;
			this.addChild(txtTitle);
			let btnBack = CommonUtils.BitmapUtils.createBitmapByName("icon_back_black_png");
			this.addChild(btnBack);
			btnBack.x = 30;
			btnBack.y = (this.height - btnBack.height) / 2;
			btnBack.touchEnabled = true;
			btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, (evt:egret.TouchEvent)=>{
				GameSceneManager.destoryScene(this.parent);
			}, this);

		}
		private getTitleText():string{
			
			let title = this.setting.titleText;
			if(!this.extraData)
				return title;
			for(var p in this.extraData){
				let pname = p.toString();
				let pstr = "#"+pname+"#";
				title = title.replace(pstr,this.extraData[p]);
			}
			return title;
		}
	}
}