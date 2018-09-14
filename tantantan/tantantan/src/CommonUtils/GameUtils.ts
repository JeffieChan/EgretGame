module CommonUtils {
	export abstract class GameUtils {
		public static currentScore: number = 0;
		public static roundId: number = 0;
		public static wxDataProgress: Model.WxDataProgress = Model.WxDataProgress.unStart;
		private static _currentCurrentFireDamage: { [index: number]: number };
		public static initFireDamage() {
			this._currentCurrentFireDamage = {};
		}
		public static increaseFireDamage(itemId:number,damage:number) {
			if(!this._currentCurrentFireDamage[itemId])
				this._currentCurrentFireDamage[itemId] = 0;
			this._currentCurrentFireDamage[itemId] += damage;
		}
		public static getFireDamage():string {
			let damagePackage:string = "";
			for(let index in this._currentCurrentFireDamage){
				if(damagePackage != "")
					damagePackage += "|"
				damagePackage += index + ":" + this._currentCurrentFireDamage[index];
			}
			return damagePackage;
		}
		public static parseBrickLineData(linesStr:any):any{
			if(!linesStr)
				return null;
			let lines:string[] = linesStr.split("%");
			let result = [];
			lines.forEach((val,index)=>{
				let lineItem:string[] = val.split("*");
				let rowIndex = parseInt(lineItem[0]);
				let bricksItem:string[] = lineItem[1].split("|");
				let bricks:any[] = [];
				bricksItem.forEach((item,ii)=>{
					let brickData:string[] = item.split(",");
					let id = parseInt(brickData[0]);
					if(id == 0){
						bricks[ii] = null;
						return;
					}
					let type = parseInt(brickData[1]);
					let brickType = 0;
					let life = parseInt(brickData[2]);
					let data:any; 
					if(type >= 0){
						brickType = 0;
						data = {Life:life,Shape:type};
					}else if(type == -2 || type == -3){
						brickType = 1;
						data = {
							Code : type == -2?"double":"split"
						}
					}else if(type == -1){
						brickType = 2;
						data = null;
					}else{
						brickType = -1;
						data = null;
					}					
					let brick = {
						Id:id,
						BrickType:brickType,
						BrickData:data
					}
					bricks[ii] = brick;
				})
				result[index] = {
					RowIndex:rowIndex,
					Bricks : bricks
				}
			});
			return result;
		}
	}
}