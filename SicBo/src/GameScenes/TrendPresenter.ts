module GameScenes {
	export class TrendPresenter extends BasePresenter {
		private view:TrendScene;
		private lastRecordTime:string;
		public constructor(view:TrendScene) {
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
				,{type:"text",value:(item.SumValue).toString()}
				,{type:"switchIcon",value:{iconCount:2,currIcon:(item.SumValue <= 10)?1:0}}
				,{type:"switchIcon",value:{iconCount:2,currIcon:(item.SumValue % 2 == 0)?1:0}}
			];
		}
	}
}