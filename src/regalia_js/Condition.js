
function ragscondition() {
    this.conditionname = "";
    this.PassCommands = new Array();
    this.FailCommands = new Array();
    this.Checks = new Array();
    this.AdditionalInputData = "";
}

function SetupConditionData(GameData) {
    var CurCondition = new ragscondition();
    CurCondition.conditionname = GameData[1];
    var numimages = 0;
    var numimages = 0;
    for (var _j = 0; _j < GameData[2].length; _j++) {
        CurCondition.Checks.length = numimages + 1;
        CurCondition.Checks[numimages] = SetupCheckData(GameData[2][_j]);
        numimages++;
    }
    numimages = 0;
    for (var _j = 0; _j < GameData[3].length; _j++) {
        CurCondition.PassCommands.length = numimages + 1;
        if (GameData[3][_j][0] == "CMD") {
            CurCondition.PassCommands[numimages] = SetupCommandData(GameData[3][_j]);
        } else {
            CurCondition.PassCommands[numimages] = SetupConditionData(GameData[3][_j]);
        }
        numimages++;
    }
    numimages = 0;
    for (var _j = 0; _j < GameData[4].length; _j++) {
        CurCondition.FailCommands.length = numimages + 1;
        if (GameData[4][_j][0] == "CMD") {
            CurCondition.FailCommands[numimages] = SetupCommandData(GameData[4][_j]);
        } else {
            CurCondition.FailCommands[numimages] = SetupConditionData(GameData[4][_j]);
        }
        numimages++;
    }
    return CurCondition;
}