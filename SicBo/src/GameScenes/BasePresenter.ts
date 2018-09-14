module GameScenes {
	export abstract class BasePresenter{
		protected userToken:string;
		public setUserToken(userToken:string){
			this.userToken = userToken;
		}
		public getUserToken(){
			return this.userToken;
		}
	}
}