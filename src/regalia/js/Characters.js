
function character() {
    this.Charname = "";
    this.CharnameOverride = "";
    this.Inventory = [];
    this.Actions = [];
    this.CharGender = "Other";
    this.CurrentRoom = VoidRoomGuid;
    this.Description = "";
    this.CharPortrait = "";
    this.bEnterFirstTime = false;
    this.bLeaveFirstTime = false;
    this.bAllowInventoryInteraction = false;
    this.CustomProperties = [];
}

function CharToString(thechar) {
    if (thechar.CharnameOverride == "")
        return thechar.Charname;
    else
        return PerformTextReplacements(thechar.CharnameOverride, null);
}

function SetupCharacterData(GameData) {
    var TheCharacter = new character();
    TheCharacter.Charname = GameData[0];
    TheCharacter.CharnameOverride = GameData[1];
    TheCharacter.Description = GameData[2];
    TheCharacter.CharGender = GameData[3];
    TheCharacter.CurrentRoom = GameData[4];
    TheCharacter.bAllowInventoryInteraction = GameData[5];
    TheCharacter.CharPortrait = GameData[6];

    for (var i = 0; i < GameData[7].length; i++) {
        TheCharacter.CustomProperties.push(SetupCustomPropertyData(GameData[7][i]));
    }

    for (var j = 0; j < GameData[8].length; j++) {
        TheCharacter.Actions.push(SetupActionData(GameData[8][j]));
    }

    return TheCharacter;
}