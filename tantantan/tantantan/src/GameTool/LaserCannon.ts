/**
 * 道具：激光炮
 */
module GameTool {
	export class LaserCannon  extends BaseTool{
		protected drawTool():void{
			let bitmap = CommonUtils.BitmapUtils.createBitmapByName("icon_tool_laser_png");
			this.addChild(bitmap);
		}
		protected onTap(event:egret.TouchEvent):void{
			if(this.onTapHandler)
				this.onTapHandler(event);
		}
	}
}