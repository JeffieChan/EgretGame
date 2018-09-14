/**
 * 道具：双倍球
 */
module GameTool {

	export class DoubleBalls extends BaseTool{
		protected drawTool():void{
			let bitmap = CommonUtils.BitmapUtils.createBitmapByName("icon_tool_double_png");
			this.addChild(bitmap);
		}
		protected onTap(event:egret.TouchEvent):void{
			if(this.onTapHandler)
				this.onTapHandler(event);
		}
	}
}