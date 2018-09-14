module Settings {
	export class GameSettingUtils {
		public static gameSetting: GameSetting;
		public static globalScale: number;

	}
	export class GameSetting {
		gameName: string;
		globalWidth: number;
		globalHeight: number;
		startBtn:SingleIconSetting;
		rankingListBtn: SingleIconSetting;
		scoreBtn: SingleIconSetting;
		giftBtn: SingleIconSetting;

	}
	export interface SingleIconSetting {
		iconName: string,
		left: number;
		top: number;
	}
}