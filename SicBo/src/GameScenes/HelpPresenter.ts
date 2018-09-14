module GameScenes {
	export class HelpPresenter extends BasePresenter {
		private view:HelpScene;
		public constructor(view:HelpScene) {
			super();
			this.view = view;
		}
	}
}