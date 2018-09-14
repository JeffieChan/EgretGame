module GameScene {
	export class HistoryPanel extends MaskPanel {
		public closeHandle: Function;
		private rateClose: any;
		private rateBitmap: egret.Bitmap;
		private historyList: egret.Sprite;
		public constructor() {
			super();
			this.maskAlpha = 0;
		}

		protected drawPanel(): void {
			this.rateClose = CommonUtils.BitmapUtils.createBitmapByName("btn_back_png");
			this.addChild(this.rateClose);
			this.rateClose.scaleX = CommonUtils.StageUtils.getStageScale();
			this.rateClose.scaleY = CommonUtils.StageUtils.getStageScale();
			this.rateClose.x = 30 * CommonUtils.StageUtils.getStageScale();
			this.rateClose.y = 30 * CommonUtils.StageUtils.getStageScale();
			this.rateClose.touchEnabled = true;
			let self = this;
			this.rateClose.addEventListener(egret.TouchEvent.TOUCH_TAP, (evt) => {
				if (this.closeHandle)
					this.closeHandle();
			}, this);

			let title = CommonUtils.BitmapUtils.createBitmapByName("panel_title_history_png");
			title.scaleX = CommonUtils.StageUtils.getStageScale();
			title.scaleY = CommonUtils.StageUtils.getStageScale();
			title.x = (this.stage.stageWidth - title.width * CommonUtils.StageUtils.getStageScale()) / 2;
			title.y = 140 * CommonUtils.StageUtils.getStageScale();
			this.addChild(title);
			
			let listBg = new egret.Shape();
			this.addChild(listBg);
			listBg.y = title.y + title.height * CommonUtils.StageUtils.getStageScale();
			listBg.graphics.beginFill(0x2c2c40);
			listBg.graphics.drawRoundRect(0,0,650 * CommonUtils.StageUtils.getStageScale(), (this.stage.stageHeight - listBg.y - 72 * CommonUtils.StageUtils.getStageScale()), 28 * CommonUtils.StageUtils.getStageScale(), 28 * CommonUtils.StageUtils.getStageScale());
			listBg.graphics.endFill();
			listBg.x = (this.stage.stageWidth - listBg.width) / 2;

			this.historyList = new egret.Sprite();
			this.historyList.graphics.beginFill(0x000000, 0);
			this.historyList.graphics.drawRect(0, 0, this.stage.width, 500)
			this.historyList.graphics.endFill();
			this.addChild(this.historyList);

			let scrollView: egret.ScrollView = new egret.ScrollView();
			this.addChild(scrollView);
			scrollView.setContent(this.historyList);
			scrollView.x = 0;
			scrollView.y = listBg.y + 14 * CommonUtils.StageUtils.getStageScale();
			scrollView.height = listBg.height - 28 * CommonUtils.StageUtils.getStageScale();
			scrollView.horizontalScrollPolicy = "off";
		}
		public loadHistory(count: number) {
			Server.Connector.getGameClient().getHistory(count, this);
		}
		public onGetHistoryFailed(errmsg) {
			CommonUtils.LoggerUtil.log(errmsg);
		}
		public onGetHistorySuccess(data) {
			this.historyList.removeChildren();
			let tempY = 0;
			data.forEach((val, index) => {
				let item = this.createScoreItem(val,index);
				this.historyList.addChild(item)
				item.y = tempY;
				item.x = (this.stage.stageWidth - item.width) / 2;
				tempY += item.height + 1;
			});
		}
		public createScoreItem(item,rowIndex): egret.Sprite {
			let txtTop = 52 * CommonUtils.StageUtils.getStageScale();
			let disp: egret.Sprite = new egret.Sprite();
			if(rowIndex % 2 == 0){
				disp.graphics.beginFill(0x5a5a8f);
			}else{
				disp.graphics.beginFill(0x454565);
			}
			disp.graphics.drawRoundRect(0, 0, 640 * CommonUtils.StageUtils.getStageScale(), 132 * CommonUtils.StageUtils.getStageScale(), 20 * CommonUtils.StageUtils.getStageScale() , 20 * CommonUtils.StageUtils.getStageScale());
			disp.graphics.endFill();

			let txtIndex: egret.TextField = new egret.TextField();
			txtIndex.textColor = 0xffc749;
			txtIndex.size = 36 * CommonUtils.StageUtils.getStageScale();
			txtIndex.text = item.Index;
			txtIndex.y = txtTop;
			txtIndex.x = 40 * CommonUtils.StageUtils.getStageScale();
			disp.addChild(txtIndex);

			let txtScore: egret.TextField = new egret.TextField();
			txtScore.textColor = 0xffffff;
			txtScore.size = 36 * CommonUtils.StageUtils.getStageScale();
			txtScore.text = item.Score;
			txtScore.y = txtTop;
			txtScore.x = 121 * CommonUtils.StageUtils.getStageScale();
			disp.addChild(txtScore);

			let txtTime: egret.TextField = new egret.TextField();
			txtTime.textColor = 0xffffff;
			txtTime.size = 36 * CommonUtils.StageUtils.getStageScale();
			txtTime.text = item.Time;
			txtTime.y = txtTop;
			txtTime.x = 370 * CommonUtils.StageUtils.getStageScale();
			disp.addChild(txtTime);

			return disp;
		}
	}
}