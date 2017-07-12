
function timer() {
    this.Name = "";
    this.TType = "";
    this.Active = false;
    this.Restart = false;
    this.TurnNumber = 0;
    this.Length = 0;
    this.LiveTimer = false;
    this.TimerSeconds = 0;
    this.CustomProperties = [];
    this.Actions = [];
    this.curtickcount = 0;
}

function SetupTimerData(GameData) {
    var TheTimer = new timer();
    TheTimer.Name = GameData[0];
    TheTimer.TType = GameData[1];
    TheTimer.Active = GameData[2];
    TheTimer.Restart = GameData[3];
    TheTimer.TurnNumber = GameData[4];
    TheTimer.Length = GameData[5];
    TheTimer.LiveTimer = GameData[6];
    TheTimer.TimerSeconds = GameData[7];
    for (var i = 0; i < GameData[8].length; i++) {
        TheTimer.CustomProperties.push(SetupCustomPropertyData(GameData[8][i]));
    }
    for (var j = 0; j < GameData[9].length; j++) {
        TheTimer.Actions.push(SetupActionData(GameData[9][j]));
    }
    return TheTimer;
}