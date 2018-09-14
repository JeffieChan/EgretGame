module GameScenes{
    export class HistoryScenes extends GameScenes.BaseRecordScene{
		private static selfObject:HistoryScenes;
		public constructor(setting:any) {
			super(setting);
			this.presenter = new HistoryPresenter(this);
			HistoryScenes.selfObject = this;
			this.onScrollToBottom = this.scrollToBottomHandler;
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		}
		private onAddToStage(evt:egret.Event){
			super.initStyle();
			this.presenter.getGameScheduleList();
		}
		private scrollToBottomHandler(){
			HistoryScenes.selfObject.presenter.getGameScheduleList();
		}
		public appendRecords(dataArray){
			HistoryScenes.selfObject.recordTable.appendRecords(dataArray);
		}
    }
}