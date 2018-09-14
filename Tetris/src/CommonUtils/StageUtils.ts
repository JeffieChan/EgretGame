module CommonUtils {
	export abstract class StageUtils {
		private static _stageHeight:number;
		private static _stageWidth:number;
		private static _frameInterval:number;
		private static _factor:number;
		private static _stageScale:number;
		private static _worldHeight:number;
		private static _worldWidth:number;
		private static _orgWorldWidth:number = 3;
		private static _orgStageWidth:number = 750;
		public static loadAndStoreStageInfo(stage:egret.Stage):void{
			this._stageWidth = stage.stageWidth;
			this._stageHeight = stage.stageHeight;
			this._frameInterval = 1 / 60;
			this._stageScale = this._stageWidth / this._orgStageWidth;
			this._factor = (this._orgStageWidth / this._orgWorldWidth) * (this._stageWidth / this._orgStageWidth);
			this._worldWidth = this._orgWorldWidth;
			this._worldHeight = this._stageHeight / this._factor;
		}
		public static getFramInterval():number{
			return this._frameInterval;
		}
		public static getFactory():number{
			return this._factor;
		}
		public static getStageScale():number{
			return this._stageScale;
		}
		public static getWorldWidth():number{
			return this._worldWidth;
		}
		public static getWorldHeight():number{
			return this._worldHeight;
		}
		public static getStageWidth():number{
			return this._stageWidth;
		}
	}
}