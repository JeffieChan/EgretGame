module ReceiveDataHandlers{
    export interface IReceiveDataHandler{
        supportedType:string;
        successCallback:Function;
		failedCallback:Function;
        handleReceiveData(data:any):boolean;
    }
}