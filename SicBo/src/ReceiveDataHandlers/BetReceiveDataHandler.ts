module ReceiveDataHandlers {
	export class BetReceiveDataHandler extends BaseReceiveDataHandler{
		public supportedType:string = "bet";
		public successCallback:Function;
		public failedCallback:Function;
		public constructor(scene:GameScenes.PlayTableScene){
			super(scene);
            this.successCallback = (receivePackage:TransmissionPackage.BetPackage)=>{
                if(!receivePackage)
                    return;
                if(!receivePackage.betData)
                    return;
                if(receivePackage.betData.length == 0)
                    return;
                if(receivePackage.scheduleId != ViewModels.GameData.getCurrentSchedule().scheduleID){
                    // TODO 处理客户端的期号与服务器端期号不同步的问题
                    console.log("期号不同步，客户端期号："+ViewModels.GameData.getCurrentSchedule().scheduleID+"；服务器端期号："+receivePackage.scheduleId+"；");
                    return;
                }
                receivePackage.betData.forEach((val)=>{
                    this.scene.addTotalBetNumberToSingleBetItem(val);
                });
            };
		}
	}
}