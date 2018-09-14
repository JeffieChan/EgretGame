var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CommonUtils;
(function (CommonUtils) {
    var BitmapUtils = (function () {
        function BitmapUtils() {
        }
        BitmapUtils.createBitmapByName = function (name) {
            var bitmap = new egret.Bitmap();
            var texture = RES.getRes(name);
            bitmap.texture = texture;
            return bitmap;
        };
        return BitmapUtils;
    }());
    CommonUtils.BitmapUtils = BitmapUtils;
    __reflect(BitmapUtils.prototype, "CommonUtils.BitmapUtils");
})(CommonUtils || (CommonUtils = {}));
//# sourceMappingURL=BitmapUtils.js.map