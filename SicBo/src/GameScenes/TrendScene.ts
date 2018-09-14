module GameScenes{
	export class TrendScene extends GameScenes.BaseRecordScene{
		private static selfObject:TrendScene;
		private lastRecordTime:string;
		public constructor(setting?:any) {
			super(setting);
			this.presenter = new TrendPresenter(this);
			TrendScene.selfObject = this;
			this.onScrollToBottom = this.scrollToBottomHandler;
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		}
		private onAddToStage(evt:egret.Event){
			super.initStyle();
			this.presenter.getGameScheduleList();	
		}
		private scrollToBottomHandler(){
			TrendScene.selfObject.presenter.getGameScheduleList();
		}
		public appendRecords(dataArray){
			this.recordTable.appendRecords(dataArray);
		}
	}
}