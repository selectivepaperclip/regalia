
var filename = "";
var images = new Array();
var loadedimages = 0;
var numimages = 0;
var curimage = 0;
var reader;
var pausedindex = 0;
var pausecommandargs = null;
var TheGame = null;
var GameData = null;
var selectedobj = null;
var VariableGettingSet = null;
var AdditionalData = "";
var MovingDirection = "";
var bMasterTimer = false;

$(function() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {} else {
        alert('The File APIs are not fully supported in this browser.');
    }
    $(document).keydown(function(e) {
        switch (e.keyCode) {
            case 32:
                {
                    $("#Continue").click();
                    break;
                }
            case 119:
                {
                    handleFileSave(true);
                    break;
                }
            case 120:
                {
                    handleFileSelect(true);
                    break;
                }
        }
    });
    $(document).mousemove(function(e) {
        window.x = e.pageX;
        window.y = e.pageY;
    });
    $("#Actionchoices").change(function(e) {
        var selectionchoice = $("#Actionchoices").val();
        if (selectionchoice != null) {
            $("#MainText").append('</br><b>' + selectionchoice + "</b>");
            $("#MainText").animate({
                scrollTop: $("#MainText")[0].scrollHeight
            });
            $("#selectionmenu").css("visibility", "hidden");
            ResetLoopObjects();
            ProcessAction(selectionchoice);
            //we may await user input...if so, don't run events
            //if out of commands
            if (!bGameReset && MasterCommandList.length == 0) {
                RunTimerEvents();
                UpdateStatusBars();
            } else
                bGameReset = false;

        }
    });
    $("#Continue").click(function(e) {
        var bgcolor = $("#Continue").css('background-color');
        if (bgcolor == "rgb(128, 128, 128)") {} else {
            $("#RoomThumb").css("visibility", "visible");
            $("#PlayerPortrait").css("visibility", "visible");

            $("#RoomThumbImg").css("visibility", "visible");
            $("#PlayerImg").css("visibility", "visible");
            $("#RoomObjectsPanel").css("visibility", "visible");
            $("#VisibleCharactersPanel").css("visibility", "visible");
            $("#InventoryPanel").css("visibility", "visible");
            SetExits();
            $("#Continue").css("background-color", "rgb(128, 128, 128)");
            $("#Continue").css('visibility', "hidden");
            RunCommands(pausecommandargs[0], pausecommandargs[1], pausecommandargs[2], pausecommandargs[3], pausecommandargs[4], pausedindex + 1);
        }
    });
    $("#PlayerPortrait").click(function(e) {
        TheObj = TheGame.Player;
        DisplayActions(TheGame.Player.Actions);
    });
    $("#RoomThumb").click(function(e) {
        TheObj = GetRoom(TheGame.Player.CurrentRoom);
        DisplayActions(TheObj.Actions);
    });
    $("#PlayerImg").click(function(e) {
        TheObj = TheGame.Player;
        DisplayActions(TheGame.Player.Actions);
    });
    $("#RoomThumbImg").click(function(e) {
        TheObj = GetRoom(TheGame.Player.CurrentRoom);
        DisplayActions(TheObj.Actions);
    });
    $("#textbutton").click(function(e) {
        selectedobj = $("#textinput").val();
        if (selectedobj != null) {
            $("#RoomThumb").css("visibility", "visible");
            $("#PlayerPortrait").css("visibility", "visible");

            $("#RoomThumbImg").css("visibility", "visible");
            $("#PlayerImg").css("visibility", "visible");
            $("#RoomObjectsPanel").css("visibility", "visible");
            $("#VisibleCharactersPanel").css("visibility", "visible");
            $("#InventoryPanel").css("visibility", "visible");
            SetExits();
            $("#textchoice").css("visibility", "hidden");
            SetCommandInput(VariableGettingSet, selectedobj);
            RunCommands(pausecommandargs[0], pausecommandargs[1], pausecommandargs[2], pausecommandargs[3], pausecommandargs[4], pausedindex + 1);
        }
    });
    $("#playernamebutton").click(function(e) {
        AdditionalInput = "";
        $("#playernamechoice").css("visibility", "hidden");
        $("#RoomThumb").css("visibility", "visible");
        $("#PlayerPortrait").css("visibility", "visible");

        $("#RoomThumbImg").css("visibility", "visible");
        $("#PlayerImg").css("visibility", "visible");
        $("#RoomObjectsPanel").css("visibility", "visible");
        $("#VisibleCharactersPanel").css("visibility", "visible");
        $("#InventoryPanel").css("visibility", "visible");
        SetExits();
        var newname = $("#playernametext").val();
        TheGame.Player.Name = newname.trim();
        if (TheGame.Player.bPromptForGender) {
            $("#genderchoice").css("visibility", "visible");
            $("#RoomThumb").css("visibility", "hidden");
            $("#RoomThumbImg").css("visibility", "hidden");
            $("#PlayerPortrait").css("visibility", "hidden");
            $("#PlayerImg").css("visibility", "hidden");
            $("#RoomObjectsPanel").css("visibility", "hidden");
            $("#VisibleCharactersPanel").css("visibility", "hidden");
            $("#InventoryPanel").css("visibility", "hidden");
            $(".Direction").css("visibility", "hidden");
        } else {
            StartGame();
        }
    });
    $("#load").click(function(e) {
        $("#loadinputchoices option").remove();
        var db = openDatabase(TheGame.Title, '1.0', 'Test DB', 2 * 1024 * 1024);
        db.transaction(function(tx) {
            tx.executeSql('SELECT id, date FROM RagsSave4 order by id desc', [], function(tx, results) {
                var len = results.rows.length,
                    i;
                for (i = 0; i < len; i++) {
                    var newopt = new Option(results.rows.item(i).id + " : " + results.rows.item(i).date, results.rows.item(i).id);
                    $("#loadinputchoices").append(newopt);
                }
            }, null);
        });
        $("#loadmenu").css("top", 0 + "px");
        var leftposition = window.x;
        if (window.x + $("#loadmenu").width() > $(window).width())
            leftposition = $(window).width() - $("#loadmenu").width();
        $("#loadmenu").css("left", leftposition + "px");
        $("#loadmenu").css("visibility", "visible");
        $("#savemenu").css("visibility", "hidden");
        $("#loadinputchoices").focus();
    });
    $("#save").click(function(e) {
        $("#saveinputchoices option").remove();
        var db = openDatabase(TheGame.Title, '1.0', 'Test DB', 2 * 1024 * 1024);
        db.transaction(function(tx) {
            tx.executeSql('SELECT id, date FROM RagsSave4 order by id desc', [], function(tx, results) {
                var len = results.rows.length,
                    i;
                for (i = 0; i < len; i++) {
                    var newopt = new Option(results.rows.item(i).id + " : " + results.rows.item(i).date, results.rows.item(i).id);
                    $("#saveinputchoices").append(newopt);
                }
            }, null);
        });
        var newopt = new Option("New...", "New...");
        $("#saveinputchoices").append(newopt);
        $("#savemenu").css("top", 0 + "px");
        var leftposition = window.x;
        if (window.x + $("#savemenu").width() > $(window).width())
            leftposition = $(window).width() - $("#savemenu").width();
        $("#savemenu").css("left", leftposition + "px");
        $("#savemenu").css("visibility", "visible");
        $("#loadmenu").css("visibility", "hidden");
        $("#saveinputchoices").focus();
    });
    $("div.genderchoiceSelect").click(function() {
        selectedobj = $(this).val();
        if (selectedobj != null) {
            $("#RoomThumb").css("visibility", "visible");
            $("#PlayerPortrait").css("visibility", "visible");
            $("#RoomThumbImg").css("visibility", "visible");
            $("#PlayerImg").css("visibility", "visible");
            $("#RoomObjectsPanel").css("visibility", "visible");
            $("#VisibleCharactersPanel").css("visibility", "visible");
            $("#InventoryPanel").css("visibility", "visible");
            SetExits();
            $("#genderchoice").css("visibility", "hidden");
            StartGame();
        }
    });
    $("#saveinputchoices").change(function(e) {
        selectedobj = $("#saveinputchoices").val();
        if (selectedobj != null) {
            $("#RoomThumb").css("visibility", "visible");
            $("#PlayerPortrait").css("visibility", "visible");
            $("#RoomObjectsPanel").css("visibility", "visible");
            $("#RoomThumbImg").css("visibility", "visible");
            $("#PlayerImg").css("visibility", "visible");
            $("#VisibleCharactersPanel").css("visibility", "visible");
            $("#InventoryPanel").css("visibility", "visible");
            SetExits();
            $("#savemenu").css("visibility", "hidden");
            if (selectedobj == "New...") {
                handleFileSave(false, true);
            } else {
                handleFileSave(false, false, selectedobj);
            }
        }
    });
    $("#loadinputchoices").change(function(e) {
        selectedobj = $("#loadinputchoices").val();
        if (selectedobj != null) {
            $("#RoomThumb").css("visibility", "visible");
            $("#PlayerPortrait").css("visibility", "visible");

            $("#RoomThumbImg").css("visibility", "visible");
            $("#PlayerImg").css("visibility", "visible");
            $("#RoomObjectsPanel").css("visibility", "visible");
            $("#VisibleCharactersPanel").css("visibility", "visible");
            $("#InventoryPanel").css("visibility", "visible");
            SetExits();
            $("#loadmenu").css("visibility", "hidden");
            handleFileSelect(false, selectedobj);
        }
    });
    $("#inputchoices").change(function(e) {
        selectedobj = $("#inputchoices").val();
        if (selectedobj != null) {
            AdditionalData = selectedobj;
            $("#RoomThumb").css("visibility", "visible");
            $("#PlayerPortrait").css("visibility", "visible");

            $("#RoomThumbImg").css("visibility", "visible");
            $("#PlayerImg").css("visibility", "visible");
            $("#RoomObjectsPanel").css("visibility", "visible");
            $("#VisibleCharactersPanel").css("visibility", "visible");
            $("#InventoryPanel").css("visibility", "visible");
            SetExits();
            $("#inputmenu").css("visibility", "hidden");
            if (getObjectClass(InputDataObject) == "action" || "actionparent" in InputDataObject) {

                ExecuteAction(InputDataObject, bMasterTimer, selectedobj);
                if (bMasterTimer)
                    RunCommands(pausecommandargs[0], pausecommandargs[1], pausecommandargs[2], pausecommandargs[3], pausecommandargs[4], pausedindex + 1);
                else
                    RunCommands(TheObj, selectedobj, InputDataObject, null);
            }
        }
    });
    $("#textactionbutton").click(function(e) {
        selectedobj = $("#textactioninput").val();
        if (selectedobj != null) {
            AdditionalData = selectedobj;
            $("#RoomThumb").css("visibility", "visible");
            $("#PlayerPortrait").css("visibility", "visible");

            $("#RoomThumbImg").css("visibility", "visible");
            $("#PlayerImg").css("visibility", "visible");
            $("#RoomObjectsPanel").css("visibility", "visible");
            $("#VisibleCharactersPanel").css("visibility", "visible");
            $("#InventoryPanel").css("visibility", "visible");
            SetExits();
            $("#textactionchoice").css("visibility", "hidden");
            if (getObjectClass(InputDataObject) == "action" || "actionparent" in InputDataObject) {
                ExecuteAction(InputDataObject, bMasterTimer, selectedobj);

            }
        }
    });
    $("#cmdinputchoices").change(function(e) {
        selectedobj = $("#cmdinputchoices").val();
        if (selectedobj != null) {
            $("#RoomThumb").css("visibility", "visible");
            $("#PlayerPortrait").css("visibility", "visible");

            $("#RoomThumbImg").css("visibility", "visible");
            $("#PlayerImg").css("visibility", "visible");
            $("#RoomObjectsPanel").css("visibility", "visible");
            $("#VisibleCharactersPanel").css("visibility", "visible");
            $("#InventoryPanel").css("visibility", "visible");
            SetExits();
            $("#cmdinputmenu").css("visibility", "hidden");
            SetCommandInput(VariableGettingSet, selectedobj);
            RunCommands(pausecommandargs[0], pausecommandargs[1], pausecommandargs[2], pausecommandargs[3], pausecommandargs[4], pausedindex + 1);
        }
    });
    $("#cmdCancelInput").click(function(e) {
        AdditionalInput = "";
        $("#cmdinputmenu").css("visibility", "hidden");
        $("#RoomThumb").css("visibility", "visible");
        $("#PlayerPortrait").css("visibility", "visible");

        $("#RoomThumbImg").css("visibility", "visible");
        $("#PlayerImg").css("visibility", "visible");
        $("#RoomObjectsPanel").css("visibility", "visible");
        $("#VisibleCharactersPanel").css("visibility", "visible");
        $("#InventoryPanel").css("visibility", "visible");
        SetExits();
        RunCommands(pausecommandargs[0], pausecommandargs[1], pausecommandargs[2], pausecommandargs[3], pausecommandargs[4], pausedindex + 1);
    });
    $("#Inventory").change(function(e) {
        selectedobj = GetObject($("#Inventory").val());
        if (selectedobj != null) {
            TheObj = selectedobj;
            $("#Inventory").val([]);
            DisplayActions(selectedobj.Actions);
        }
    });
    $("#VisibleCharacters").change(function(e) {
        selectedobj = GetCharacter($("#VisibleCharacters").val());
        if (selectedobj != null) {
            TheObj = selectedobj;
            $("#VisibleCharacters").val([]);
            DisplayActions(selectedobj.Actions);
        }
    });
    $
    /*("div").click(function () {
    //alert($(this).text());
    //alert($(this).hasClass("VisibleCharacters"));
    selectedobj = GetCharacter($(this).text());
    if (selectedobj != null) {
    TheObj = selectedobj;
    //$("#VisibleCharacters").val([]);
    DisplayActions(selectedobj.Actions);
    }
    });
    */
    $("#selectionmenu").focusout(function() {
        $("#selectionmenu").css("visibility", "hidden");
    });
    $("#loadmenu").focusout(function() {
        $("#loadmenu").css("visibility", "hidden");
    });
    $("#savemenu").focusout(function() {
        $("#savemenu").css("visibility", "hidden");
    });
    $("#RoomObjects").change(function(e) {
        selectedobj = GetObject($("#RoomObjects").val());
        if (selectedobj != null) {
            TheObj = selectedobj;
            $("#RoomObjects").val([]);
            DisplayActions(selectedobj.Actions);
        }
    });
    setInterval(function() {
        for (var _i = 0; _i < TheGame.Timers.length; _i++) {
            var curtimer = TheGame.Timers[_i];
            if (curtimer.Active && curtimer.LiveTimer) {
                curtimer.curtickcount += 1000;
                if (curtimer.curtickcount >= curtimer.TimerSeconds * 1000) {
                    curtimer.curtickcount = 0;
                    RunTimer(curtimer);
                    RefreshInventory();
                    RefreshRoomObjects();
                    RefreshCharacters();
                }
            }
        }
    }, 1000);

    $("#bUp").click(function() {
        UpClicked();
    });
    $("#bUP").hover(function() {
        var destroom = GetRoom(GetDestinationRoomName("Up"));
        $("#tooltip").text(destroom.Name);
        $("#tooltip").css("left", (window.x + 10) + "px");
        $("#tooltip").css("top", window.y + "px");
        $("#tooltip").css("visibility", "visible");
    }, function() {
        $("#tooltip").css("visibility", "hidden");
    });
    $("#bDown").click(function() {
        DownClicked();
    });
    $("#bDown").hover(function() {
        var destroom = GetRoom(GetDestinationRoomName("Down"));
        $("#tooltip").text(destroom.Name);
        $("#tooltip").css("left", (window.x + 10) + "px");
        $("#tooltip").css("top", window.y + "px");
        $("#tooltip").css("visibility", "visible");
    }, function() {
        $("#tooltip").css("visibility", "hidden");
    });
    $("#bNorth").hover(function() {
        var destroom = GetRoom(GetDestinationRoomName("North"));
        $("#tooltip").text(destroom.Name);
        $("#tooltip").css("left", (window.x + 10) + "px");
        $("#tooltip").css("top", window.y + "px");
        $("#tooltip").css("visibility", "visible");
    }, function() {
        $("#tooltip").css("visibility", "hidden");
    });
    $("#bNorth").click(function() {
        NorthClicked();
    });
    $("#bSouth").click(function() {
        SouthClicked();
    });
    $("#bSouth").hover(function() {
        var destroom = GetRoom(GetDestinationRoomName("South"));
        $("#tooltip").text(destroom.Name);
        $("#tooltip").css("left", (window.x + 10) + "px");
        $("#tooltip").css("top", window.y + "px");
        $("#tooltip").css("visibility", "visible");
    }, function() {
        $("#tooltip").css("visibility", "hidden");
    });
    $("#bWest").click(function() {
        WestClicked();
    });
    $("#bWest").hover(function() {
        var destroom = GetRoom(GetDestinationRoomName("West"));
        $("#tooltip").text(destroom.Name);
        $("#tooltip").css("left", (window.x + 10) + "px");
        $("#tooltip").css("top", window.y + "px");
        $("#tooltip").css("visibility", "visible");
    }, function() {
        $("#tooltip").css("visibility", "hidden");
    });
    $("#bEast").click(function() {
        EastClicked();
    });
    $("#bEast").hover(function() {
        var destroom = GetRoom(GetDestinationRoomName("East"));
        $("#tooltip").text(destroom.Name);
        $("#tooltip").css("left", (window.x + 10) + "px");
        $("#tooltip").css("top", window.y + "px");
        $("#tooltip").css("visibility", "visible");
    }, function() {
        $("#tooltip").css("visibility", "hidden");
    });
    $("#bNorthwest").click(function() {
        NorthwestClicked();
    });
    $("#bNorthwest").hover(function() {
        var destroom = GetRoom(GetDestinationRoomName("NorthWest"));
        $("#tooltip").text(destroom.Name);
        $("#tooltip").css("left", (window.x + 10) + "px");
        $("#tooltip").css("top", window.y + "px");
        $("#tooltip").css("visibility", "visible");
    }, function() {
        $("#tooltip").css("visibility", "hidden");
    });
    $("#bNortheast").click(function() {
        NortheastClicked();
    });
    $("#bNortheast").hover(function() {
        var destroom = GetRoom(GetDestinationRoomName("NorthEast"));
        $("#tooltip").text(destroom.Name);
        $("#tooltip").css("left", (window.x + 10) + "px");
        $("#tooltip").css("top", window.y + "px");
        $("#tooltip").css("visibility", "visible");
    }, function() {
        $("#tooltip").css("visibility", "hidden");
    });
    $("#bSouthwest").click(function() {
        SouthwestClicked();
    });
    $("#Southwest").hover(function() {
        var destroom = GetRoom(GetDestinationRoomName("SouthWest"));
        $("#tooltip").text(destroom.Name);
        $("#tooltip").css("left", (window.x + 10) + "px");
        $("#tooltip").css("top", window.y + "px");
        $("#tooltip").css("visibility", "visible");
    }, function() {
        $("#tooltip").css("visibility", "hidden");
    });
    $("#bSoutheast").click(function() {
        SoutheastClicked();
    });
    $("#bSoutheast").hover(function() {
        var destroom = GetRoom(GetDestinationRoomName("SouthEast"));
        $("#tooltip").text(destroom.Name);
        $("#tooltip").css("left", (window.x + 10) + "px");
        $("#tooltip").css("top", window.y + "px");
        $("#tooltip").css("visibility", "visible");
    }, function() {
        $("#tooltip").css("visibility", "hidden");
    });
    $("#bIn").click(function() {
        InClicked();
    });
    $("#bIn").hover(function() {
        var destroom = GetRoom(GetDestinationRoomName("In"));
        $("#tooltip").text(destroom.Name);
        $("#tooltip").css("left", (window.x + 10) + "px");
        $("#tooltip").css("top", window.y + "px");
        $("#tooltip").css("visibility", "visible");
    }, function() {
        $("#tooltip").css("visibility", "hidden");
    });
    $("#bOut").click(function() {
        OutClicked();
    });
    $("#bOut").hover(function() {
        var destroom = GetRoom(GetDestinationRoomName("Out"));
        $("#tooltip").text(destroom.Name);
        $("#tooltip").css("left", (window.x + 10) + "px");
        $("#tooltip").css("top", window.y + "px");
        $("#tooltip").css("visibility", "visible");
    }, function() {
        $("#tooltip").css("visibility", "hidden");
    });
    receivedText();
});

