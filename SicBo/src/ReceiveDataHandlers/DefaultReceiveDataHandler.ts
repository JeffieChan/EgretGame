module ReceiveDataHandlers {
	export class DefaultReceiveDataHandler extends BaseReceiveDataHandler{
		public supportedType:string = "";
		public constructor(scene:GameScenes.PlayTableScene){
			super(scene);
            this.successCallback = (data:any)=>{
                console.log("Receive from server: [chat] {from:"+data.from+",msg:"+data.msg+",target:"+data.target+"}");
            };
		}
	}
}