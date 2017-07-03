
var CurrentRoomGuid = "00000000-0000-0000-0000-000000000001";
var VoidRoomGuid = "00000000-0000-0000-0000-000000000002";

function variable() {
    this.dNumType = 0;
    this.dMin = "";
    this.dMax = "";
    this.sString = "None";
    this.varname = "None";
    this.GroupName = "None";
    this.bEnforceRestrictions = false;
    this.dtDateTime = "";
    this.vartype = "";
    this.VarComment = "";
    this.VarArray = new Array();
    this.CustomProperties = new Array();
}

function SetupVariableData(RoomData) {
    var TheVariable = new variable();
    TheVariable.dNumType = RoomData[0];
    TheVariable.dMin = RoomData[1];
    TheVariable.dMax = RoomData[2];
    TheVariable.sString = RoomData[3];
    TheVariable.varname = RoomData[4];
    TheVariable.GroupName = RoomData[5];
    TheVariable.bEnforceRestrictions = RoomData[6];
    TheVariable.dtDateTime = RoomData[7];
    TheVariable.vartype = RoomData[8];
    TheVariable.VarComment = RoomData[9];
    TheVariable.VarArray = RoomData[10];
    var numimages = 0;
    for (_j = 0; _j < RoomData[11].length; _j++) {
        TheVariable.CustomProperties.length = numimages + 1;
        TheVariable.CustomProperties[numimages] = SetupCustomPropertyData(RoomData[11][_j]);
        numimages++;
    }
    return TheVariable;
}