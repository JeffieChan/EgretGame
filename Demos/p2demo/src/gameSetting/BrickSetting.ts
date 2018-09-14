module GameSetting {
	export abstract class BrickSetting {
		public static readonly Radius:number = 0.6;
		public static readonly BrickColors:Model.BrickColor[] = [
			{R:0xFF,G:0xA0,B:0x00},  	//0
			{R:0xFF,G:0x00,B:0x00},		//100
			{R:0x00,G:0xFF,B:0xFF},		//200
			{R:0xFF,G:0x00,B:0xFF},		//300
			{R:0x00,G:0xFF,B:0x00},		//400
			{R:0xFF,G:0xFF,B:0xFF}		//>500
		];
		public static getColorForLife(life:number):number{
			if(life <= 0)
				return this.brickColorToNumber(this.BrickColors[0]);
			if(life >= 500){
				return this.brickColorToNumber(this.BrickColors[5]);
			}
			let low = Math.floor(life / 100);
			let high = low + 1;
			let lc:Model.BrickColor = this.BrickColors[low];
			let hc:Model.BrickColor = this.BrickColors[high];
			let lifeStep:number = life - low * 100;
			let r:number = Math.floor(lc.R + ((hc.R - lc.R) / 100) * lifeStep);
			let g:number = Math.floor(lc.G + ((hc.G - lc.G) / 100) * lifeStep);
			let b:number = Math.floor(lc.B + ((hc.B - lc.B) / 100) * lifeStep);
			return this.brickColorToNumber({R:r,G:g,B:b});
		}
		private static brickColorToNumber(c:Model.BrickColor){
			let cStr = "0x"+this.numberToString(c.R,16,2) + this.numberToString(c.G,16,2) + this.numberToString(c.B,16,2);
			return Number(cStr);
		}
		private static numberToString(num:number,radix?:number,length?:number):string{
			let str = num.toString(radix);
			if(!length)
				return str;
			while(str.length < length)
				str = "0" + str;
			return str;
		}
	}
}