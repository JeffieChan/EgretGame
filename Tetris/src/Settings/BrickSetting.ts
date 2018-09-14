module Settings {
	export class  BrickSettings {
		private static readonly settingName = "brick_setting_json";
		public static brickWidth: number = 0;
		public static rows:number = 0;
		public static cols:number = 0;
		public static initBrickSetting(){
			let res = RES.getRes(BrickSettings.settingName);
			BrickSettings.brickWidth = res.brickWidth;
			BrickSettings.rows = res.rows;
			BrickSettings.cols = res.cols;
		}
	}
}