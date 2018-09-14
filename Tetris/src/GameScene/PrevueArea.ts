module GameScene {
	export class PrevueArea extends RootScene {
		private prevueArea: egret.Bitmap;
		public brickContainer: BrickContainer;
		private prevueShapes: Array<BrickShape>
		public constructor() {
			super();
			this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

		}
		private onAddToStage() {
			this.prevueShapes = new Array();
			this.createPrevueArea();
			this.drawText();
		}
		private createPrevueArea() {//创建预告区域
			this.prevueArea = CommonUtils.BitmapUtils.createBitmapByName("下一个_png");
			this.addChild(this.prevueArea);
		}
		private drawText() {
			var text: egret.TextField = new egret.TextField();
			text.fontFamily = "AdobeHeitiStd-Regular";
			text.size = 24;
			text.textColor = 0xffffff;
			text.textAlign = "center";
			text.text = "下一个";
			text.x = 23;
			text.y = 30
			this.addFixedChild(text);

		}
		public createNextShape(dataArr: any) {//创建预告形状
			while (this.prevueShapes.length > 0) {
				var shp = this.prevueShapes.pop();
				this.removeChild(shp);
			}

			dataArr.forEach((data, index) => {
				var shape = new BrickShape(data[0], 1);
				this.addChild(shape);
				if (index == 0) {
					shape.scaleX = shape.scaleY = 26 / 38;
					shape.x =(this.prevueArea.width - shape.width)/2;
					shape.y = 75;
				} else {

					shape.scaleX = shape.scaleY = 17 / 38;
					shape.x = 58;
					shape.y = 202;
				}


				this.prevueShapes.push(shape);
			});
			// //添加下一个随机形状数据
			dataArr.push([Math.floor(Math.random() * 7)]);
		}
	}
}