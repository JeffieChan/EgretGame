module GameSetting {
	export abstract class BallSetting {
		private static BallBackEdge = 0.5;
		private static BallBackTop = 0.32;
		private static BallBackBottom = 1;
		public static readonly BallMass = 5;
		public static readonly Radius:number[] = [0,0.28,0.32];
		public static readonly LeftBackWay:Model.Position[] = [
			{X:BallSetting.BallBackEdge,Y:BallSetting.BallBackBottom}
			,{X:BallSetting.BallBackEdge,Y:GameSetting.PhysicalSetting.WorldHeight - BallSetting.BallBackTop}
			,{X:BallSetting.BallBackEdge + 0.32,Y:GameSetting.PhysicalSetting.WorldHeight - BallSetting.BallBackTop}];
		public static readonly RightBackWay:Model.Position[] = [
			{X:GameSetting.PhysicalSetting.WorldWidth - BallSetting.BallBackEdge,Y:BallSetting.BallBackBottom}
			,{X:GameSetting.PhysicalSetting.WorldWidth - BallSetting.BallBackEdge,Y:GameSetting.PhysicalSetting.WorldHeight - BallSetting.BallBackTop}
			,{X:GameSetting.PhysicalSetting.WorldWidth - (BallSetting.BallBackEdge + 0.32),Y:GameSetting.PhysicalSetting.WorldHeight - BallSetting.BallBackTop}];
	}
}