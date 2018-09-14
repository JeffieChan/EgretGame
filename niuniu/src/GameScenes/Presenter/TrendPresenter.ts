module GameScenes {
    export class TrendPresenter extends BasePresenter {
        private view: TrendScene;
        public constructor(view: TrendScene) {
            super();
            this.view = view;
        }

        public getTrend() {
            Server.Connector.getGameClient().getTrend(this);
        }
        public onGetTrendFailed(data: any) {

        }
        public onGetTrendSuccess(data: any) {

            this.view.setTrendRowData(data.Data);



        }
    }


}