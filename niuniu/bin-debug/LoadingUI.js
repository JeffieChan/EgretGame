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
        _this.barPadding = 18;
        _this.once(egret.Event.ADDED_TO_STAGE, function (evt) {
            _this.createLoadingTextField();
            _this.createLoadingBar();
        }, _this);
        return _this;
    }
    LoadingUI.prototype.createLoadingTextField = function () {
        this.loadTF = new egret.TextField();
        this.loadTF.size = 28;
        this.loadTF.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.loadTF.textAlign = egret.HorizontalAlign.CENTER;
        this.loadTF.width = this.stage.stageWidth;
        this.loadTF.text = "正在加载游戏资源...";
        this.loadTF.filters = [new egret.DropShadowFilter(2, 45, 0x21576c, 1, 2, 2)];
        this.addChild(this.loadTF);
    };
    LoadingUI.prototype.createLoadingBar = function () {
        BitmapHelper.loadBitmapFromUrl("resource/assets/images/进度条d.png", this.initLoadProgressBg, this);
    };
    LoadingUI.prototype.initLoadProgressBg = function (bitmap) {
        this.loadProgressBg = bitmap;
        this.addChild(this.loadProgressBg);
        this.loadProgressBg.y = this.loadTF.y + this.loadTF.height + this.barPadding;
        this.loadProgressBg.x = (this.stage.stageWidth - this.loadProgressBg.width) / 2;
        BitmapHelper.loadBitmapFromUrl("resource/assets/images/进度条.png", this.initLoadProgressView, this);
    };
    LoadingUI.prototype.initLoadProgressView = function (bitmap) {
        this.loadProgressView = bitmap;
        this.addChild(this.loadProgressView);
        this.progressWidth = this.loadProgressView.width;
        this.loadProgressView.y = this.loadProgressBg.y + (this.loadProgressBg.height - this.loadProgressView.height) / 2;
        this.loadProgressView.x = (this.stage.stageWidth - this.loadProgressView.width) / 2;
        this.loadProgressView.scale9Grid = new egret.Rectangle(12, 12, this.loadProgressView.width - 24, this.loadProgressView.height - 24);
        this.loadProgressView.width = 0;
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        if (this.loadProgressView) {
            this.loadProgressView.width = current / total * this.progressWidth;
        }
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI");
//# sourceMappingURL=LoadingUI.js.map