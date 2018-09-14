module GameScenes {
	export class PlayTablePresenter 
        extends BasePresenter {
        private DEFAULT_ACCOUNT_ICON:string = "icon_default_account_png";
		private view:PlayTableScene;
        // 房间总玩家列表
        private accounts:Models.IconItem[];
		public constructor(view:PlayTableScene) {
			super();
			this.view = view;
		}
		public getView():PlayTableScene{
			return this.view;
		}
        public getAccountList(){
            return this.accounts;
        }
        public setAccountList(accounts:Models.IconItem[]){
            this.accounts = accounts;
        }
		public init(){
			// ......
            this.accounts = [];
            Settings.GameSettingUtils.globalScale = this.view.stage.stageWidth / Settings.InitSetting.DEFAULT_SATGE_WIDTH;
			this.view.initView();
            this.view.stage.addEventListener(egret.Event.DEACTIVATE, this.onDeActivate, this);
            this.view.stage.addEventListener(egret.Event.ACTIVATE,this.onActivate,this);
		}
		public startEnterGameServer(){
			let self = this;
            Server.Connector.getGameClient().enter(CommonUtils.AccountUtils.getAccountToken(),this);
		}

        private receiveAccountToIconItem(userlist:any):Models.IconItem[]{
            return userlist;
        }
		private onEnterGameServerFailed(data:any,thisObject:PlayTablePresenter){
			// TODO 处理进入服务器失败
			console.log("进入游戏服务器失败 : " + data.msg);			
            if(!data){
                GameSceneManager.pushScene(GameScenes.ErrorMessageScene,Settings.GameSettingUtils.errorMessageSetting,Settings.GameSettingUtils.gameSetting.globalWidth);
                return;
            }
		}

        private registDataReceiveHandlers(){
            // 注册接收到服务器端推送消息的处理事件 ： onReceiveChat
            ReceiveDataHandlers.ReceiveDataManager.initBusinessHandlers(this.view);
        }
		
        private registGameClientReceiveMsgCallback(){
			let self = this;
            // 心跳超时
            Server.Connector.getGameClient().on(Server.BaseClient.EVENT_HEART_BEAT_TIMEOUT,function(event){
                Server.Connector.getGameClient().State = Server.ClientState.Disconnected;
                Server.Connector.startReconnectTimer(self);
            });
            Server.Connector.getGameClient().on(Server.BaseClient.EVENT_CLOSE,function(event){
                Server.Connector.getGameClient().State = Server.ClientState.Disconnected;
                Server.Connector.startReconnectTimer(self);
            });
            Server.Connector.getGameClient().on(Server.BaseClient.EVENT_IO_ERROR,function(event){
                Server.Connector.getGameClient().State = Server.ClientState.Disconnected;
                Server.Connector.startReconnectTimer(self);
            });
            // 处理服务器端的推送数据
            // 用户进入
            Server.Connector.getGameClient().setOnAccountEnter((data)=>{
                let newAccount:Models.IconItem = data;
                if(!newAccount.UserHeadImageUrl){
                    newAccount.UserHeadImageUrl = RES.getRes(this.DEFAULT_ACCOUNT_ICON);
                }
                let isOld = false;
                self.accounts.forEach(account => {
                    if(account.UserName == newAccount.UserName){
                        isOld = true;
                        return;
                    }
                });
                if(isOld)
                    return;
                self.accounts.push(newAccount);
				self.view.showAccounts(self.accounts);
                self.view.showAccountCount(data.UserCount);
            });
            // 用户退出
            Server.Connector.getGameClient().setOnAccountLeave((data)=>{
                let account:Models.IconItem = data;
                if(!account.UserHeadImageUrl){
                    account.UserHeadImageUrl = RES.getRes(this.DEFAULT_ACCOUNT_ICON);
                }
				self.removeAccount(account);
				self.view.showAccounts(self.accounts);
                self.view.showAccountCount(data.UserCount);
            });
            // 用户下注

            Server.Connector.getGameClient().setOnReceiveBet((data)=>{
                if(data.code != Server.RequestState.Success){
                    console.log("下注失败：" + data.msg);
                    return;
                }
				self.view.showConfirmBetData(data);
            });

            Server.Connector.getGameClient().setOnWaitForNext((data)=>{
                ViewModels.GameData.setCurrentSchedule(data.scheduleData);
                self.view.disableConfirmButton();
            });

            Server.Connector.getGameClient().setOnStartSchedule((data)=>{
                ViewModels.GameData.setCurrentSchedule(data.scheduleData);
                self.view.enableConfirmButton();
            });

            Server.Connector.getGameClient().setOnFreezeSchedule((data)=>{
                ViewModels.GameData.setCurrentSchedule(data.scheduleData);
                self.view.disableConfirmButton();
            });

            Server.Connector.getGameClient().setOnOpenSchedule((data)=>{
                ViewModels.GameData.setCurrentSchedule(data.scheduleData);
                self.view.disableConfirmButton();
            });

            Server.Connector.getGameClient().setOnSettleSchedule((data)=>{
                ViewModels.GameData.setPreSchedule(data.preSchedule);
                ViewModels.GameData.setCurrentSchedule(data.scheduleData);
                self.view.cleanTotalConfirm();
            });
            Server.Connector.getGameClient().setOnUserBet((data)=>{
                if(!data)
                    return;
                if(!data.BetData)
                    return;
                if(!data.BetData.BetContent)
                    return;
                if(data.BetData.ScheduleId != ViewModels.GameData.getCurrentSchedule().ScheduleId)
                    return;
                for(let i = 0 ; i < data.BetData.BetContent.length; i ++){
                    self.view.addTotalBetNumber(data.BetData.BetContent[i]);
                }
            });

            Server.Connector.getGameClient().setOnSettleResult((data)=>{
                self.view.cleanTotalConfirm();
                self.view.cleanUserConfirm();
                self.view.setAccountBouns(CommonUtils.NumberUtils.formatNumber(data.preSchedule.CurrentBonus));
                self.view.setStaticBonus(data.preSchedule.CurrentBonus);
                if(data.preSchedule.WinNumber <= 0)
                    return;
                let textFlow = <Array<egret.ITextElement>>[
                    {text:"恭喜您已中奖！\r\n"}
                    ,{text:"第"}
                    ,{text:data.preSchedule.ScheduleName}
                    ,{text:"期获得"}
                    ,{text:data.preSchedule.WinNumber,style:{textColor:0xe9b65e}}
                    ,{text:"猜豆"}
                ];
                self.view.popWinMessage(textFlow);
            });

        }

		private removeAccount(account:Models.IconItem){
                // 找到对应用户在队列中的位置
                let index:number = -1;
                for(let i = 0; i < this.accounts.length ; i++){
                    if(this.accounts[i].UserName == account.UserName)
                    {
                        index = i;
                        break;
                    }
                }

                // 没有找到用户，不处理用户
                if(index == -1)
                    return;
                
                this.accounts.splice(index,1);
		}

        private isNextScheduleFrozen(data:any){
            if(!data)
                return false;
            if(!data.Data)
                return false;
            if(!data.Data.NextScheduleInfo)
                return false;
            return data.Data.NextScheduleInfo.NextSecondCountDown <= 0;
        }

		private setAccountData(data){
            ViewModels.GameData.setAccountBonus(data.CurrentBonus);
		}

        private setScheduleData(data:any){

            if(!data){
                console.log("schedule data is null from onLoadScheduleDataSuccess");
                return;
            }
            ViewModels.GameData.setPreSchedule(data.PreScheduleInfo);
            ViewModels.GameData.setCurrentSchedule(data.CurrentScheduleInfo);
            this.view.showConfirmedBetValues(data.MyBetList);
            if(ViewModels.GameData.getCurrentSchedule().State == 1){
                this.view.enableConfirmButton();
            }else
            {
                this.view.disableConfirmButton();
            }            
        }

        // Start:向服务器发送消息的回调
        public onGetRoomBetTotal(data:any,sender:any){
            console.log("当前房间下注信息" + data);
            data.data.forEach((val)=>{
                sender.view.addTotalBetNumberToSingleBetItem(val);
            });
        }
        public onUserEnterSuccess(data:any){
            // TODO 用户登录成功
            console.info("用户登录成功的回调："+data);
			ViewModels.GameData.setView(this.view);
			this.view.drawScene(data);
			this.view.registEvents();
			this.registDataReceiveHandlers();
			this.registGameClientReceiveMsgCallback();
            this.view.showAccounts(data.UserList);
            this.setAccountList(this.receiveAccountToIconItem(data.UserList));
            this.view.showMembercount(data.UserCount);
            this.setScheduleData(data)
			this.setAccountData(data);
        }
        public onReloadGameDataSuccess(data:any){
            this.view.showAccounts(data.UserList);
            this.setAccountList(this.receiveAccountToIconItem(data.UserList));
            this.view.showMembercount(data.UserCount);
            this.setScheduleData(data)
			this.setAccountData(data);
            this.setScheduleData(data);
        }
        public onUserEnterFailed(msg:any){
            // TODO 用户登录成功
            this.view.error(msg);
        }
        public onUserReEnterSuccess(data:any){
            console.info("用户重连成功"+data);
        }
        public onReconnectFailed(message:string){
            this.view.error(message);
        }
        private onDeActivate(evt:egret.Event){
            console.warn("转入后台运行");
        }
        private onActivate(evt:egret.Event){
            console.warn("转到前台运行");
            Server.Connector.getGameClient().reloadGameData(CommonUtils.AccountUtils.getAccountToken(), this);
        }
        // End:向服务器发送消息的回调
	}
}