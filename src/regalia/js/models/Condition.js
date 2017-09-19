
function ragscondition() {
    this.conditionname = "";
    this.PassCommands = [];
    this.FailCommands = [];
    this.Checks = [];
    this.AdditionalInputData = undefined;
}

function SetupConditionData(GameData) {
    var CurCondition = new ragscondition();
    CurCondition.conditionname = GameData[1];
    for (var i = 0; i < GameData[2].length; i++) {
        CurCondition.Checks.push(SetupCheckData(GameData[2][i]));
    }
    for (var j = 0; j < GameData[3].length; j++) {
        if (GameData[3][j][0] === "CMD") {
            CurCondition.PassCommands.push(SetupCommandData(GameData[3][j]));
        } else {
            CurCondition.PassCommands.push(SetupConditionData(GameData[3][j]));
        }
    }
    for (var k = 0; k < GameData[4].length; k++) {
        if (GameData[4][k][0] === "CMD") {
            CurCondition.FailCommands.push(SetupCommandData(GameData[4][k]));
        } else {
            CurCondition.FailCommands.push(SetupConditionData(GameData[4][k]));
        }
    }
    return CurCondition;
}