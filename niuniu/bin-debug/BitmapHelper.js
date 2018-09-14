var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BitmapHelper = (function () {
    function BitmapHelper() {
    }
    BitmapHelper.loadBitmapFromUrl = function (url, onLoadSuccess, thisObj) {
        var imgLoader = new egret.ImageLoader;
        imgLoader.once(egret.Event.COMPLETE, function (evt) {
            var bmd = evt.currentTarget.data;
            var texture = new egret.Texture();
            texture.bitmapData = bmd;
            var bitmap = new egret.Bitmap(texture);
            if (onLoadSuccess)
                onLoadSuccess.call(thisObj, bitmap);
        }, thisObj);
        imgLoader.load(url);
    };
    return BitmapHelper;
}());
__reflect(BitmapHelper.prototype, "BitmapHelper");
//# sourceMappingURL=BitmapHelper.js.map