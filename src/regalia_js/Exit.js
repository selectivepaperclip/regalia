
function exit() {
    this.Direction = "Empty";
    this.bActive = false;
    this.DestinationRoom = "";
    this.PortalObjectName = "<None>";
}

function SetupExitData(GameData) {
    var CurExit = new exit();
    CurExit.Direction = GameData[0];
    CurExit.bActive = GameData[1];
    CurExit.DestinationRoom = GameData[2];
    CurExit.PortalObjectName = GameData[3];
    return CurExit;
}