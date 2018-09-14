module CommonUtils {
    export class AccountUtils{
        private static accountData:AccountData;
        public static getAccountData():AccountData{
            return this.accountData;
        }
        public static updateWxJsCode(jsCode:string){
            this.wxUserData.code = jsCode;
        }
        public static setAccountData(accountData:AccountData):void{
            this.accountData = accountData;
        }
        private static wxUserData:any;
        public static getwxUserData():any{
            return this.wxUserData;
        }
        public static setwxUserData(wxUserData:any):void{
            this.wxUserData = wxUserData;
        }
    }
    export interface AccountData{
        UserToken:string;
        NickName:string;
        HeadImageUrl:string;
        SessionKey:string;
    }
}