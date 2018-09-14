module GameSetting {
	export abstract class PhysicalSetting {
		public static readonly Gravity:number = 9.82; 		// 重力加速度
		public static readonly Restitution:number = 1.01; 	// 弹力系数
		public static WorldHeight:number = 22.72;
		public static WorldWidth:number = 12.8;
		public static readonly WallPadding:number = 1;
		public static readonly CollisionSeed:number = 5;
	}
}