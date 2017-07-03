
var CurrentRoomGuid = "00000000-0000-0000-0000-000000000001";
var VoidRoomGuid = "00000000-0000-0000-0000-000000000002";

function room() {
    this.Description = "";
    this.SDesc = "";
    this.Name = "";
    this.Group = "None";
    this.Exits = new Array();
    this.Actions = new Array();
    this.CustomProperties = new Array();
    this.RoomPic = "None";
    this.LayeredRoomPic = "None";
    this.bEnterFirstTime = false;
    this.bLeaveFirstTime = false;
    this.UniqueID = "";


}

function SetupRoomData(RoomData) {
    var TheRoom = new room();
    TheRoom.SDesc = RoomData[0];
    TheRoom.Description = RoomData[1];
    TheRoom.Name = RoomData[2];
    TheRoom.Group = RoomData[3];
    TheRoom.RoomPic = RoomData[4];
    TheRoom.LayeredRoomPic = RoomData[5];
    TheRoom.bEnterFirstTime = RoomData[6];
    TheRoom.bLeaveFirstTime = RoomData[7];
    TheRoom.UniqueID = RoomData[8];
    var numimages = 0;
    for (var _j = 0; _j < RoomData[9].length; _j++) {
        TheRoom.Exits.length = numimages + 1;
        TheRoom.Exits[numimages] = SetupExitData(RoomData[9][_j]);
        numimages++;
    }
    numimages = 0;
    for (_j = 0; _j < RoomData[10].length; _j++) {
        TheRoom.CustomProperties.length = numimages + 1;
        TheRoom.CustomProperties[numimages] = SetupCustomPropertyData(RoomData[10][_j]);
        numimages++;
    }
    numimages = 0;
    for (_j = 0; _j < RoomData[11].length; _j++) {
        TheRoom.Actions.length = numimages + 1;
        TheRoom.Actions[numimages] = SetupActionData(RoomData[11][_j]);
        numimages++;
    }
    return TheRoom;
}

function LoadRoom(GameData) {
    var TheRoom = new room();
    TheRoom.SDesc = GameData.find('SDesc').text();
    TheRoom.Description = GameData.find('Description').text();
    TheRoom.Name = GameData.children('Name').text();
    TheRoom.Group = GameData.find('Group').text();
    TheRoom.RoomPic = GameData.find('RoomPic').text();
    TheRoom.LayeredRoomPic = GameData.find('LayeredRoomPic').text();
    TheRoom.bEnterFirstTime = GameData.find('bEnterFirstTime').text();
    TheRoom.bLeaveFirstTime = GameData.find('bLeaveFirstTime').text();
    TheRoom.UniqueID = GameData.find('UniqueID').text();
    var numimages = 0;
    var exittest = GameData.find('Exit');
    exittest.each(function() {
        TheRoom.Exits.length = numimages + 1;
        TheRoom.Exits[numimages] = SetupExitData($(this));
        numimages++;
    });
    numimages = 0;
    var test = GameData.find('Action');
    test.each(function() {
        TheRoom.Actions.length = numimages + 1;
        TheRoom.Actions[numimages] = SetupActionData($(this));
        numimages++;
    });
    return TheRoom;
}