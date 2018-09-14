class BitmapHelper{
        public static loadBitmapFromUrl(url: string, onLoadSuccess: (bitmap: egret.Bitmap) => void, thisObj: any) {

        var imgLoader: egret.ImageLoader = new egret.ImageLoader;
        imgLoader.once(egret.Event.COMPLETE, (evt: egret.Event) => {

            var bmd: egret.BitmapData = evt.currentTarget.data;
            var texture: egret.Texture = new egret.Texture();
            texture.bitmapData = bmd;
            var bitmap: egret.Bitmap = new egret.Bitmap(texture);
            if (onLoadSuccess)
                onLoadSuccess.call(thisObj, bitmap);
        }, thisObj);

        imgLoader.load(url);
    }

}