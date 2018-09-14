//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
class Main extends eui.UILayer {

    private serverConnectView: ConnectingUI;
    private loadingView: LoadingUI;
    private loadingViewTop: number = 787;
    private serverConnectViewTop: number = 644;


    public createChildren(): void {
        super.createChildren();

        GameScenes.GameSceneManger.setRootStage(this);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json?v007", "resource/");
    }

    private onConfigComplete() {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onGrouploadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onGroupProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemloadError, this);
        this.loadingView = new LoadingUI();
        this.addChild(this.loadingView);
        this.loadingView.width = this.loadingView.width
        this.loadingView.y = this.loadingViewTop + (this.stage.stageHeight - 1334);;
        RES.loadGroup("preload");
    }
    private onGroupComplete(evt: RES.ResourceEvent) {
        if (evt.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onGrouploadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onGroupProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemloadError, this);


            this.serverConnectView = new ConnectingUI();
            this.stage.addChild(this.serverConnectView);
            this.serverConnectView.y = this.serverConnectViewTop + (this.stage.stageHeight - 1334);
            Settings.GameSettingUtils.gameSetting = RES.getRes("play_table_setting_json");
            Settings.GameSettingUtils.helpSetting = RES.getRes("help_setting_json");
            Settings.GameSettingUtils.historySetting = RES.getRes("history_setting_json");
            Settings.GameSettingUtils.trendSetting = RES.getRes("trend_setting_json");
            Settings.GameSettingUtils.timeSetting = RES.getRes("time_setting_json");
            if (Server.Connector) {
                if (Server.Connector.getGameClient()) {
                    Server.Connector.getGameClient().close();
                }
            }

            Server.Connector.initConnector(RES.getRes("server_gate_setting_json"));
            Server.Connector.startConnectToGateServer(this);

        }
    }
    private onGrouploadError(evt: RES.ResourceEvent) {
        console.warn("Group:" + evt.groupName + " has failed to load");
    }

    private onItemloadError(evt: RES.ResourceEvent) {
        console.warn("Url:" + evt.resItem.url + " has failed to load");
    }
    private onGroupProgress(evt: RES.ResourceEvent) {
        if (evt.groupName == "preload") {
            this.loadingView.onProgress(evt.itemsLoaded, evt.itemsTotal);
        }
    }


    private onGateServerConnectFailed(msg: string) {
        this.serverConnectView.setConnectText(msg);
    }

    private onBeforeGateServerConnected() {//开始连接到全局服务器获取游戏服务器列表
        // this.serverConnectView.setConnectText("加载服务器数据");  

    }

    private onGateServerConnected() {//成功连接到全局服务器
        // this.serverConnectView.setConnectText("加载服务器数据");
    }
    private onGetGameServerSuccess() {//成功读取到游戏服务器
        // this.serverConnectView.setConnectText("加载服务器数据");
    }

    private onGetGameServerFailed(errorMsg: string) {
        this.serverConnectView.setConnectText(errorMsg);
    }
    private onConnectToGameServerFailed(msg: string) {
        this.serverConnectView.setConnectText(msg);
    }
    private onGameServerConnected() {//成功连接到游戏服务器
        // this.serverConnectView.setConnectText("加载服务器数据");
        GameScenes.GameSceneManger.pushScene(GameScenes.PlayTableScene, Settings.GameSettingUtils.gameSetting, this.stage.stageWidth);

    }


}
