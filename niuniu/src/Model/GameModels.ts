module Model {
    export class GameModels {
      public static openPokerModel:OpenPokerModel;
    }
    export class JsonObject{

    }
   export class TrendModel extends JsonObject{
       OptionId:number;
       WinStatus:Array<number>;
       WinStatusResult:Array<string>;
       WinRate:number;

   }
   export class HistoryModel extends JsonObject{
       ScheduleNumber:string;
       State:number;
       BetTime:string;
       Option:Array<OptionModel>
       WinNumber:number;
   }
   export class OptionModel extends JsonObject{
       OptionId:number;
       CardLevel:string;
       WinStatus:number;
       TotalBetNumber:number;
   }
      export class BetModel extends JsonObject{
        bet:GameScenes.PlayTable.BetCoin;
        optionId:number;
    }
    
    export interface UserDataModel{
        UserCount:number;
        UserName:string;
        UserHeadImageUrl:string;

    }
    export interface EnterData{
        Route:string;
        Data:BaseData;
        ReqId:number;
        Code:number;
    }
    export interface BaseData{
        CurrentBonus:number;
        UserCount:number;
        MaxOdds:number;
        CardData:CardData;
        CurrentSchedule:CurrentSchedule;
        PrevSchedule:CurrentSchedule;
        BetOption:Array<BetOption>;
        MyBetList:Array<number>;
        OptionBetList:Array<number>;
        MyBetNumberList:Array<any>;
        OptionBetNumberList:Array<OptionBetNumberListItem>;
        Action:number
    }
    export interface CurrentSchedule{
        ScheduleId:number;
        ScheduleNumber:string;
        State:number;
        CountDown:number;
    }
    
    export interface BetOption{
        OptionId:number;
        BetNumber:number;
        BetNumberList:Array<number>;
    }
    
    export interface OpenCardModel{
        Color:number;
        Num:number;
    }
     export interface OpenPokerModel{
        CardList:Array<OpenCardModel>;
        CardLevel:string;
        WinStatus:string;
        HasNiu:boolean;
    }
    export interface CardData{
        Dice:Array<number>;
        HandList:Array<OpenPokerModel>
    }
    export interface OptionBetNumberListItem{
        BetNumberList:Array<number>;
        MyBetNumberList:Array<number>;
    }
  
   


}