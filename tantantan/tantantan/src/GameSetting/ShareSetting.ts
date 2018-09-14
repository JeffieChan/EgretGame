module GameSetting {
	export class ShareSetting {
		private static shareInfoList:ShareInfo[];
		public static initShareInfoList(){
			CommonUtils.LoggerUtil.log("init share info list");
			this.shareInfoList = [{title:"弹指之间，弹出收益",imageUrl:"https://file.guditech.com/20180907001.png"}];
		}
		public static getShareInfo():ShareInfo{
			CommonUtils.LoggerUtil.log(this.shareInfoList);
			let index = Math.floor(Math.random() * this.shareInfoList.length);
			if(index == this.shareInfoList.length)
				index --;
			return this.shareInfoList[index];
		}
	}
	export interface ShareInfo{
		title:string,
		imageUrl:string
	}
}