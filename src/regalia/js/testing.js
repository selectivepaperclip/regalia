
var filename = "";
var images = [];
var loadedimages = 0;
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

function getDB() {
    return openDatabase(TheGame.Title, '1.0', 'Test DB', 2 * 1024 * 1024);
}

function copyDB(oldTitle) {
    var oldDb = openDatabase(oldTitle, '1.0', 'Test DB', 2 * 1024 * 1024);
    var newDb = getDB();
    oldDb.transaction(function(tx) {
        tx.executeSql("select * from RagsSave4", [], function(tx, oldDbSelectResult) {

            newDb.transaction(function(tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS RagsSave4 (id unique,SaveName,date,Title,GameData)');
                for (var i = 0; i < oldDbSelectResult.rows.length; i++) {
                    var row = oldDbSelectResult.rows[i];
                    tx.executeSql('INSERT INTO RagsSave4 (id,SaveName,date,Title,GameData) VALUES (?,?,?,?,?)', [
                        row.id,
                        row.SaveName,
                        row.date,
                        row.Title,
                        row.GameData
                    ]);
                }
            });
        });
    });
}

function hideSaveAndLoadMenus() {
    custom__showGameElements();
    $("#savemenu").css("visibility", "hidden");
    $("#loadmenu").css("visibility", "hidden");
}

