module Tool {
	export abstract class CoordinateTool {
		private static readonly factor:number = 50;
        /**
         * 世界坐标转舞台坐标
         */
		public static worldPositionToStage(worldPosition:Model.Position):Model.Position{
			return {X:worldPosition.X * this.factor,Y:(GameSetting.PhysicalSetting.WorldHeight - worldPosition.Y) * this.factor};
		}
        /**
         * 舞台坐标转世界坐标
         */
		public static stagePositionToWorld(stagePosition:Model.Position):Model.Position{
			return {X:stagePosition.X / this.factor,Y: GameSetting.PhysicalSetting.WorldHeight - stagePosition.Y / this.factor};
		}
        /**
         * 世界长度转舞台长度
         */
		public static worldLengthToStage(worldLength:number):number{
			return worldLength * this.factor;
		}
        /**
         * 舞台长度转世界长度
         */
		public static stageLengthToWorld(stageLength:number):number{
			return stageLength / this.factor;
		}
	}
}