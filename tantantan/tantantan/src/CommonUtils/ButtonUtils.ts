module CommonUtils {
	export abstract class ButtonUtils {
		public static popButton(button:egret.DisplayObject){

				let orgScaleX = button.scaleX;
				let orgScaleY = button.scaleY;
				let orgX = button.x;
				let orgY = button.y;
				let diffX = (button.width / 2 - button.anchorOffsetX) * (1 - GameSetting.ButtonSetting.pressScale) / 2;
				let diffY = (button.width / 2 - button.anchorOffsetY) * (1 - GameSetting.ButtonSetting.pressScale) / 2;
				egret.Tween.get(button)
					.to({scaleX:orgScaleX * GameSetting.ButtonSetting.pressScale,scaleY:orgScaleY * GameSetting.ButtonSetting.pressScale, x:orgX},100)
					.to({scaleX:orgScaleX,scaleY:orgScaleY},100);
					
		}
	}
}