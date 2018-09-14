module Server {
	export interface IServerConnectorSender {
		onGateServerConnectFailed(errorMessage: string):void;
		onBeforeGateServerConnected():void;
		onGateServerConnected():void;
		onGetGameServerSuccess(data:any):void;
		onGetGameServerFailed(errorMessage: string):void;
		onGameServerConnected():void;
		onConnectToGameServerFailed(errorMessage: string):void;
		onUserEnterSuccess(data:any):void;
		onUserEnterFailed(message:string):void;
		onUserReEnterSuccess(data:any):void;
		onUserReEnterFailed(message:string):void;
		onReloadGameDataSuccess(data:any):void;
	}
}