module Server {

	class Route {
		static UserLogin: string = "UserLogin";
		static CreateNewRound: string = "CreateNewRound";
		static RoundData: string = "RoundData";
		static GetToolInfo: string = "GetToolInfo";
		static BuyTool: string = "BuyTool";
		static MyRecord: string = "MyRecord";
		static GetShareInfo: string = "GetShareInfo";
		static GoDie: string = "GoDie";
		static Revive: string = "Revive";
		static OpenBox: string = "OpenBox";
		static MyWallet: string = "MyWallet";
		static GetRoundData: string = "GetRoundData";
		static GetPageData: string = "GetPageData";
	}
	export class GameClient extends BaseClient {
		public constructor() {
			super();
			this.useWss = true;
		}
		public getPageData(pageCode,sender):void{
			if (this.State == ClientState.Connected) {
				this.request({ Route: Route.GetPageData, Data:pageCode }, function (data) {
					if (!data) {
						sender.getPageDataFailed("获取页面信息失败");
						return;
					}
					if (data.Code != RequestState.Success) {
						sender.getPageDataFailed(data.Data);
						return;
					}
					sender.getPageDataSuccess(data.Data);
				});
				return;
			}
			setTimeout(function () { Connector.getGameClient().getPageData(pageCode,sender); }, 1000);
		}
		public getRoundData(roundId,sender):void{
			if (this.State == ClientState.Connected) {
				this.request({ Route: Route.GetRoundData, Data:roundId }, function (data) {
					if (!data) {
						sender.onGetRoundDataFailed("获取本局全量信息失败");
						return;
					}
					if (data.Code != RequestState.Success) {
						sender.onRoundDataFailed(data.Data);
						return;
					}
					sender.onGetRoundDataSuccess(data.Data);
				});
				return;
			}
			setTimeout(function () { Connector.getGameClient().getRoundData(roundId,sender); }, 1000);
		}
		public getUserWallet(sender): void {
			if (this.State == ClientState.Connected) {
				this.request({ Route: Route.MyWallet }, function (data) {
					if (!data) {
						sender.onGetMyWalletFailed("打开用户面板失败");
						return;
					}
					if (data.Code != RequestState.Success) {
						sender.onGetMyWalletFailed(data.Data);
						return;
					}
					sender.onGetMyWalletSuccess(data.Data);
				});
				return;
			}
			setTimeout(function () { Connector.getGameClient().getUserWallet(sender); }, 1000);
		}
		public openBenefitBox(clientId: number, sender: any) {
			if (this.State == ClientState.Connected) {
				this.request({ Route: Route.OpenBox, Data: clientId }, function (data) {
					if (!data) {
						sender.onOpenBenefitBoxFailed("打开奖励箱失败");
						return;
					}
					if (data.Code != RequestState.Success) {
						sender.onOpenBenefitBoxFailed(data.Data);
						return;
					}
					sender.onOpenBenefitBoxSuccess(data.Data);
				});
				return;
			}
			setTimeout(function () { Connector.getGameClient().openBenefitBox(clientId, sender); }, 1000);
		}
		public revive(sender: any,successCallback:Function) {
			if (this.State == ClientState.Connected) {
				this.request({ Route: Route.Revive, Data: CommonUtils.GameUtils.roundId }, function (data) {
					if (!data) {
						sender.onReviveFailed("复活失败");
						return;
					}
					if (data.Code != RequestState.Success) {
						sender.onReviveFailed(data.Data);
						return;
					}
					if(successCallback)
						successCallback(data.Data);
					sender.onReviveSuccess(data.Data);
				});
				return;
			}
			setTimeout(function () { Connector.getGameClient().revive(sender,successCallback); }, 1000);
		}
		public confirmTerminal(sender: any,successCallback?:Function) {
			if (this.State == ClientState.Connected) {
				this.request({ Route: Route.GoDie, Data: CommonUtils.GameUtils.roundId }, function (data) {
					if (!data) {
						sender.onConfirmTerminalFailed("确认结束失败");
						return;
					}
					if (data.Code != RequestState.Success) {
						sender.onConfirmTerminalFailed(data.Data);
						return;
					}
					sender.onConfirmTerminalSuccess(data.Data);
					if(successCallback){
						successCallback();
					}
				});
				return;
			}
			setTimeout(function () { Connector.getGameClient().confirmTerminal(sender); }, 1000);
		}
		public userLogin(wxUserData: any, sender: any): void {
			if (this.State == ClientState.Connected) {
				this.request({ Route: Route.UserLogin, Data: wxUserData }, function (data) {
					if (!data) {
						Connector.onUserEnterFailed("登录游戏服务器失败，用户验证不通过", sender);
						return;
					}
					if (data.Code != RequestState.Success) {
						Connector.onUserEnterFailed(data.Data, sender);
						return;
					}
					Connector.onUserEnterSuccess(data.Data, sender);
				});
				return;
			}
			setTimeout(function () { Connector.getGameClient().userLogin(wxUserData, sender); }, 1000);
		}
		public createNewRound(sender: any): void {
			if (this.State == ClientState.Connected) {
				this.request({ Route: Route.CreateNewRound }, function (data) {
					if (!data) {
						sender.onCreateNewRoundFailed("登录游戏服务器失败，用户验证不通过", sender);
						return;
					}
					if (data.Code != RequestState.Success) {
						sender.onCreateNewRoundFailed(data.Data, sender);
						return;
					}
					sender.onCreateNewRoundSuccess(data.Data, sender);
				});
				return;
			}
			setTimeout(function () { Connector.getGameClient().createNewRound(sender); }, 1000);
		}
		public sendDamageData(roundId: number, damageData: string, sender: any) {
			if (this.State == ClientState.Connected) {
				this.request({ Route: Route.RoundData, Data: { RoundId: roundId, Data: damageData } }, function (data) {
					if (!data) {
						sender.onDamageRequestFailed("获取新的一行失败", sender);
						return;
					}
					if (data.Code != RequestState.Success) {
						sender.onDamageRequestFailed(data.Data, sender);
						return;
					}
					sender.onDamageRequestSuccess(data.Data, sender);
				});
				return;
			}
			setTimeout(function () { Connector.getGameClient().sendDamageData(roundId, damageData, sender); }, 1000);
		}
		public getToolInfo(code: string, sender: any): void {
			if (this.State == ClientState.Connected) {
				this.request({ Route: Route.GetToolInfo, Data:  {RoundId:CommonUtils.GameUtils.roundId , ToolCode:code} }, function (data) {
					if (!data) {
						sender.onGetToolInfoFailed("获取新的一行失败");
						return;
					}
					if (data.Code != RequestState.Success) {
						sender.onGetToolInfoFailed(data.Data);
						return;
					}
					sender.onGetToolInfoSuccess(data.Data);
				});
				return;
			}
			setTimeout(function () { Connector.getGameClient().getToolInfo(code, sender); }, 1000);
		}
		public BuyTool(code: string, sender: any): void {
			if (this.State == ClientState.Connected) {
				this.request({ Route: Route.BuyTool, Data: {RoundId:CommonUtils.GameUtils.roundId , ToolCode:code} }, function (data) {
					if (!data) {
						sender.onBuyToolFailed("购买道具失败");
						return;
					}
					if (data.Code != RequestState.Success) {
						sender.onBuyToolFailed(data.Data);
						return;
					}
					sender.onBuyToolSuccess(data.Data);
				});
				return;
			}
			setTimeout(function () { Connector.getGameClient().BuyTool(code, sender); }, 1000);
		}
		public getHistory(count: number, sender: any): void {
			if (this.State == ClientState.Connected) {
				this.request({ Route: Route.MyRecord, Data: { StartIndex: 0, QueryCount: count } }, function (data) {
					if (!data) {
						sender.onGetHistoryFailed("读取用户历史记录失败");
						return;
					}
					if (data.Code != RequestState.Success) {
						sender.onGetHistoryFailed(data.Data);
						return;
					}
					sender.onGetHistorySuccess(data.Data);
				});
				return;
			}
			setTimeout(function () { Connector.getGameClient().getHistory(count, sender); }, 1000);
		}
		public reEnter(wxUserData: any, sender: any): void {
			if (this.State == ClientState.Connected) {
				CommonUtils.LoggerUtil.log("开始重新登录游戏服务器");
				this.request({ Route: Route.UserLogin, Data: wxUserData }, function (data) {
					if (!data) {
						Connector.onUserReEnterFailed("登录游戏服务器失败，用户验证不通过", sender);
						return;
					}
					if (data.Code != RequestState.Success) {
						Connector.onUserReEnterFailed(data.Data, sender);
						return;
					}
					CommonUtils.LoggerUtil.log("重新登游戏录服务器成功");
					Connector.onUserReEnterSuccess(data.Data, sender);
				});
				return;
			}
			setTimeout(function () { Connector.getGameClient().reEnter(wxUserData, sender); }, 1000);
		}
		public getShareInfo(wxShareInfo: any,actionType:string, sender: any, successCallback?: Function): void {
			if (this.State == ClientState.Connected) {
				this.request({ Route: Route.GetShareInfo, Data: { encryptedData: wxShareInfo.encryptedData, iv: wxShareInfo.iv, sessionKey: CommonUtils.AccountUtils.getAccountData().SessionKey, actionType:actionType,RoundId:CommonUtils.GameUtils.roundId } }, function (data) {
					if (!data) {
						sender.onGetShareInfoFailed("读取分享用户信息失败");
						return;
					}
					if (data.Code != RequestState.Success) {
						sender.onGetShareInfoFailed(data.Data.Message);
						return;
					}
					sender.onGetShareInfoSuccess(data.Data);
					if (successCallback)
						successCallback(data.Data);
				});
				return;
			}
			setTimeout(function () { Connector.getGameClient().getShareInfo(wxShareInfo, actionType, sender, successCallback); }, 1000);
		}
	}
}