function GetRoom(roomName) {
    if (roomName == null) {
        return null;
    }

    roomName = roomName.trim();
    for (var i = 0; i < TheGame.Rooms.length; i++) {
        if (TheGame.Rooms[i].UniqueID == roomName) {
            return TheGame.Rooms[i];
        }
    }
    //check by name if we get here
    for (var i = 0; i < TheGame.Rooms.length; i++) {
        if (TheGame.Rooms[i].Name == roomName) {
            return TheGame.Rooms[i];
        }
    }
    return null;
}

function GetGameImage(ImageName) {
    for (var i = 0; i < TheGame.Images.length; i++) {
        if (TheGame.Images[i].TheName == ImageName) {
            return TheGame.Images[i];
        }
    }
    return null;
}

function GetDestinationRoomName(CurDirection) {
    MovingDirection = CurDirection;
    var CurrentRoom = GetRoom(TheGame.Player.CurrentRoom);
    if (CurrentRoom != null) {

        for (var i = 0; i < CurrentRoom.Exits.length; i++) {
            if (CurrentRoom.Exits[i].Direction == CurDirection) {
                return CurrentRoom.Exits[i].DestinationRoom;
                break;
            }
        }
    }
}

function CheckRoomEvents() {
    bCancelMove = false;
    var curroom = GetRoom(TheGame.Player.CurrentRoom);
    if (curroom != null) {
        if (!curroom.bLeaveFirstTime) {
            curroom.bLeaveFirstTime = true;
            RunEvents("<<On Player Leave First Time>>");
        }
        RunEvents("<<On Player Leave>>");
    }
}

