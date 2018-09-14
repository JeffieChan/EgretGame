module CustomUI {
	export class BrickContainerUI extends egret.Sprite {
		private bottom: number;
		private containerHeight: number;
		private lineCount: number;
		private lineHeight: number;
		private containerWidth: number;
		private gameWorld: GamePhysics.GameWorld;
		private container: any;
		private bricks: CustomUI.BrickUI[];
		private stuffs: CustomUI.StuffUI[];
		private benefits: CustomUI.BenefitUI[];
		private brickWidth: number;
		public constructor(top: number, containerHeight: number, lineCount: number, gameWorld: GamePhysics.GameWorld, container: egret.DisplayObjectContainer) {
			super();
			this.bottom = CommonUtils.StageUtils.getWorldHeight() - containerHeight - top;
			this.lineCount = lineCount;
			this.containerHeight = containerHeight;
			this.lineHeight = (containerHeight) / lineCount;
			this.containerWidth = (CommonUtils.StageUtils.getWorldWidth() - GameSetting.WallSetting.WallPadding * 2);
			this.gameWorld = gameWorld;
			this.container = container;
			this.brickWidth = this.containerWidth / 6;
			this.bricks = [];
			this.stuffs = [];
			this.benefits = [];
			this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}
		public resetBricks(lineDataArray: any[], currRowIndex: any, animate: boolean, container: egret.DisplayObjectContainer): any {
			CommonUtils.LoggerUtil.log("开始重新设置砖块");
			CommonUtils.LoggerUtil.log(lineDataArray);
			CommonUtils.LoggerUtil.log("container is");
			CommonUtils.LoggerUtil.log(container);
			CommonUtils.LoggerUtil.log("this.container is");
			CommonUtils.LoggerUtil.log(this.container);
			CommonUtils.LoggerUtil.log("currRowIndex ");
			CommonUtils.LoggerUtil.log(currRowIndex);
			let positionCount = 5;
			let self = this;

			let newBricksArray: any[] = [];
			let newBricksDic: { [key: number]: any; } = {}
			lineDataArray.forEach(lineData => {
				for (let i = 0; i < lineData.Bricks.length; i++) {
					let itemData = lineData.Bricks[i];
					if (!itemData) {
						continue;
					}
					newBricksArray.push({ data: itemData, row: lineData.RowIndex,PositionCount:i });
					newBricksDic[itemData.Id] = { data: itemData, row: lineData.RowIndex,PositionCount:i };
				}
			});

			let selfBricksDic: { [key: number]: any; } = {};
			this.bricks.forEach(brick => {
				selfBricksDic[brick.clientId] = brick;
			});

			let selfBenefitDic: { [key: number]: any; } = {};
			this.benefits.forEach(benefit => {
				selfBenefitDic[benefit.clientId] = benefit;
			});

			let selfStuffDic: { [key: number]: any; } = {};
			this.stuffs.forEach(stuff => {
				selfStuffDic[stuff.clientId] = stuff;
			});

			// 筛选出需要新加的砖块
			let bricksToAdd: any[] = newBricksArray.filter((val, index, newBricksArray) => {
				if (selfBricksDic[val.data.Id] == null && selfStuffDic[val.data.Id] == null && selfBenefitDic[val.data.Id] == null) {
					return val;
				}
				return null;
			});

			// 筛选出需要更新的砖块
			let bricksToModify: any[] = newBricksArray.filter((val, index, newBricksArray) => {
				if (selfBricksDic[val.data.Id] == null && selfStuffDic[val.data.Id] == null && selfBenefitDic[val.data.Id] == null) {
					return null;
				}
				return val;
			});

			// 筛选出需要销毁的砖块
			let bricksToDestory: any[] = this.bricks.filter((val, index, newBricksArray) => {
				if (newBricksDic[val.clientId] == null)
					return val;
				return null;
			});

			// 筛选出需要销毁的奖励箱
			let benefitsToDestory: any[] = this.benefits.filter((val, index, newBricksArray) => {
				if (newBricksDic[val.clientId] == null)
					return val;
				return null;
			});

			// 筛选出需要销毁的道具
			let stuffToDestory: any[] = this.stuffs.filter((val, index, newBricksArray) => {
				if (newBricksDic[val.clientId] == null)
					return val;
				return null;
			});

			// 创建新砖块
			bricksToAdd.forEach((val) => {
				let itemData = val.data;
				if (itemData.BrickType == 0) {
					CommonUtils.LoggerUtil.log("创建新增的砖块");
					let brick: CustomUI.BrickUI;
					let startX = val.row % 2 == 1?this.brickWidth / 2:this.brickWidth;
					if (itemData.BrickData.Shape == 0) {
						brick = new CustomUI.RoundBrickUI(itemData.BrickData.Life);
					} else {
						brick = new CustomUI.PolygonBrickUI(itemData.BrickData.Life, itemData.BrickData.Shape);
					}
					brick.clientId = itemData.Id;
					brick.position = [GameSetting.WallSetting.WallPadding + startX + (this.brickWidth * val.PositionCount), this.bottom + GameSetting.BrickSetting.Radius + this.lineHeight * (currRowIndex - val.row)];
					CommonUtils.LoggerUtil.log("new brick position");
					CommonUtils.LoggerUtil.log(brick.position);
					brick.rowIndex = val.row;
					this.gameWorld.addBody(brick);
					brick.showDisplay(container, false);
					brick.onDestoried = (id) => {
						for (let i = 0; i < self.bricks.length; i++) {
							if (self.bricks[i].id != id)
								continue;
							self.bricks.splice(i, 1);
							brick = null;
							return;
						}
					};
					self.bricks.push(brick);
					return;
				}else if (itemData.BrickType == 1) {
					CommonUtils.LoggerUtil.log("创建新增的道具");
					let stuff: CustomUI.StuffUI;
					let startX = val.row % 2 == 1?this.brickWidth / 2:this.brickWidth;
					if (itemData.BrickData.Code == "double") {
						stuff = new CustomUI.PowerUpBallStuffUI(GameSetting.BrickSetting.Radius * GameSetting.BrickSetting.StuffScale);
					} else if (itemData.BrickData.Code == "split") {
						stuff = new CustomUI.SplitBallStuffUI(GameSetting.BrickSetting.Radius * GameSetting.BrickSetting.StuffScale);
					}
					stuff.clientId = itemData.Id;
					stuff.position = [GameSetting.WallSetting.WallPadding + startX + (this.brickWidth * val.PositionCount), this.bottom + GameSetting.BrickSetting.Radius + this.lineHeight * (currRowIndex - val.row)];
					CommonUtils.LoggerUtil.log("new stuff position");
					CommonUtils.LoggerUtil.log(stuff.position);
					stuff.rowIndex = val.RowIndex;
					this.gameWorld.addBody(stuff);
					stuff.showDisplay(container, false);
					stuff.onDestoried = (id) => {
						for (let i = 0; i < self.stuffs.length; i++) {
							if (self.stuffs[i].id != id)
								continue;
							self.stuffs.splice(i, 1);
							return;
						}
					};
					self.stuffs.push(stuff);
				} else if (itemData.BrickType == 2) {
					CommonUtils.LoggerUtil.log("创建新增的奖励箱");
					let benefit: CustomUI.BenefitUI = new BenefitUI(GameSetting.BrickSetting.Radius * GameSetting.BrickSetting.StuffScale);
					let startX = val.row % 2 == 1?this.brickWidth / 2:this.brickWidth;
					benefit.clientId = itemData.Id;
					benefit.position = [GameSetting.WallSetting.WallPadding + startX + (this.brickWidth * val.PositionCount), this.bottom + GameSetting.BrickSetting.Radius + this.lineHeight * (currRowIndex - val.row)];
					CommonUtils.LoggerUtil.log("new stuff position");
					CommonUtils.LoggerUtil.log(benefit.position);
					benefit.rowIndex = val.RowIndex;
					this.gameWorld.addBody(benefit);
					CommonUtils.LoggerUtil.log(this.container);
					benefit.showDisplay(container, false);
					benefit.onDestoried = (id) => {
						for (let i = 0; i < self.benefits.length; i++) {
							if (self.benefits[i].id != id)
								continue;
							self.benefits.splice(i, 1);
							return;
						}

					};
					self.benefits.push(benefit);
				}
			});

			// 更新砖块、奖励箱和道具
			bricksToModify.forEach((val)=>{
				let brick = selfBricksDic[val.data.Id];
				if(brick){
					CommonUtils.LoggerUtil.log("更新一个砖块");
					brick.position[1] = this.bottom + GameSetting.BrickSetting.Radius + this.lineHeight * (currRowIndex - val.row);
					CommonUtils.LoggerUtil.log("update brick position");
					CommonUtils.LoggerUtil.log(brick.position);
					brick.showLife(val.data.Life);
					brick.showDisplay(container, false);
					return;
				}

				let stuff = selfStuffDic[val.data.Id];
				if(stuff){
					CommonUtils.LoggerUtil.log("更新一个道具");
					stuff.position[1] = this.bottom + GameSetting.BrickSetting.Radius + this.lineHeight * (currRowIndex - val.row);
					CommonUtils.LoggerUtil.log("update stuff position");
					CommonUtils.LoggerUtil.log(stuff.position);
					stuff.showDisplay(container, false);
					return;
				}

				let benefit = selfBenefitDic[val.data.Id];
				if(benefit){
					CommonUtils.LoggerUtil.log("更新一个奖励箱");
					benefit.position[1] = this.bottom + GameSetting.BrickSetting.Radius + this.lineHeight * (currRowIndex - val.row);	
					CommonUtils.LoggerUtil.log("update benefit position");
					CommonUtils.LoggerUtil.log(benefit.position);
					benefit.showDisplay(container, false);
					return;
				}

			});

			bricksToDestory.forEach((val)=>{val.destory(false,this.container);});
			benefitsToDestory.forEach((val)=>{val.destory(this.container);});
			stuffToDestory.forEach((val)=>{val.destory(this.container);});
		}
		private onAddToStage(event: egret.Event) {
			this.x = CommonUtils.CoordinateUtils.worldLengthToStage(GameSetting.WallSetting.WallPadding);
		}
		private drawBg(): void {
			let bg = new egret.Shape();
			bg.graphics.beginFill(0xFF0000, 0.5);
			bg.graphics.drawRect(0, 0, CommonUtils.CoordinateUtils.worldLengthToStage(this.containerWidth), CommonUtils.CoordinateUtils.worldLengthToStage(this.containerHeight));
			bg.graphics.endFill();
			this.addChild(bg);
		}
		private lineupBricks(anmit: boolean, nextRowIndex: number): boolean {
			let hasOld = false;
			this.bricks.forEach((val) => {
				if (val.rowIndex == nextRowIndex)
					hasOld = true;
				val.lineIndex++;
				val.position[1] = this.bottom + GameSetting.BrickSetting.Radius + this.lineHeight * (nextRowIndex - val.rowIndex);
				val.resetDisplayPosition(anmit);
			});
			return hasOld;
		}
		private lineupStuffs(anmit: boolean, nextRowIndex: number): boolean {
			let hasOld = false;
			this.stuffs.forEach((val) => {
				if (val.rowIndex == nextRowIndex)
					hasOld = true;
				val.lineIndex++;
				val.position[1] = this.bottom + GameSetting.BrickSetting.Radius + this.lineHeight * (nextRowIndex - val.rowIndex);
				val.resetDisplayPosition(anmit);
			});
			return hasOld;
		}
		private lineupBenefits(anmit: boolean, nextRowIndex: number): boolean {
			let hasOld = false;
			this.benefits.forEach((val) => {
				if (val.rowIndex == nextRowIndex)
					hasOld = true;
				val.lineIndex++;
				val.position[1] = this.bottom + GameSetting.BrickSetting.Radius + this.lineHeight * (nextRowIndex - val.rowIndex);
				val.resetDisplayPosition(anmit);
			});
			return hasOld;
		}
		public revive(container: egret.DisplayObjectContainer, data: any, gameWorld: GamePhysics.GameWorld): void {

			let self = this;
			// 开始复活
			console.log("开始复活，复活后的数据为：")
			console.log(data);
			let lines = CommonUtils.GameUtils.parseBrickLineData(data.Lines);
			let currRowIndex = data.RowIndex;
			this.resetBricks(lines, currRowIndex, true, container);

		}
		public destoryAllBricks(animate: boolean, container: egret.DisplayObjectContainer, gameWorld: GamePhysics.GameWorld) {
			let brick = this.bricks.pop();
			while (brick) {
				brick.destory(animate, container);
				brick = this.bricks.pop();
			}
			let stuff = this.stuffs.pop();
			while (stuff) {
				stuff.destory(container);
				stuff = this.stuffs.pop();
			}
			let benefit = this.benefits.pop();
			while (benefit) {
				benefit.destory(container);
				benefit = this.benefits.pop();
			}
		}
		public deleteBrickLine(anmit: boolean): void {
			let self = this;
			let maxLineIndex = 0;
			this.bricks.forEach((val) => {
				if (val.lineIndex > maxLineIndex)
					maxLineIndex = val.lineIndex;
			});
			this.stuffs.forEach((val) => {
				if (val.lineIndex > maxLineIndex)
					maxLineIndex = val.lineIndex;
			});
			let random = Math.floor(Math.random() * (maxLineIndex + 1));
			for (let i = this.bricks.length - 1; i >= 0; i--) {
				let val = this.bricks[i];
				if (val.lineIndex < random)
					continue;
				if (val.lineIndex == random) {
					val.destory(true, this.container);
					continue;
				}
				val.lineIndex--;
				val.position[1] -= this.lineHeight;
				val.resetDisplayPosition(anmit);
			}
			for (let i = this.stuffs.length - 1; i >= 0; i--) {
				let val = this.stuffs[i];
				if (val.lineIndex < random)
					continue;
				if (val.lineIndex == random) {
					val.destory(this.container);
					continue;
				}
				val.lineIndex--;
				val.position[1] -= this.lineHeight;
				val.resetDisplayPosition(anmit);
			}
		}
	}
}