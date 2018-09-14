
module GameScenes{
    export class PlayTableScene extends GameScenes.BaseScene{

        private static selfObject:PlayTableScene;
        // 业务 presenter
        protected presenter:PlayTablePresenter;
        // 用户金币显示框
        private accountGoldContainer:GameScenes.PlayTable.AccountGoldContainer;
        // 房间内用户列表展示框，展示5个用户
        private accountList:GameScenes.PlayTable.AccountListUI;
        // 帮助按钮
        private btnHelp:utils.IconUI;
        // 游戏所有房间在线玩家总数
        private memberCount:MemberCountUI;
        // 更多玩家列表
        private btnMoreAccount:utils.IconUI;
        // 历史开奖按钮
        private btnHistory:utils.IconUI;
        // 开奖趋势按钮
        private btnTrend:utils.IconUI;
        // 开奖结果面板
        private numberPanel:NumberPanelUI;
        // 游戏进度条
        private progressBar:GameScenes.PlayTable.ProgressBarUI;
        // 下注面板
        private betPanelContainer:GameScenes.PlayTable.BetPanelUIContainer;
        // 下注面板小图标
        private betPanelIcons:GameScenes.PlayTable.BetPanelIconListUI;
        // 本期投注统计
        private betStatistics:BetStatisticsPanel;
        // 下注操作面板
        private betAction:GameScenes.PlayTable.BetActionPanel;
        // 标题栏
        private playTableTitle:GameScenes.PlayTable.TitleUI;
        private bg:egret.Bitmap;
        private wh:number;
	    private winMessagePanel:utils.MessagePanelUI;
        private betting:boolean;

        public constructor() {
            super();
            this.betting = false;
            this.presenter = new PlayTablePresenter(this);
            PlayTableScene.selfObject = this;
            this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        }

        private onAddToStage(evt:egret.Event){
            this.winMessagePanel = new utils.MessagePanelUI(this);
            this.presenter.init();
            this.presenter.startEnterGameServer();
            this.warnPanel.x = 0;
            this.warnPanel.y = 0;
        }

        public showAccounts(accounts:Models.IconItem[]){
            this.accountList.showAccounts(accounts);
        }

        public showAccountCount(accountCount:number){
            this.memberCount.setMemberCount(accountCount);
        }

        public showConfirmedBetValues(mybetList:any){
            PlayTableScene.selfObject.betPanelContainer.setConfirmedBetValues(mybetList);
        }
        
        public initView(){
            this.width = this.stage.stageWidth;
            this.height = this.stage.stageHeight;
            this.wh = this.width / this.height;
        }
        
        public drawScene(data:any){

            // 开始初始化游戏主场景
            PlayTableScene.selfObject.drawPlayTableBg();
            PlayTableScene.selfObject.drawPlaytableTitle();
            PlayTableScene.selfObject.drawGoldContainer();
            PlayTableScene.selfObject.drawBtnHelp();
            PlayTableScene.selfObject.drawMemberCount();
            PlayTableScene.selfObject.drawAccountList();
            PlayTableScene.selfObject.drawBtnMoreAccount();
            PlayTableScene.selfObject.drawBtnHistory();
            PlayTableScene.selfObject.drawBtnTrend();
            PlayTableScene.selfObject.drawNumberPanel();
            PlayTableScene.selfObject.drawProgressBar(data);
            PlayTableScene.selfObject.drawBetPanelContainer(data);
            PlayTableScene.selfObject.drawBetPanelIcons(data);
            PlayTableScene.selfObject.drawBetStatistics(data);
            PlayTableScene.selfObject.drawBetAction(data);

        }
        // Start：对事件进行注册和设置的函数
        public registEvents(){

            // 整个舞台左右拖动事件
            this.bg.touchEnabled = true;   
            this.bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
            this.bg.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);

            // 下注面板左右拖动事件
            this.betPanelContainer.touchEnabled = true;
            this.betPanelContainer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
            this.betPanelContainer.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);

            // 下注面板的单个下注项成功回调事件
            this.betPanelContainer.setOnBetSuccessHandle((coinValue)=>{
                this.betStatistics.bet(coinValue);
            });

