module GameScenes {
	export class HistoryPresenter extends BasePresenter {
		private view:HistoryScenes;
		private lastRecordTime:string;
		public constructor(view:HistoryScenes) {
			super();
			this.view = view;
			this.lastRecordTime = "";
		}
		public getGameScheduleList(){
			Server.Connector.getGameClient().getScheduleList(this.lastRecordTime,30,this);
		}
		public onGetScheduleListFailed(data:any){

		}
		public onGetScheduleListSuccess(data:any){
			if(!data)
				return;
			
			let newDataArray:any[][] = [];
			data.forEach((val)=>{
				newDataArray.push(this.buildOutputData(val));
				this.lastRecordTime = val.LottoryTime.toString();
			});
			this.view.appendRecords(newDataArray);
		}
		private buildOutputData(item:any):any[]{
			return [
				{type:"text",value:item.ScheduleName}
				,{type:"dice",value:[item.Value1,item.Value2,item.Value3]}
				,{type:"text",value:item.SumValue.toString()}
				,{type:"text",value:item.LottoryTime.toString()}
			];
		}
	}
}