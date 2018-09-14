module ReceiveDataHandlers {
	export class BaseReceiveDataHandler implements IReceiveDataHandler{
		public successCallback:Function;
		public failedCallback:Function;
		public supportedType:string;
		protected scene:GameScenes.PlayTableScene;
		public constructor(scene:GameScenes.PlayTableScene) {
			this.scene = scene;
		}
		public handleReceiveData(data:any):boolean{
			if(!data)
				return true;
			if(!data.msg)
				return true;
			let obj:any = null;
			try{ 
				obj = eval("("+data.msg+")");
			}catch(err){
				if(!this.failedCallback){
					this.failedCallback("返回数据的data.msg不是json格式")
				}
				return true;
			}
			if(!obj){
				if(!this.failedCallback){
					this.failedCallback("返回数据的data.msg没有被成功解析为对象")
				}
				return true;
			}

			// 不设type代表支持所有的
			if(this.supportedType == ""){
				if(this.successCallback)
					this.successCallback(obj.data);
				return true;
			}

			if(obj.type != this.supportedType)
				return false;
			if(this.successCallback)
				this.successCallback(obj.data);
			return true;
		}
	}
}