            this.betPanelContainer.setBetValueCheckFailedHandle((coinValue:number,errmsg:string,isTextFlow?:boolean)=>{
                // 检查是否通过
                PlayTableScene.selfObject.warn(errmsg,isTextFlow,1);
            });

            // 更多用户按钮点击事件
            this.btnMoreAccount.touchEnabled = true;
            this.btnMoreAccount.addEventListener(egret.TouchEvent.TOUCH_TAP,(evt:egret.TouchEvent)=>{
                GameSceneManager.pushScene(GameScenes.AccountListScene,Settings.GameSettingUtils.accountListSetting,Settings.GameSettingUtils.gameSetting.globalWidth,PlayTableScene.selfObject.presenter.getAccountList());
            },this);

            // 开奖趋势点击事件
            this.btnTrend.touchEnabled = true;
            this.btnTrend.addEventListener(egret.TouchEvent.TOUCH_TAP,(evt:egret.TouchEvent)=>{
                GameSceneManager.pushScene(GameScenes.TrendScene,Settings.GameSettingUtils.trendSetting,Settings.GameSettingUtils.gameSetting.globalWidth);
            },this);

            // 开奖历史点击事件
            this.btnHistory.touchEnabled = true;
            this.btnHistory.addEventListener(egret.TouchEvent.TOUCH_TAP,(evt:egret.TouchEvent)=>{
                GameSceneManager.pushScene(GameScenes.HistoryScenes,Settings.GameSettingUtils.historySetting,Settings.GameSettingUtils.gameSetting.globalWidth);
            },this);   
            
