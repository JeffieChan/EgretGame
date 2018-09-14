module CommonUtils{
    export class BitmapUtils{
        public static createBitmapByName(name:string):egret.Bitmap{
            var bitmap:egret.Bitmap = new egret.Bitmap();
            var texture:egret.Texture = RES.getRes(name);
            bitmap.texture = texture;
            return bitmap;
            
        }
    }
}