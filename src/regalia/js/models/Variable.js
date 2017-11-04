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
    this.VarArray = [];
    this.CustomProperties = [];
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
    for (var i = 0; i < RoomData[11].length; i++) {
        TheVariable.CustomProperties.push(SetupCustomPropertyData(RoomData[11][i]));
    }
    return TheVariable;
}