
function player() {
    this.Gender = "Male";
    this.Name = "";
    this.Description = "";
    this.StartingRoom = null;
    this.CurrentRoom = null;
    this.PlayerGender = "Male";
    this.bPromptForName = false;
    this.bPromptForGender = false;
    this.PlayerPortrait = "";
    this.PlayerLayeredImage = "";
    this.Actions = [];
    this.bEnforceWeight = false;
    this.dWeightLimit = 100.5;
    this.CustomProperties = [];
}

function SetupPlayerData(GameData) {
    var ThePlayer = new player();
    ThePlayer.Name = GameData[0];
    ThePlayer.Description = GameData[1];
    ThePlayer.StartingRoom = GameData[2];
    ThePlayer.PlayerGender = GameData[3];
    ThePlayer.PlayerLayeredImage = GameData[4];
    ThePlayer.bPromptForName = GameData[5];
    ThePlayer.bPromptForGender = GameData[6];
    ThePlayer.PlayerPortrait = GameData[7];
    ThePlayer.bEnforceWeight = GameData[8];
    ThePlayer.dWeightLimit = GameData[9];

    for (var i = 0; i < GameData[10].length; i++) {
        ThePlayer.CustomProperties.push(SetupCustomPropertyData(GameData[10][i]));
    }

    for (var j = 0; j < GameData[11].length; j++) {
        ThePlayer.Actions.push(SetupActionData(GameData[11][j]));
    }

    return ThePlayer;
}