function command() {
    this.cmdtype = "CT_UNINITIALIZED";
    this.CommandName = "";
    this.CommandText = "";
    this.CommandPart2 = "";
    this.CommandPart3 = "";
    this.CommandPart4 = "";
    this.CustomChoices = new Array();
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
    var count = 0;
    for (var _j = 0; _j < GameData[7].length; _j++) {
        CurCommand.CustomChoices.length = count + 1;
        CurCommand.CustomChoices[count] = GameData[7][_j];
        count++;
    }
    CurCommand.EnhInputData = SetupEnhInputData(GameData[8]);
    return CurCommand;
}