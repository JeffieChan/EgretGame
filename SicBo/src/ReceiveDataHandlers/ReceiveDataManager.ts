module ReceiveDataHandlers{
    export class ReceiveDataManager{
        private static handlers:IReceiveDataHandler[];
        public static pushHandler(handler:IReceiveDataHandler){
            if(!ReceiveDataManager.handlers)
                ReceiveDataManager.handlers = [];
            ReceiveDataManager.handlers.push(handler);
        }
        public static handleManager(data){
            if(!ReceiveDataManager.handlers)
                return;
            for(let i = 0; i < ReceiveDataManager.handlers.length; i++){
                if(ReceiveDataManager.handlers[i].handleReceiveData(data))
                    return;                
            }
        }
        public static initBusinessHandlers(scene:GameScenes.PlayTableScene){
            if(!ReceiveDataManager.handlers)
                ReceiveDataManager.handlers = [];

            ReceiveDataManager.pushHandler(new ReceiveDataHandlers.BetReceiveDataHandler(scene));
            ReceiveDataManager.pushHandler(new ReceiveDataHandlers.FreezeScheduleReceiveDataHandler(scene));
            ReceiveDataManager.pushHandler(new ReceiveDataHandlers.ResultReceiveDataHandler(scene));
            ReceiveDataManager.pushHandler(new ReceiveDataHandlers.UnfreezeScheduleReceiveDataHandler(scene));
            
            // 默认handler，重要：需要放到最后
            ReceiveDataManager.pushHandler(new ReceiveDataHandlers.DefaultReceiveDataHandler(scene));
        }
    }
}