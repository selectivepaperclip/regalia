function character() {
    this.Charname = "";
    this.CharnameOverride = "";
    this.Inventory = new Array();
    this.Actions = new Array();
    this.CharGender = "Other";
    this.CurrentRoom = VoidRoomGuid;
    this.Description = "";
    this.CharPortrait = "";
    this.bEnterFirstTime = false;
    this.bLeaveFirstTime = false;
    this.bAllowInventoryInteraction = false;
    this.CustomProperties = new Array();

    this.ToString = function () {

    };
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
    var numimages = 0;
    for (_j = 0; _j < GameData[7].length; _j++) {
        TheCharacter.CustomProperties.length = numimages + 1;
        TheCharacter.CustomProperties[numimages] = SetupCustomPropertyData(GameData[7][_j]);
        numimages++;
    }
    numimages = 0;
    for (_j = 0; _j < GameData[8].length; _j++) {
        TheCharacter.Actions.length = numimages + 1;
        TheCharacter.Actions[numimages] = SetupActionData(GameData[8][_j]);
        numimages++;
    }
    return TheCharacter;
}