function UpClicked() {
    var newroom = GetDestinationRoomName("Up");
    ResetLoopObjects();
    CheckRoomEvents();
    if (!bCancelMove)
        ChangeRoom(GetRoom(newroom), true, true);
}

function DownClicked() {

    var newroom = GetDestinationRoomName("Down");
    ResetLoopObjects();
    CheckRoomEvents();
    if (!bCancelMove)
        ChangeRoom(GetRoom(newroom), true, true);
}

function NorthClicked() {
    var newroom = GetDestinationRoomName("North");
    ResetLoopObjects();
    CheckRoomEvents();
    if (!bCancelMove)
        ChangeRoom(GetRoom(newroom), true, true);
}

function SouthClicked() {
    var newroom = GetDestinationRoomName("South");
    ResetLoopObjects();
    CheckRoomEvents();
    if (!bCancelMove)
        ChangeRoom(GetRoom(newroom), true, true);
}

function WestClicked() {
    var newroom = GetDestinationRoomName("West");
    ResetLoopObjects();
    CheckRoomEvents();
    if (!bCancelMove)
        ChangeRoom(GetRoom(newroom), true, true);
}

function EastClicked() {
    var newroom = GetDestinationRoomName("East");
    ResetLoopObjects();
    CheckRoomEvents();
    if (!bCancelMove)
        ChangeRoom(GetRoom(newroom), true, true);
}

