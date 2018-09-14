module CommonUtils {

	export abstract class CoordinateUtils {
        /**
         * 世界坐标转舞台坐标
         */
		public static worldPositionToStage(worldPosition:Model.Position):Model.Position{
			return {X:worldPosition.X * StageUtils.getFactory(),Y:(CommonUtils.StageUtils.getWorldHeight() - worldPosition.Y) * StageUtils.getFactory()};
		}
        /**
         * 舞台坐标转世界坐标
         */
		public static stagePositionToWorld(stagePosition:Model.Position):Model.Position{
			return {X:stagePosition.X / StageUtils.getFactory(),Y: CommonUtils.StageUtils.getWorldHeight() - stagePosition.Y / StageUtils.getFactory()};
		}
        /**
         * 世界长度转舞台长度
         */
		public static worldLengthToStage(worldLength:number):number{
			return worldLength * StageUtils.getFactory();
		}
        /**
         * 舞台长度转世界长度
         */
		public static stageLengthToWorld(stageLength:number):number{
			return stageLength / StageUtils.getFactory();
		}
	}
}