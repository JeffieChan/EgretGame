module GameScene {
	export class LinkShareWxPanel extends MaskPanel {
		public onClosedHandle:Function;
		private txtTitle:egret.TextField;
		private txtDetail:egret.TextField;
		private panelDisplay:egret.DisplayObjectContainer;		
		public constructor() {
			super();
			this.maskAlpha = 0.7;
		}
		protected drawPanel():void{
			console.log("开始创建关注公众号页面");
			this.panelDisplay = new egret.DisplayObjectContainer();
			this.addChild(this.panelDisplay);

			let bg = CommonUtils.BitmapUtils.createBitmapByName("panel_bg_png");
			this.panelDisplay.addChild(bg);

			this.txtTitle = new egret.TextField();
			this.panelDisplay.addChild(this.txtTitle);
			this.txtTitle.y = 25;
			this.txtTitle.size = 50;
			this.txtTitle.fontFamily = "苹方";
			this.txtTitle.textColor = 0x7276a3;
			this.txtTitle.x = 0;
			this.txtTitle.width = bg.width;
			this.txtTitle.textAlign = egret.HorizontalAlign.CENTER;

			let icoClose = CommonUtils.BitmapUtils.createBitmapByName("panel_close_png")
			this.panelDisplay.addChild(icoClose);
			icoClose.touchEnabled = true;
			icoClose.y = -30;
			icoClose.x = this.panelDisplay.width - icoClose.width + 20;
			icoClose.addEventListener(egret.TouchEvent.TOUCH_TAP,(evt:egret.TouchEvent)=>{
				if(this.onClosedHandle)
					this.onClosedHandle();
			},this);
			
            this.txtDetail = new egret.TextField;
			this.txtDetail.x = 52;
			this.txtDetail.y = 200;
			this.txtDetail.lineSpacing = 18;
			this.txtDetail.size = 36;
            this.panelDisplay.addChild(this.txtDetail);
			this.panelDisplay.scaleX = CommonUtils.StageUtils.getStageScale();
			this.panelDisplay.scaleY = CommonUtils.StageUtils.getStageScale();
			this.panelDisplay.x = 34 * CommonUtils.StageUtils.getStageScale();
			this.panelDisplay.y = (this.stage.stageHeight - this.panelDisplay.height * CommonUtils.StageUtils.getStageScale()) / 2;

			this.startLoadData();
		}
		private startLoadData():void{
			console.log("开始读取页面数据");
			Server.Connector.getGameClient().getPageData("About",this);
		}
		public getPageDataFailed(data):void{
			console.log("读取页面信息失败");
			console.log(data);
		}
		public getPageDataSuccess(data):void{
			console.log("读取页面信息成功")
			console.log(data);
			this.txtTitle.text = data.Title;
			let content:string[] = data.Content.toString().split("|");
			let txtFlow:Array<egret.ITextElement> = [];
			content.forEach((line)=>{
				txtFlow.push({text:line +"\n"});
			});
			this.txtDetail.textFlow = txtFlow;
			console.log(this.txtDetail.textFlow);
		}
	}
}