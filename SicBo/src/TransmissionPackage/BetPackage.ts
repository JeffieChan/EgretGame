module TransmissionPackage{
    export class JsonObject{

    }

    // Bet package
    export class BetPackage extends JsonObject{
        scheduleId:number;
        betData:BetItem[];
    }
    export class BetItem extends JsonObject{
        OptionId:string;
        ConfirmNumber:number;
    }

    // Freeze package
    export class FreezePackage extends JsonObject{
        scheduleId:number;
    }
    // Unfreeze package
    export class UnFreezePackage extends JsonObject{
        scheduleId:number;
        nextSchedule:NextSchedule;
        scheduleName:string;
        valueList:number[];
    }

    // Result package
    export class ResultPackage extends JsonObject{
        valueList:number[];
        scheduleId:number;
        bonusBalance:number;
        nextSchedule:NextSchedule;
    }
    export class NextSchedule extends JsonObject{
        scheduleID:number;
        scheduleName:string;
        secondCountDown:number;
    }
}