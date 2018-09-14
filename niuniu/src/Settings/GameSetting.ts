module Settings {
  export class GameSettingUtils {
    public static gameSetting: GameSetting;
    public static globalScale: number;
    public static historySetting: BaseSceneSetting;
    public static trendSetting: BaseSceneSetting;
    public static connectErrorSceneSetting:BaseSceneSetting;
    public static helpSetting: BaseSceneSetting;
    public static timeSetting: TimeIntervalSettings
    // public static errorMessageSetting: ErrorMessageSetting;
  }
  export interface TitleSetting {
    titleText: string;
    titleHeight: number;
    titleBgColor: number;
    titleBgAlpha: number;
    textColor: number;
    textSize: number;
    text1Color: number;
    text1Size: number;
    top: number;
    padding: number;
    font: string;
  }

  export class GameSetting {
    gameName: string;
    title: TitleSetting;
    globalWidth: number;
    globalHeight: number;
    bitmapTextFont: string;
    helpBtn: SingleIconSetting;
    trendBtn: SingleIconSetting;
    recordBtn: SingleIconSetting;
    host: SingleIconSetting;
    onLineIcon: OnlineIconSetting;
    betStatistics: BetStatisticsSetting;
    ownBetNum: OwnBetNumSetting;
    playerQL: PlayerPositionSetting;
    playerBH: PlayerPositionSetting;
    playerXW: PlayerPositionSetting;
    playerX: PlayerPositionSetting;
    playerQ: PlayerPositionSetting;
    poker: PokerSetting;
    countDownTimer: CountDownTimerSetting;
    alert: AlertSetting;
    dice: DiceSetting;
    shuffle: ShuffleSetting;

  }

  export interface OnlineIconSetting {
    iconName: string,
    left: number;
    top: number;
    textColor: number;
    textSize: number;
    font: string;
  }

  export interface SingleIconSetting {
    iconName: string,
    left: number;
    top: number;
  }
  export interface BetStatisticsSetting {
    iconName: string,
    left: number;
    top: number;
    title: string;
    titlePaddingToTop: number
    textColor: number;
    numberColor: number;
    textSize: number;
    betNumTFLeftPadding: number;
    betNumTFTopPadding: number;
    playerTFLeftPadding: number;
    playerTFWidth: number;
    play1Name: string;
    play1NameTop: number;
    play2Name: string;
    play3Name: string;
    play4Name: string;
    play5Name: string;
    font: string;
  }
  export interface OwnBetNumSetting {
    iconName: string,
    left: number;
    top: number;
    textSize: number;
    textColor: number;
    textBgColor: number;
    borderColor: number;
    radius: number;
    width: number;
    padding: number;
    height: number;
    font: string;
  }
  export interface PlayerPositionSetting {
    iconName: string,
    coverIconName:string,
    left: number;
    top: number;
    textSize: number;
    textColor: number;
    textX: number;
    titleHeight: number;
    font: string;
  }
  export interface PokerSetting {
    iconName: string,
    left: number;
    top: number;
    padding: number;
  }
  export interface CountDownTimerSetting {
    iconName: string,
    bgIconName: string,
    padding: number,
    left: number;
    top: number;
    textSize: number;
    textColor: number;
    noticeColor: number;
    font: string;
    fontName: string;
  }
  export interface AlertSetting {
    iconName: string,
    fontName: string,
    startIconName: string,
    stopIconName: string,
    left: number;
    top: number;
  }
  export interface DiceSetting {
    name: string;
    pngUrl: string;
    jsonUrl: string;
    pointX: number;
    pointY: number;
    left: number;
    top: number;
    areaWidth: number;
    areaHeight: number;
    dicePaddingX: number;
    dicePaddingY: number;
    dicePadding: number;
    count: number;

  }
  export interface ShuffleSetting {
    name: string;
    pngUrl: string;
    jsonUrl: string;
    pointX: number;
    pointY: number;
    padding: number;
    poker: PokerSetting;
  }

  export interface BaseSceneSetting {
    bgColor: number;
    alpha: number;
    title: OtherTitleSetting;
    header: HistoryHeaderSetting;
    icon: string;
    closeIcon: string;
  }
  export interface OtherTitleSetting {
    titleText: string;
    titleHeight: number;
    textColor: number;
    textSize: number;
    top: number;
    padding: number;
    font: string;
  }
  export interface RecordSceneSetting extends BaseSceneSetting {
    row: RowSetting[];
    columns: ColumnSetting[];
  }
  export interface ColumnSetting {
    text: string;
    columnWidth: number;
    left: number;
  }
  export interface RowSetting {
    rowHeight: number;
    bottomBorderColor: number;
    bgColor: number;
    textColor: number;
    textSize: number;
  }
  export interface HistoryHeaderSetting {
    title: string;
    left: number;
    top: number;
    textColor: number;
    textSize: number;
    text1:string;
    text1X:number;
    text2:string;
    padding1:number;
    padding2:number;
    text3:string;
    iconTop:number;
    winIcon:string;
    winIconX:number;
    tieIcon:string;
    loseIcon:string;

    font: string

  }

  export interface TimeIntervalSettings {
    pokerMoveInterval: number;
    sendPokerInterval: number;
    playDiceInterval: number;
    diceMoveInterval: number;
    pokerWaitInterval: number;
    pokerRotationInterval: number;
    settleInterval: number;
    betWaitInterval: number;
    alertWaitInterval: number

  }

}