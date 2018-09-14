module Server {

	class Route{
		static Enter:string = "Enter";
		static GetRoomBetTotal:string = "GetRoomBetTotal";
		static Bet:string = "Bet";
		static GetMyBetList:string = "GetMyBetList";
		static GetScheduleList:string = "GetScheduleList";
		static GetMyBetDetail:string = "GetMyBetDetail";
	}
	class GameEvents{
		static OnAccountEnter = "AccountEnter";
		static OnAccountLeave = "AccountLeave";
		static OnAccountBet = "AccountBet";
		static OnWaitingForNext = "WaitingForNext";
		static OnStartSchedule = "StartSchedule";
		static OnFreezeSchedule = "FreezeSchedule";
		static OnOpenSchedule = "OpenSchedule";
		static OnSettleSchedule = "SettleSchedule";
		static OnUserBet = "UserBet";
		static OnSettleResult = "SettleResultSchedule";
	}
	export class GameClient extends BaseClient {
		public constructor() {
			super();
		}
		
		public enter(uid:string,sender:any):void{
			if(this.State == ClientState.Connedted){
				this.request({Route:Route.Enter,Data:uid},function(data){
					if(!data){
						Connector.onUserEnterFailed("登录游戏服务器失败，用户验证不通过",sender);
						return;
					}
					if(data.Code != RequestState.Success){
						Connector.onUserEnterFailed(data.Data,sender);
						return;
					}
					Connector.onUserEnterSuccess(data.Data,sender);
				});
				return;
			}
			setInterval(function(){this.enter(uid,sender);},1000);
		}
		public reloadGameData(uid:string,sender:any):void{
			if(this.State == ClientState.Connedted){
				this.request({Route:Route.Enter,Data:uid},function(data){
					if(!data){
						Connector.onUserEnterFailed("登录游戏服务器失败，用户验证不通过",sender);
						return;
					}
					if(data.Code != RequestState.Success){
						Connector.onUserEnterFailed(data.Data,sender);
						return;
					}
					Connector.onReloadGameDataSuccess(data.Data,sender);
				});
				return;
			}
			setInterval(function(){this.enter(uid,sender);},1000);
		}
		public reEnter(uid:string,sender:any):void{
			if(this.State == ClientState.Connedted){
				this.request({Route:Route.Enter,Data:uid},function(data){
					if(!data){
						Connector.onUserReEnterFailed("登录游戏服务器失败，用户验证不通过",sender);
						return;
					}
					if(data.Code != RequestState.Success){
						Connector.onUserReEnterFailed(data.Data,sender);
						return;
					}
					Connector.onUserReEnterSuccess(data.Data,sender);
				});
				return;
			}
			setInterval(function(){this.enter(uid,sender);},1000);
		}
		
		public getRoomBetTotal(scheduleId, sender:any){
			if(this.State == ClientState.Connedted){
				this.request({Route:Route.GetRoomBetTotal,Data:scheduleId},function(data){
					if(!data || data.code != RequestState.Success){
						sender.onGetRoomBetTotal(data.Data,sender);
						return;
					}
				});
				return;
			}
			setInterval(function(){this.getRoomBetTotal(scheduleId,sender);},1000);
		}

		public bet(betPackages:TransmissionPackage.BetItem[],scheduleId:number,sender:any){ 
			if(this.State == ClientState.Connedted){
				let reqPackage = {
						ScheduleId : scheduleId,
						BetContent:betPackages
					};
				this.request({Route:Route.Bet,Data:reqPackage},function(data){
					sender.betFinished();
					if(!data){
						sender.onBetFailed(data.Data)
						return;
					}
					if(data.Code != RequestState.Success){
						sender.onBetFailed(data.Data)
						return;
					}
					sender.onBetSuccess(data.Data ,sender);
				});
				return;
			}
			setInterval(function(){Connector.getGameClient().bet(betPackages,scheduleId,sender);},1000);
		}
		public getScheduleList(lastTime:string ,pageCount:number ,sender:any){
				let reqPackage = {
						LastTime : lastTime,
						PageCount:pageCount
					};
				this.request({Route:Route.GetScheduleList,Data:reqPackage},function(data){
					if(!data){
						sender.onGetScheduleListFailed(data)
						return;
					}
					if(data.Code != RequestState.Success){
						sender.onGetScheduleListFailed(data)
						return;
					}
					sender.onGetScheduleListSuccess(data.Data);
				});
		}
        public getMyBetList(lastTime:string ,pageCount:number ,sender:any){
				let reqPackage = {
						LastTime : lastTime,
						PageCount:pageCount
					};
				this.request({Route:Route.GetMyBetList,Data:reqPackage},function(data){
					if(!data){
						sender.onGetBetListFailed(data)
						return;
					}
					if(data.Code != RequestState.Success){
						sender.onGetBetListFailed(data)
						return;
					}
					sender.onGetBetListSuccess(data.Data);
				});
        }
		public getMyBetDetail(recordId:any,sender:any){
				let reqPackage = {
						RecordId : recordId
					};
				this.request({Route:Route.GetMyBetDetail,Data:reqPackage},function(data){
					if(!data){
						sender.onLoadBetDetailFailed(data)
						return;
					}
					if(data.Code != RequestState.Success){
						sender.onLoadBetDetailFailed(data)
						return;
					}
					sender.onLoadBetDetailSuccess(data.Data);
				});
		}
		// Start: 定义处理服务器端推送消息的事件
		public setOnAccountEnter(callback:Function){
			this.on(GameEvents.OnAccountEnter,callback);
		}
		public setOnAccountLeave(callback:Function){
			this.on(GameEvents.OnAccountLeave,callback);
		}
		public setOnReceiveBet(callback:Function){
			this.on(GameEvents.OnAccountBet,callback);
		}
		public setOnWaitForNext(callback:Function){
			this.on(GameEvents.OnWaitingForNext, callback);
		}
		public setOnStartSchedule(callback:Function){
			this.on(GameEvents.OnStartSchedule, callback);
		}
		public setOnFreezeSchedule(callback:Function){
			this.on(GameEvents.OnFreezeSchedule, callback);
		}
		public setOnOpenSchedule(callback:Function){
			this.on(GameEvents.OnOpenSchedule, callback);
		}
		public setOnSettleSchedule(callback:Function){
			this.on(GameEvents.OnSettleSchedule, callback);
		}
		public setOnUserBet(callback:Function){
			this.on(GameEvents.OnUserBet, callback);
		}
		public setOnSettleResult(callback:Function){
			this.on(GameEvents.OnSettleResult,callback);
		}
		// End:定义处理服务器端推送消息的事件
	}
}