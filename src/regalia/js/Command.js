
function command() {
    this.cmdtype = "CT_UNINITIALIZED";
    this.CommandName = "";
    this.CommandText = "";
    this.CommandPart2 = "";
    this.CommandPart3 = "";
    this.CommandPart4 = "";
    this.CustomChoices = [];
    this.EnhInputData = null;
    this.AdditionalInputData = "";
}

function SetupCommandData(GameData) {
    var CurCommand = new command();
    CurCommand.cmdtype = GameData[1];
    CurCommand.CommandName = GameData[2];
    CurCommand.CommandText = GameData[3];
    CurCommand.CommandPart2 = GameData[4];
    CurCommand.CommandPart3 = GameData[5];
    CurCommand.CommandPart4 = GameData[6];
    for (var i = 0; i < GameData[7].length; i++) {
        CurCommand.CustomChoices.push(GameData[7][i]);
    }
    CurCommand.EnhInputData = SetupEnhInputData(GameData[8]);
    return CurCommand;
}