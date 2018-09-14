module GameScene {
	export class PausePanel extends MaskPanel{
		public backToMainHandle:Function;
		public continueGameHandle:Function;
		public shareHandle:Function;
		public restartHandle:Function;
		private panelDisplay:egret.DisplayObjectContainer;
		public constructor() {
			super();
			this.maskAlpha = 0.7;
		}
		protected drawPanel():void{

			let padding = 36;
			this.panelDisplay = new egret.DisplayObjectContainer();
			this.addChild(this.panelDisplay);

			let btnToMain = CommonUtils.BitmapUtils.createBitmapByName("btn_tomain_png");
			btnToMain.scaleX = CommonUtils.StageUtils.getStageScale();
			btnToMain.scaleY = CommonUtils.StageUtils.getStageScale();
			this.panelDisplay.addChild(btnToMain);
			btnToMain.touchEnabled = true;
			btnToMain.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
				if(this.backToMainHandle)
					this.backToMainHandle();
			},this);
			btnToMain.y = 0 * CommonUtils.StageUtils.getStageScale();
			btnToMain.x = (this.stage.stageWidth - btnToMain.width * CommonUtils.StageUtils.getStageScale()) / 2;

			let btnRestart = CommonUtils.BitmapUtils.createBitmapByName("btn_pause_restart_png");
			btnRestart.scaleX = CommonUtils.StageUtils.getStageScale();
			btnRestart.scaleY = CommonUtils.StageUtils.getStageScale();
			this.panelDisplay.addChild(btnRestart);
			btnRestart.touchEnabled = true;
			btnRestart.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
				if(this.restartHandle)
					this.restartHandle();
			},this);
			btnRestart.y = btnToMain.y + btnToMain.height * CommonUtils.StageUtils.getStageScale() + padding * CommonUtils.StageUtils.getStageScale();
			btnRestart.x = (this.stage.stageWidth - btnRestart.width * CommonUtils.StageUtils.getStageScale()) / 2;

			let btnContinue = CommonUtils.BitmapUtils.createBitmapByName("btn_continue_png");
			btnContinue.scaleX = CommonUtils.StageUtils.getStageScale();
			btnContinue.scaleY = CommonUtils.StageUtils.getStageScale();
			this.panelDisplay.addChild(btnContinue);
			btnContinue.touchEnabled = true;
			btnContinue.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
				if(this.continueGameHandle)
					this.continueGameHandle();
			},this);
			btnContinue.y = btnRestart.y + btnRestart.height * CommonUtils.StageUtils.getStageScale() + padding * CommonUtils.StageUtils.getStageScale();
			btnContinue.x = (this.stage.stageWidth - btnContinue.width * CommonUtils.StageUtils.getStageScale()) / 2;

			this.panelDisplay.y = (this.stage.stageHeight - this.panelDisplay.height) / 2;
			this.panelDisplay.alpha = 1;
			this.panelDisplay.visible = true;
		}
	}
}