var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Settings;
(function (Settings) {
    var InitSetting = (function () {
        function InitSetting() {
        }
        InitSetting.DEFAULE_STAGE_WIDTH = 750;
        return InitSetting;
    }());
    Settings.InitSetting = InitSetting;
    __reflect(InitSetting.prototype, "Settings.InitSetting");
})(Settings || (Settings = {}));
//# sourceMappingURL=InitSetting.js.map