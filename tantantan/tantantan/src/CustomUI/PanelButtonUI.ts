module CustomUI {
	export enum ButtonStyle {
		Gray = 0,
		Blue = 1,
		Yellow = 2
	}
	export class PanelButtonUI extends egret.Sprite {
		private style: ButtonStyle;
		private text: string;
		private styleGray: egret.Texture;
		private styleBlue: egret.Texture;
		private styleYellow: egret.Texture;
		public constructor(style: ButtonStyle, text: string) {
			super();
			this.style = style;
			this.text = text;
			this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}
		public setStyle(style:ButtonStyle){
			this.style = style;
			this.bg.texture = this.getTexture();
		}
		public setText(text:string){
			this.text = text;
			this.buttonText.text = this.text;
		}

		private bg: egret.Bitmap;
		private buttonText:egret.TextField;
		private onAddToStage(evt: egret.Event) {
			this.styleGray = RES.getRes("btn_confirm_disabled_bg_png");
			this.styleBlue = RES.getRes("btn_blue_bg_png");
			this.styleYellow = RES.getRes("btn_yellow_bg_png");
			this.bg = new egret.Bitmap();
			this.bg.texture = this.getTexture();
			this.addChild(this.bg);

			this.buttonText = new egret.TextField();
			this.addChild(this.buttonText);
			this.buttonText.width = this.bg.width;
			this.buttonText.text = " ";
			this.buttonText.y = (this.bg.height - this.buttonText.height) / 2;
			this.buttonText.stroke = 2;
			this.buttonText.strokeColor = 0x0780d4;
			this.buttonText.size = 36;
			this.buttonText.textAlign = egret.HorizontalAlign.CENTER;
			this.buttonText.text = this.text;
		}
		private getTexture():egret.Texture {
			switch (this.style) {
				case ButtonStyle.Gray:
					return this.styleGray;
				case ButtonStyle.Blue:
					return this.styleBlue;
				case ButtonStyle.Yellow:
					return this.styleYellow;
				default:
					return null;
			}
		}
	}
}