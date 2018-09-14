module GameSetting {
	export abstract class BallSetting {
		public static BallBackEdge = 0.1;
		public static BallBackTop = 0.096;
		public static BallBackBottom = 1;
		public static readonly BallDamping = 0;
		public static readonly BallMaxSpeed = 4;
		public static readonly BallMass = 5;
		public static readonly Radius:number[] = [0,0.06,0.08];
	}
}