module GameScenes {
	export class AccountListPresenter extends BasePresenter {
		private view:AccountListScene;
		public constructor(view:AccountListScene) {
			super();
			this.view = view;
		}
	}
}