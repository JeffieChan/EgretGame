module CommonUtils {
    export class BitmapFontUtils {
        public static createBitmapFontByName(name: string): egret.BitmapFont {
            let font: egret.BitmapFont = RES.getRes(name);
            return font;

        }
    }
}