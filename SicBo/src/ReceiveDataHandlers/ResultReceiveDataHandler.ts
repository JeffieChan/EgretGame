module ReceiveDataHandlers {
	export class ResultReceiveDataHandler extends BaseReceiveDataHandler{
		public supportedType:string = "result";
		public constructor(scene:GameScenes.PlayTableScene){
			super(scene);
			let thisObj = this;
            this.successCallback = (receivePackage:TransmissionPackage.ResultPackage)=>{
                if(!receivePackage)
                    return;
                ViewModels.GameData.setAccountBonus(receivePackage.bonusBalance);
                thisObj.scene.showBetPanelContainerForNewSchedule();
            };
		}
	}
} 