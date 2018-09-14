module Settings{
    export class GameSettingUtils{
        public static gameSetting:GameSetting;
        public static globalScale:number;
        public static historySetting:RecordSceneSetting;
        public static trendSetting:RecordSceneSetting;
        public static myBetSetting:RecordSceneSetting;
        public static myBetDetailSetting:RecordSceneSetting;
        public static helpSetting:BaseSceneSetting;
        public static accountListSetting:IconListSceneSetting;
        public static apiSetting:ApiSetting;
        public static errorMessageSetting:ErrorMessageSetting;
    }
    export interface IconItemSetting{
        textSize:number;
        textColor:number;
        iconWidth:number;
        font:string;
    }
    export interface IconListSceneSetting extends BaseSceneSetting{
        columnCount:number;
        showIcon:boolean;
        showTitle:boolean;
        rowHeight:number;
        iconItemSetting:IconItemSetting;
    }
    export interface BaseSceneSetting{
        bgColor:number;
        title:TitleSetting;
        header:HeaderSetting;
        contentPadding:number;
    }
    export interface RecordSceneSetting extends BaseSceneSetting{
        row:RowSetting[];
        columns:ColumnSetting[];
    }
    export interface ErrorMessageSetting{
        bgColor:number;
        bgAlpha:number;
        msgBgColor:number;
        textColor:number;
        textSize:number;
        msgHeight:number;
    }
    export interface ApiSetting{
        GameRoot:string;
        AccountRoot:string;
        APPLICATION:string;
        DEVICE_NO:string;
        RouteAPI:string;
        GetGameConfig:string;
        GetScheduleList:string;
        GetNextSchedule:string;
        GetAccountData:string;
        GetMyBetList:string;
        GetMyBetDetail:string;
    }
    export interface HeaderSetting{
        headerHeight:number;
        splitColor:number;
        bgColor:number;
        textSize:number;
        textColor:number;
        font:string;
    }
    export interface ColumnSetting{
        text:string;
        columnWidth:number;     
        left:number;   
    }
    export interface RowSetting{
        rowHeight:number;
        bottomBorderColor:number;
        bgColor:number;
        textColor:number;
        textSize:number;
    }
    export interface GameSetting{
        gameName:string;
        title:TitleSetting;
        globalWidth:number;
        globalHeight:number;
        goldContainer:GoldContainerSetting;
        helpBtn:SingleIconSetting;
        memberCount:SingleIconSetting;
        accountList:AccountListSetting;
        moreAccountBtn:SingleIconSetting;
        historyBtn:SingleIconSetting;
        trendBtn:SingleIconSetting;
        numberPanel:NumberPanelSetting;
        progressBar:ProgressBarSetting;
        betPanel:BetPanelSetting;
        betPanelIcon:BetPanelIconSetting;
        betStatistics:BetStatisticsSetting;
        betAction:BetActionPanelSetting;
    }
    export interface TitleSetting{
        titleText:string;
        titleHeight:number;
        titleBgColor:number;
        titleBgAlpha:number;
        textColor:number;
        textSize:number;
        rightIconName:string;
        rightPadding:number;
        font:string;
    }
    export interface GoldContainerSetting{
        iconName:string,
        paddingLeft:number;
        paddingRight:number;
        containerHeight:number;
        textSize:number;
        textColor:number;
        bgColor:number;
        bgAlpha:number;
        left:number;
        top:number;
        font:string;
    }
    export interface SingleIconSetting{
        iconName:string,
        left:number;
        top:number;
        font:string;
    }
    export interface AccountListSetting{
        top:number;
        left:number;
        iconRadius:number;
        distance:number;
        textSize:number;
        textColor:number;
        font:string;
    }
    export interface NumberPanelSetting{
        top:number;
        left:number;
        textSize:number;
        textColor:number;
        font:string;
        bgImage:string;
    }
    export interface ProgressBarSetting{
        top:number;
        textSize:number;
        textColor:number;
        textColorCountdown:number;
        bgColor:number;
        bgAlpha:number;
        barHeight:number;
        font:string;

    }
    export interface BetPanelSetting{
        top:number;
        panelWidth:number;
        titleSize:number;
        padding:number;
        cellPadding:number;
        cellHeight:number;
        cellBgColor:number;
        cellBgAlpha:number;
    }
    export interface BetPanelIconSetting{
        color:number;
        size:number;
        style:number;
        bottom:number;
        iconPadding:number;
    }
    export interface BetStatisticsSetting{
        bottom:number;
        bgColor:number;
        bgAlpha:number;
        numberBorderColor:number;
        textColor:number;
        numberColor:number;
        font:string;
        textSize:number;
        panelHeight:number;
    }
    export interface BetActionPanelSetting{
        panelHeight:number;
        bgColor:number;
        supportedBetValue:number[];
    }
}