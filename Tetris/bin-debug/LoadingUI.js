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
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    LoadingUI.prototype.onAddToStage = function (event) {
        this.createView();
    };
    LoadingUI.prototype.createView = function () {
        var pscale = 750 / this.stage.stageWidth;
        var midY = this.stage.stageHeight * pscale * 0.5;
        var bg = CommonUtils.BitmapUtils.createBitmapByName("bg2_png");
        this.addChild(bg);
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.fontFamily = "黑体";
        this.textField.size = 28;
        this.textField.y = midY + 80;
        this.textField.width = 750;
        this.textField.textAlign = "center";
        var progressBarBg = new egret.Sprite();
        this.addChild(progressBarBg);
        progressBarBg.graphics.beginFill(0x33565e);
        progressBarBg.graphics.drawRoundRect(0, 0, 530, 68, 70, 70);
        progressBarBg.graphics.endFill();
        progressBarBg.y = midY + 116;
        progressBarBg.x = 110;
        var logo = CommonUtils.BitmapUtils.createBitmapByName("图标_png");
        this.addChild(logo);
        logo.x = 42;
        logo.y = 172;
        var mcTexture = RES.getRes("加载动画22_png");
        var mcData = RES.getRes("加载动画22_json");
        var loadingDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
        var progressBarFront = new egret.MovieClip(loadingDataFactory.generateMovieClipData(""));
        this.addChild(progressBarFront);
        progressBarFront.gotoAndPlay(1, -1);
        progressBarFront.y = midY + 120;
        progressBarFront.x = 117;
    };
    LoadingUI.prototype.onProgress = function (current, total) {
    };
    LoadingUI.prototype.setLoadingText = function (txt) {
        this.textField.text = txt;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
//# sourceMappingURL=LoadingUI.js.map