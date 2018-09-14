module CommonUtils {
	export abstract class LoggerUtil {
		private static readonly showLog: boolean = false;
		public static log(data) {
			if (this.showLog) { console.log(data); }
		}
	}
}