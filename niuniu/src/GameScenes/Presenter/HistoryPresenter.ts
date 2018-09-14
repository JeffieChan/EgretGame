module GameScenes {
    export class HistoryPresenter extends BasePresenter {
        private view: HistroyScene;
        public historyData: Array<any>
        public constructor(view: HistroyScene) {
            super();
            this.view = view;
            this.historyData = new Array();
        }
        public getHistoryRecord(scheduleId: number) {
            Server.Connector.getGameClient().getHistoryRecord(scheduleId, 10, this);
        }
        public getMoreHistoryRecord(scheduleId: number) {
            Server.Connector.getGameClient().getHistoryRecord(scheduleId, 10, this);
        }
        public onGetHistoryRecordFailed(data: any) {

        }
        public onGetHistoryRecordSuccess(data: any) {
            if (data&&data.length>0) {
                data.forEach((val) => {
                    this.historyData.push(val);
                });
            }

            this.view.setHistoryRowData(data);
        }
    }

}