            // 帮助按钮点击事件
            this.btnHelp.touchEnabled=true;
            this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP,(evt:egret.TouchEvent)=>{
                 GameSceneManager.pushScene(GameScenes.HelpScene,Settings.GameSettingUtils.helpSetting,Settings.GameSettingUtils.gameSetting.globalWidth);
            },this);    

            // 确定、清空按钮和下注金额的金币的点击事件
            this.betAction.setCurrentCoinTapEvent((coinValue)=>{
                this.betPanelContainer.setCurrentCoinValue(coinValue);            
            });
            this.betAction.setClearTapEvent(()=>{
                this.betPanelContainer.cleanBetNumber();
                this.betStatistics.clearBetNumber();
            });
            this.betAction.setConfirmTapEvent(()=>{
                if(this.betting){
                    console.log("上次下注还没有完成");
                    return;
                }
                this.startBet();
                let betList:TransmissionPackage.BetItem[] = this.betPanelContainer.getBetList();
                if(!betList || betList.length == 0){
                    this.betFinished();
                    return;
                }
                if(!ViewModels.GameData){
                    console.log("游戏数据为空");
                    this.betFinished();
                    return;
                }
                if(!ViewModels.GameData.getCurrentSchedule()){
                    console.log("没有读到要下注的期数信息");
                    this.betFinished();
                    return;
                }
                Server.Connector.getGameClient().bet(betList,ViewModels.GameData.getCurrentSchedule().ScheduleId, this);
            });

            // titile 右侧按钮事件
            this.playTableTitle.setRightIconTapEvent(()=>{
                GameSceneManager.pushScene(GameScenes.MyBetRecordScene,Settings.GameSettingUtils.myBetSetting,Settings.GameSettingUtils.gameSetting.globalWidth);
            });
        }

        public betFinished(){
            this.betting = false;
        }
        public startBet(){
            this.betting = true;
        }
        public showMembercount(memberCount){
            this.memberCount.setMemberCount(memberCount);
        }
        public setBetPanelData(data:any){
            this.betPanelContainer.setConfirmedBetValues(data);
        }

        public showConfirmBetData(data:any){
            this.betPanelContainer.confirmBetNumber();
            let confirmNumber = this.betStatistics.confirmBetNumber();
            ViewModels.GameData.setAccountBonus(data.data.accountbonus);
        }
        
        private downX:number;
        private mouseDown(evt:egret.TouchEvent){
            this.downX = evt.stageX;
        }
        private mouseUp(evt:egret.TouchEvent){
            let moveDis = evt.stageX - this.downX;
            if(Math.abs(moveDis) < 50){
                return;
            }
            // move left
            if(moveDis < 0){
                this.betPanelContainer.moveLeft();
                this.betPanelIcons.activateLeft();
                return;
            }
            this.betPanelContainer.moveRight();
            this.betPanelIcons.activateRight();
        }
        private mouseMove(evt:egret.TouchEvent){
            let offsetX = evt.stageX - this.downX;
            if(Math.abs(offsetX) >= 20)
                this.betPanelContainer.setOffsetPos(offsetX);
        }


        /**
         * 创建主场景背景界面
         */
        private drawPlayTableBg(): void {
            // 创建游戏主场景背景界面
            // 铺背景
            this.bg = CommonUtils.BitmapUtils.createBitmapByName("bg_png");
            this.addChild(this.bg);
            let stageW = this.stage.stageWidth;
            let stageH = this.stage.stageHeight;
            this.bg.width = stageW;
            this.bg.height = stageH;
        }
        private drawPlaytableTitle(): void{
            // 标题
            this.playTableTitle = new GameScenes.PlayTable.TitleUI(Settings.GameSettingUtils.gameSetting.title);
            this.addFixedChild(this.playTableTitle);
        }
        private drawAccountList(){
            this.accountList = new GameScenes.PlayTable.AccountListUI(Settings.GameSettingUtils.gameSetting.accountList);
            this.addFixedChild(this.accountList);
        }
        private drawGoldContainer(){
            this.accountGoldContainer = new GameScenes.PlayTable.AccountGoldContainer(Settings.GameSettingUtils.gameSetting.goldContainer);
            this.addFixedChild(this.accountGoldContainer);
        }
        private drawBtnHelp(){
            this.btnHelp = new utils.IconUI(Settings.GameSettingUtils.gameSetting.helpBtn);
            this.addFixedChild(this.btnHelp);
        }
        private drawMemberCount(){
            this.memberCount = new MemberCountUI(Settings.GameSettingUtils.gameSetting.memberCount);
            this.addFixedChild(this.memberCount);
        }
        private drawBtnMoreAccount(){
            this.btnMoreAccount = new utils.IconUI(Settings.GameSettingUtils.gameSetting.moreAccountBtn);
            this.addFixedChild(this.btnMoreAccount);
        }
        private drawBtnHistory(){
            this.btnHistory = new utils.IconUI(Settings.GameSettingUtils.gameSetting.historyBtn);
            this.addFixedChild(this.btnHistory);
        }
        private drawBtnTrend(){
            this.btnTrend = new utils.IconUI(Settings.GameSettingUtils.gameSetting.trendBtn);
            this.addFixedChild(this.btnTrend);
        }    
        private drawNumberPanel(){
            this.numberPanel = new NumberPanelUI(Settings.GameSettingUtils.gameSetting.numberPanel);
            this.addFixedChild(this.numberPanel);
        }
        private drawProgressBar(data){
            this.progressBar = new GameScenes.PlayTable.ProgressBarUI(Settings.GameSettingUtils.gameSetting.progressBar);
            this.addFixedChild(this.progressBar);
        }
        private drawBetPanelContainer(data:any,cleanTempData?:boolean){
            let betPanel = { MaxBet: data.GameSettings.MaxBet ,BetPanels:data.GameSettings.BetPanels};
            this.betPanelContainer = new GameScenes.PlayTable.BetPanelUIContainer(betPanel,Settings.GameSettingUtils.gameSetting.betPanel,cleanTempData);
            this.addFixedChild(this.betPanelContainer);
        }
        private drawBetPanelIcons(data:any){
            let iconCount:number = data.GameSettings.BetPanels.length;
            this.betPanelIcons = new GameScenes.PlayTable.BetPanelIconListUI(Settings.GameSettingUtils.gameSetting.betPanelIcon,iconCount);
            this.addFixedToBottomChild(this.betPanelIcons);
            let defaultBetValue:number = data.GameSettings.BetAction[0];
            this.betPanelContainer.setCurrentCoinValue(defaultBetValue);
        }
        private drawBetStatistics(data){
            this.betStatistics = new BetStatisticsPanel(Settings.GameSettingUtils.gameSetting.betStatistics);
            this.addFixedToBottomChild(this.betStatistics);
            this.betStatistics.setBonus(data.CurrentBonus);
        }
        private drawBetAction(data:any){

            let betActionSetting = {
                panelHeight:Settings.GameSettingUtils.gameSetting.betAction.panelHeight,
                bgColor:Settings.GameSettingUtils.gameSetting.betAction.bgColor,
                supportedBetValue:data.GameSettings.BetAction};
            this.betAction = new GameScenes.PlayTable.BetActionPanel(betActionSetting);
            this.addFixedToBottomChild(this.betAction);
        }

        // GameData observer 方法                
        public showPreSchedule(scheduleData:any):void{
            PlayTableScene.selfObject.numberPanel.setRoundData(scheduleData);
            PlayTableScene.selfObject.progressBar.setPreScheduleData(scheduleData)
        }
        public showCurrentSchedule(scheduleData:any):void{
            if(!scheduleData){
                console.log("Schedule data is null");
                return;
            }
            if(!scheduleData.ScheduleName){
                console.log("current schedule name is null");
                return;
            }
            PlayTableScene.selfObject.progressBar.setScheduleData(scheduleData);
			PlayTableScene.selfObject.progressBar.displayProgress();
            PlayTableScene.selfObject.progressBar.startCountdown();
        }
        public showBonus(bonus:number){
            PlayTableScene.selfObject.accountGoldContainer.setText(CommonUtils.NumberUtils.formatNumber(bonus));
        }

        // Receive data handler observer 调用的方法
        public addTotalBetNumberToSingleBetItem(val){
            // 将接收到的用户下注信息添加到对应的选项
            PlayTableScene.selfObject.betPanelContainer.addTotalBetNumber(val);
        }
        public showBetPanelContainerForNewSchedule(){
            // 将下注面板设置到新一期开始，并且启动可以投注
            this.betPanelContainer.cleanTotalBetNumber();
            this.betPanelContainer.cleanConfirmedNumber();
            this.betStatistics.cleanConfirmNumber();
            this.betAction.enableConfirm();
        }
        public showFrozenSchedule(currSchedule,frozenSchedule){
            ViewModels.GameData.setCurrentSchedule(currSchedule);
            ViewModels.GameData.setPreSchedule(frozenSchedule);
            this.betAction.disableConfirm();
        }
        public disableConfirmButton(){
            this.betAction.disableConfirm();
        }
        public enableConfirmButton(){
            this.betAction.enableConfirm();
        }
        public addTotalBetNumber(data){
            this.betPanelContainer.addTotalBetNumber(data);
        }
        public setAccountBouns(currentBonus){
            this.accountGoldContainer.setText(currentBonus.toString());
        }
        public setStaticBonus(currentBonus){
            this.betStatistics.setBonus(currentBonus);
        }
        public cleanTotalConfirm(){
            this.betPanelContainer.cleanTotalBetNumber();
        }
        public cleanUserConfirm(){
            this.betPanelContainer.cleanConfirmedNumber();
            this.betStatistics.cleanConfirmNumber();
        }
        public popWinMessage(message:any){
            PlayTableScene.selfObject.winMessagePanel.show(message,true,3);
        }
        // Start:向Game server发送消息的回调事件
        private onBetSuccess(data:any,sender:any){
            console.info("用户下注成功:"+data);
            this.betPanelContainer.confirmBetNumber();
            this.betStatistics.confirmBetNumber();
            this.accountGoldContainer.setText(CommonUtils.NumberUtils.formatNumber(data));
        }
        private onBetFailed(data:any, sender:any){
            console.info("用户下注失败：" + data);
        }
        public onReconnectSuccess(data){
            
        }
        // End:向Game server发送消息的回调事件
    }
}