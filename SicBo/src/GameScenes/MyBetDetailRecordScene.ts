module GameScenes {
	export class MyBetDetailRecordScene  extends GameScenes.BaseRecordScene{
		private static selfObject:MyBetDetailRecordScene;
		public constructor(setting:any) {
			super(setting);
			this.presenter = new MyBetDetailRecordPresenter(this);
			MyBetDetailRecordScene.selfObject = this;
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		}
		private onAddToStage(evt:egret.Event){
			super.initStyle();
			this.presenter.getMyBetDetail(this.extraData.recordId);
		}
		public apprendRecords(dataArray){
			MyBetDetailRecordScene.selfObject.recordTable.appendRecords(dataArray);
		}
	}
}