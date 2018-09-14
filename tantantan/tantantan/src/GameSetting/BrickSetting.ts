module GameSetting {
	export abstract class BrickSetting {
		private static GlobalLifeArray: number[] = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1500, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
		private static GlobalScoreStep: number[] = [5, 10, 100, 200, 500, 1000, 2000, 4000, 7000, 10000, 15000, 20000, 25000, 30000, 50000, 80000, 120000, 160000, 200000,210000,220000,230000];
		public static InitBrickLifeMatrix(): void {
			this.GlobalScoreStep.forEach((val,index)=>{
				let areaCount = index + 1;
				let minScore = index > 0?this.GlobalScoreStep[index - 1]:0;
				let maxScore = this.GlobalScoreStep[index];
				let minIndex = Math.floor(index / 2);
				this.BrickLifeMatrix[index] = {MinScore:minScore,MaxScore:maxScore,BrickLifes:[]};
				let percent = this.calculatePercent(index + 1);
				let currSeed = 0;
				for(let i = 0; i < percent.length; i++){
					this.BrickLifeMatrix[index].BrickLifes[i] = {MinSeed:currSeed, MaxSeed:currSeed + percent[i], MinLife:i < 1?1:this.GlobalLifeArray[i-1],MaxLife:this.GlobalLifeArray[minIndex + i]};
					currSeed += percent[i];
				}
				this.BrickLifeMatrix[index].BrickLifes[percent.length-1].MaxSeed = 100;
			});
			this.BrickLifeMatrix[this.GlobalScoreStep.length] = {MinScore:this.GlobalScoreStep[this.GlobalScoreStep.length - 1],MaxScore:99999999,BrickLifes:this.BrickLifeMatrix[this.GlobalScoreStep.length-1].BrickLifes};
		}
		private static calculatePercent(num:number):number[]{
            let avgPercent = 100.0 / num;
            let result:number[] = [];
            for (let i = 0; i < num; i++)
            {
                result[i] = avgPercent;
            }
			for (let i = 0; i < Math.floor(num / 2); i++) { 
                let diff = result[i] * 0.6;
                result[i] -= diff;
                result[i + 1] += diff;
                result[num - 1 - i] -= diff;
                result[num - 2 - i] += diff;
            }
            return result;
		}
		public static readonly Radius: number = 0.18;
		public static BrickLifeMatrix: StageDifficulty[] = [];
		public static readonly StuffScale: number = 0.6;

		public static readonly BrickColors: Model.BrickColor[] = [
			{ Life:0, R: 0xFF, G: 0xA0, B: 0x00 },
			{ Life:30, R: 0xFF, G: 0xE5, B: 0x00 },
			{ Life:40, R: 0xBF, G: 0xF6, B: 0x01 },
			{ Life:50, R: 0x7F, G: 0xF2, B: 0x00 },
			{ Life:100, R: 0x05, G: 0xCE, B: 0x65 },
			{ Life:200, R: 0x00, G: 0x6b, B: 0xe1 },
			{ Life:300, R: 0x25, G: 0x40, B: 0xff },
			{ Life:400, R: 0x4d, G: 0x25, B: 0xff },
			{ Life:500, R: 0x7a, G: 0x14, B: 0xf3 },
			{ Life:700, R: 0xbe, G: 0x0d, B: 0xbe },
			{ Life:800, R: 0xf1, G: 0x0d, B: 0x58 },
			{ Life:900, R: 0xff, G: 0x33, B: 0x0e }
		];
		public static getColorForLife(life: number): number {
			if (life <= 0)
				return this.brickColorToNumber(this.BrickColors[0]);
			if (life >= 900) {
				return this.brickColorToNumber(this.BrickColors[this.BrickColors.length - 1]);
			}
			
			let lc:Model.BrickColor;
			let hc:Model.BrickColor;
			for(let i = 0; i < this.BrickColors.length - 1 ;i ++){
				if(this.BrickColors[i].Life > life)
					break;
				lc = this.BrickColors[i];
				hc = this.BrickColors[i+1];
			}
			let lifeStep: number = life - lc.Life;
			let lifeLength:number = hc.Life - lc.Life;
			let r: number = Math.floor(lc.R + ((hc.R - lc.R) / lifeLength) * lifeStep);
			let g: number = Math.floor(lc.G + ((hc.G - lc.G) / lifeLength) * lifeStep);
			let b: number = Math.floor(lc.B + ((hc.B - lc.B) / lifeLength) * lifeStep);
			return this.brickColorToNumber({ Life:life, R: r, G: g, B: b });
		}
		private static brickColorToNumber(c: Model.BrickColor) {
			let cStr = "0x" + this.numberToString(c.R, 16, 2) + this.numberToString(c.G, 16, 2) + this.numberToString(c.B, 16, 2);
			return Number(cStr);
		}
		private static numberToString(num: number, radix?: number, length?: number): string {
			let str = num.toString(radix);
			if (!length)
				return str;
			while (str.length < length)
				str = "0" + str;
			return str;
		}
	}
	export interface StageDifficulty {
		MinScore: number;
		MaxScore: number;
		BrickLifes: LifeDist[];
	}
	export interface LifeDist {
		MinLife: number;
		MaxLife: number;
		MinSeed: number;
		MaxSeed: number;
	}
}