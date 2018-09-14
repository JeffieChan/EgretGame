module ReceiveDataHandlers {
	export class UnfreezeScheduleReceiveDataHandler extends BaseReceiveDataHandler{
		public supportedType:string = "unfreeze";
		public constructor(scene:GameScenes.PlayTableScene){
			super(scene);
			this.successCallback = (receivePackage:TransmissionPackage.UnFreezePackage)=>{
				if(!receivePackage)
                    return;
				let curr = ViewModels.GameData.getPreSchedule();
                if(curr.scheduleID != receivePackage.scheduleId){
                    console.log("客户端和服务器端期号不一致");
                    return;
                }
                
				let nextSchedule = receivePackage.nextSchedule;

                let preSchedule = {
                    scheduleID:receivePackage.scheduleId,
                    scheduleName:receivePackage.scheduleName,
                    result :receivePackage.valueList
                };
                ViewModels.GameData.setPreSchedule(preSchedule);
                ViewModels.GameData.setCurrentSchedule(nextSchedule);
                this.scene.showBetPanelContainerForNewSchedule();
			}
            
		}
	}
}