function NorthwestClicked() {
    var newroom = GetDestinationRoomName("NorthWest");
    ResetLoopObjects();
    CheckRoomEvents();
    if (!bCancelMove)
        ChangeRoom(GetRoom(newroom), true, true);
}

function NortheastClicked() {
    var newroom = GetDestinationRoomName("NorthEast");
    ResetLoopObjects();
    CheckRoomEvents();
    if (!bCancelMove)
        ChangeRoom(GetRoom(newroom), true, true);
}

function SouthwestClicked() {
    var newroom = GetDestinationRoomName("SouthWest");
    ResetLoopObjects();
    CheckRoomEvents();
    if (!bCancelMove)
        ChangeRoom(GetRoom(newroom), true, true);
}

function SoutheastClicked() {
    var newroom = GetDestinationRoomName("SouthEast");
    ResetLoopObjects();
    CheckRoomEvents();
    if (!bCancelMove)
        ChangeRoom(GetRoom(newroom), true, true);
}

function InClicked() {
    var newroom = GetDestinationRoomName("In");
    ResetLoopObjects();
    CheckRoomEvents();
    if (!bCancelMove)
        ChangeRoom(GetRoom(newroom), true, true);
}

function OutClicked() {
    var newroom = GetDestinationRoomName("Out");
    ResetLoopObjects();
    CheckRoomEvents();
    if (!bCancelMove)
        ChangeRoom(GetRoom(newroom), true, true);
}