$(function() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {} else {
        alert('The File APIs are not fully supported in this browser.');
    }
    $(document).keydown(function(e) {
        switch (e.keyCode) {
            case 32:
                {
                    if (gamePaused) {
                        e.preventDefault();
                        $("#Continue").click();
                    }
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
            gamePaused = false;
            custom__showGameElements();
            $("#Continue").css("background-color", "rgb(128, 128, 128)");
            $("#Continue").css('visibility', "hidden");
            RunCommands(pausecommandargs[0], pausecommandargs[1], pausecommandargs[2], pausecommandargs[3], pausecommandargs[4], pausedindex + 1);
        }
    });
    $("#PlayerPortrait").click(function(e) {
        TheObj = TheGame.Player;
        DisplayActions(TheGame.Player.Actions, e);
    });
    $("#RoomThumb").click(function(e) {
        TheObj = GetRoom(TheGame.Player.CurrentRoom);
        DisplayActions(TheObj.Actions, e);
    });
    $("#PlayerImg").click(function(e) {
        TheObj = TheGame.Player;
        DisplayActions(TheGame.Player.Actions,e );
    });
    $("#RoomThumbImg").click(function(e) {
        TheObj = GetRoom(TheGame.Player.CurrentRoom);
        DisplayActions(TheObj.Actions, e);
    });

    function setTextInputChoice () {
        selectedobj = $("#textinput").val();
        if (selectedobj != null) {
            custom__showGameElements();
            $("#textinput").val('');
            $("#textchoice").css("visibility", "hidden");
            SetCommandInput(VariableGettingSet, selectedobj);
            RunCommands(pausecommandargs[0], pausecommandargs[1], pausecommandargs[2], pausecommandargs[3], pausecommandargs[4], pausedindex + 1);
        }
    }
    $("#textbutton").click(setTextInputChoice);
    $("#textinput").on('keyup', function (e) {
        if (e.which === 13) { // return key
            setTextInputChoice();
        }
    });

    $("#playernamebutton").click(function(e) {
        AdditionalInput = "";
        $("#playernamechoice").css("visibility", "hidden");
        custom__showGameElements();
        var newname = $("#playernametext").val();
        TheGame.Player.Name = newname.trim();
        if (TheGame.Player.bPromptForGender) {
            $("#genderchoice").css("visibility", "visible");
            custom__hideGameElements();
        } else {
            StartGame();
        }
    });

    // https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
    if (!String.prototype.padStart) {
        String.prototype.padStart = function padStart(targetLength,padString) {
            targetLength = targetLength>>0; //floor if number or convert non-number to 0;
            padString = String(padString || ' ');
            if (this.length > targetLength) {
                return String(this);
            }
            else {
                targetLength = targetLength-this.length;
                if (targetLength > padString.length) {
                    padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
                }
                return padString.slice(0,targetLength) + String(this);
            }
        };
    }

    function formatDate(date) {
        var weekdays = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];
        var months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        return [
            weekdays[date.getDay()],
            months[date.getMonth()],
            date.getDate(),
            [
                date.getHours().toString().padStart(2, '0'),
                date.getMinutes().toString().padStart(2, '0'),
                date.getSeconds().toString().padStart(2, '0')
            ].join(':')
        ].join(' ');
    }

    function setElementTopleftToCursor($el, clickEvent) {
        $el.css({
            top: clickEvent.clientY,
            left: clickEvent.clientX
        });
    }

    function addSavesToTable($tbody, buttonTitle) {
        getDB().transaction(function (tx) {
            tx.executeSql('SELECT id, SaveName, date FROM RagsSave4 order by id desc', [], function (tx, results) {
                var len = results.rows.length;
                for (var i = 0; i < len; i++) {
                    var item = results.rows.item(i);
                    var $tr = $('<tr></tr>');
                    $tr.append('<td>' + item.id + '</td>');
                    $tr.append('<td>' + item.SaveName + '</td>');
                    $tr.append('<td>' + formatDate(new Date(item.date)) + '</td>');
                    $tr.append('<td><button class="btn save-or-load">' + buttonTitle + '</button></td>');
                    $tr.append('<td><button class="btn btn-danger destroy-save">Destroy</button></td>');

                    var $saveOrLoadButton = $tr.find('button.save-or-load');
                    $saveOrLoadButton.data('save-id', item.id);
                    $saveOrLoadButton.data('save-name', item.SaveName);

                    var $destroyButton = $tr.find('button.destroy-save');
                    $destroyButton.data('save-id', item.id);

                    $tbody.append($tr);
                }

                // Set visibility of things that care about there being saves
                $tbody.closest('table').toggle(len > 0);
            }, null);
        });
    }

    $("#new_savegame").on('click', function () {
        hideSaveAndLoadMenus();
        handleFileSave(false, true);
    });
    $(".destroy_savegames").on('click', function () {
        handleDestroyAllSaves();
    });
    
    var createSaveOrLoadMenuHandler = function ($menu, $menuChoices, saveOrLoadButtonText, onSelect) {
        return function (e) {
            $menu.off('click');
            $menuChoices.off('click');
            $menuChoices.empty();

            $menu.find('table').hide();
            addSavesToTable($menuChoices, saveOrLoadButtonText);

            $menu.on('click', function (e) {
                e.stopPropagation();
            });
            $menuChoices.on('click', 'button.destroy-save', function (e) {
                var saveId = $(e.currentTarget).data('save-id');
                handleDestroySave(saveId);
            });
            $menuChoices.on('click', 'button.save-or-load', function (e) {
                hideSaveAndLoadMenus();
                var saveId = $(e.currentTarget).data('save-id');
                var saveName = $(e.currentTarget).data('save-name');
                onSelect(saveId, saveName);
            });

            setElementTopleftToCursor($menu, e);
            hideSaveAndLoadMenus();
            $menu.css("visibility", "visible");

            $("body").off('click.saveloadmenubackground');
            setTimeout(function () {
                $("body").on('click.saveloadmenubackground', function() {
                    $("body").off('click.saveloadmenubackground');
                    hideSaveAndLoadMenus();
                });
            });
        };
    };
    $("#load").click(createSaveOrLoadMenuHandler($("#loadmenu"), $("#loadinputchoices"), 'Load', function (saveId) {
        handleFileSelect(false, saveId);
    }));
    $("#save").click(createSaveOrLoadMenuHandler($("#savemenu"), $("#saveinputchoices"), 'Overwrite Save', function (saveId, saveName) {
        handleFileSave(false, false, saveId, saveName);
    }));
    $("div.genderchoiceSelect").click(function() {
        selectedobj = $(this).val();
        if (selectedobj != null) {
            custom__showGameElements();
            $("#genderchoice").css("visibility", "hidden");
            StartGame();
        }
    });
    $("#inputchoices").change(function(e) {
        selectedobj = $("#inputchoices").val();
        if (selectedobj != null) {
            AdditionalData = selectedobj;
            custom__showGameElements();
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

    function setTextActionChoice() {
        selectedobj = $("#textactioninput").val();
        if (selectedobj != null) {
            $("#textactioninput").val('');
            AdditionalData = selectedobj;
            custom__showGameElements();
            $("#textactionchoice").css("visibility", "hidden");
            if (getObjectClass(InputDataObject) == "action" || "actionparent" in InputDataObject) {
                ExecuteAction(InputDataObject, bMasterTimer, selectedobj);

            }
        }
    }

    $("#textactionbutton").click(setTextActionChoice);
    $("#textactioninput").on('keyup', function (e) {
        if (e.which === 13) { // return key
            setTextActionChoice();
        }
    });
    $("#cmdinputchoices").change(function(e) {
        selectedobj = $("#cmdinputchoices").val();
        if (selectedobj != null) {
            custom__showGameElements();
            $("#cmdinputmenu").css("visibility", "hidden");
            SetCommandInput(VariableGettingSet, selectedobj);
            RunCommands(pausecommandargs[0], pausecommandargs[1], pausecommandargs[2], pausecommandargs[3], pausecommandargs[4], pausedindex + 1);
        }
    });
    $("#CancelInput").click(function () {
        $("#inputmenu").css("visibility", "hidden");
        custom__showGameElements();
        RunCommands(pausecommandargs[0], pausecommandargs[1], pausecommandargs[2], pausecommandargs[3], pausecommandargs[4], pausedindex + 1);
    });
    $("#cmdCancelInput").click(function(e) {
        AdditionalInput = "";
        $("#cmdinputmenu").css("visibility", "hidden");
        custom__showGameElements();
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
        if (!TheGame) {
            return;
        }
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

    $(".compass-direction").click(function(e) {
        var $el = $(e.target);
        if (!$el.hasClass('active')) {
            return;
        }
        var direction = $el.data('direction');
        var newRoom = GetDestinationRoomName(direction);
        ResetLoopObjects();
        bCancelMove = false;
        var curroom = GetRoom(TheGame.Player.CurrentRoom);
        if (curroom != null) {
            if (!curroom.bLeaveFirstTime) {
                curroom.bLeaveFirstTime = true;
                RunEvents("<<On Player Leave First Time>>");
            }
        }
        runAfterPause(function () {
            if (curroom != null) {
                RunEvents("<<On Player Leave>>");
            }
            runAfterPause(function () {
                if (!bCancelMove) {
                    ChangeRoom(GetRoom(newRoom), true, true);
                }
            });
        });
    });
    $(".compass-direction").hover(function(e) {
        var $el = $(e.target);
        if (!$el.hasClass('active')) {
            return;
        }
        var direction = $el.data('direction');
        var destRoom = GetRoom(GetDestinationRoomName(direction));
        $("#tooltip").text(destRoom.Name);
        $("#tooltip").css({
            "left": (window.x + 10) + "px",
            "top": window.y + "px",
            "visibility": "visible"
        });
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

function ResetLoopObjects() {
    MasterLoopArray = null;
    MasterIdx = 0;
    MasterLoopObject = null;
}

function onError(tx, error) {}

function handleFileSave(bQuick, bNew, CurID, oldSaveName) {
    var db = getDB();
    var curindex = 1;
    if (bQuick)
        curindex = 0;
    db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS RagsSave4 (id unique,SaveName,date,Title,GameData)');
    });
    db.transaction(function(tx) {
        var curdate = new Date();
        if (bQuick) {
            tx.executeSql('SELECT id FROM RagsSave4 where id=0', [], function(tx, results) {
                var len = results.rows.length;
                if (len === 0) {
                    tx.executeSql('INSERT INTO RagsSave4 (id,SaveName,date,Title,GameData) VALUES (?,?,?,?,?)', [0, 'QuickSave', curdate, TheGame.Title, JSON.stringify(TheGame)]);
                } else {
                    tx.executeSql('update RagsSave4 set SaveName=?,date=?,Title=?,GameData=? where id=0', ['QuickSave', curdate, TheGame.Title, JSON.stringify(TheGame)]);
                }
                alert("Quick Saved");
            });
        } else {
            var saveName = prompt("Give a name for the save", oldSaveName);
            if (saveName === null) {
                return;
            }

            if (bNew) {
                tx.executeSql('SELECT id FROM RagsSave4', [], function(tx, results) {
                    var len = results.rows.length;
                    for (var i = 0; i < len; i++) {
                        if (results.rows.item(i).id > curindex)
                            curindex = results.rows.item(i).id;
                    }
                    tx.executeSql('INSERT INTO RagsSave4 (id,SaveName,date,Title,GameData) VALUES (?,?,?,?,?)', [curindex + 1, saveName, curdate, TheGame.Title, JSON.stringify(TheGame)]);
                    alert("Game Saved");
                });
            } else {
                tx.executeSql('update RagsSave4 set SaveName=?,date=?,Title=?,GameData=? where id=' + CurID, [saveName, curdate, TheGame.Title, JSON.stringify(TheGame)]);
                alert("Game Saved");
            }
        }
    });
}

function handleFileSelect(bQuick, CurID) {
    getDB().transaction(function(tx) {
        var desiredId = bQuick ? 0 : CurID;
        tx.executeSql("select * from RagsSave4 where id=" + desiredId, [], function(tx, results) {
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
            custom__showGameElements();
        });
        if (bQuick) {
            alert("Quick Loaded");
        } else {
            alert("Game Loaded");
        }
    });
}

function handleDestroySave(saveId) {
    var confirmation = confirm('Are you sure?');
    if (!confirmation) {
        return;
    }
    getDB().transaction(function(tx) {
        tx.executeSql("delete from RagsSave4 where id=" + saveId, []);
        hideSaveAndLoadMenus();
    });
}

function handleDestroyAllSaves() {
    var confirmation = confirm('Are you sure?');
    if (!confirmation) {
        return;
    }
    getDB().transaction(function(tx) {
        tx.executeSql("delete from RagsSave4", []);
        hideSaveAndLoadMenus();
    });
}

function retrieveExportData(callback) {
    getDB().transaction(function(tx) {
        tx.executeSql("select * from RagsSave4", [], function (tx, results) {
            var resultArray = [];
            var len = results.rows.length;
            for (var i = 0; i < len; i++) {
                resultArray.push(results.rows.item(i));
            }
            callback(JSON.stringify(resultArray));
        });
    });
}

function receivedText() {
    try {
        var canvas = document.getElementById("MainPic");
        var ctx = canvas.getContext("2d");
        images = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        TheGame = SetupGameData();
        if (TheGame.Player.bPromptForName) {
            $("#playernamechoice").css("visibility", "visible");
            custom__hideGameElements();
            return;
        }
        if (TheGame.Player.bPromptForGender) {
            $("#genderchoice").css("visibility", "visible");
            custom__hideGameElements();
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
