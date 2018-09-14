/**
 * 游戏道具基类
 */
module GameTool {
	export abstract class BaseTool extends egret.Sprite{
		protected gameWorld:GamePhysics.GameWorld;
		public constructor(gameWorld:GamePhysics.GameWorld) {
			super();
			this.gameWorld = gameWorld;
			this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}
		protected abstract drawTool():void;
		protected abstract onTap(event:egret.TouchEvent):void;
		public onTapHandler:Function;
		private onAddToStage(event:egret.Event):void{
			this.drawTool();
			this.touchEnabled = true;
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap,this);
		}
	}
}