function ResetLoopObjects() {
    MasterLoopArray = null;
    MasterIdx = 0;
    MasterLoopObject = null;
}

function onError(tx, error) {}

function handleFileSave(bQuick, bNew, CurID) {
    var db = openDatabase(TheGame.Title, '1.0', 'Test DB', 2 * 1024 * 1024);
    var msg;
    var curindex = 1;
    if (bQuick)
        curindex = 0;
    db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS RagsSave4 (id unique, date,Title,GameData)');
    });
    db.transaction(function(tx) {
        if (bQuick) {
            tx.executeSql('SELECT * FROM RagsSave4 where id=0', [], function(tx, results) {
                var len = results.rows.length,
                    i;
                if (len == 0) {
                    var curdate = new Date();
                    tx.executeSql('INSERT INTO RagsSave4 (id, date,Title,GameData) VALUES (?, ?,?,?)', [0, curdate, TheGame.Title, JSON.stringify(TheGame)]);
                    alert("Quick Saved");
                } else {
                    var curdate = new Date();
                    tx.executeSql('update RagsSave4 set date=?,Title=?,GameData=? where id=0', [curdate, TheGame.Title, JSON.stringify(TheGame)]);
                    alert("Quick Saved");
                }
            });
        } else {
            if (bNew) {
                tx.executeSql('SELECT id FROM RagsSave4', [], function(tx, results) {
                    var len = results.rows.length,
                        i;
                    for (i = 0; i < len; i++) {
                        if (results.rows.item(i).id > curindex)
                            curindex = results.rows.item(i).id;
                    }
                    var curdate = new Date();
                    tx.executeSql('INSERT INTO RagsSave4 (id, date,Title,GameData) VALUES (?, ?,?,?)', [curindex + 1, curdate, TheGame.Title, JSON.stringify(TheGame)]);
                    alert("Game Saved");
                });
            } else {
                var curdate = new Date();
                tx.executeSql('update RagsSave4 set date=?,Title=?,GameData=? where id=' + CurID, [curdate, TheGame.Title, JSON.stringify(TheGame)]);
                alert("Game Saved");
            }
        }
    });
}

