module GameSetting {
	export abstract class PhysicalSetting {
		public static readonly Gravity:number = 5.5; 		// 重力加速度
		public static readonly Restitution:number = 0.95; 	// 弹力系数
		public static readonly StageWorldPlayFieldHeight = 4.8;
		public static readonly BallFallenSpeedLimited = 7;
		public static readonly GroundThickness = 0.6;
		public static readonly TopPaddingScale = 0.4;
		public static readonly BottomPaddingScale = 0.6;
	}
}