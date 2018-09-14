module Server {
	class Route{
		static GetAllEntry:string = "GetAllEntry";
	}
	export class GateClient extends BaseClient {
		public constructor() {
			super();
		}
		public getAllEntry(params:any, cb:Function){
			this.request({Route:Route.GetAllEntry,Data:null} ,cb);
		}
	}
}