function handleFileSelect(bQuick, CurID) {
    var db = openDatabase(TheGame.Title, '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction(function(tx) {
        if (bQuick) {
            tx.executeSql("select * from RagsSave4 where id=0", [], function(tx, results) {
                TheGame = JSON.parse(results.rows.item(0).GameData);
                RoomChange(false, false);
                UpdateStatusBars();
                SetPortrait(TheGame.Player.PlayerPortrait);
                $("#playernamechoice").css("visibility", "hidden");
                $("#textactionchoice").css("visibility", "hidden");
                $("#textchoice").css("visibility", "hidden");
                $("#inputmenu").css("visibility", "hidden");
                $("#selectionmenu").css("visibility", "hidden");
                $("#genderchoice").css("visibility", "hidden");
                $("#cmdinputmenu").css("visibility", "hidden");
                $("#RoomThumb").css("visibility", "visible");
                $("#PlayerPortrait").css("visibility", "visible");

                $("#RoomThumbImg").css("visibility", "visible");
                $("#PlayerImg").css("visibility", "visible");
                $("#RoomObjectsPanel").css("visibility", "visible");
                $("#VisibleCharactersPanel").css("visibility", "visible");
                $("#InventoryPanel").css("visibility", "visible");
                SetExits();
                alert("Quick Loaded");
            });
        } else {
            tx.executeSql("select * from RagsSave4 where id=" + CurID, [], function(tx, results) {
                TheGame = JSON.parse(results.rows.item(0).GameData);
                RoomChange(false, false);
                UpdateStatusBars();
                SetPortrait(TheGame.Player.PlayerPortrait);
                $("#playernamechoice").css("visibility", "hidden");
                $("#textactionchoice").css("visibility", "hidden");
                $("#textchoice").css("visibility", "hidden");
                $("#inputmenu").css("visibility", "hidden");
                $("#selectionmenu").css("visibility", "hidden");
                $("#genderchoice").css("visibility", "hidden");
                $("#cmdinputmenu").css("visibility", "hidden");
                $("#RoomThumb").css("visibility", "visible");
                $("#PlayerPortrait").css("visibility", "visible");

                $("#RoomThumbImg").css("visibility", "visible");
                $("#PlayerImg").css("visibility", "visible");
                $("#RoomObjectsPanel").css("visibility", "visible");
                $("#VisibleCharactersPanel").css("visibility", "visible");
                $("#InventoryPanel").css("visibility", "visible");
                SetExits();
                alert("Game Loaded");
            });
        }
    });
}

