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

    $('#regalia_version').text('Regalia 0.9.19');

    function toggleBigPictureMode(on) {
        if (on === undefined) {
            on = !$('body').hasClass('big-picture-mode');
        }

        if (on) {
            $('body').addClass('big-picture-mode');
            $('#shrink_ui').hide();
            $('#unshrink_ui').show();
        } else {
            $('body').removeClass('big-picture-mode');
            $('#shrink_ui').show();
            $('#unshrink_ui').hide();
        }
    }

    $("#shrink_ui").click(function () {
        toggleBigPictureMode(true);
    });
    $("#unshrink_ui").click(function () {
        toggleBigPictureMode(false);
    });

    $(document).keydown(function(e) {
        switch (e.keyCode) {
            case 32: // Space
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
            case 192: // Backtick
                {
                    toggleBigPictureMode();
                }
        }
    });
    $(document).mousemove(function(e) {
        window.x = e.pageX;
        window.y = e.pageY;
    });
    $("#Continue").click(function(e) {
        ActionRecorder.clickedContinue();
        var bgcolor = $("#Continue").css('background-color');
        if (bgcolor == "rgb(128, 128, 128)") {} else {
            GameController.continue();
            $("#Continue").css("background-color", "rgb(128, 128, 128)");
            $("#Continue").css('visibility', "hidden");
            GameCommands.runCommands();
        }
    });
    $("#PlayerImg").click(function(e) {
        Globals.theObj = TheGame.Player;
        GameUI.displayActions(TheGame.Player, e);
    });
    $("#RoomThumbImg").click(function(e) {
        Globals.theObj = Finder.room(TheGame.Player.CurrentRoom);
        GameUI.displayActions(Globals.theObj, e);
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
            GameCommands.runCommands();
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
            CommandLists.setAdditionalData(Globals.selectedObj);
            GameController.stopAwaitingInput();
            $("#textactionchoice").css("visibility", "hidden");
            if (getObjectClass(Globals.inputDataObject) == "action" || "actionparent" in Globals.inputDataObject) {
                GameActions.executeAction(Globals.inputDataObject, Globals.bMasterTimer);
            }
        }
    }

    $("#textactionbutton").click(setTextActionChoice);
    onKeyupEnter('#textactioninput', setTextActionChoice);

    $("#CancelInput").click(function () {
        $("#inputmenu").css("visibility", "hidden");
        GameController.stopAwaitingInput();
        GameCommands.runCommands();
    });
    $("#cmdCancelInput").click(function(e) {
        $("#cmdinputmenu").css("visibility", "hidden");
        GameController.stopAwaitingInput();
        GameCommands.runCommands();
    });
    $("#selectionmenu").focusout(function() {
        $("#selectionmenu").css("visibility", "hidden");
    });

    GameTimers.scheduleLiveTimers(window.location.href.match(/speedy_timers/) ? 50 : 1000);

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
        var curroom = Finder.room(TheGame.Player.CurrentRoom);

        if (curroom != null && !curroom.bLeaveFirstTime) {
            curroom.bLeaveFirstTime = true;
            GameActions.runEvents("<<On Player Leave First Time>>", afterFirstPlayerLeaveEvent);
        } else {
            afterFirstPlayerLeaveEvent();
        }

        function afterFirstPlayerLeaveEvent () {
            runAfterPause(function () {
                if (curroom != null) {
                    GameActions.runEvents("<<On Player Leave>>", afterPlayerLeaveEvent);
                } else {
                    afterPlayerLeaveEvent();
                }

                function afterPlayerLeaveEvent () {
                    runAfterPause(function () {
                        if (!Globals.bCancelMove) {
                            ChangeRoom(Finder.room(newRoom), true, true);
                        }
                    });
                }
            });
        }
    });
    $(".compass-direction").hover(function(e) {
        var $el = $(e.target);
        if (!$el.hasClass('active')) {
            return;
        }
        var direction = $el.data('direction');
        var destRoom = Finder.room(GetDestinationRoomName(direction));
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
    var CurrentRoom = Finder.room(TheGame.Player.CurrentRoom);
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
    GameUI.setGameTitle();
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
        GameUI.setGameTitle();
        GameUI.setDefaultCompass();
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
    var currentroom = Finder.room(TheGame.Player.StartingRoom);
    SetupStatusBars();
    GameUI.refreshInventory();
    AddTextToRTF(TheGame.OpeningMessage, "Black", "Regular");
    if (currentroom != null) {
        ChangeRoom(currentroom, true, true);
    }
    SetPortrait(TheGame.Player.PlayerPortrait);
    GameActions.runEvents("<<On Game Start>>", function () {}); // TODO
}

function GetImageMimeType(lastthree) {
    if (lastthree.toUpperCase() == "JPG") {
        return "data:image/jpeg;base64,";
    } else if (lastthree.toUpperCase() == "PNG") {
        return "data:image/png;base64,";
    }
    return "";
}
