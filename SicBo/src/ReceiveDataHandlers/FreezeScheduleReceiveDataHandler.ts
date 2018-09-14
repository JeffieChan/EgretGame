module ReceiveDataHandlers {
	export class FreezeScheduleReceiveDataHandler extends BaseReceiveDataHandler{
		public supportedType:string = "freeze";
		public constructor(scene:GameScenes.PlayTableScene){
			super(scene);
            let self = this;
			this.successCallback = (receivePackage:TransmissionPackage.FreezePackage)=>{
                if(!receivePackage)
                    return;
                if(ViewModels.GameData.getCurrentSchedule() == null){
                    self.scene.getPresenter().freezeSchedule();
                    return;
                }
                if(receivePackage.scheduleId != ViewModels.GameData.getCurrentSchedule().scheduleID){
                    // TODO 处理客户端的期号与服务器端期号不同步的问题
                    console.log("期号不同步，客户端期号："+ViewModels.GameData.getCurrentSchedule().scheduleID+"；服务器端期号："+receivePackage.scheduleId+"；");
                    return;
                }
                self.scene.getPresenter().freezeSchedule();
            };
		}
	}
}