function receivedText() {
    try {
        var canvas = document.getElementById("MainPic");
        var ctx = canvas.getContext("2d");
        images = new Array();
        numimages = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        TheGame = SetupGameData();
        if (TheGame.Player.bPromptForName) {
            $("#playernamechoice").css("visibility", "visible");
            $("#RoomThumb").css("visibility", "hidden");
            $("#PlayerPortrait").css("visibility", "hidden");

            $("#RoomThumbImg").css("visibility", "hidden");
            $("#PlayerImg").css("visibility", "hidden");
            $("#RoomObjectsPanel").css("visibility", "hidden");
            $("#VisibleCharactersPanel").css("visibility", "hidden");
            $("#InventoryPanel").css("visibility", "hidden");
            $(".Direction").css("visibility", "hidden");
            return;
        }
        if (TheGame.Player.bPromptForGender) {
            $("#genderchoice").css("visibility", "visible");
            $("#RoomThumb").css("visibility", "hidden");
            $("#PlayerPortrait").css("visibility", "hidden");

            $("#RoomThumbImg").css("visibility", "hidden");
            $("#PlayerImg").css("visibility", "hidden");
            $("#RoomObjectsPanel").css("visibility", "hidden");
            $("#VisibleCharactersPanel").css("visibility", "hidden");
            $("#InventoryPanel").css("visibility", "hidden");
            $(".Direction").css("visibility", "hidden");
            return;
        }
        StartGame();
    } catch (err) {
        alert("An error has occured: " + err.message);
    }
}

