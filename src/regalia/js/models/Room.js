function room() {
    this.Description = "";
    this.SDesc = "";
    this.Name = "";
    this.Group = "None";
    this.Exits = [];
    this.Actions = [];
    this.CustomProperties = [];
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
    for (var i = 0; i < RoomData[9].length; i++) {
        TheRoom.Exits.push(SetupExitData(RoomData[9][i]));
    }
    for (var j = 0; j < RoomData[10].length; j++) {
        TheRoom.CustomProperties.push(SetupCustomPropertyData(RoomData[10][j]));
    }
    for (var k = 0; k < RoomData[11].length; k++) {
        TheRoom.Actions.push(SetupActionData(RoomData[11][k]));
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
    var exittest = GameData.find('Exit');
    exittest.each(function() {
        TheRoom.Exits.push(SetupExitData($(this)));
    });
    var test = GameData.find('Action');
    test.each(function() {
        TheRoom.Actions.push(SetupActionData($(this)));
    });
    return TheRoom;
}