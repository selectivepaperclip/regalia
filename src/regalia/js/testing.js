function roomDisplayName(room) {
    return room.SDesc || room.Name;
}

function hideSaveAndLoadMenus() {
    GameUI.showGameElements();
    $(".save-menu").addClass("hidden");
    $(".load-menu").addClass("hidden");
}

$(function() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {} else {
        alert('The File APIs are not fully supported in this browser.');
    }

    $('#regalia_version').text('Regalia 0.4');

    $(document).keydown(function(e) {
        switch (e.keyCode) {
            case 32:
                {
                    if (GameController.gamePaused) {
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
            GameController.executeAndRunTimers(function () {
                $("#MainText").append('</br><b>' + selectionchoice + "</b>");
                $("#MainText").animate({
                    scrollTop: $("#MainText")[0].scrollHeight
                });
                $("#selectionmenu").css("visibility", "hidden");
                ResetLoopObjects();
                ProcessAction(selectionchoice);
            });
        }
    });
    $("#Continue").click(function(e) {
        ActionRecorder.clickedContinue();
        var bgcolor = $("#Continue").css('background-color');
        if (bgcolor == "rgb(128, 128, 128)") {} else {
            GameController.continue();
            $("#Continue").css("background-color", "rgb(128, 128, 128)");
            $("#Continue").css('visibility', "hidden");
            RunCommands.apply(null, Globals.pauseCommandArgs);
        }
    });
    $("#PlayerImg").click(function(e) {
        Globals.theObj = TheGame.Player;
        DisplayActions(TheGame.Player.Actions, e, 'self');
    });
    $("#RoomThumbImg").click(function(e) {
        Globals.theObj = GetRoom(TheGame.Player.CurrentRoom);
        DisplayActions(Globals.theObj.Actions, e, 'room');
    });

    function onKeyupEnter(selector, fn) {
        $(selector).on('keyup', function (e) {
            if (e.which === 13) { // return key
                fn();
            }
        });
    }

    function setTextInputChoice () {
        Globals.selectedObj = $("#textinput").val();
        if (Globals.selectedObj != null) {
            GameController.stopAwaitingInput();
            $("#textinput").val('');
            $("#textchoice").css("visibility", "hidden");
            ActionRecorder.filledInTextInput(Globals.selectedObj);
            SetCommandInput(Globals.variableGettingSet, Globals.selectedObj);
            RunCommands.apply(null, Globals.pauseCommandArgs);
        }
    }
    $("#textbutton").click(setTextInputChoice);
    onKeyupEnter('#textinput', setTextInputChoice);

    function setPlayerNameChoice () {
        $("#playernamechoice").css("visibility", "hidden");
        GameController.stopAwaitingInput();
        var newname = $("#playernametext").val();
        TheGame.Player.Name = newname.trim();
        if (TheGame.Player.bPromptForGender) {
            $("#genderchoice").css("visibility", "visible");
            GameUI.hideGameElements();
        } else {
            StartGame();
        }
    }
    $("#playernamebutton").click(setPlayerNameChoice);
    onKeyupEnter('#playernametext', setPlayerNameChoice);

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
        var savedGames = SavedGames.getSortedSaves();
        savedGames.forEach(function (savedGame) {
            var $tr = $('<tr></tr>');
            $tr.append('<td>' + savedGame.id + '</td>');
            $tr.append('<td>' + savedGame.name + '</td>');
            $tr.append('<td>' + formatDate(new Date(savedGame.date)) + '</td>');
            $tr.append('<td><button class="btn save-or-load">' + buttonTitle + '</button></td>');
            $tr.append('<td><button class="btn btn-danger destroy-save">Destroy</button></td>');

            var $saveOrLoadButton = $tr.find('button.save-or-load');
            $saveOrLoadButton.data('save-id', savedGame.id);
            $saveOrLoadButton.data('save-name', savedGame.name);

            var $destroyButton = $tr.find('button.destroy-save');
            $destroyButton.data('save-id', savedGame.id);

            $tbody.append($tr);
        });


        // Set visibility of things that care about there being saves
        $tbody.closest('table').toggle(savedGames.length > 0);
    }

    $("#new_savegame").on('click', function () {
        hideSaveAndLoadMenus();
        handleFileSave(false, true);
    });
    $(".destroy_savegames").on('click', function () {
        handleDestroyAllSaves();
    });

    $(".export_savegames").on('click', function () {
        $('.export-menu').removeClass('hidden');
        $('.export-menu, .export-menu-actions button, .export-menu-content').off();

        $('.export-menu, .export-menu-actions button').click(function (e) {
            $('.export-menu').addClass('hidden');
        });

        $('.export-menu-content').click(function (e) {
            e.stopPropagation();
        });

        const downloadLink = $('.export-download-link')[0];
        $(downloadLink).prop('disabled', true);
        $(downloadLink).text('Loading...');
        var filename = SavedGames.titleForSave() + '-saves.json';
        var exportData = retrieveExportData();

        const csvAsBlob = new Blob([exportData], {type: 'text/plain'});
        $(downloadLink).prop('disabled', false);
        $(downloadLink).text('EXPORT');
        downloadLink.download = filename;
        downloadLink.href = window.URL.createObjectURL(csvAsBlob);
        downloadLink.target = "_blank";
    });

    $(".import_savegames").on('click', function () {
        $('.import-menu').removeClass('hidden');
        $('.import-menu, .import-menu-actions button, .import-menu-content, .import-menu-content input').off();
        $('.import-menu-content input[type=file]').val('');

        $('.import-menu, .import-menu-actions button').click(function (e) {
            $('.import-menu').addClass('hidden');
        });

        $('.import-menu-content').click(function (e) {
            e.stopPropagation();
        });

        $('.import-menu-content input[type=file]').change(function (e) {
            var reader = new FileReader();
            reader.onload = function() {
                SavedGames.import(JSON.parse(this.result));
                $('.import-menu').addClass('hidden');
                hideSaveAndLoadMenus();
            };
            reader.readAsText(this.files[0]);
        });
    });
    
    var createSaveOrLoadMenuHandler = function ($backdrop, $menu, saveOrLoadButtonText, onSelect) {
        return function (e) {
            $menu.off('click');

            var $menuChoices = $menu.find('.save-load-table-body');
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
            $backdrop.removeClass("hidden");

            $backdrop.off('click.saveloadmenubackground');
            setTimeout(function () {
                $backdrop.on('click.saveloadmenubackground', function() {
                    $backdrop.off('click.saveloadmenubackground');
                    hideSaveAndLoadMenus();
                });
            });
        };
    };
    $("#load").click(createSaveOrLoadMenuHandler($('.load-menu'), $(".load-menu-content"), 'Load', function (saveId) {
        handleFileSelect(false, saveId);
    }));
    $("#save").click(createSaveOrLoadMenuHandler($(".save-menu"), $('.save-menu-content'), 'Overwrite Save', function (saveId, saveName) {
        handleFileSave(false, false, saveId, saveName);
    }));
    $("div.genderchoiceSelect").click(function() {
        Globals.selectedObj = $(this).val();
        if (Globals.selectedObj != null) {
            GameController.stopAwaitingInput();
            $("#genderchoice").css("visibility", "hidden");
            StartGame();
        }
    });

    function setTextActionChoice() {
        Globals.selectedObj = $("#textactioninput").val();
        if (Globals.selectedObj != null) {
            $("#textactioninput").val('');
            Globals.additionalData = Globals.selectedObj;
            GameController.stopAwaitingInput();
            $("#textactionchoice").css("visibility", "hidden");
            if (getObjectClass(Globals.inputDataObject) == "action" || "actionparent" in Globals.inputDataObject) {
                ExecuteAction(Globals.inputDataObject, Globals.bMasterTimer, Globals.selectedObj);
            }
        }
    }

    $("#textactionbutton").click(setTextActionChoice);
    onKeyupEnter('#textactioninput', setTextActionChoice);

    $("#cmdinputchoices").change(function(e) {
        Globals.selectedObj = $("#cmdinputchoices").val();
        if (Globals.selectedObj != null) {
            GameController.stopAwaitingInput();
            $("#cmdinputmenu").css("visibility", "hidden");
            ActionRecorder.choseInputAction(Value);
            SetCommandInput(Globals.variableGettingSet, Globals.selectedObj);
            RunCommands.apply(null, Globals.pauseCommandArgs);
        }
    });
    $("#CancelInput").click(function () {
        $("#inputmenu").css("visibility", "hidden");
        GameController.stopAwaitingInput();
        RunCommands.apply(null, Globals.pauseCommandArgs);
    });
    $("#cmdCancelInput").click(function(e) {
        $("#cmdinputmenu").css("visibility", "hidden");
        GameController.stopAwaitingInput();
        RunCommands.apply(null, Globals.pauseCommandArgs);
    });
    $("#Inventory").change(function(e) {
        Globals.selectedObj = GetObject($("#Inventory").val());
        if (Globals.selectedObj != null) {
            Globals.theObj = Globals.selectedObj;
            $("#Inventory").val([]);
            DisplayActions(Globals.selectedObj.Actions);
        }
    });
    $("#VisibleCharacters").change(function(e) {
        Globals.selectedObj = GetCharacter($("#VisibleCharacters").val());
        if (Globals.selectedObj != null) {
            Globals.theObj = Globals.selectedObj;
            $("#VisibleCharacters").val([]);
            DisplayActions(Globals.selectedObj.Actions);
        }
    });
    $("#selectionmenu").focusout(function() {
        $("#selectionmenu").css("visibility", "hidden");
    });
    $("#RoomObjects").change(function(e) {
        Globals.selectedObj = GetObject($("#RoomObjects").val());
        if (Globals.selectedObj != null) {
            Globals.theObj = Globals.selectedObj;
            $("#RoomObjects").val([]);
            DisplayActions(Globals.selectedObj.Actions);
        }
    });
    setInterval(function() {
        if (!TheGame) {
            return;
        }
        for (var i = 0; i < TheGame.Timers.length; i++) {
            var curtimer = TheGame.Timers[i];
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
    }, window.location.href.match(/speedy_timers/) ? 50 : 1000);

    $(".compass-direction").click(function(e) {
        var $el = $(e.target);
        if (!$el.hasClass('active')) {
            return;
        }
        var direction = $el.data('direction');
        var newRoom = GetDestinationRoomName(direction);
        ResetLoopObjects();
        Globals.bCancelMove = false;
        ActionRecorder.locationChange(direction);
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
                if (!Globals.bCancelMove) {
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
        $("#tooltip").text(roomDisplayName(destRoom));
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

    var containsDash = roomName.indexOf('-') != -1;
    //check by name if we get here
    for (var j = 0; j < TheGame.Rooms.length; j++) {
        var room = TheGame.Rooms[j];
        if (room.Name == roomName) {
            return TheGame.Rooms[j];
        }

        // Though it usually produces a UniqueID, sometimes
        // when you manually edit a field in the Rags designer
        // (instead of selecting from a dropdown) the value
        // for a room (in e.x. CT_MOVEPLAYER) will be the
        // room name or `%{name}-%{sdesc}`. So we need to check for that.
        if (containsDash && room.SDesc) {
            var joinedName = [room.Name, room.SDesc].join('-');
            if (joinedName == roomName) {
                return room;
            }
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
    Globals.movingDirection = CurDirection;
    var CurrentRoom = GetRoom(TheGame.Player.CurrentRoom);
    if (CurrentRoom != null) {
        for (var i = 0; i < CurrentRoom.Exits.length; i++) {
            if (CurrentRoom.Exits[i].Direction == CurDirection) {
                return CurrentRoom.Exits[i].DestinationRoom;
            }
        }
    }
}
function onError(tx, error) {}

function handleFileSave(bQuick, bNew, CurID, oldSaveName) {
    var curdate = new Date();
    if (bQuick) {
        SavedGames.createSave(0, 'QuickSave', curdate, SavedGames.saveDataFor(TheGame));
        alert("Quick Saved");
    } else {
        var saveName = prompt("Give a name for the save", oldSaveName);
        if (saveName === null) {
            return;
        }

        SavedGames.createSave(bNew ? SavedGames.nextSaveId() : CurID, saveName, curdate, SavedGames.saveDataFor(TheGame));
        alert("Game Saved");
    }
}

function handleFileSelect(bQuick, CurID) {
    var desiredId = bQuick ? 0 : CurID;
    var savedGame = SavedGames.getSave(desiredId);

    TheGame = SetupGameData();
    SavedGames.applySaveToGame(TheGame, savedGame);
    if (savedGame.cheatFreezes) {
        window.cheatFreezes = savedGame.cheatFreezes;
    }
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
    GameUI.showGameElements();

    if (bQuick) {
        alert("Quick Loaded");
    } else {
        alert("Game Loaded");
    }
}

function handleDestroySave(saveId) {
    var confirmation = confirm('Are you sure?');
    if (!confirmation) {
        return;
    }
    SavedGames.destroySave(saveId);
    hideSaveAndLoadMenus();
}

function handleDestroyAllSaves() {
    var confirmation = confirm('Are you sure?');
    if (!confirmation) {
        return;
    }
    SavedGames.reset();
    hideSaveAndLoadMenus();
}

function retrieveExportData() {
    var resultArray = [];
    SavedGames.getSortedSaves().forEach(function (savedGame) {
        resultArray.push(SavedGames.getSave(savedGame.id));
    });
    return JSON.stringify(resultArray);
}

function receivedText() {
    try {
        OriginalGame = SetupGameData();
        TheGame = SetupGameData();
        if (TheGame.Player.bPromptForName) {
            $("#playernamechoice").css("visibility", "visible");
            GameUI.hideGameElements();
            return;
        }
        if (TheGame.Player.bPromptForGender) {
            $("#genderchoice").css("visibility", "visible");
            GameUI.hideGameElements();
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
    AddTextToRTF(TheGame.OpeningMessage, "Black", "Regular");
    if (currentroom != null) {
        ChangeRoom(currentroom, true, true);
    }
    SetPortrait(TheGame.Player.PlayerPortrait);
    RunEvents("<<On Game Start>>");
}

function GetImageMimeType(lastthree) {
    if (lastthree.toUpperCase() == "JPG") {
        return "data:image/jpeg;base64,";
    } else if (lastthree.toUpperCase() == "PNG") {
        return "data:image/png;base64,";
    }
    return "";
}
