module Server {
	class Route{
		static GetAllEntry:string = "GetAllEntry";
	}
	export class GateClient extends BaseClient {
		public constructor() {
			super();
			this.useWss = true;
		}
		public getAllEntry(params:any, cb:Function){
			if (this.State == ClientState.Connected) {
				try{
				this.request({Route:Route.GetAllEntry,Data:null} ,cb);
				}catch(err){
					CommonUtils.LoggerUtil.log(err);
					setTimeout(function () { this.getAllEntry(params, cb); }, 1000);
				}
				return;
			}
			setTimeout(function () { this.getAllEntry(params, cb); }, 1000);
		}
	}
}