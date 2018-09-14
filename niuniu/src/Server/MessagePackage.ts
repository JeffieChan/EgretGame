module Server{
    export interface MessagePackage{
        Route:string;
        ReqId:number;
        Data:any;
        Code:number;
    }
}