var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CommonUtils;
(function (CommonUtils) {
    var BitmapFontUtils = (function () {
        function BitmapFontUtils() {
        }
        BitmapFontUtils.createBitmapFontByName = function (name) {
            var font = RES.getRes(name);
            return font;
        };
        return BitmapFontUtils;
    }());
    CommonUtils.BitmapFontUtils = BitmapFontUtils;
    __reflect(BitmapFontUtils.prototype, "CommonUtils.BitmapFontUtils");
})(CommonUtils || (CommonUtils = {}));
//# sourceMappingURL=BitmapFontUtils.js.map