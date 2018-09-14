var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadingViewTop = 787;
        _this.serverConnectViewTop = 644;
        return _this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        GameScenes.GameSceneManger.setRootStage(this);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json?v007", "resource/");
    };
    Main.prototype.onConfigComplete = function () {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onGrouploadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onGroupProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemloadError, this);
        this.loadingView = new LoadingUI();
        this.addChild(this.loadingView);
        this.loadingView.width = this.loadingView.width;
        this.loadingView.y = this.loadingViewTop + (this.stage.stageHeight - 1334);
        ;
        RES.loadGroup("preload");
    };
    Main.prototype.onGroupComplete = function (evt) {
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
    };
    Main.prototype.onGrouploadError = function (evt) {
        console.warn("Group:" + evt.groupName + " has failed to load");
    };
    Main.prototype.onItemloadError = function (evt) {
        console.warn("Url:" + evt.resItem.url + " has failed to load");
    };
    Main.prototype.onGroupProgress = function (evt) {
        if (evt.groupName == "preload") {
            this.loadingView.onProgress(evt.itemsLoaded, evt.itemsTotal);
        }
    };
    Main.prototype.onGateServerConnectFailed = function (msg) {
        this.serverConnectView.setConnectText(msg);
    };
    Main.prototype.onBeforeGateServerConnected = function () {
        // this.serverConnectView.setConnectText("加载服务器数据");  
    };
    Main.prototype.onGateServerConnected = function () {
        // this.serverConnectView.setConnectText("加载服务器数据");
    };
    Main.prototype.onGetGameServerSuccess = function () {
        // this.serverConnectView.setConnectText("加载服务器数据");
    };
    Main.prototype.onGetGameServerFailed = function (errorMsg) {
        this.serverConnectView.setConnectText(errorMsg);
    };
    Main.prototype.onConnectToGameServerFailed = function (msg) {
        this.serverConnectView.setConnectText(msg);
    };
    Main.prototype.onGameServerConnected = function () {
        // this.serverConnectView.setConnectText("加载服务器数据");
        GameScenes.GameSceneManger.pushScene(GameScenes.PlayTableScene, Settings.GameSettingUtils.gameSetting, this.stage.stageWidth);
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map