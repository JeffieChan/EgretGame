module ViewModels{
    export class GameData{
		private static view:GameScenes.PlayTableScene;

		private static currentSchedule:any;
		private static preSchedule:any;
		private static accountBonus:number;

		public static setView(view:GameScenes.PlayTableScene){
			this.view = view;
		}
		public static setAccountBonus(bonus:number){
			this.accountBonus = bonus;
			this.view.showBonus(this.accountBonus);
		}
		public static getAccountBonus(){
			return this.accountBonus;
		}
		public static setPreSchedule(scheduleData:any){
			this.preSchedule = scheduleData;
			this.view.showPreSchedule(this.preSchedule);
		}
		public static setCurrentSchedule(scheduleData:any){
			this.currentSchedule = scheduleData;
			this.view.showCurrentSchedule(this.currentSchedule);
		}
		public static getPreSchedule():any{
			return this.preSchedule;
		}
		public static getCurrentSchedule():any{
			return this.currentSchedule;
		}
    }
}