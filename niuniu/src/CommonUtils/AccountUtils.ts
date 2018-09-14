module CommonUtils {
    export class AccountUtils {
        private static accountToken: string;
        public static getAccountToken(): string {
            if (!this.accountToken) {
                this.accountToken = document.getElementById("userToken").attributes["value"].value;
            }
            return this.accountToken;
        }
    }
}