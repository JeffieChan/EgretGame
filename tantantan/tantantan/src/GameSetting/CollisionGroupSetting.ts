module GameSetting {
	export abstract class CollisionGroupSetting {
		public static readonly BALL:number = Math.pow(2,0);
		public static readonly BRICK:number = Math.pow(2,2);
		public static readonly WALL:number = Math.pow(2,3);
		public static readonly STUFF:number = Math.pow(2,4);
	}
}