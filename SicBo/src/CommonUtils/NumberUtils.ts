module CommonUtils {
	export class NumberUtils {
		public static toStringWithPrefixNumber(value:number,preFixChar:string,totalLength:number):string{
			let output = value.toString();
			
			if(output.length >= totalLength)
				return output;
			
			return ("0000000000" + output).substr(-totalLength);
		}
		public static formatNumber(num:number):string{
			if(num < 1000)
				return num.toString();
			let result = "";
			let temp = num;
			let c = 0;
			while(temp > 0){
				if(c > 0 && c % 3 == 0)
					result = "," + result;
				result = temp % 10 + result ;
				temp = Math.floor(temp / 10);
				c++;
			}
			return result;
		}
		public static shortNumber(num:number):string{
			if(num < 10000){
				return num.toString();
			}
			return Math.floor(num / 10000) + "万";
		}
	}
}