 ### 666发布之后需要修改的内容：
 1. index.html内检查token的地址"/apiRouter/api"；
 2. resource文件下的config文件内的api_setting.json，修改为
 ```
{
    "GameRoot":"http://123.206.174.209:81/OtherGame/"
    ,"AccountRoot":"http://123.206.174.209:81/Account/"
    ,"APPLICATION":"Game"
    ,"RouteAPI":"/apiRouter/api"
    ,"DEVICE_NO":"666"
    ,"GetGameConfig":"GetGame_666_Options"
    ,"GetScheduleList":"GetGame_666_LottoryHis"
    ,"GetNextSchedule":"GetGame_666_Schedule"
    ,"GetAccountData":"GetAccountMoneySummary"
    ,"GetMyBetList":"GetGame_666_BetRecord"
    ,"GetMyBetDetail":"GetGame_666_BetRecode_Details"
}

 ```
