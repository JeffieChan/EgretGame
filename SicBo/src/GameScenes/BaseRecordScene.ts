module GameScenes {
	export class BaseRecordScene extends BaseScene {
		protected setting:Settings.RecordSceneSetting;
		protected recordTable:RecordTable;
		protected onScrollToBottom:Function;
		protected itemRecordTapHandler:(data:any)=>void;
		public constructor(setting?:any) {
			super(setting);
		}
		protected initStyle(){
			super.initStyle();
            this.drawRecordTable();
		}
		private drawRecordTable(){
			this.recordTable = new RecordTable(this.setting,this.getTitleHeight());
			this.recordTable.itemRecordTapHandler = this.itemRecordTapHandler;
			this.recordTable.onScrollToBottom = this.onScrollToBottom;
			this.addFixedChild(this.recordTable);
			this.recordTable.y = this.getTitleHeight();
		}
	}
	class RecordTable extends egret.DisplayObjectContainer{
		public static loaddedRecord:number[];
		private setting:Settings.RecordSceneSetting;
		private currIndex:number;
		private recordsContainer:eui.DataGroup;
		private records:eui.ArrayCollection;
		private titleHeight:number;
		private offsetBottom:number = 17;
		public onScrollToBottom:Function;
		private loadingText:egret.TextField;
		private orgLoadtingTextTop:number;
		public itemRecordTapHandler:(data:any)=>void;
		public constructor(setting:Settings.RecordSceneSetting,titleHeight:number){
			super();
			RecordTable.loaddedRecord = [];
			this.setting = setting;
			this.currIndex = 0;
			this.titleHeight = titleHeight;
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		}
		private onScrollToTopOrBottom(event:egret.TouchEvent){
			let scroller:eui.Scroller = event.currentTarget;
			if(this.scrollToBottom(event)){
				egret.Tween.get( this.loadingText )
					.to( {y: this.orgLoadtingTextTop}, 0, egret.Ease.sineIn )
					.wait(1000)
					.to( {y: Settings.GameSettingUtils.gameSetting.globalHeight}, 1000, egret.Ease.sineIn );
				if(this.onScrollToBottom)
					this.onScrollToBottom();
			}
		}
		private scrollToBottom(event:egret.Event){
			let scroller:eui.Scroller = event.currentTarget;
			if(scroller.viewport.scrollV > (scroller.viewport.contentHeight - scroller.viewport.height) + this.offsetBottom){
				return true;
			}
			return false;
		}
		private onAddToStage(evt:egret.Event){
			this.height = this.stage.height - this.titleHeight;
			let header = new RecordHeader(this.setting.columns,this.setting.header);			
			this.addChild(header)

			this.recordsContainer = new eui.DataGroup();
			let layout = new eui.VerticalLayout();
			layout.gap = 1;
			this.recordsContainer.layout = layout;
			this.recordsContainer.itemRenderer = RecordRender;
			this.recordsContainer.scrollEnabled = true;			
			this.recordsContainer.scrollV = 0;
			this.recordsContainer.scrollH = 0;			
			
			this.records = new eui.ArrayCollection();
			this.recordsContainer.dataProvider = this.records;
			this.addChild(this.recordsContainer);
			this.recordsContainer.y = header.height;

			var myScroller = new eui.Scroller();
			myScroller.width = Settings.GameSettingUtils.gameSetting.globalWidth;
			myScroller.height = Settings.GameSettingUtils.gameSetting.globalHeight - header.height - this.titleHeight - this.offsetBottom;
			myScroller.y = header.height;
			myScroller.viewport = this.recordsContainer; 
			myScroller.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onScrollToTopOrBottom,this);
			this.addChild(myScroller);

			this.loadingText = new egret.TextField;
			this.loadingText.text = "正在加载数据...";
			this.loadingText.width = Settings.GameSettingUtils.gameSetting.globalWidth;
			this.loadingText.textAlign = egret.HorizontalAlign.CENTER;
			this.loadingText.textColor = 0x666666;
			this.addChild(this.loadingText);
			this.setChildIndex(this.loadingText,-1);
			this.orgLoadtingTextTop = Settings.GameSettingUtils.gameSetting.globalHeight - this.titleHeight - header.height - this.loadingText.height - this.offsetBottom - 20;
			this.loadingText.y = Settings.GameSettingUtils.gameSetting.globalHeight;
			
		}
		public appendRecords(betRecords:any[]){
			betRecords.forEach((val)=>{
				this.records.addItem({data:val,setting:this.setting.columns,rowSetting:this.setting.row});
			});
		}
	}
	class RecordHeader extends egret.DisplayObjectContainer{
		private columnSetting:Settings.ColumnSetting[];
		private headerSetting:Settings.HeaderSetting;
		public constructor(columnSetting:Settings.ColumnSetting[],headerSetting:Settings.HeaderSetting){
			super();
			this.columnSetting = columnSetting;
			this.headerSetting = headerSetting;
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		}
		public onAddToStage(evt:egret.Event){
			let bg = new egret.Shape;
			bg.graphics.beginFill(this.headerSetting.bgColor);
			bg.graphics.drawRect(0,0,Settings.GameSettingUtils.gameSetting.globalWidth,this.headerSetting.headerHeight);
			bg.graphics.endFill();
			this.addChild(bg);
			let left = 0;
			this.columnSetting.forEach((val,index,array)=>{
				if(index > 0){
					let splitBar = this.buildSplitBar();
					splitBar.x = left;
					this.addChild(splitBar);
				}
				let txt = new egret.TextField;
				txt.fontFamily = this.headerSetting.font;
				txt.size = this.headerSetting.textSize;
				txt.textColor = this.headerSetting.textColor;
				txt.width = val.columnWidth;
				txt.height = this.headerSetting.headerHeight;
				txt.verticalAlign = egret.VerticalAlign.MIDDLE;
				txt.textAlign = egret.HorizontalAlign.CENTER;
				txt.text = val.text;
				txt.x = left;
				this.addChild(txt);
				left += val.columnWidth;
			});
		}
		private buildSplitBar(){
			let splitBar = new egret.Shape;
			splitBar.graphics.beginFill(this.headerSetting.splitColor);
			splitBar.graphics.drawRect(0,0,2,this.headerSetting.textSize);
			splitBar.graphics.endFill();
			splitBar.y = (this.height - this.headerSetting.textSize) / 2;
			return splitBar;
		}
	}
	class RecordRender extends eui.ItemRenderer {
		public constructor() {
			super();
			this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onItemTap,this);
		}
		private oldData:any;
		public dataChanged() {
			if (!this.data) 
			 	return;
			if(!this.data.rowSetting)
				return;
			if(this.data.rowSetting.length == 0)
				return;
			let self = this;
			for(let i = self.$children.length - 1; i >= 0; i--){
				let val = self.$children[i];
				self.removeChild(val);
			}
			let rowSettingIndex = this.itemIndex % this.data.rowSetting.length;
			let bottom = new egret.Shape;
			bottom.graphics.beginFill(this.data.rowSetting[rowSettingIndex].bgColor);
			bottom.graphics.drawRect(0,0,Settings.GameSettingUtils.gameSetting.globalWidth,this.data.rowSetting[rowSettingIndex].rowHeight)
			bottom.graphics.endFill();
			bottom.graphics.lineStyle(1,this.data.rowSetting[rowSettingIndex].bottomBorderColor);
			bottom.graphics.moveTo(0,this.data.rowSetting[rowSettingIndex].rowHeight);
			bottom.graphics.lineTo(Settings.GameSettingUtils.gameSetting.globalWidth,this.data.rowSetting[rowSettingIndex].rowHeight);
			this.addChild(bottom);
			this.setChildIndex(bottom,0);
			this.initLabels(this.data.rowSetting[rowSettingIndex]);
		}
		private onItemTap(egret:egret.TouchEvent){
			if((<RecordTable>this.parent.parent.parent).itemRecordTapHandler){
				(<RecordTable>this.parent.parent.parent).itemRecordTapHandler(this.data);
			}
		}
		private initLabels(rowSetting:any):boolean{
			if(!this.data)
				return false;
			if(!this.data.setting)
				return false;
			let tmpData = this.data;
			this.data.setting.forEach((val,index)=>{
				let item = this.buildCellContent(tmpData.data[index],val,rowSetting);
				if(item)
					this.addChild(item);
			});
		}
		private buildCellContent(data,columnSetting,rowSetting):any{
			if(data.type == "text"){
				let tmpLabel = new eui.Label();
				this.setLabelStyle(tmpLabel,columnSetting,rowSetting);
				tmpLabel.text = data.value;
				return tmpLabel;
			}
			if(data.type == "switchIcon"){
				let tmpShape = new egret.Shape();
				tmpShape.x = columnSetting.left;
				let cellWidth = columnSetting.columnWidth / data.value.iconCount;
				let radius = cellWidth / 6;
				let point = (data.value.currIcon + 0.5) * cellWidth;
				tmpShape.graphics.beginFill(0x48ba20);
				tmpShape.graphics.drawCircle(point, rowSetting.rowHeight / 2, radius);
				tmpShape.graphics.endFill();
				return tmpShape;
			}
			if(data.type == "dice"){
				let padding = 5;
				if(!data.value){
					return null;
				}
				let dices = new egret.DisplayObjectContainer();
				let diceWidth = Math.min(rowSetting.rowHeight - padding * 2,columnSetting.columnWidth / data.value.length);
				data.value.forEach((val,index)=>{
					let dice:GameScenes.utils.Dice = new GameScenes.utils.Dice(val,diceWidth - padding,"b");
					dice.x = padding + diceWidth * index;
					dices.addChild(dice);
				});
				dices.x = columnSetting.left + ((columnSetting.columnWidth - diceWidth * data.value.length) / 2);
				dices.y = (rowSetting.rowHeight - diceWidth) / 2;
				return dices;

			}
		}
		private setLabelStyle(label:eui.Label,lblSetting:any,rowSetting:any){
				label.width = lblSetting.columnWidth;
				label.x = lblSetting.left;
				label.y = 0;
				label.size = rowSetting.textSize;
				label.textColor = rowSetting.textColor;
				label.height = rowSetting.rowHeight;
				label.textAlign = egret.HorizontalAlign.CENTER;
				label.verticalAlign = egret.VerticalAlign.MIDDLE;
		}
	}
}