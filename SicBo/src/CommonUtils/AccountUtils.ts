module CommonUtils{
    export class AccountUtils{
        private static _accountToken:string;
        public static getAccountToken():string{
            if(!this._accountToken)
                this._accountToken = document.getElementById("userToken").attributes["value"].value;
            return this._accountToken;
        }
    }
}