function StartGame() {
    var currentroom = GetRoom(TheGame.Player.StartingRoom);
    SetupStatusBars();
    RefreshInventory();
    if (currentroom != null) {
        ChangeRoom(currentroom, true, true);
    }
    AddTextToRTF(TheGame.OpeningMessage, "Black", "Regular")
    $
    /*("#MainText").append('</br>' + PerformTextReplacements(TheGame.OpeningMessage,null));
    $("#MainText").animate({
    scrollTop: $("#MainText")[0].scrollHeight
    });
    */
    SetPortrait(TheGame.Player.PlayerPortrait);
    RunEvents("<<On Game Start>>");
}

function doSomething() {
    curimage++;
    if (curimage + 1 >= TheGame.Images.length)
        curimage = 0;
    GetImage(TheGame.Images[curimage].TheName);
}

function calculateRoomThumbScale(image) {
    if (image == null)
        return;
    var curcanvas = document.getElementById("RoomThumb");
    var canvaswidth = curcanvas.offsetWidth;
    var canvasheight = curcanvas.offsetHeight;
    var imagewidth = image.width;
    var imageheight = image.height;
    var widthscale = canvaswidth / imagewidth;
    var heightscale = canvasheight / imageheight;
    if (widthscale <= heightscale)
        return widthscale;
    else
        return heightscale;
}

function calculateScale(image) {
    if (image == null)
        return;
    var curcanvas = document.getElementById("MainPic");
    var canvaswidth = curcanvas.offsetWidth;
    var canvasheight = curcanvas.offsetHeight;
    var imagewidth = image.width;
    var imageheight = image.height;
    var widthscale = canvaswidth / imagewidth;
    var heightscale = canvasheight / imageheight;
    if (widthscale <= heightscale)
        return widthscale;
    else
        return heightscale;
}

function calculatePortraitScale(image) {
    if (image == null)
        return;
    var curcanvas = document.getElementById("PlayerPortrait");
    var canvaswidth = curcanvas.offsetWidth;
    var canvasheight = curcanvas.offsetHeight - 4;
    var imagewidth = image.width;
    var imageheight = image.height;
    var widthscale = canvaswidth / imagewidth;
    var heightscale = canvasheight / imageheight;
    if (widthscale <= heightscale)
        return widthscale;
    else
        return heightscale;
}

function GetImageMimeType(lastthree) {
    if (lastthree.toUpperCase() == "JPG") {
        return "data:image/jpeg;base64,";
    } else if (lastthree.toUpperCase() == "PNG") {
        return "data:image/png;base64,";
    }
    return "";
}

function FileLoaded(theFile) {}
