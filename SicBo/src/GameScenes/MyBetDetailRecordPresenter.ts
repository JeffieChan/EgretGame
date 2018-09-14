module GameScenes {
	export class MyBetDetailRecordPresenter extends BasePresenter {
		private view:MyBetDetailRecordScene;
		public constructor(view:MyBetDetailRecordScene) {
			super();
			this.view = view;
		}
		public getMyBetDetail(recordId:number){
			Server.Connector.getGameClient().getMyBetDetail(recordId,this);
		}
		public onLoadBetDetailFailed(data:any){

		}
		public onLoadBetDetailSuccess(data:any){
			if(!data)
				return;
			let newDataArray:any[][] = [];
			data.forEach((val)=>{
				newDataArray.push(this.buildOutputData(val));
			});
			this.view.apprendRecords(newDataArray)
		}
		private buildOutputData(item:any):any[]{
			return [
				{type:"text",value:item.BetType}
				,{type:"text",value:(item.BetNumber).toString()}
				,{type:"text",value:(item.WinNumber).toString()}
			];
		}
	}
}