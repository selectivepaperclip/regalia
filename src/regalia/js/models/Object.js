function ragsobject() {
    this.locationtype = "LT_NULL";
    this.UniqueIdentifier = "";
    this.locationname = "";
    this.GroupName = "";
    this.name = "";
    this.description = "";
    this.sdesc = "";
    this.preposition = "a";
    this.Actions = [];
    this.LayeredZoneLevels = "";
    this.CustomProperties = [];
    this.bCarryable = false;
    this.bWearable = false;
    this.bOpenable = false;
    this.bLockable = false;
    this.bEnterable = false;
    this.bReadable = false;
    this.bContainer = false;
    this.dWeight = 0.0;
    this.bWorn = false;
    this.bRead = false;
    this.bLocked = false;
    this.bOpen = false;
    this.bEntered = false;
    this.bVisible = true;
    this.bEnterFirstTime = false;
    this.bLeaveFirstTime = false;
    this.bImportant = false;
}

function SetupObjectData(GameData) {
    var TheObject = new ragsobject();
    TheObject.name = GameData[0];
    TheObject.UniqueIdentifier = GameData[1];
    TheObject.locationtype = GameData[2];
    TheObject.locationname = GameData[3];
    TheObject.description = GameData[4];
    TheObject.sdesc = GameData[5];
    TheObject.preposition = GameData[6];
    TheObject.bCarryable = GameData[7];
    TheObject.bWearable = GameData[8];
    TheObject.bOpenable = GameData[9];
    TheObject.bLockable = GameData[10];
    TheObject.bEnterable = GameData[11];
    TheObject.bReadable = GameData[12];
    TheObject.bContainer = GameData[13];
    TheObject.dWeight = GameData[14];
    TheObject.bWorn = GameData[15];
    TheObject.bRead = GameData[16];
    TheObject.bLocked = GameData[17];
    TheObject.bOpen = GameData[18];
    TheObject.bVisible = GameData[19];
    TheObject.LayeredZoneLevels = GameData[20];
    for (var i = 0; i < GameData[21].length; i++) {
        TheObject.CustomProperties.push(SetupCustomPropertyData(GameData[21][i]));
    }
    for (var j = 0; j < GameData[22].length; j++) {
        TheObject.Actions.push(SetupActionData(GameData[22][j]));
    }
    return TheObject;
}

function objecttostring(curobject) {
    var retval = "";
    if (curobject.locationtype == "LT_IN_OBJECT" || curobject.locationtype == "LT_CHARACTER")
        retval += "  ";
    if (curobject.sdesc.trim().length > 0) {
        if (TheGame != null)
            retval += PerformTextReplacements(curobject.sdesc, null);
        else
            retval += curobject.name;
    } else {
        retval += curobject.name;
    }
    if (curobject.bOpenable && !curobject.bOpen)
        retval += " (closed)";
    if ((curobject.bOpenable) && (curobject.bOpen))
        retval += " (open)";
    if (curobject.bWorn)
        retval += " (worn)";
    return retval;
}