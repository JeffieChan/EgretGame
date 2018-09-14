module GameScenes {
	export class MyBetRecordScene  extends GameScenes.BaseRecordScene{
		private static selfObject:MyBetRecordScene;
		private lastRecordTime:string;
		public constructor(setting:any) {
			super(setting);
			this.presenter = new MyBetRecordPresenter(this);
			MyBetRecordScene.selfObject = this;
			this.onScrollToBottom = this.scrollToBottomHandler;
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		}
		private onAddToStage(evt:egret.Event){
			this.itemRecordTapHandler = this.onItemTap;	
			super.initStyle();
			this.presenter.loadMyBetList();
		}
		private onItemTap(data){
			let recordId = data.data[4].value;
			let scheduleName = data.data[0].value;
			GameSceneManager.pushScene(GameScenes.MyBetDetailRecordScene,Settings.GameSettingUtils.myBetDetailSetting,Settings.GameSettingUtils.gameSetting.globalWidth,{recordId:recordId,scheduleName:scheduleName});
		}
		private scrollToBottomHandler(){
			MyBetRecordScene.selfObject.presenter.loadMyBetList();
		}
		public appendRecords(dataArray){
			MyBetRecordScene.selfObject.recordTable.appendRecords(dataArray);
		}
	}
}