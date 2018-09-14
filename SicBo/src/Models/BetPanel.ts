module Models{
    export class BetPanelUtils{
        public static BetPanel:BetPanelList;
    }
    export interface BetPanelList{
        MaxBet:number;
        BetPanels:BetPanel[];
    }
    export interface BetPanel{    
        Name:string;
        Title:string;
        BetCellRows:BetCellRow[];
        CellCount:number;
    }
    interface BetCellRow{
        LayoutType:string;
        RowValues:BetCell[];
    }
    export interface BetCell{
        BetNumber:number;
        Value:string;
        Odds:number;
        MaxBet:number;
        Description:string[];
        Text:string;
    }
}