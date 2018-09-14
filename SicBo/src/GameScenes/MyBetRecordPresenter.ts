module GameScenes {
	export class MyBetRecordPresenter extends BasePresenter {
		private view:MyBetRecordScene;
		private lastRecordTime:string;
		public constructor(view:MyBetRecordScene) {
			super();
			this.view = view;
			this.lastRecordTime = "";
		}
		public loadMyBetList(){
			Server.Connector.getGameClient().getMyBetList(this.lastRecordTime,30,this);
		}
		public onGetBetListFailed(data:any){

		}
		public onGetBetListSuccess(data:any){
			if(!data)
				return;
			let newDataArray:any[][] = [];
			data.forEach((val)=>{
				newDataArray.push(this.buildOutputData(val));
				this.lastRecordTime = val.BetTime.toString();
			});
			this.view.appendRecords(newDataArray);
		}
		private buildOutputData(item:any):any[]{
			return [
				{type:"text",value:item.ScheduleName}
				,{type:"dice",value:[item.Value1, item.Value2, item.Value3]}
				,{type:"text",value:(item.SumValue).toString()}
				,{type:"text",value:(item.BetTime).toString()}
				,{type:"id",value:item.RecordId}
			];
		}
	}
}