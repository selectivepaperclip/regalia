
function action() {
    this.name = "default";
    this.bActive = true;
    this.overridename = "";
    this.actionparent = "None";
    this.bConditionFailOnFirst = true;
    this.InputType = "None";
    this.PassCommands = [];
    this.FailCommands = [];
    this.Conditions = [];
    this.CustomChoices = [];
    this.EnhInputData = new enhinputdata();
    this.CustomChoiceTitle = "";
}

function SetupActionData(GameData) {
    var CurAction = new action();
    CurAction.name = GameData[0];
    CurAction.bActive = GameData[1];
    CurAction.overridename = GameData[2];
    CurAction.actionparent = GameData[3];
    CurAction.bConditionFailOnFirst = GameData[4];
    CurAction.InputType = GameData[5];
    CurAction.CustomChoiceTitle = GameData[6];
    for (var i = 0; i < GameData[7].length; i++) {
        if (GameData[7][i][0] === "CMD") {
            CurAction.PassCommands.push(SetupCommandData(GameData[7][i]));
        } else {
            CurAction.PassCommands.push(SetupConditionData(GameData[7][i]));
        }
    }

    for (var j = 0; j < GameData[8].length; j++) {
        if (GameData[8][j][0] === "CMD") {
            CurAction.FailCommands.push(SetupCommandData(GameData[8][j]));
        } else {
            CurAction.FailCommands.push(SetupConditionData(GameData[8][j]));
        }
    }

    for (var k = 0; k < GameData[9].length; k++) {
        CurAction.Conditions.push(SetupConditionData(GameData[9][k]));
    }

    for (var l = 0; l < GameData[10].length; l++) {
        CurAction.CustomChoices.push(GameData[10][l]);
    }

    CurAction.EnhInputData = SetupEnhInputData(GameData[11]);
    return CurAction;
}