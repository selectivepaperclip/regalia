var Interactables = {
    inventoryObjects: function () {
        return TheGame.Objects.filter(function (obj) {
            return obj.locationtype == "LT_PLAYER";
        });
    },
    visibleInventoryObjects: function () {
        return this.inventoryObjects().filter(function (obj) {
            return obj.bVisible;
        });
    },
    roomObjects: function () {
        return TheGame.Objects.filter(function (obj) {
            return obj.locationtype == "LT_ROOM" && obj.locationname == TheGame.Player.CurrentRoom;
        });
    },
    visibleRoomObjects: function () {
        return this.roomObjects().filter(function (obj) {
            return obj.bVisible;
        });
    },
    roomAndInventoryObjects: function () {
        return TheGame.Objects.filter(function (obj) {
            return (obj.locationtype == "LT_PLAYER") || (obj.locationtype == "LT_ROOM" && obj.locationname == TheGame.Player.CurrentRoom);
        });
    },
    characters: function () {
        return TheGame.Characters.filter(function (obj) {
            return obj.CurrentRoom == TheGame.Player.CurrentRoom;
        });
    }
};

function setAdditionalInputData(command, addinputdata) {
    command.AdditionalInputData = addinputdata || undefined;
}

function AddToMaster(commands, addinputdata, act) {
    for (var i = 0; i < commands.length; i++) {
        setAdditionalInputData(commands[i]);
        CommandLists.addToEnd({
            parentAction: act,
            timerInvocation: Globals.timerInvocation,
            payload: commands[i]
        });
    }
}

function InsertToMaster(commands, addinputdata, act) {
    for (var i = commands.length - 1; i >= 0; i--) {
        setAdditionalInputData(commands[i]);
        CommandLists.addToFront({
            parentAction: act,
            timerInvocation: Globals.timerInvocation,
            payload: commands[i]
        });
    }
}

function escapeQuotedTags(str) {
    var insideQuote = false;
    var result = [];
    var quoteContent = [];
    for (var i = 0; i < str.length; i++) {
        var thisChr = str[i];
        var prevChr = str[i-1];
        if (insideQuote) {
            quoteContent.push(thisChr);
            if (thisChr === "\n") {
                quoteContent[quoteContent.length - 1] = "&lt;br&gt;"
            } else if (thisChr === '"' && prevChr != "\\") {
                result = result.concat(
                    quoteContent
                        .join('')
                        .replace(new RegExp(/<\s*\/br\s*>/, "g"), "&lt;br&gt;")
                        .replace(new RegExp(/<\s*br\s*>/, "g"), "&lt;br&gt;")
                        .split('')
                );
                insideQuote = false;
                quoteContent = [];
            }
        } else if (thisChr === '"' && prevChr != "\\") {
            insideQuote = true;
            quoteContent = [thisChr];
        } else {
            result.push(thisChr);
        }
    }
    return result.join('');
}

function evalJankyJavascript(str) {
    var escapedStr = escapeQuotedTags(str)
        .replace(new RegExp("//.*?<\s*/?\s*br\s*>", "g"), "") // line comments ending in <br>
        .replace(new RegExp("</br>", "g"), "")
        .replace(new RegExp("<br>", "g"), "")
        .replace(new RegExp("&lt;br&gt;", "g"), "<br>")
        .replace(new RegExp("\n", "g"), "");
    return eval(escapedStr);
}

function SetBorders() {
    if (GetActionCount(GetRoom(TheGame.Player.CurrentRoom).Actions) > 0) {
        //set green border on room thumb
        $("#RoomThumbImg").addClass('has-actions');
    } else {
        $("#RoomThumbImg").removeClass('has-actions');
    }
    if (GetActionCount(TheGame.Player.Actions) > 0) {
        $("#PlayerImg").addClass("has-actions");
    } else {
        $("#PlayerImg").removeClass("has-actions");
    }
}

function GetActionCount(Actions) {
    //Globals.curActions = Actions;
    var count = 0;
    for (var i = 0; i < Actions.length; i++) {
        if (actionShouldBeVisible(Actions[i])) {
            count++;
        }
    }
    return count;
}

var imageUrls = {};
function imageUrl(imageName) {
    if (imageUrls[imageName]) {
        return imageUrls[imageName];
    }
    // In case the filesystem is very case-sensitive,
    // search for the image with this name in the list
    // of images so we can be sure to use the right case
    var lowerCaseImageName = imageName.toLowerCase();
    var gameImage = TheGame.Images.find(function (image) {
        return image.TheName.toLowerCase() === lowerCaseImageName;
    });
    if (!gameImage) {
        console.log("Unable to find any image named '" + imageName + "'");
        return '';
    }
    imageUrls[imageName] = "url('images/" + gameImage.TheName.replace(/'/g, '\\\'') + "')";
    return imageUrls[imageName];
}

function SetRoomThumb(ImageName) {
    if (ImageName == null || ImageName == "None")
        return;

    $("#RoomImageLayers").empty();

    $("#RoomThumbImg").css("background-image", imageUrl(ImageName));

    var checkimg = GetGameImage(ImageName);
    if (checkimg != null) {
        //layers?
        if (checkimg.LayeredImages[0] != "") {
            var thelayers = checkimg.LayeredImages[0].split(",");
            for (var i = 0; i < thelayers.length; i++) {
                var img = $('<div class="RoomLayeredImage">');
                img.css('background-image', imageUrl(thelayers[i]));
                img.click(function(clickEvent) {
                    Globals.theObj = GetRoom(TheGame.Player.CurrentRoom);
                    DisplayActions(Globals.theObj.Actions, clickEvent, 'room');
                });
                img.appendTo('#RoomImageLayers');
            }
        }
    }
}

var mainImageExtraLayers = [];
function showImage(ImageName) {
    if (ImageName == null || ImageName == "None")
        return;
    Globals.currentImage = ImageName;
    mainImageExtraLayers = [];
    renderMainImageAndLayers();
}

function renderMainImageAndLayers() {
    $("#MainImageLayers").empty();

    var layers = [];
    var checkimg = GetGameImage(Globals.currentImage);
    if (checkimg != null) {
        if (checkimg.LayeredImages[0] != "") {
            layers = layers.concat(checkimg.LayeredImages[0].split(","));
        }
    }
    layers = layers.concat(mainImageExtraLayers);

    ImageRecorder.sawImage(Globals.currentImage);
    $("#MainImg").css("background-image", imageUrl(Globals.currentImage));

    for (var i = 0; i < layers.length; i++) {
        ImageRecorder.sawImage(layers[i]);
        var img = $('<div class="MainLayeredImage"></div>');
        img.css('background-image', imageUrl(layers[i]));
        img.appendTo('#MainImageLayers');
    }
}

function SetPortrait(ImageName) {
    if (ImageName == null || ImageName == "")
        return;
    $("#PortraitImageLayers").empty();

    $("#PlayerImg").css("background-image", imageUrl(ImageName));

    var checkimg = GetGameImage(ImageName);
    if (checkimg != null) {
        //layers?
        if (checkimg.LayeredImages[0] != "") {
            var layers = checkimg.LayeredImages[0].split(",");
            for (var i = 0; i < layers.length; i++) {
                var img = $('<div class="PortraitLayeredImage">');
                img.css('background-image', imageUrl(layers[i]));
                img.click(function(clickEvent) {
                    Globals.theObj = TheGame.Player;
                    DisplayActions(TheGame.Player.Actions, clickEvent, 'self');
                });
                img.appendTo('#PortraitImageLayers');
            }
        }
    }
}

function SetupStatusBars() {
    var visibleItemTexts = TheGame.StatusBarItems.filter(function (item) {
        return item.bVisible;
    }).map(function (item) {
        return item.Text;
    });
    var statbar = PerformTextReplacements(visibleItemTexts.join(' | '), null);
    $("#statusbartext").empty().append(statbar);
}

function RefreshInventory() {
    $("#Inventory").empty();
    Interactables.visibleInventoryObjects().forEach(function (obj) {
        var $div = $("<div>", {
            class: "RoomObjects",
            text: objecttostring(obj),
            value: obj.UniqueIdentifier
        });
        $div.toggleClass('no-actions', GetActionCount(obj.Actions) === 0);

        $div.click(function(clickEvent) {
            Globals.selectedObj = GetObject($(this).val());
            if (Globals.selectedObj != null) {
                Globals.theObj = Globals.selectedObj;
                DisplayActions(Globals.selectedObj.Actions, clickEvent);
            }
        });
        $("#Inventory").append($div);
        if (obj.bContainer) {
            if (!obj.bOpenable || obj.bOpen) {
                AddOpenedObjects(obj, $("#Inventory"), 'RoomObjects');
            }
        }
    });
}

function RefreshRoomObjects() {
    $("#RoomObjects").empty();
    Interactables.visibleRoomObjects().forEach(function (obj) {
        var $div = $("<div>", {
            class: "RoomObjects",
            text: objecttostring(obj),
            value: obj.UniqueIdentifier
        });
        $div.toggleClass('no-actions', GetActionCount(obj.Actions) === 0);

        $div.click(function(clickEvent) {
            Globals.selectedObj = GetObject($(this).val());
            if (Globals.selectedObj != null) {
                Globals.theObj = Globals.selectedObj;
                DisplayActions(Globals.selectedObj.Actions, clickEvent);
            }
        });
        $("#RoomObjects").append($div);
        if (obj.bContainer) {
            if (!obj.bOpenable || obj.bOpen) {
                AddOpenedObjects(obj, $("#RoomObjects"), 'RoomObjects');
            }
        }
    });
    if (TheGame.Player.CurrentRoom != null) {
        var currentroom = GetRoom(TheGame.Player.CurrentRoom);
        if (currentroom != null) {
            for (var j = 0; j < currentroom.Exits.length; j++) {
                var tempexit = currentroom.Exits[j];
                if (tempexit.PortalObjectName != "<None>") {
                    var tempobj = GetObject(tempexit.PortalObjectName);
                    if (tempobj != null) {
                        if (tempobj.bVisible) {
                            var $div = $("<div>", {
                                class: "RoomObjects",
                                text: objecttostring(tempobj),
                                value: tempobj.UniqueIdentifier
                            });
                            $div.toggleClass('no-actions', GetActionCount(tempobj.Actions) === 0);

                            $div.click(function(clickEvent) {
                                Globals.selectedObj = GetObject($(this).val());
                                if (Globals.selectedObj != null) {
                                    Globals.theObj = Globals.selectedObj;
                                    DisplayActions(Globals.selectedObj.Actions, clickEvent);
                                }
                            });
                            $("#RoomObjects").append($div);
                            if (tempobj.bContainer) {
                                if (!tempobj.bOpenable || tempobj.bOpen) {
                                    AddOpenedObjects(tempobj, $("#RoomObjects"), 'RoomObjects');
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function GetAction(actions, name) {
    name = name.trim();
    return actions.find(function (action) {
        return action.name.trim().toLowerCase() === name.toLowerCase();
    });
}

function GetTimer(timerName) {
    timerName = timerName.trim();
    return TheGame.Timers.find(function (timer) {
        return timer.Name.trim() === timerName;
    });
}

function GetVariable(variableName) {
    variableName = variableName.trim();
    if (variableName.indexOf("(") > -1) {
        variableName = variableName.substring(0, variableName.indexOf("("));
    }
    return TheGame.Variables.find(function (variable) {
        return variable.varname.trim().toLowerCase() === variableName.toLowerCase();
    });
}

function objectContainsObject(container, object) {
    return (object.locationtype === "LT_IN_OBJECT") && (object.locationname === container.UniqueIdentifier) && (object.bVisible);
}

function characterHasObject(character, object) {
    return (object.locationtype === "LT_CHARACTER") && (object.locationname === character.Charname) && (object.bVisible);
}

function AddOpenedObjects(outerObject, thelistbox, itemclass) {
    TheGame.Objects.forEach(function (innerObject) {
        if (
            (objectContainsObject(outerObject, innerObject)) ||
            ((outerObject.constructor.name === "character") && characterHasObject(outerObject, innerObject))
        ) {
            var $div = $("<div>", {
                class: itemclass,
                text: "--" + objecttostring(innerObject),
                value: innerObject.UniqueIdentifier
            });
            $div.toggleClass('no-actions', GetActionCount(innerObject.Actions) === 0);

            $div.click(function(clickEvent) {
                Globals.selectedObj = GetObject($(this).val());
                if (Globals.selectedObj != null) {
                    Globals.theObj = Globals.selectedObj;
                    DisplayActions(Globals.selectedObj.Actions, clickEvent);
                }
            });

            thelistbox.append($div);
            if (innerObject.bOpenable && innerObject.bOpen) {
                AddOpenedObjects(innerObject, thelistbox, itemclass);
            }
        }
    });
}

function RefreshCharacters() {
    $("#VisibleCharacters").empty();
    Interactables.characters().forEach(function (obj) {
        var $div = $("<div>", {
            class: "VisibleCharacters",
            text: CharToString(obj),
            value: obj.Charname
        });
        $div.toggleClass('no-actions', GetActionCount(obj.Actions) === 0);

        $div.click(function(clickEvent) {
            Globals.selectedObj = GetCharacter($(this).val());
            if (Globals.selectedObj != null) {
                Globals.theObj = Globals.selectedObj;
                DisplayActions(Globals.selectedObj.Actions, clickEvent);
            }
        });

        $("#VisibleCharacters").append($div);
        if (obj.bAllowInventoryInteraction) {
            AddOpenedObjects(obj, $("#VisibleCharacters"), 'VisibleCharacters');
        }
    });
}

function GetObject(uidOrName) {
    if (!uidOrName) {
        return null;
    }
    uidOrName = uidOrName.trim();

    for (var i = 0; i < TheGame.Objects.length; i++) {
        if (TheGame.Objects[i].UniqueIdentifier === uidOrName) {
            return TheGame.Objects[i];
        }
    }
    for (var j = 0; j < TheGame.Objects.length; j++) {
        if (TheGame.Objects[j].name && TheGame.Objects[j].name.toLowerCase() === uidOrName.toLowerCase()) {
            return TheGame.Objects[j];
        }
    }
}

function GetCharacter(characterName) {
    if (characterName == null) {
        return null;
    }

    characterName = characterName.trim();
    for (var i = 0; i < TheGame.Characters.length; i++) {
        if (TheGame.Characters[i].Charname.toLowerCase() == characterName.toLowerCase()) {
            return TheGame.Characters[i];
        }
    }
}

function AddChildAction(Actions, Indent, ActionName, actionRecipientToLog) {
    for (var i = 0; i < Actions.length; i++) {
        if (Actions[i].name.substring(0, 2) != "<<" && Actions[i].bActive && Actions[i].actionparent == ActionName) {
            var $div = $("<div>", {
                class: "ActionChoices",
                text: Indent + Actions[i].name,
                value: Actions[i].name
            });

            $div.click(function() {
                var selectionchoice = $(this).val();
                if (selectionchoice != null) {
                    GameController.executeAndRunTimers(function () {
                        logSelectedAction(actionRecipientToLog, selectionchoice);
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

            $("#Actionchoices").append($div);

            /* var newopt = new Option(Indent + Actions[i].name, Actions[i].name);
            
            newopt.Action = Actions[i];
            $("#Actionchoices").append(newopt);*/
            AddChildAction(Actions, "--" + Indent, Actions[i].name, actionRecipientToLog);
        }
    }
}

function nameForAction(action) {
    if (action.overridename) {
        return PerformTextReplacements(action.overridename);
    } else {
        return action.name;
    }
}

function actionShouldBeVisible(action) {
    return action.name.substring(0, 2) !== "<<" && action.bActive && action.actionparent === "None";
}

function logSelectedAction(actionRecipientToLog, selectiontext) {
    if (actionRecipientToLog == 'self') {
        ActionRecorder.actedOnSelf(selectiontext);
    } else if (actionRecipientToLog == 'room') {
        ActionRecorder.actedOnRoom(selectiontext);
    } else {
        ActionRecorder.actedOnObject(Globals.selectedObj, selectiontext);
    }
}

function DisplayActions(Actions, clickEvent, actionRecipientToLog) {
    if (GetActionCount(Actions) === 0) {
        return;
    }

    $("#Actionchoices").empty();
    Globals.curActions = Actions;
    for (var i = 0; i < Actions.length; i++) {
        if (actionShouldBeVisible(Actions[i])) {
            var $div = $("<div>", {
                class: "ActionChoices",
                text: nameForAction(Actions[i]),
                value: Actions[i].name
            });

            $div.click(function(e) {
                var selectionchoice = $(this).val();
                var selectiontext = $(this).text();
                if (selectionchoice != null) {
                    GameController.executeAndRunTimers(function () {
                        logSelectedAction(actionRecipientToLog, selectiontext);
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

            $("#Actionchoices").append($div);
            AddChildAction(Actions, "--", Actions[i].name, actionRecipientToLog);
        }
    }

    $("#selectionmenu").click(function (e) {
      e.stopPropagation();
    });

    $('body').off('click.selectionmenu');
    setTimeout(function () {
        $('body').on('click.selectionmenu', function (e) {
            $("#selectionmenu").css("visibility", "hidden");
        });
    });

    var leftposition, topposition;
    if (clickEvent) {
        leftposition = clickEvent.clientX;
        topposition = clickEvent.clientY;
    } else {
        topposition = window.y - 50;
        leftposition = window.x;
        if (window.x + $("#selectionmenu").width() > $(window).width())
            leftposition = $(window).width() - $("#selectionmenu").width();
    }

    $("#selectionmenu").css("top", topposition + "px");
    $("#selectionmenu").css("left", leftposition + "px");
    $("#selectionmenu").css("visibility", "visible");
    $("#Actionchoices").focus();
}

function ProcessAction(Action, bTimer) {
    var act = null;
    Globals.bMasterTimer = bTimer;

    if (getObjectClass(Action) == "action" || Action.actionparent != null) //"actionparent" in Action)
        act = Action;
    else {
        for (var i = 0; i < Globals.curActions.length; i++) {
            if (Globals.curActions[i].name == Action) {
                act = Globals.curActions[i];
                break;
            }
        }
    }
    var curclass = getObjectClass(Globals.selectedObj);

    if (act.InputType === "None") {
        ExecuteAction(act, bTimer);
        SetBorders();
        return;
    }

    Globals.additionalDataContext = {
        action: act,
        timerInvocation: Globals.timerInvocation
    };

    if (act.InputType == "Text") {
        Globals.inputDataObject = act;
        $("#textactionMenuTitle").text(act.CustomChoiceTitle);
        $("#textactionchoice").css("visibility", "visible");
        $("#textactionchoice input").focus();
        GameController.startAwaitingInput();
        SetBorders();
        return;
    }

    GameUI.clearInputChoices();

    function addObjectChoices() {
        Interactables.roomAndInventoryObjects().forEach(function (obj) {
            GameUI.addInputChoice(act, objecttostring(obj), obj.UniqueIdentifier);
        });
        if (TheGame.Player.CurrentRoom != null) {
            var currentroom = GetRoom(TheGame.Player.CurrentRoom);
            if (!currentroom) {
                return;
            }

            currentroom.Exits.forEach(function (roomExit) {
                if (roomExit.PortalObjectName != "<None>") {
                    var tempobj = GetObject(roomExit.PortalObjectName);
                    if (tempobj && tempobj.bVisible) {
                        GameUI.addInputChoice(act, objecttostring(tempobj), tempobj.UniqueIdentifier);

                        if (tempobj.bContainer) {
                            if (!tempobj.bOpenable || tempobj.bOpen) {
                                AddOpenedObjects(tempobj, $("#inputchoices"), "inputchoices");
                            }
                        }
                    }
                }
            })
        }
    }

    function addCharacterChoices() {
        Interactables.characters().forEach(function (character) {
            GameUI.addInputChoice(act, CharToString(character), character.Charname);
        });
    }

    if (act.InputType == "Custom") {
        act.CustomChoices.forEach(function (customChoice) {
            var replacedChoiceText = PerformTextReplacements(customChoice);
            GameUI.addInputChoice(act, replacedChoiceText, replacedChoiceText);
        });
    } else if (act.InputType == "Character") {
        addCharacterChoices();
    } else if (act.InputType == "Object") {
        addObjectChoices();
    } else if (act.InputType == "Inventory") {
        Interactables.inventoryObjects().forEach(function (obj) {
            GameUI.addInputChoice(act, objecttostring(obj), obj.UniqueIdentifier);
        });
    } else if (act.InputType == "ObjectOrCharacter") {
        addObjectChoices();
        addCharacterChoices();
    }

    GameUI.setInputMenuTitle(act);
    GameController.startAwaitingInput();

    SetBorders();
}

function addCommands(insertFirst, commands, AdditionalInputData, act) {
    if (insertFirst) {
        InsertToMaster(commands, AdditionalInputData, act);
    } else {
        AddToMaster(commands, AdditionalInputData, act);
        RunCommands(Globals.theObj, AdditionalInputData, act);
    }
}

function isLoopCheck(check) {
    var loopCondTypes = [
        "CT_Loop_While",
        "CT_Loop_Rooms",
        "CT_Loop_Characters",
        "CT_Loop_Items",
        "CT_Loop_Exits",
        "CT_Loop_Item_Char_Inventory",
        "CT_Loop_Item_Container",
        "CT_Loop_Item_Inventory",
        "CT_Loop_Item_Room",
        "CT_Loop_Item_Group"
    ];
    return loopCondTypes.indexOf(check.CondType) > -1;
}

function ExecuteAction(act, runNext, AdditionalInputData) {
    Logger.logExecutingAction(act);
    var bPassed = true;
    if (act.bConditionFailOnFirst) {
        for (var i = 0; i < act.Conditions.length; i++) {
            var tempcond = act.Conditions[i];
            if (TestCondition(tempcond, AdditionalInputData, act, Globals.timerInvocation, null)) {
                if (tempcond.Checks.length == 1 && isLoopCheck(tempcond.Checks[0])) {
                    // Do nothing?
                } else {
                    addCommands(runNext, tempcond.PassCommands, AdditionalInputData, act);
                }
            } else {
                bPassed = false;
                addCommands(runNext, tempcond.FailCommands, AdditionalInputData, act);
            }
        }
    } else {
        bPassed = (act.Conditions.length === 0);
        for (var i = 0; i < act.Conditions.length; i++) {
            var tempcond = act.Conditions[i];
            var btestresult = TestCondition(tempcond, AdditionalInputData, act, Globals.timerInvocation, null);
            if (btestresult) {
                bPassed = btestresult;
                addCommands(runNext, tempcond.PassCommands, AdditionalInputData, act);
            } else {
                addCommands(runNext, tempcond.FailCommands, AdditionalInputData, act);
            }
        }
    }
    if (bPassed) {
        addCommands(runNext, act.PassCommands, AdditionalInputData, act);
    } else {
        addCommands(runNext, act.FailCommands, AdditionalInputData, act);
    }
}

function runNextAfterPause(runNextPhase) {
    if (!GameController.shouldRunCommands()) {
        CommandLists.addToFront(runNextPhase);
    } else {
        runNextPhase();
    }
}

function runAfterPause(runNextPhase) {
    if (!GameController.shouldRunCommands()) {
        CommandLists.addToEnd(runNextPhase);
    } else {
        runNextPhase();
    }
}

function ChangeRoom(currentroom, bRunTimerEvents, bRunEvents) {
    CommandLists.addNestedCommandList();
    var desiredRoomId = currentroom.UniqueID;
    if (currentroom == null)
        return;
    $("#RoomTitle").html(roomDisplayName(currentroom));
    SetRoomThumb(currentroom.RoomPic);
    showImage(currentroom.RoomPic);
    TheGame.Player.CurrentRoom = currentroom.UniqueID;
    if (Globals.movingDirection) {
        $("#MainText").append('</br><b>' + Globals.movingDirection + "</b>");
    }
    if (bRunEvents && !currentroom.bEnterFirstTime) {
        currentroom.bEnterFirstTime = true;
        RunEvents("<<On Player Enter First Time>>");
    }
    runAfterPause(function () {
        // Handle situations where one of the "Enter First Time" events triggers a new ChangeRoom
        if (TheGame.Player.CurrentRoom !== desiredRoomId) {
            return;
        }
        if (bRunEvents) {
            RunEvents("<<On Player Enter>>");
        }
        runAfterPause(function () {
            // Handle situations where one of the "Enter" events triggers a new ChangeRoom
            if (TheGame.Player.CurrentRoom !== desiredRoomId) {
                return;
            }
            $("#MainText").animate({
                scrollTop: $("#MainText")[0].scrollHeight
            });
            AddTextToRTF(currentroom.Description, "Black", "Regular");
            $("#MainText").animate({
                scrollTop: $("#MainText")[0].scrollHeight
            }, 0);
            ActionRecorder.roomEntered(roomDisplayName(currentroom));
            if (bRunTimerEvents)
                RunTimerEvents();
            RefreshRoomObjects();
            RefreshCharacters();
            RefreshInventory();
            if ($("#RoomThumb").css("visibility") != "hidden")
                SetExits();
            SetBorders();
        });
    });
}

function RoomChange(bRunTimerEvents, bRunEvents) {
    var currentroom = GetRoom(TheGame.Player.CurrentRoom);
    ChangeRoom(currentroom, bRunTimerEvents, bRunEvents);
}

function SetExits() {
    var currentroom = GetRoom(TheGame.Player.CurrentRoom);
    $(".compass-direction").removeClass("active");
    if (currentroom != null) {
        for (var i = 0; i < currentroom.Exits.length; i++) {
            if (currentroom.Exits[i].DestinationRoom != "" && currentroom.Exits[i].bActive) {
                var direction = currentroom.Exits[i].Direction;
                $(".compass-direction[data-direction=" + direction + "]").addClass("active");
            }
        }
    }
}

function TestCondition(tempcond, AdditionalInputData, conditionAction, conditionTimerInvocation, loopObj) {
    var bResult = true;
    var counter = 0;

    function performLoopIteration() {
        if (Globals.loopArgs.idx < Globals.loopArgs.array.length) {
            Globals.loopArgs.object = Globals.loopArgs.array[Globals.loopArgs.idx];
            Globals.loopArgs.idx++;

            InsertToMaster([tempcond], undefined, conditionAction);
            InsertToMaster(tempcond.PassCommands, undefined, conditionAction);
        } else {
            ResetLoopObjects();
        }
    }

    for (var icond = 0; icond < tempcond.Checks.length; icond++) {
        try {
            var tempcheck = tempcond.Checks[icond];
            if (counter > 0) {
                if (tempcheck.CkType == "Or") {
                    if (bResult == true)
                        break;
                } else if (tempcheck.CkType == "And") {
                    if (bResult == false)
                        continue;
                }
            }
            counter++;

            var step2 = PerformTextReplacements(tempcheck.ConditionStep2, loopObj);
            var step3 = PerformTextReplacements(tempcheck.ConditionStep3, loopObj);
            var step4 = PerformTextReplacements(tempcheck.ConditionStep4, loopObj);
            var objectBeingActedUpon = CommandLists.objectBeingActedUpon() || Globals.theObj;
            switch (tempcheck.CondType) {
                case "CT_Item_InGroup":
                    {
                        var tempitem = GetObject(step2);
                        bResult = tempitem.GroupName == step3;
                        break;
                    }
                case "CT_MultiMedia_InGroup":
                    {
                        throw new Error("CT_MultiMedia_InGroup not implemented!");
                    }
                case "CT_Item_Held_By_Player":
                    {
                        var tempobj = GetObject(step2);
                        if (tempobj != null) {
                            if (tempobj.locationtype == "LT_PLAYER")
                                bResult = true;
                            else {
                                if (tempobj.locationtype == "LT_IN_OBJECT")
                                    bResult = CheckItemInInventory(tempobj);
                                else
                                    bResult = false;
                            }
                        } else
                            bResult = false;
                        break;
                    }
                case "CT_Player_Moving":
                    {
                        var tempdir = step2;
                        bResult = (Globals.movingDirection == tempdir);
                        break;
                    }
                case "CT_Player_Gender":
                    {
                        if (step2 == "Male")
                            bResult = TheGame.Player.PlayerGender == "Male";
                        else if (step2 == "Female")
                            bResult = TheGame.Player.PlayerGender == "Female";
                        else
                            bResult = TheGame.Player.PlayerGender == "Other";
                        break;
                    }
                case "CT_Character_Gender":
                    {
                        var tempchar = GetCharacter(step2);
                        if (tempchar != null) {
                            if (step3 == "Male")
                                bResult = tempchar.CharGender == "Male";
                            else if (step3 == "Female")
                                bResult = tempchar.CharGender == "Female";
                            else
                                bResult = tempchar.CharGender == "Other";
                        }
                        break;
                    }
                case "CT_Character_In_Room":
                    {
                        var tempchar = GetCharacter(step2);
                        if (step3 == CurrentRoomGuid) {
                            var currentroom = GetRoom(TheGame.Player.CurrentRoom);
                            bResult = tempchar.CurrentRoom == currentroom.UniqueID;
                        } else {
                            bResult = (tempchar.CurrentRoom == step3);
                        }
                        break;
                    }
                case "CT_Character_In_RoomGroup":
                    {
                        bResult = false;
                        var tempchar = GetCharacter(step2);
                        var temproom = GetRoom(tempchar.CurrentRoom);
                        if (temproom != null) {
                            if (temproom.Group == step3)
                                bResult = true;
                        }
                        break;
                    }
                case "CT_Item_Held_By_Character":
                    {
                        var tempobj = GetObject(step3);
                        if (tempobj != null) {
                            if (tempobj.locationtype == "LT_CHARACTER" && tempobj.locationname == step2)
                                bResult = true;
                            else
                                bResult = false;
                        } else
                            bResult = false;
                        break;
                    }
                case "CT_Item_Not_Held_By_Player":
                    {
                        var tempobj = GetObject(step2);
                        if (tempobj != null)
                            bResult = tempobj.locationtype != "LT_PLAYER";
                        else
                            bResult = false;
                        break;
                    }
                case "CT_Item_In_Object":
                    {
                        var tempobj = GetObject(step2);
                        if (tempobj != null)
                            bResult = tempobj.locationtype == "LT_IN_OBJECT" && tempobj.locationname == step3;
                        else
                            bResult = false;
                        break;
                    }
                case "CT_Item_Not_In_Object":
                    {
                        var tempobj = GetObject(step2);
                        if (tempobj != null) {
                            var iteminobject = tempobj.locationtype == "LT_IN_OBJECT" && tempobj.locationname == step3;
                            bResult = !iteminobject;
                        } else
                            bResult = true;
                        break;
                    }
                case "CT_Item_In_Room":
                    {
                        if (step3 == CurrentRoomGuid) {
                            var tempobj = GetObject(step2);
                            var currentroom = GetRoom(TheGame.Player.CurrentRoom);
                            if (tempobj != null)
                                bResult = ((tempobj.locationtype == "LT_ROOM") && (tempobj.locationname == currentroom.UniqueID));
                            else
                                bResult = false;
                        } else {
                            var tempobj = GetObject(step2);
                            if (tempobj != null)
                                bResult = tempobj.locationtype == "LT_ROOM" && (
                                    (tempobj.locationname === step3) || (tempobj.locationname === GetRoom(step3).UniqueID)
                                );
                            else
                                bResult = false;
                        }
                        break;
                    }
                case "CT_Item_In_RoomGroup":
                    {
                        bResult = false;
                        var tempobj = GetObject(step2);
                        if (tempobj != null && tempobj.locationtype == "LT_ROOM") {
                            var temproom = GetRoom(tempobj.locationname);
                            if (temproom != null) {
                                if (temproom.Group == step3)
                                    bResult = true;
                            }
                        }
                        break;
                    }
                case "CT_Player_In_Room":
                    {
                        bResult = TheGame.Player.CurrentRoom == step2;
                        break;
                    }
                case "CT_Player_In_RoomGroup":
                    {
                        var testroom = GetRoom(TheGame.Player.CurrentRoom);
                        bResult = (testroom.Group == step2);
                        break;
                    }
                case "CT_Player_In_Same_Room_As":
                    {
                        var curchar = GetCharacter(step2);
                        bResult = TheGame.Player.CurrentRoom == curchar.CurrentRoom;
                        break;
                    }
                case "CT_Loop_While":
                    {
                        if (TestVariable(step2, step3, step4)) {
                            var condarray = [tempcond];
                            InsertToMaster(condarray, undefined, conditionAction);
                            InsertToMaster(tempcond.PassCommands, undefined, conditionAction);
                        }
                        break;
                    }
                case "CT_Loop_Rooms":
                    {
                        if (Globals.loopArgs.array == null)
                            Globals.loopArgs.array = TheGame.Rooms;
                        performLoopIteration();
                        break;
                    }
                case "CT_Loop_Exits":
                    {
                        if (Globals.loopArgs.array == null) {
                            var temproom = GetRoom(step2);
                            if (temproom != null) {
                                Globals.loopArgs.array = temproom.Exits;
                            }
                        }
                        performLoopIteration();
                        break;
                    }
                case "CT_Loop_Characters":
                    {
                        if (Globals.loopArgs.array == null)
                            Globals.loopArgs.array = TheGame.Characters;
                        performLoopIteration();
                        break;
                    }
                case "CT_Loop_Item_Group":
                    {
                        if (Globals.loopArgs.array == null) {
                            Globals.loopArgs.array = TheGame.Objects.filter(function (item) {
                                return item.GroupName === step2;
                            });
                        }
                        performLoopIteration();
                        break;
                    }
                case "CT_Loop_Item_Char_Inventory":
                    {
                        if (Globals.loopArgs.array == null) {
                            Globals.loopArgs.array = TheGame.Objects.filter(function (item) {
                                return item.locationtype === "LT_CHARACTER" && item.locationname === step2;
                            });
                        }
                        performLoopIteration();
                        break;
                    }
                case "CT_Loop_Item_Container":
                    {
                        if (Globals.loopArgs.array == null) {
                            Globals.loopArgs.array = TheGame.Objects.filter(function (item) {
                                return item.locationtype === "LT_IN_OBJECT" && item.locationname === step2;
                            });
                        }
                        performLoopIteration();
                        break;
                    }
                case "CT_Loop_Item_Inventory":
                    {
                        if (Globals.loopArgs.array == null) {
                            Globals.loopArgs.array = TheGame.Objects.filter(function (item) {
                                return item.locationtype === "LT_PLAYER";
                            });
                        }
                        performLoopIteration();
                        break;
                    }
                case "CT_Loop_Item_Room":
                    {
                        if (Globals.loopArgs.array == null) {
                            Globals.loopArgs.array = TheGame.Objects.filter(function (item) {
                                return item.locationtype === "LT_ROOM" && item.locationname === step2;
                            });
                        }
                        performLoopIteration();
                        break;
                    }
                case "CT_Loop_Items":
                    {
                        if (Globals.loopArgs.array == null) {
                            Globals.loopArgs.array = TheGame.Objects;
                        }
                        performLoopIteration();
                        break;
                    }
                case "CT_Room_CustomPropertyCheck":
                    {
                        var splits = step2.split(":");
                        if (splits.length == 2) {
                            var roomname = splits[0];
                            var property = splits[1];
                            var temproom = null;
                            if (roomname == "<CurrentRoom>") {
                                temproom = GetRoom(TheGame.Player.CurrentRoom);
                            } else {
                                temproom = GetRoom(roomname);
                            }
                            if (temproom != null) {
                                for (var i = 0; i < temproom.CustomProperties.length; i++) {
                                    var curprop = temproom.CustomProperties[i];
                                    if (curprop.Name == property) {
                                        bResult = TestCustomProperty(curprop.Value, step3, step4);
                                        break;
                                    }
                                }
                            }
                        }
                        break;
                    }
                case "CT_Character_CustomPropertyCheck":
                    {
                        var splits = step2.split(":");
                        if (splits.length == 2) {
                            var roomname = splits[0];
                            var property = splits[1];
                            var temproom = null;
                            temproom = GetCharacter(roomname);
                            if (temproom != null) {
                                for (var i = 0; i < temproom.CustomProperties.length; i++) {
                                    var curprop = temproom.CustomProperties[i];
                                    if (curprop.Name == property) {
                                        bResult = TestCustomProperty(curprop.Value, step3, step4);
                                        break;
                                    }
                                }
                            }
                        }
                        break;
                    }
                case "CT_Timer_CustomPropertyCheck":
                    {
                        var splits = step2.split(":");
                        if (splits.length == 2) {
                            var roomname = splits[0];
                            var property = splits[1];
                            var temproom = null;
                            temproom = GetTimer(roomname);
                            if (temproom != null) {
                                for (var i = 0; i < temproom.CustomProperties.length; i++) {
                                    var curprop = temproom.CustomProperties[i];
                                    if (curprop.Name == property) {
                                        bResult = TestCustomProperty(curprop.Value, step3, step4);
                                        break;
                                    }
                                }
                            }
                        }
                        break;
                    }
                case "CT_Variable_CustomPropertyCheck":
                    {
                        var splits = step2.split(":");
                        if (splits.length == 2) {
                            var roomname = splits[0];
                            var property = splits[1];
                            var temproom = null;
                            temproom = GetVariable(roomname);
                            if (temproom != null) {
                                for (var i = 0; i < temproom.CustomProperties.length; i++) {
                                    var curprop = temproom.CustomProperties[i];
                                    if (curprop.Name == property) {
                                        bResult = TestCustomProperty(curprop.Value, step3, step4);
                                        break;
                                    }
                                }
                            }
                        }
                        break;
                    }
                case "CT_Item_CustomPropertyCheck":
                    {
                        var splits = step2.split(":");
                        if (splits.length == 2) {
                            var roomname = splits[0];
                            var property = splits[1];
                            var temproom = null;
                            if (roomname == "<Self>") {
                                if (objectBeingActedUpon) {
                                    temproom = objectBeingActedUpon;
                                }
                            } else {
                                temproom = GetObject(roomname);
                            }
                            if (temproom != null) {
                                for (var i = 0; i < temproom.CustomProperties.length; i++) {
                                    var curprop = temproom.CustomProperties[i];
                                    if (curprop.Name == property) {
                                        bResult = TestCustomProperty(curprop.Value, step3, step4);
                                        break;
                                    }
                                }
                            }
                        }
                        break;
                    }
                case "CT_Player_CustomPropertyCheck":
                    {
                        var property = step2;
                        for (var i = 0; i < TheGame.Player.CustomProperties.length; i++) {
                            var curprop = TheGame.Player.CustomProperties[i];
                            if (curprop.Name == property) {
                                bResult = TestCustomProperty(curprop.Value, step3, step4);
                            }
                        }
                        break;
                    }
                case "CT_Variable_Comparison":
                    {
                        bResult = TestVariable(step2, step3, step4);
                        break;
                    }
                case "CT_Variable_To_Variable_Comparison":
                    {
                        var tempvar = GetVariable(step2);
                        var checkvar = GetVariable(step4);
                        var varindex1 = GetArrayIndex(step2, 0);
                        var varindex1a = GetArrayIndex(step2, 1);
                        var varindex2 = GetArrayIndex(step4, 0);
                        var varindex2a = GetArrayIndex(step4, 1);
                        var compareval = "";
                        if (checkvar.vartype == "VT_NUMBERARRAY" || checkvar.vartype == "VT_NUMBER") {
                            if (varindex2 == -1)
                                compareval = checkvar.dNumType.toString();
                            else {
                                if (varindex2a != -1)
                                    compareval = checkvar.VarArray[varindex2][varindex2a];
                                else
                                    compareval = checkvar.VarArray[varindex2];
                            }
                        } else if (checkvar.vartype == "VT_STRINGARRAY" || checkvar.vartype == "VT_STRING") {
                            if (varindex2 == -1)
                                compareval = checkvar.sString;
                            else {
                                if (varindex2a != -1)
                                    compareval = checkvar.VarArray[varindex2][varindex2a];
                                else
                                    compareval = checkvar.VarArray[varindex2];
                            }
                        }
                        if (tempvar != null) {
                            if (tempvar.vartype == "VT_NUMBERARRAY" || tempvar.vartype == "VT_NUMBER") {

                                {
                                    if (varindex1 != -1) {
                                        if (varindex1a != -1)
                                            tempvar.dNumType = tempvar.VarArray[varindex1][varindex1a];
                                        else
                                            tempvar.dNumType = tempvar.VarArray[varindex1];
                                    }
                                    var num1 = 0.0;
                                    var num2 = 0.0;
                                    num2 = compareval;
                                    num1 = tempvar.dNumType;
                                    if (step3 == "Equals") {
                                        bResult = num1 == num2;
                                    } else if (step3 == "Not Equals") {
                                        bResult = num1 != num2;
                                    } else if (step3 == "Greater Than") {
                                        bResult = num1 > num2;
                                    } else if (step3 == "Greater Than or Equals") {
                                        bResult = num1 >= num2;
                                    } else if (step3 == "Less Than") {
                                        bResult = num1 < num2;
                                    } else if (step3 == "Less Than or Equals") {
                                        bResult = num1 <= num2;
                                    }
                                }
                            } else if (tempvar.vartype == "VT_STRINGARRAY" || tempvar.vartype == "VT_STRING") {
                                var tempvarvalue = tempvar.sString;
                                if (varindex1 != -1) {
                                    if (varindex1a != -1)
                                        tempvarvalue = tempvar.VarArray[varindex1][varindex1a];
                                    else
                                        tempvarvalue = tempvar.VarArray[varindex1];
                                }
                                if (step3 == "Equals") {
                                    bResult = (compareval == tempvarvalue);
                                } else if (step3 == "Not Equals") {
                                    bResult = (compareval != tempvarvalue);
                                }
                            }
                        }
                        break;
                    }
                case "CT_Item_State_Check":
                    {
                        var tempobj = GetObject(step2);
                        if (tempobj != null) {
                            if (step3 == "Open") {
                                bResult = tempobj.bOpen == true;
                            }
                            if (step3 == "Closed") {
                                bResult = tempobj.bOpen == false;
                            }
                            if (step3 == "Locked") {
                                bResult = tempobj.bLocked == true;
                            }
                            if (step3 == "Unlocked") {
                                bResult = tempobj.bLocked == false;
                            }
                            if (step3 == "Worn") {
                                bResult = tempobj.bWorn == true;
                            }
                            if (step3 == "Removed") {
                                bResult = tempobj.bWorn == false;
                            }
                            if (step3 == "Read") {
                                bResult = tempobj.bRead == true;
                            }
                            if (step3 == "Unread") {
                                bResult = tempobj.bRead == false;
                            }
                            if (step3 == "Visible") {
                                bResult = tempobj.bVisible == true;
                            }
                            if (step3 == "Invisible") {
                                bResult = tempobj.bVisible == false;
                            }
                        } else {
                            bResult = false;
                        }
                        break;
                    }
                case "CT_AdditionalDataCheck":
                    {
                        var datatocheck = "";
                        if (Globals.additionalData &&
                            Globals.additionalDataContext.action == conditionAction &&
                            Globals.additionalDataContext.timerInvocation == conditionTimerInvocation)
                            datatocheck = Globals.additionalData;
                        if (tempcond.AdditionalInputData)
                            datatocheck = tempcond.AdditionalInputData;
                        if (conditionAction.InputType == "Text") {
                            if (step4.toLowerCase() == datatocheck.toLowerCase())
                                bResult = true;
                            else
                                bResult = false;
                        } else {
                            if (step2.toLowerCase() == datatocheck.toLowerCase())
                                bResult = true;
                            else {
                                bResult = false;
                            }
                        }
                        break;
                    }
            }
        } catch (err) {
            alert("Rags can not process the condition check correctly.  If you are the game author," + " please correct the error in this conditon:" + tempcond.conditionname + " check:" +
                tempcheck.CondType + " - " + tempcheck.ConditionStep2 + " - " +
                tempcheck.ConditionStep3 + " - " + tempcheck.ConditionStep4);
        }
    }
    if (!Globals.loopArgs.array) {
        Logger.logEvaluatedCondition(tempcond, bResult);
    }
    return bResult;
}

function RefreshPictureBoxes() {
    showImage(Globals.currentImage);
    SetPortrait(TheGame.Player.PlayerPortrait);

    SetRoomThumb(GetRoom(TheGame.Player.CurrentRoom).RoomPic);
}

function movePlayerToRoom(roomName) {
    Globals.movingDirection = "";
    TheGame.Player.CurrentRoom = roomName;
    if (TheGame.Player.CurrentRoom) {
        RoomChange(false, true);
    }
}

function ProcessCondition(wrappedCondition, AdditionalInputData, loopObj) {
    var conditionBeingProcessed = wrappedCondition.payload;
    var act = wrappedCondition.parentAction;
    var timerInvocation = wrappedCondition.timerInvocation;
    if (TestCondition(conditionBeingProcessed, AdditionalInputData, act, timerInvocation, loopObj)) {
        if (conditionBeingProcessed.Checks.length === 1 && isLoopCheck(conditionBeingProcessed.Checks[0])) {
            // Do nothing?
        } else {
            InsertToMaster(conditionBeingProcessed.PassCommands, undefined, act);
        }
    } else {
        InsertToMaster(conditionBeingProcessed.FailCommands, undefined, act);
    }
}

function RunCommands(TheObj, AdditionalInputData, act) {
    Globals.pauseCommandArgs = arguments;
    var bResult = false;
    while (CommandLists.commandCount() > 0 && (GameController.shouldRunCommands() || Globals.runningLiveTimerCommands)) {
        if (typeof CommandLists.nextCommand() === "function") {
            var callback = CommandLists.shiftCommand();
            callback();
            continue;
        }

        var loopObj = Globals.loopArgs.object;
        var commandBeingProcessed = null;
        var commandOrCondition = CommandLists.shiftCommand();
        var curtype = getObjectClass(commandOrCondition.payload);
        if (curtype == "command" || "CommandName" in commandOrCondition.payload) {
            commandBeingProcessed = commandOrCondition.payload;
        } else {
            ProcessCondition(commandOrCondition, AdditionalInputData, loopObj);
        }

        if (commandBeingProcessed != null) {
            var part2 = PerformTextReplacements(commandBeingProcessed.CommandPart2, loopObj);
            var part3 = PerformTextReplacements(commandBeingProcessed.CommandPart3, loopObj);
            var part4 = PerformTextReplacements(commandBeingProcessed.CommandPart4, loopObj);
            var cmdtxt = PerformTextReplacements(commandBeingProcessed.CommandText, loopObj);
            var objectBeingActedUpon = CommandLists.objectBeingActedUpon() || TheObj;
            Logger.logExecutingCommand(commandBeingProcessed, part2, part3 ,part4);
            try {
                switch (commandBeingProcessed.cmdtype) {
                    case "CT_LAYEREDIMAGE_ADD":
                        {
                            function uniqueArray(array) {
                                var hsh = {};
                                for (var i = 0; i < array.length; i++) {
                                    hsh[array[i]] = true;
                                }
                                return Object.keys(hsh);
                            }

                            var temp = GetGameImage(part2);
                            if (temp != null) {
                                var layeredImagesArray = temp.LayeredImages[0].split(',');
                                layeredImagesArray.push(part3);
                                layeredImagesArray = layeredImagesArray.filter(function (image) {
                                    return !!image;
                                });

                                temp.LayeredImages[0] = uniqueArray(layeredImagesArray).join(',');
                                RefreshPictureBoxes();
                            }
                            break;
                        }
                    case "CT_LAYEREDIMAGE_REMOVE":
                        {
                            var temp = GetGameImage(part2);
                            if (temp != null) {
                                var idx = temp.LayeredImages[0].toLowerCase().indexOf(part3.toLowerCase());
                                if (idx > -1) {
                                    var endidx = temp.LayeredImages[0].indexOf(",", idx + 1);
                                    if (idx > 0)
                                        idx -= 1;
                                    if (endidx == -1)
                                        temp.LayeredImages[0] = temp.LayeredImages[0].slice(0, idx);
                                    else
                                        temp.LayeredImages[0] = temp.LayeredImages[0].slice(0, idx) +
                                        temp.LayeredImages[0].slice(endidx);
                                }

                                RefreshPictureBoxes();
                            }
                            break;

                        }
                    case "CT_LAYEREDIMAGE_REPLACE":
                        {
                            var temp = GetGameImage(part2);
                            if (temp != null) {
                                var idx = temp.LayeredImages[0].toLowerCase().indexOf(part3.toLowerCase());
                                if (idx > -1) {
                                    var endidx = temp.LayeredImages[0].indexOf(",", idx + 1);

                                    if (endidx == -1)
                                        temp.LayeredImages[0] = temp.LayeredImages[0].slice(0, idx) + part4;
                                    else
                                        temp.LayeredImages[0] = temp.LayeredImages[0].slice(0, idx) + part4 +
                                        temp.LayeredImages[0].slice(endidx);
                                }

                                //  RefreshPictureBoxes();
                            }
                            break;

                        }
                    case "CT_LAYEREDIMAGE_CLEAR":
                        {
                            var temp = GetGameImage(part2);
                            if (temp != null) {
                                temp.LayeredImages[0] = "";
                                RefreshPictureBoxes();
                            }
                            break;
                        }
                    case "CT_ITEM_GETRANDOMGROUP":
                        {
                            throw new Error("CT_ITEM_GETRANDOMGROUP not implemented!");
                        }
                    case "CT_MM_GETRANDOMGROUP":
                        {
                            throw new Error("CT_MM_GETRANDOMGROUP not implemented!");
                        }
                    case "CT_Status_ItemVisibleInvisible":
                        {
                            for (var i = 0; i < TheGame.StatusBarItems.length; i++) {
                                var itm = TheGame.StatusBarItems[i];
                                if (itm.Name == part2) {
                                    if (part3 == "Visible") {
                                        itm.bVisible = true;
                                    } else {
                                        itm.bVisible = false;
                                    }
                                }
                            }
                            break;
                        }
                    case "CT_DISPLAYITEMDESC":
                        {
                            if (part2 == "00000000-0000-0000-0000-000000000004") {
                                if (objectBeingActedUpon)
                                    AddTextToRTF(objectBeingActedUpon.description, "Black", "Regular");
                            } else {
                                var tempobj = GetObject(part2);
                                if (tempobj != null)
                                    AddTextToRTF(tempobj.description, "Black", "Regular");
                            }
                            break;
                        }
                    case "CT_LOOP_BREAK":
                        {
                            return true;
                        }
                    case "CT_EXPORTVARIABLE":
                        {
                            break;
                        }
                    case "CT_IMPORTVARIABLE":
                        {
                            break;
                        }
                    case "CT_VARIABLE_SET_RANDOMLY":
                        {
                            var tempvar = GetVariable(part2);
                            if (tempvar != null) {
                                var index = GetArrayIndex(part2, 0);
                                var index1a = GetArrayIndex(part2, 1);
                                if (index == -1) {
                                    tempvar.dNumType = Math.floor((Math.random() * (parseInt(tempvar.dMax) - parseInt(tempvar.dMin) + 1) + parseInt(tempvar.dMin)));
                                } else {
                                    if (index1a != -1)
                                        tempvar.VarArray[index][index1a] = Math.floor((Math.random() * (tempvar.dMax - tempvar.dMin) + tempvar.dMin));
                                    else
                                        tempvar.VarArray[index] = Math.floor((Math.random() * (tempvar.dMax - tempvar.dMin) + tempvar.dMin));
                                }
                            }
                            break;
                        }
                    case "CT_CANCELMOVE":
                        {
                            Globals.bCancelMove = true;
                            break;
                        }
                    case "CT_ACTION_CLEAR_CUSTOMCHOICE":
                        {
                            var cmd2 = part2;
                            var cmds = cmd2.split(":");
                            var tempact = null;
                            if (cmds.length > 2) {
                                tempact = GetCustomChoiceAction(cmds[0], cmds[1], cmds[2]);
                            } else if (cmds.length == 2) {
                                tempact = GetCustomChoiceAction(cmds[0], "", cmds[1]);
                            }
                            if (tempact != null) {
                                tempact.CustomChoices = [];
                            }
                            break;
                        }
                    case "CT_ACTION_ADD_CUSTOMCHOICE":
                        {
                            var cmd2 = part2;
                            var cmds = cmd2.split(":");
                            var tempact = null;
                            if (cmds.length > 2) {
                                tempact = GetCustomChoiceAction(cmds[0], cmds[1], cmds[2]);
                            } else if (cmds.length == 2) {
                                tempact = GetCustomChoiceAction(cmds[0], "", cmds[1]);
                            }
                            if (tempact != null) {
                                var bfound = false;
                                for (var i = 0; i < tempact.CustomChoices.length; i++) {
                                    var str = tempact.CustomChoices[i];
                                    if (str == cmdtxt) {
                                        bfound = true;
                                    }
                                }
                                if (!bfound) {
                                    tempact.CustomChoices.push(cmdtxt);
                                }
                            }
                            break;
                        }
                    case "CT_ACTION_REMOVE_CUSTOMCHOICE":
                        {
                            var cmd2 = part2;
                            var cmds = cmd2.split(":");
                            var tempact = null;
                            if (cmds.length > 2) {
                                tempact = GetCustomChoiceAction(cmds[0], cmds[1], cmds[2]);
                            } else if (cmds.length == 2) {
                                tempact = GetCustomChoiceAction(cmds[0], "", cmds[1]);
                            }
                            if (tempact != null) {
                                var itemindex = 0;
                                for (var i = 0; i < tempact.CustomChoices.length; i++) {
                                    if (tempact.CustomChoices[i] == cmdtxt) {
                                        tempact.CustomChoices.splice(i, 1);
                                        break;
                                    }
                                }
                            }
                            break;
                        }
                    case "CT_SETPLAYERGENDER":
                        {
                            TheGame.Player.PlayerGender = part2;
                            break;
                        }
                    case "CT_PAUSEGAME":
                        {
                            AddTextToRTF("--------------------------------\r\n", "Black", "Bold");
                            PauseGame();
                            return;
                        }
                    case "CT_SETPLAYERNAME":
                        {
                            TheGame.Player.Name = PerformTextReplacements(part4, null);
                            break;
                        }
                    case "CT_DISPLAYPLAYERDESC":
                        {
                            var val = PerformTextReplacements(TheGame.Player.Description, null);
                            AddTextToRTF(val + "\r\n", "Black", "Regular");
                            break;
                        }
                    case "CT_ITEM_LAYERED_REMOVE":
                        {
                            var tempobj = GetObject(part2);
                            if (tempobj != null) {
                                var curtype = tempobj.locationtype;
                                var locname = tempobj.locationname;
                                var bOkayToWear = true;
                                var resultstring = "";
                                for (var i = 0; i < tempobj.LayeredZoneLevels.length; i++) {
                                    var str = tempobj.LayeredZoneLevels[i];
                                    var Zonelevel = str.split(":");
                                    for (var j = 0; j < TheGame.Objects.length; j++) {
                                        var checkobj = TheGame.Objects[j];
                                        if (checkobj.bWorn && checkobj.locationtype == curtype) {
                                            if (curtype == "LT_CHARACTER") {
                                                if (locname != checkobj.locationname)
                                                    continue;
                                            }
                                            for (var k = 0; k < checkobj.LayeredZoneLevels.length; k++) {
                                                var str2 = checkobj.LayeredZoneLevels[k];
                                                var checkZoneLevel = str2.split(":");
                                                if (tempobj.UniqueIdentifier != checkobj.UniqueIdentifier && checkZoneLevel[0] == Zonelevel[0] && parseInt(checkZoneLevel[1]) >= parseInt(Zonelevel[1])) {
                                                    bOkayToWear = false;
                                                    if (resultstring.indexOf(tempobj.name) == -1) {
                                                        if (resultstring == "") {
                                                            if (curtype != "LT_CHARACTER") {
                                                                resultstring += "You cannot remove " + tempobj.name + ".  You need to remove " + checkobj.name;
                                                            } else {
                                                                resultstring += locname + " cannot remove " + tempobj.name + ".  " + locname + " will need to remove " + checkobj.name;
                                                            }
                                                        } else
                                                            resultstring += " and " + checkobj.name;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if (!bOkayToWear) {
                                    resultstring += " first.";
                                    AddTextToRTF(resultstring + "\r\n", "Black", "Regular");
                                } else {
                                    if (curtype != "LT_CHARACTER") {
                                        AddTextToRTF("You take off " + tempobj.name + ".\r\n", "Black", "Regular");
                                    } else {
                                        AddTextToRTF(locname += " takes off " + tempobj.name + ".\r\n", "Black", "Regular");
                                    }
                                    tempobj.bWorn = false;
                                }
                            }
                            break;
                        }
                    case "CT_ITEM_LAYERED_WEAR":
                        {
                            var tempobj = GetObject(part2);
                            if (tempobj != null) {
                                var curtype = tempobj.locationtype;
                                var locname = tempobj.locationname;
                                var bOkayToWear = true;
                                var resultstring = "";
                                for (var i = 0; i < tempobj.LayeredZoneLevels.length; i++) {
                                    var str = tempobj.LayeredZoneLevels[i];
                                    var Zonelevel = str.split(":");
                                    for (var j = 0; j < TheGame.Objects.length; j++) {
                                        var checkobj = TheGame.Objects[j];
                                        if (checkobj.bWorn && checkobj.locationtype == curtype) {
                                            for (var k = 0; k < checkobj.LayeredZoneLevels.length; k++) {
                                                var str2 = checkobj.LayeredZoneLevels[k];
                                                var checkZoneLevel = str2.split(":");
                                                if (checkZoneLevel[0] == Zonelevel[0] && checkZoneLevel[1] >= Zonelevel[1]) {
                                                    if (curtype == "LT_CHARACTER") {
                                                        if (locname != checkobj.locationname)
                                                            continue;
                                                    }
                                                    bOkayToWear = false;
                                                    if (resultstring.indexOf(tempobj.name) == -1) {
                                                        if (resultstring == "") {
                                                            if (curtype != "LT_CHARACTER") {
                                                                resultstring += "You cannot wear " + tempobj.name + ".  You will need to remove " + checkobj.name;
                                                            } else {
                                                                resultstring += locname += " cannot wear " + tempobj.name + ".  " + locname + " will need to remove " + tempobj.name;
                                                            }
                                                        } else
                                                            resultstring += " and " + checkobj.name;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if (!bOkayToWear) {
                                    resultstring += " first.";
                                    AddTextToRTF(resultstring + "\r\n", "Black", "Regular");
                                } else {
                                    if (curtype != "LT_CHARACTER") {
                                        AddTextToRTF("You put on " + tempobj.name + ".\r\n", "Black", "Regular");
                                    } else {
                                        AddTextToRTF(locname + " puts on " + tempobj.name + ".\r\n", "Black", "Regular");
                                    }
                                    tempobj.bWorn = true;
                                }
                            }
                            break;
                        }
                    case "CT_DISPLAYTEXT":
                        {
                            AddTextToRTF(cmdtxt + "</br>", "Black", "Regular");
                            break;
                        }
                    case "CT_ENDGAME":
                        {
                            AddTextToRTF(cmdtxt + "\r\n", "Black", "Regular");
                            alert("EndGame");
                            GameUI.hideGameElements();
                            break;
                        }
                    case "CT_MOVEITEMTOINV":
                        {
                            var Tempobj = null;
                            if (part2 == ("00000000-0000-0000-0000-000000000004")) {
                                if (objectBeingActedUpon) {
                                    Tempobj = objectBeingActedUpon;
                                }
                            } else {
                                Tempobj = GetObject(part2);
                            }
                            if (Tempobj != null) {
                                Tempobj.locationtype = "LT_PLAYER";
                            }
                            RefreshInventory();
                            break;
                        }
                    case "CT_ITEMS_MOVE_CONTAINER_TO_CONTAINER":
                        {
                            var Tempobj = null;
                            if (part2 == "00000000-0000-0000-0000-000000000004") {
                                if (objectBeingActedUpon) {
                                    Tempobj = objectBeingActedUpon;
                                }
                            } else {
                                Tempobj = GetObject(part2);
                            }
                            var Destobj = null;
                            if (part3 == "00000000-0000-0000-0000-000000000004") {
                                if (objectBeingActedUpon) {
                                    Destobj = objectBeingActedUpon;
                                }
                            } else {
                                Destobj = GetObject(part3);
                            }
                            if (Tempobj != null && Destobj != null) {
                                for (var i = 0; i < TheGame.Objects.length; i++) {
                                    var anObj = TheGame.Objects[i];
                                    if (anObj.locationtype == "LT_IN_OBJECT" && anObj.locationname == Tempobj.UniqueIdentifier) {
                                        anObj.locationname = Destobj.UniqueIdentifier;
                                    }
                                }
                            }
                            break;
                        }
                    case "CT_ITEM_SET_VISIBILITY":
                        {
                            var Tempobj = null;
                            if (part2 == "00000000-0000-0000-0000-000000000004") {
                                if (objectBeingActedUpon)
                                    Tempobj = objectBeingActedUpon;
                            } else {
                                Tempobj = GetObject(part2);
                            }
                            if (Tempobj != null) {
                                if (part3 == "Visible")
                                    Tempobj.bVisible = true;
                                else
                                    Tempobj.bVisible = false;
                                RefreshRoomObjects();
                                RefreshCharacters();
                                RefreshInventory();
                            }
                            break;
                        }
                    case "CT_MOVEINVENTORYTOCHAR":
                        {
                            Interactables.inventoryObjects().forEach(function (obj) {
                                obj.locationtype = "LT_CHARACTER";
                                obj.locationname = part2;
                            });
                            break;
                        }
                    case "CT_MOVEINVENTORYTOROOM":
                        {
                            Interactables.inventoryObjects().forEach(function(obj) {
                                if (part2 == CurrentRoomGuid) {
                                    obj.locationtype = "LT_ROOM";
                                    obj.locationname = TheGame.Player.CurrentRoom;
                                } else if (part2 == VoidRoomGuid) {
                                    obj.locationtype = "LT_NULL";
                                } else {
                                    obj.locationtype = "LT_ROOM";
                                    obj.locationname = part2;
                                }
                            });
                            break;
                        }
                    case "CT_MOVECHARINVTOPLAYER":
                        {
                            var tempchar = null;
                            tempchar = GetCharacter(part2);
                            if (tempchar != null) {
                                for (var i = 0; i < TheGame.Objects.length; i++) {
                                    var obj = TheGame.Objects[i];
                                    if (obj.locationtype == "LT_CHARACTER" && obj.locationname == tempchar.Charname && obj.bCarryable && obj.bVisible) {
                                        obj.locationtype = "LT_PLAYER";
                                    }
                                }
                            }
                            break;
                        }
                    case "CT_ROOM_MOVE_ITEMS_TO_PLAYER":
                        {
                            var temproom = null;
                            if (part2 == CurrentRoomGuid) {
                                temproom = TheGame.Player.CurrentRoom;
                            } else {
                                temproom = TheGame.GetRoom(part2);
                            }
                            if (temproom != null) {
                                for (var i = 0; i < TheGame.Objects.length; i++) {
                                    var obj = TheGame.Objects[i];
                                    if (obj.locationtype == "LT_ROOM" && obj.locationname == temproom.UniqueID && obj.bCarryable && obj.bVisible) {
                                        obj.locationtype = "LT_PLAYER";
                                    }
                                }
                            }
                            break;
                        }
                    case "CT_DISPLAYROOMDESCRIPTION":
                        {
                            if (part2 == CurrentRoomGuid) {
                                AddTextToRTF(GetRoom(TheGame.Player.CurrentRoom).Description + "\r\n", "Black", "Regular");
                            } else {
                                var temproom = null;
                                temproom = GetRoom(part2);
                                if (temproom != null)
                                    AddTextToRTF(temproom.Description + "\r\n", "Black", "Regular");
                            }
                            break;
                        }
                    case "CT_CHAR_DISPLAYPORT":
                        {
                            var tempchar = null;
                            tempchar = GetCharacter(part2);
                            if (tempchar != null) {
                                showImage(tempchar.CharPortrait);
                            }
                            break;
                        }
                    case "CT_DISPLAYROOMPICTURE":
                        {
                            if (part2 == CurrentRoomGuid) {
                                var currentroom = GetRoom(TheGame.Player.CurrentRoom);
                                showImage(currentroom.RoomPic);
                            } else {
                                var temproom = null;
                                temproom = GetRoom(part2);
                                if (temproom != null) {
                                    showImage(temproom.RoomPic);
                                }
                            }
                            break;
                        }
                    case "CT_MOVEITEMTOROOM":
                        {
                            var Tempobj = null;
                            if (part2 == "00000000-0000-0000-0000-000000000004") {
                                if (objectBeingActedUpon)
                                    Tempobj = objectBeingActedUpon;
                            } else {
                                Tempobj = GetObject(part2);
                            }
                            if (Tempobj != null) {
                                Tempobj.locationtype = "LT_ROOM";
                                if (part3 == CurrentRoomGuid) {
                                    Tempobj.locationname = TheGame.Player.CurrentRoom;
                                } else if (part3 == VoidRoomGuid) {
                                    Tempobj.locationtype = "LT_NULL";
                                } else {
                                    var temp = GetRoom(part3);
                                    if (temp != null)
                                        Tempobj.locationname = temp.UniqueID;
                                }
                            }
                            break;
                        }
                    case "CT_MOVEITEMTOOBJ":
                        {
                            if (part2 == "00000000-0000-0000-0000-000000000004") {
                                if (objectBeingActedUpon) {
                                    var locationnameref = "";
                                    try {
                                        locationnameref = part3;
                                    } catch (err) {
                                        var locationobj = GetObject(part3);
                                        if (locationobj != null)
                                            locationnameref = locationobj.UniqueIdentifier;
                                    }
                                    if (locationnameref != "") {
                                        objectBeingActedUpon.locationtype = "LT_IN_OBJECT";
                                        objectBeingActedUpon.locationname = locationnameref;
                                    }
                                }
                            } else {
                                var tempobj = GetObject(part2);
                                if (tempobj != null) {
                                    var locationnameref = "";
                                    try {
                                        locationnameref = part3;
                                    } catch (err) {
                                        var locationobj = GetObject(part3);
                                        if (locationobj != null)
                                            locationnameref = locationobj.UniqueIdentifier;
                                    }
                                    if (locationnameref != "") {
                                        tempobj.locationtype = "LT_IN_OBJECT";
                                        tempobj.locationname = locationnameref;
                                    }
                                }
                            }
                            break;
                        }
                    case "CT_MOVEITEMTOCHAR":
                        {
                            if (part2 == "00000000-0000-0000-0000-000000000004") {
                                if (objectBeingActedUpon) {
                                    objectBeingActedUpon.locationtype = "LT_CHARACTER";
                                    objectBeingActedUpon.locationname = part3;
                                }
                            } else {
                                var tempobj = GetObject(part2);
                                if (tempobj != null) {
                                    tempobj.locationtype = "LT_CHARACTER";
                                    tempobj.locationname = part3;
                                }
                            }
                            break;
                        }
                    case "CT_SETEXIT":
                        {
                            var temproom = null;
                            temproom = GetRoom(part2);
                            if (temproom != null) {
                                var index = part3.indexOf('-');
                                var tempdir = part3.substring(0, index);
                                var nextindex = part3.indexOf('-', index + 1);
                                var active = "";
                                if (nextindex > -1)
                                    active = part3.substring(index + 1, nextindex);
                                else
                                    active = part3.substring(index + 1);
                                active = active.trim();
                                var bsetactive = false;
                                if (active == "Active")
                                    bsetactive = true;
                                for (var j = 0; j < temproom.Exits.length; j++) {
                                    if (temproom.Exits[j].Direction == tempdir) {
                                        temproom.Exits[j].bActive = bsetactive;
                                    }
                                }
                                SetExits();
                            }
                            break;
                        }
                    case "CT_SETEXITDESTINATION":
                        {
                            var temproom = null;
                            temproom = GetRoom(part2);
                            if (temproom != null) {
                                var tempexit = null;
                                for (var j = 0; j < temproom.Exits.length; j++) {
                                    if (temproom.Exits[j].Direction == part3) {
                                        tempexit = temproom.Exits[j];
                                    }
                                }
                                if (tempexit != null) {
                                    if (part4 == "<None>") {
                                        tempexit.DestinationRoom = "";
                                        tempexit.bActive = false;
                                    } else {
                                        var destroom = null;
                                        destroom = GetRoom(part4);
                                        if (destroom != null) {
                                            tempexit.DestinationRoom = destroom.UniqueID;
                                            tempexit.bActive = true;
                                        }
                                    }
                                }
                                SetExits();
                            }
                            break;
                        }
                    case "CT_EXECUTETIMER":
                        {
                            var bRunningTimersOriginal = Globals.bRunningTimers;
                            var currentTimerOriginal = Globals.currentTimer;
                            Globals.bRunningTimers = true;
                            Globals.bResetTimer = false;
                            Globals.currentTimer = "";
                            var temptimer = GetTimer(part2);
                            if (temptimer != null) {
                                Globals.currentTimer = temptimer.Name;
                                var tempact = GetAction(temptimer.Actions, "<<On Each Turn>>");
                                if (tempact != null) {
                                    Globals.timerInvocation += 1;
                                    ProcessAction(tempact, true);
                                    while (Globals.bResetTimer) {
                                        Globals.timerInvocation += 1;
                                        Globals.bResetTimer = false;
                                        ProcessAction(tempact, true);
                                    }
                                }
                            }
                            Globals.bRunningTimers = bRunningTimersOriginal;
                            Globals.currentTimer = currentTimerOriginal;
                            break;
                        }
                    case "CT_RESETTIMER":
                        {
                            var temptimer = GetTimer(part2);
                            if (temptimer != null) {
                                temptimer.TurnNumber = 0;
                                if (Globals.bRunningTimers && Globals.currentTimer == temptimer.Name) {
                                    Globals.bResetTimer = true;
                                } else {
                                    Globals.bResetTimer = false;
                                }
                            }
                            break;
                        }
                    case "CT_SETTIMER":
                        {
                            var temptimer = GetTimer(part2);
                            if (temptimer != null) {
                                if (part3 == "Active") {
                                    temptimer.Active = true;
                                } else {
                                    temptimer.Active = false;
                                }
                            }
                            break;
                        }
                    case "CT_SETITEMDESC":
                        {
                            var Tempobj = null;
                            if (part2 == "00000000-0000-0000-0000-000000000004") {
                                if (objectBeingActedUpon)
                                    Tempobj = objectBeingActedUpon;
                            } else {
                                Tempobj = GetObject(part2);
                            }
                            if (Tempobj != null) {
                                Tempobj.description = cmdtxt;
                            }
                            break;
                        }
                    case "CT_SETPLAYERDESC":
                        {
                            TheGame.Player.Description = cmdtxt;
                            break;
                        }
                    case "CT_VARIABLE_SET_WITH_ROOMPROPERTYVALUE":
                        {
                            var tempvar = GetVariable(part2);
                            if (tempvar != null) {
                                var splits = part3.split(":");
                                var ValueToSet = "";
                                if (splits.length == 2) {
                                    var roomname = splits[0];
                                    var propname = splits[1];
                                    var temproom = null;
                                    if (roomname == "<CurrentRoom>") {
                                        temproom = TheGame.Player.CurrentRoom;
                                    } else {
                                        temproom = GetRoom(roomname);
                                    }
                                    if (temproom != null) {
                                        for (var i = 0; i < temproom.CustomProperties.length; i++) {
                                            var curprop = temproom.CustomProperties[i];
                                            if (curprop.Name == propname) {
                                                ValueToSet = curprop.Value;
                                            }
                                        }
                                    }
                                }
                                var varindex = GetArrayIndex(part2, 0);
                                var varindex1a = GetArrayIndex(part2, 1);
                                var replacedstring = PerformTextReplacements(part4, null);
                                if (tempvar.vartype == "VT_STRINGARRAY" || tempvar.vartype == "VT_STRING") {
                                    if (varindex == -1)
                                        tempvar.sString = ValueToSet;
                                    else
                                    if (varindex1a != -1)
                                        tempvar.VarArray[varindex][varindex1a] = ValueToSet;
                                    else
                                        tempvar.VarArray[varindex] = ValueToSet;
                                } else if (tempvar.vartype == "VT_NUMBER" || tempvar.vartype == "VT_NUMBERARRAY") {
                                    if (varindex == -1)
                                        tempvar.dNumType = ValueToSet;
                                    else
                                    if (varindex1a != -1)
                                        tempvar.VarArray[varindex][varindex1a] = ValueToSet;
                                    else
                                        tempvar.VarArray[varindex] = ValueToSet;
                                }
                            }
                            break;
                        }
                    case "CT_VARIABLE_SET_WITH_TIMERPROPERTYVALUE":
                        {
                            var tempvar = GetVariable(part2);
                            if (tempvar != null) {
                                var splits = part3.split(":");
                                var ValueToSet = "";
                                if (splits.length == 2) {
                                    var roomname = splits[0];
                                    var propname = splits[1];
                                    var temproom = null;
                                    temproom = GetTimer(roomname);
                                    if (temproom != null) {
                                        for (var i = 0; i < temproom.CustomProperties.length; i++) {
                                            var curprop = temproom.CustomProperties[i];
                                            if (curprop.Name == propname) {
                                                ValueToSet = curprop.Value;
                                            }
                                        }
                                    }
                                }
                                var varindex = GetArrayIndex(part2, 0);
                                var varindex1a = GetArrayIndex(part2, 1);
                                SetVariable(tempvar, false, false, varindex, varindex1a, ValueToSet, ValueToSet, "Equals");
                            }
                            break;
                        }
                    case "CT_VARIABLE_SET_WITH_VARIABLEPROPERTYVALUE":
                        {
                            var tempvar = GetVariable(part2);
                            if (tempvar != null) {
                                var splits = part3.split(":");
                                var ValueToSet = "";
                                if (splits.length == 2) {
                                    var roomname = splits[0];
                                    var propname = splits[1];
                                    var temproom = null;
                                    temproom = GetVariable(roomname);
                                    if (temproom != null) {
                                        for (var i = 0; i < temproom.CustomProperties.length; i++) {
                                            var curprop = temproom.CustomProperties[i];
                                            if (curprop.Name == propname) {
                                                ValueToSet = curprop.Value;
                                            }
                                        }
                                    }
                                }
                                var varindex = GetArrayIndex(part2, 0);
                                var varindex1a = GetArrayIndex(part2, 1);
                                SetVariable(tempvar, false, false, varindex, varindex1a, ValueToSet, ValueToSet, "Equals");
                            }
                            break;
                        }
                    case "CT_VARIABLE_SET_WITH_CHARPROPERTYVALUE":
                        {
                            var tempvar = GetVariable(part2);
                            if (tempvar != null) {
                                var splits = part3.split(":");
                                var ValueToSet = "";
                                if (splits.Length == 2) {
                                    var roomname = splits[0];
                                    var propname = splits[1];
                                    var temproom = null;
                                    temproom = GetCharacter(roomname);
                                    if (temproom != null) {
                                        for (var i = 0; i < temproom.CustomProperties.length; i++) {
                                            var curprop = temproom.CustomProperties[i];
                                            if (curprop.Name == propname) {
                                                ValueToSet = curprop.Value;
                                            }
                                        }
                                    }
                                }
                                var varindex = GetArrayIndex(part2, 0);
                                var varindex1a = GetArrayIndex(part2, 1);
                                SetVariable(tempvar, false, false, varindex, varindex1a, ValueToSet, ValueToSet, "Equals");
                            }
                            break;
                        }
                    case "CT_VARIABLE_SET_WITH_ITEMPROPERTYVALUE":
                        {
                            var tempvar = GetVariable(part2);
                            if (tempvar != null) {
                                var splits = part3.split(":");
                                var ValueToSet = "";
                                if (splits.length == 2) {
                                    var roomname = splits[0];
                                    var propname = splits[1];
                                    var temproom = null;
                                    if (roomname == "<Self>") {
                                        if (objectBeingActedUpon) {
                                            temproom = objectBeingActedUpon;
                                        }
                                    } else {
                                        temproom = GetObject(roomname);
                                    }
                                    if (temproom != null) {
                                        for (var i = 0; i < temproom.CustomProperties.length; i++) {
                                            var curprop = temproom.CustomProperties[i];
                                            if (curprop.Name == propname) {
                                                ValueToSet = curprop.Value;
                                            }
                                        }
                                    }
                                }
                                var varindex = GetArrayIndex(part2, 0);
                                var varindex1a = GetArrayIndex(part2, 1);
                                SetVariable(tempvar, false, false, varindex, varindex1a, ValueToSet, ValueToSet, "Equals");
                            }
                            break;
                        }
                    case "CT_VARIABLE_SET_WITH_PLAYERPROPERTYVALUE":
                        {
                            var tempvar = GetVariable(part2);
                            if (tempvar != null) {
                                var ValueToSet = "";
                                var propname = part3;
                                for (var i = 0; i < temproom.CustomProperties.length; i++) {
                                    var curprop = temproom.CustomProperties[i];
                                    if (curprop.Name == propname) {
                                        ValueToSet = curprop.Value;
                                    }
                                }
                                var varindex = GetArrayIndex(part2, 0);
                                var varindex1a = GetArrayIndex(part2, 1);
                                SetVariable(tempvar, false, false, varindex, varindex1a, ValueToSet, ValueToSet, "Equals");
                            }
                            break;
                        }
                    case "CT_ROOM_SET_CUSTOM_PROPERTY":
                    case "CT_ROOM_SET_CUSTOM_PROPERTY_JS":
                        {
                            var replacedstring = PerformTextReplacements(part4, null);
                            var splits = part2.split(":");
                            if (splits.length == 2) {
                                var roomname = splits[0];
                                var property = splits[1];
                                var temproom = null;
                                if (roomname == "<CurrentRoom>") {
                                    temproom = GetRoom(TheGame.Player.CurrentRoom);
                                } else {
                                    temproom = GetRoom(roomname);
                                }
                                if (temproom != null) {
                                    for (var j = 0; j < temproom.CustomProperties.length; j++) {
                                        var curprop = temproom.CustomProperties[j];
                                        if (curprop != null) {
                                            if (curprop.Name == property) {
                                                if (commandBeingProcessed.cmdtype == "CT_ROOM_SET_CUSTOM_PROPERTY_JS") {
                                                    var temp = null;
                                                    temp = eval(replacedstring.replace(new RegExp("</br>", "g"), "").replace(new RegExp("<br>", "g"), ""));
                                                    replacedstring = temp.toString();
                                                }
                                                SetCustomProperty(curprop, part3, replacedstring);
                                            }
                                        }
                                    }
                                }
                            }
                            break;
                        }
                    case "CT_TIMER_SET_CUSTOM_PROPERTY":
                    case "CT_TIMER_SET_CUSTOM_PROPERTY_JS":
                        {
                            var replacedstring = PerformTextReplacements(part4, null);
                            var splits = part2.split(":");
                            if (splits.length == 2) {
                                var roomname = splits[0];
                                var property = splits[1];
                                var temproom = null;
                                temproom = GetTimer(roomname);
                                if (temproom != null) {
                                    for (var j = 0; j < temproom.CustomProperties.length; j++) {
                                        var curprop = temproom.CustomProperties[j];
                                        if (curprop != null) {
                                            if (curprop.Name == property) {
                                                if (commandBeingProcessed.cmdtype == "CT_TIMER_SET_CUSTOM_PROPERTY_JS") {
                                                    var temp = null;
                                                    temp = eval(replacedstring.replace(new RegExp("</br>", "g"), "").replace(new RegExp("<br>", "g"), ""));
                                                    replacedstring = temp.toString();
                                                }
                                                SetCustomProperty(curprop, part3, replacedstring);
                                            }
                                        }
                                    }
                                }
                            }
                            break;
                        }
                    case "CT_VARIABLE_SET_CUSTOM_PROPERTY":
                    case "CT_VARIABLE_SET_CUSTOM_PROPERTY_JS":
                        {
                            var replacedstring = PerformTextReplacements(part4, null);
                            var splits = part2.split(":");
                            if (splits.length == 2) {
                                var roomname = splits[0];
                                var property = splits[1];
                                var temproom = null;
                                temproom = GetVariable(roomname);
                                if (temproom != null) {
                                    for (var j = 0; j < temproom.CustomProperties.length; j++) {
                                        var curprop = temproom.CustomProperties[j];
                                        if (curprop != null) {
                                            if (curprop.Name == property) {
                                                if (commandBeingProcessed.cmdtype == "CT_VARIABLE_SET_CUSTOM_PROPERTY_JS") {
                                                    var temp = null;
                                                    temp = eval(replacedstring.replace(new RegExp("</br>", "g"), "").replace(new RegExp("<br>", "g"), ""));
                                                    replacedstring = temp.toString();
                                                }
                                                SetCustomProperty(curprop, part3, replacedstring);
                                            }
                                        }
                                    }
                                }
                            }
                            break;
                        }
                    case "CT_ITEM_SET_CUSTOM_PROPERTY":
                    case "CT_ITEM_SET_CUSTOM_PROPERTY_JS":
                        {
                            var replacedstring = PerformTextReplacements(part4, null);
                            var splits = part2.split(":");
                            if (splits.length == 2) {
                                var itemname = splits[0];
                                var property = splits[1];
                                var tempitem = null;
                                if (itemname == "<Self>") {
                                    if (objectBeingActedUpon) {
                                        tempitem = objectBeingActedUpon;
                                    }
                                } else {
                                    tempitem = GetObject(itemname);
                                }
                                if (tempitem != null) {
                                    for (var j = 0; j < tempitem.CustomProperties.length; j++) {
                                        var curprop = tempitem.CustomProperties[j];
                                        if (curprop != null) {
                                            if (curprop.Name == property) {
                                                if (commandBeingProcessed.cmdtype == "CT_ITEM_SET_CUSTOM_PROPERTY_JS") {
                                                    var temp = null;
                                                    temp = eval(replacedstring.replace(new RegExp("</br>", "g"), "").replace(new RegExp("<br>", "g"), ""));
                                                    replacedstring = temp.toString();
                                                }
                                                SetCustomProperty(curprop, part3, replacedstring);
                                            }
                                        }
                                    }
                                }
                            }
                            break;
                        }
                    case "CT_CHAR_SET_CUSTOM_PROPERTY":
                    case "CT_CHAR_SET_CUSTOM_PROPERTY_JS":
                        {
                            var replacedstring = PerformTextReplacements(part4, null);
                            var splits = part2.split(":");
                            if (splits.length == 2) {
                                var roomname = splits[0];
                                var property = splits[1];
                                var temproom = null;
                                temproom = GetCharacter(roomname);
                                if (temproom != null) {
                                    for (var j = 0; j < temproom.CustomProperties.length; j++) {
                                        var curprop = temproom.CustomProperties[j];
                                        if (curprop != null) {
                                            if (curprop.Name == property) {
                                                if (commandBeingProcessed.cmdtype == "CT_CHAR_SET_CUSTOM_PROPERTY_JS") {
                                                    var temp = null;
                                                    temp = eval(replacedstring.replace(new RegExp("</br>", "g"), "").replace(new RegExp("<br>", "g"), ""));
                                                    replacedstring = temp.toString();
                                                }
                                                SetCustomProperty(curprop, part3, replacedstring);
                                            }
                                        }
                                    }
                                }
                            }
                            break;
                        }
                    case "CT_PLAYER_SET_CUSTOM_PROPERTY":
                    case "CT_PLAYER_SET_CUSTOM_PROPERTY_JS":
                        {
                            var replacedstring = PerformTextReplacements(part4, null);
                            var property = part2;
                            for (var j = 0; j < TheGame.Player.CustomProperties.length; j++) {
                                var curprop = TheGame.Player.CustomProperties[j];
                                if (curprop != null) {
                                    if (curprop.Name == property) {
                                        if (commandBeingProcessed.cmdtype == "CT_PLAYER_SET_CUSTOM_PROPERTY_JS") {
                                            var temp = null;
                                            temp = eval(replacedstring.replace(new RegExp("</br>", "g"), "").replace(new RegExp("<br>", "g"), ""));
                                            replacedstring = temp.toString();
                                        }
                                        SetCustomProperty(curprop, part3, replacedstring);
                                    }
                                }
                            }
                            break;
                        }
                    case "CT_VARIABLE_SET_JAVASCRIPT":
                    case "CT_SETVARIABLE":
                        {
                            var bJavascript = false;
                            if (commandBeingProcessed.cmdtype == "CT_VARIABLE_SET_JAVASCRIPT")
                                bJavascript = true;
                            var bArraySet = false;
                            var arrayvarindex = part2.indexOf("Array:");
                            if (arrayvarindex > -1) {
                                bArraySet = true;
                                part2 = part2.substring(arrayvarindex + "Array:".length);
                            }
                            var tempvar = GetVariable(part2);
                            if (tempvar != null) {
                                var varindex = GetArrayIndex(part2, 0);
                                var varindex1a = GetArrayIndex(part2, 1);
                                var replacedstring = PerformTextReplacements(part4, null);
                                cmdtxt = PerformTextReplacements(cmdtxt, null);
                                var jsresult = null;
                                if (bJavascript) {
                                    if (replacedstring == "")
                                        replacedstring = cmdtxt;
                                    jsresult = evalJankyJavascript(replacedstring);
                                    if (!bArraySet && jsresult != null)
                                        replacedstring = jsresult.toString();
                                }
                                SetVariable(tempvar, bArraySet, bJavascript, varindex, varindex1a, replacedstring, cmdtxt, part3);
                            }
                            break;
                        }
                    case "CT_VARIABLE_SET_WITH_VARIABLE":
                        {
                            var tempvar = GetVariable(part2);
                            var modifyingvar = GetVariable(part4);
                            var varindex = GetArrayIndex(part4, 0);
                            var varindex4a = GetArrayIndex(part4, 1);
                            var modifyval = "";
                            if (varindex == -1) {
                                modifyval = modifyingvar.dNumType;
                            } else {
                                if (varindex4a != -1) {
                                    modifyval = modifyingvar.VarArray[varindex][varindex4a];
                                } else {
                                    modifyval = modifyingvar.VarArray[varindex];
                                }
                            }
                            varindex = GetArrayIndex(part2, 0);
                            var varindex2a = GetArrayIndex(part2, 1);
                            if (tempvar != null) {
                                SetVariable(tempvar, false, false, varindex, varindex2a, modifyval, modifyval, part3);
                            }
                            break;
                        }
                    case "CT_DISPLAYVARIABLE":
                        {
                            var tempvar = GetVariable(part2);
                            var varindex = GetArrayIndex(part2, 0);
                            var varindex2a = GetArrayIndex(part2, 1);
                            if (tempvar != null) {
                                if (tempvar.vartype == "VT_DATETIMEARRAY") {} else if (tempvar.vartype == "VT_NUMBER") {
                                    AddTextToRTF(tempvar.dNumType.toString() + "\r\n", "Black", "Regular");
                                } else if (tempvar.vartype == "VT_STRINGARRAY") {
                                    if (varindex != -1) {
                                        if (varindex2a != -1)
                                            AddTextToRTF(tempvar.VarArray[varindex][varindex2a].toString() + "\r\n", "Black", "Regular");
                                        else
                                            AddTextToRTF(tempvar.VarArray[varindex].toString() + "\r\n", "Black", "Regular");
                                    }
                                } else if (tempvar.vartype == "VT_STRING") {
                                    AddTextToRTF(tempvar.sString + "\r\n", "Black", "Regular");
                                }
                            }
                            break;
                        }
                    case "CT_CHAR_SETPORT":
                        {
                            var tempchar = null;
                            tempchar = GetCharacter(part2);
                            if (tempchar != null) {
                                tempchar.CharPortrait = part3;
                            }
                            break;
                        }
                    case "CT_SETROOMPIC":
                        {
                            var temproom = null;
                            if (part2 == CurrentRoomGuid) {
                                temproom = TheGame.Player.CurrentRoom;
                            } else {
                                temproom = GetRoom(part2);
                            }
                            if (temproom != null) {
                                temproom.RoomPic = part3;
                                if (temproom == TheGame.Player.CurrentRoom) {
                                    showImage(temproom.RoomPic);
                                }
                            }
                            break;
                        }
                    case "CT_SETPLAYERPORTRAIT":
                        {
                            TheGame.Player.PlayerPortrait = part2;
                            SetPortrait(part2);
                            break;
                        }
                    case "CT_SETLAYEREDPLAYERPORTRAIT":
                        {
                            // TODO: use the layers!
                            TheGame.Player.PlayerPortrait = part2;
                            SetPortrait(part2);
                            break;
                        }
                    case "CT_DISPLAYLAYEREDPICTURE":
                        {
                            mainImageExtraLayers = [part2];
                            renderMainImageAndLayers();
                            break;
                        }
                    case "CT_DISPLAYPICTURE":
                        {
                            showImage(part2);
                            break;
                        }
                    case "CT_MM_SET_BACKGROUND_MUSIC":
                        {
                            var newmusic = "images/" + part2;
                            var mplayer = $("#BGMusic");
                            $("#bgmusicsource").attr("src", newmusic);
                            mplayer[0].load();
                            mplayer[0].play();
                            break;
                        }
                    case "CT_MM_STOP_BACKGROUND_MUSIC":
                        {
                            $("#BGMusic")[0].pause();
                            break;
                        }
                    case "CT_MM_PLAY_SOUNDEFFECT":
                        {
                            var newmusic = "images/" + part2;
                            var mplayer = $("#SoundEffect").attr('src', newmusic)[0];
                            mplayer.load();
                            mplayer.play();
                            break;
                        }
                    case "CT_MM_SET_UD_COMPASS":
                        {
                            $('#CustomUDCompass').off('load');
                            $('#CustomUDCompass').attr('src', 'images/' + part2);
                            $('#UDCompass').hide();
                            break;
                        }
                    case "CT_MM_SET_MAIN_COMPASS":
                        {
                            $('#CustomCompass').off('load');
                            $('#CustomCompass').attr('src', 'images/' + part2);
                            $('#Compass').hide();
                            break;
                        }
                    case "CT_SETOBJECTACTION":
                        {
                            var tempobj = null;
                            var actionlist = null;
                            if (part2 == "00000000-0000-0000-0000-000000000004") {
                                actionlist = Globals.curActions;
                            } else {
                                tempobj = GetObject(part2);
                                if (tempobj) {
                                    actionlist = tempobj.Actions;
                                }
                            }
                            if (actionlist != null) {
                                var actname = part3.substring(0, part3.lastIndexOf('-'));
                                var active = part3.substring(part3.lastIndexOf('-') + 1);
                                var tempact = GetAction(actionlist, actname);
                                if (tempact != null) {
                                    if (active == "Active") {
                                        tempact.bActive = true;
                                    } else {
                                        tempact.bActive = false;
                                    }
                                }
                            }
                            break;
                        }
                    case "CT_SETCHARACTION":
                        {
                            var tempobj = GetCharacter(part2);
                            if (tempobj != null) {
                                var actname = part3.substring(0, part3.lastIndexOf('-'));
                                var active = part3.substring(part3.lastIndexOf('-') + 1);
                                var tempact = GetAction(tempobj.Actions, actname);
                                if (tempact != null) {
                                    if (active == "Active") {
                                        tempact.bActive = true;
                                    } else {
                                        tempact.bActive = false;
                                    }
                                }
                            }
                            break;
                        }
                    case "CT_CHAR_SET_GENDER":
                        {
                            var tempobj = GetCharacter(part2);
                            if (tempobj != null) {
                                tempobj.CharGender = part3;
                            }
                            break;
                        }
                    case "CT_CHAR_SET_NAME":
                        {
                            var tempobj = GetCharacter(part2);
                            if (tempobj != null) {
                                tempobj.CharnameOverride = part4;
                            }
                            break;
                        }
                    case "CT_ROOM_SET_NAME_OVERRIDE":
                        {
                            var tempobj = null;
                            tempobj = GetRoom(part2);
                            if (tempobj != null) {
                                tempobj.SDesc = part4;
                            }
                            break;
                        }
                    case "CT_ITEM_SET_NAME_OVERRIDE":
                        {
                            var tempobj = null;
                            tempobj = GetObject(part2);
                            if (tempobj != null) {
                                tempobj.sdesc = part4;
                            }
                            break;
                        }
                    case "CT_SETPLAYERACTION":
                        {
                            var actname = part3.substring(0, part3.lastIndexOf('-'));
                            var active = part3.substring(part3.lastIndexOf('-') + 1);
                            var tempact = GetAction(TheGame.Player.Actions, actname);
                            if (tempact != null) {
                                if (active == "Active") {
                                    tempact.bActive = true;
                                } else {
                                    tempact.bActive = false;
                                }
                            }
                            break;
                        }
                    case "CT_SETROOMACTION":
                        {
                            var tempobj = null;
                            tempobj = GetRoom(part2);
                            if (tempobj != null) {
                                var actname = part3.substring(0, part3.lastIndexOf('-'));
                                var active = part3.substring(part3.lastIndexOf('-') + 1);
                                var tempact = GetAction(tempobj.Actions, actname);
                                if (tempact != null) {
                                    if (active == "Active") {
                                        tempact.bActive = true;
                                    } else {
                                        tempact.bActive = false;
                                    }
                                }
                            }
                            break;
                        }
                    case "CT_SETLOCKEDUNLOCKED":
                        {
                            var Tempobj = null;
                            if (part2 == "00000000-0000-0000-0000-000000000004") {
                                if (objectBeingActedUpon)
                                    Tempobj = objectBeingActedUpon;
                            } else {
                                Tempobj = GetObject(part2);
                            }
                            if (Tempobj != null) {
                                if (part3 == "Locked") {
                                    Tempobj.bLocked = true;
                                } else {
                                    Tempobj.bLocked = false;
                                }
                            }
                            break;
                        }
                    case "CT_SETOPENCLOSED":
                        {
                            var Tempobj = null;
                            if (part2 == "00000000-0000-0000-0000-000000000004") {
                                if (objectBeingActedUpon)
                                    Tempobj = objectBeingActedUpon;
                            } else {
                                Tempobj = GetObject(part2);
                            }
                            if (Tempobj != null) {
                                if (part3 == "Open") {
                                    Tempobj.bOpen = true;
                                } else {
                                    Tempobj.bOpen = false;
                                }
                                RefreshRoomObjects();
                            }
                            break;
                        }
                    case "CT_SETITEMTOWORN":
                        {
                            var Tempobj = null;
                            if (part2 == "00000000-0000-0000-0000-000000000004") {
                                if (objectBeingActedUpon)
                                    Tempobj = objectBeingActedUpon;
                            } else {
                                Tempobj = GetObject(part2);
                            }
                            if (Tempobj != null) {
                                if (part3 == "Worn") {
                                    Tempobj.bWorn = true;
                                } else {
                                    Tempobj.bWorn = false;
                                }
                            }
                            break;
                        }
                    case "CT_DISPLAYCHARDESC":
                        {
                            AddTextToRTF(GetCharacter(part2).Description + "\r\n", "Black", "Regular");
                            var bfoundanitem = false;
                            break;
                        }
                    case "CT_MOVECHAR":
                        {
                            var tempchar = GetCharacter(part2);
                            if (tempchar.CurrentRoom == TheGame.Player.CurrentRoom) {
                                var tempact = GetAction(tempchar.Actions, "<<On Character Leave>>");
                                if (tempact != null)
                                    ProcessAction(tempact, true);
                            }
                            if (part3 == CurrentRoomGuid) {
                                tempchar.CurrentRoom = TheGame.Player.CurrentRoom;
                                var tempact = GetAction(tempchar.Actions, "<<On Character Enter>>");
                                if (tempact != null)
                                    ProcessAction(tempact, true);
                            } else if (part3 == VoidRoomGuid) {
                                GetCharacter(part2).CurrentRoom = VoidRoomGuid;
                            } else {
                                if (part3 == "") {
                                    alert("Error in command CT_MoveChar.  Could not locate a room called " + part3);
                                    continue;
                                }
                                GetCharacter(part2).CurrentRoom = GetRoom(part3).UniqueID;
                                if (part3 == TheGame.Player.CurrentRoom) {
                                    var tempact = GetAction(tempchar.Actions, "<<On Character Enter>>");
                                    if (tempact != null)
                                        ProcessAction(tempact, true);
                                }
                            }
                            RefreshCharacters();
                            break;
                        }
                    case "CT_MOVEPLAYER":
                        {
                            movePlayerToRoom(part2);
                            break;
                        }
                    case "CT_MOVETOCHAR":
                        {
                            var tempchar = GetCharacter(part2);
                            if (tempchar != null) {
                                if (tempchar.CurrentRoom != VoidRoomGuid && tempchar.CurrentRoom != CurrentRoomGuid) {
                                    movePlayerToRoom(tempchar.CurrentRoom);
                                }
                            }
                            break;
                        }
                    case "CT_MOVETOOBJ":
                        {
                            var tempobj = GetObject(part2);
                            if (tempobj != null) {
                                if (tempobj.locationtype == "LT_ROOM") {
                                    movePlayerToRoom(tempobj.locationname);
                                }
                            }
                            break;
                        }
                    case "CT_CHAR_MOVETOOBJ":
                        {
                            var tempchar = GetCharacter(part2);
                            var tempobj = GetObject(part3);
                            if (tempobj != null && tempchar != null) {
                                if (tempobj.locationtype == "LT_ROOM") {
                                    tempchar.CurrentRoom = GetRoom(tempobj.locationname).UniqueID;
                                }
                                if (TheGame.Player.CurrentRoom == tempobj.locationname)
                                    RoomChange(false, false);
                            }
                            break;
                        }
                    case "CT_SETCHARDESC":
                        {
                            GetCharacter(part2).Description = cmdtxt;
                            break;
                        }
                    case "CT_SETROOMDESCRIPTION":
                        {
                            var temproom = null;
                            if (part2 == CurrentRoomGuid) {
                                temproom = TheGame.Player.CurrentRoom;
                            } else {
                                temproom = GetRoom(part2);
                            }
                            if (temproom != null)
                                temproom.Description = cmdtxt;
                            break;
                        }
                    case "CT_JAVA_SET_RAGS":
                        {
                            cmdtxt = PerformTextReplacements(cmdtxt, null);
                            var jsresult = null;
                            jsresult = evalJankyJavascript(cmdtxt);
                            SetRagsObjectsFromJavascript(jsresult);
                            break;
                        }
                    case "CT_SETVARIABLE_NUMERIC_BYINPUT":
                        {
                            var acttype = part2;
                            if (acttype == "Custom") {
                                GameUI.setCmdInputForCustomChoices(part4, commandBeingProcessed);
                            } else if (acttype == "Text") {
                                GameUI.showTextMenuChoice(part4);
                            } else {}
                            GameController.startAwaitingInput();
                            Globals.variableGettingSet = commandBeingProcessed;
                            return;
                        }
                    case "CT_SETVARIABLEBYINPUT":
                        {
                            var acttype = part2;
                            Globals.variableGettingSet = commandBeingProcessed;
                            if (acttype == "Custom") {
                                GameUI.setCmdInputForCustomChoices(part4, commandBeingProcessed);
                                GameController.startAwaitingInput();
                                return;
                            }

                            if (acttype == "Text") {
                                GameUI.showTextMenuChoice(part4);
                                GameController.startAwaitingInput();
                                return;
                            }

                            function addCharacterOptions() {
                                TheGame.Characters.forEach(function (character) {
                                    GameUI.addCmdInputChoice(
                                        CharToString(character),
                                        character.Charname
                                    )
                                });
                            }

                            function addObjectOptions() {
                                Interactables.roomAndInventoryObjects().forEach(function (obj) {
                                    GameUI.addCmdInputChoice(
                                        objecttostring(obj),
                                        obj.UniqueIdentifier
                                    )
                                });
                            }

                            GameUI.clearCmdInputChoices();

                            if (acttype == "Character") {
                                addCharacterOptions();
                            } else if (acttype == "Object") {
                                addObjectOptions();
                            } else if (acttype == "Inventory") {
                                TheGame.Objects.forEach(function (obj) {
                                    if (obj.locationtype == "LT_PLAYER") {
                                        GameUI.addCmdInputChoice(
                                            objecttostring(obj),
                                            obj.UniqueIdentifier
                                        )
                                    }
                                });
                            } else if (acttype == "ObjectOrCharacter") {
                                addObjectOptions();
                                addCharacterOptions();
                            }
                            GameUI.setCmdInputMenuTitle(act, part4);
                            GameController.startAwaitingInput();
                            break;
                        }
                }
            } catch (err) {
                alert(err.message);
                alert("Rags can not process the command correctly.  If you are the game author," + " please correct the error in this command:" + commandBeingProcessed.cmdtype);
            }
        }
    }
    RefreshInventory();
    RefreshRoomObjects();
    SetupStatusBars();
    return bResult;
}

function AddTextToRTF(text, clr, fontst) {
    var origtext = "";
    while (origtext != text) {
        origtext = text;
        text = PerformTextReplacements(text, null);
    }

    var replacedtext = text;
    if (fontst == "Regular" && clr == "Black") {
        // [c Green]green text[/c]
        replacedtext = replacedtext.replace(/\[c\s*([^\]]+)]/g, function (match, colortype) {
            var colorinserter = "<span style='color:";
            if (colortype.indexOf(",") > -1) {
                colorinserter += "rgb(" + colortype + ");'>";
            } else {
                colorinserter += colortype + ";'>";
            }
            return colorinserter;
        });

        // [f Arial,16]special font[/f]
        replacedtext = replacedtext.replace(/\[f\s*([^\]]+)]/g, function (match, fonttype) {
            var fontdata = fonttype.split(",");
            return "<span style='font-family:" + fontdata[0] + ";font-size:" +
                fontdata[1] + "px;'>";
        });

        // [b]bold text[/b]
        replacedtext = replacedtext.replace(/\[b]/g, function (match) {
            return "<span style='font-weight:bold;'>";
        });

        // [i]italic text[/i]
        replacedtext = replacedtext.replace(/\[i]/g, function (match) {
            return "<span style='font-style:italic;'>";
        });

        // [u]underlined text[/u]
        replacedtext = replacedtext.replace(/\[u]/g, function (match) {
            return "<span style='text-decoration:underline;'>";
        });

        // closing tags ([/u], [/b]...)
        replacedtext = replacedtext.replace(/\[\/[fciub]]/g, function (match) {
            return "</span>";
        });

        var styleformats = [];
        var tempindex;
        text = MiddlesOnly(replacedtext);
        tempindex = text.indexOf("[middle]", 0);
        while (tempindex >= 0) {
            text = text.slice(0, tempindex) + text.slice(tempindex + 8);
            var endindex = text.indexOf("[/middle]", tempindex);
            if (endindex >= 0) {
                text = text.slice(0, endindex) + text.slice(endindex + 9);
                styleformats.push([
                    text.substring(tempindex, endindex),
                    "<div style=\"text-align:center;\">"
                ]);
            }
            tempindex = text.indexOf("[middle]", 0);
        }
        text = TextOnly(replacedtext);
        for (var i = 0; i < styleformats.length; i++) {
            var startindex = text.indexOf(styleformats[i][0]);
            text = text.slice(0, startindex) + styleformats[i][1] + text.slice(startindex);
            startindex = text.indexOf(styleformats[i][0]);
            text = text.slice(0, startindex + styleformats[i][0].length) + "</div>" + text.slice(startindex + styleformats[i][0].length);
        }

        $("#MainText").append('</br>' + text);
        $("#MainText").animate({
            scrollTop: $("#MainText")[0].scrollHeight
        }, 0);
    } else {
        $("#MainText").append('</br>' + text);
        $("#MainText").animate({
            scrollTop: $("#MainText")[0].scrollHeight
        }, 0);
    }
}

function nthIndex(str, pat, n){
    var i = -1;
    while(n >= 0 && i++ < str.length){
        i = str.indexOf(pat, i);
        if (i < 0) break;
        n--;
    }
    return i;
}

function GetArrayIndex(varname, n) {
    var retval = -1;
    var index = nthIndex(varname, "(", n);
    if (index > -1) {
        var endindex = varname.indexOf(")", index);
        if (endindex > -1) {
            var indexvalue = varname.substring(index + 1, endindex);
            try {
                retval = indexvalue;
            } catch (err) {
                retval = -1;
            }
        }
    }

    if (retval && retval !== -1) {
        var rangeMatch = retval.match(/(\d+)\.\.(\d+)/);
        if (rangeMatch) {
            var rangeStart = parseInt(rangeMatch[1], 10);
            var rangeEnd = parseInt(rangeMatch[2], 10);
            if (rangeStart === rangeEnd - 1) {
                return rangeEnd.toString();
            } else {
                throw new Error("Found a range array index in property: '" + varname + "'. This is probably an error, giving up.")
            }
        }
    }

    return retval;
}

function getObjectClass(obj) {
    if (obj && obj.constructor && obj.constructor.toString) {
        var arr = obj.constructor.toString().match(/function\s*(\w+)/);
        if (arr && arr.length == 2) {
            return arr[1];
        }
    }
    return undefined;
}

function CheckItemInInventory(tempobj) {
    var foundObj = TheGame.Objects.filter(function (obj) {
        return obj.name == tempobj.locationname;
    })[0];

    if (!foundObj) {
        return false;
    }

    if (foundObj.locationtype == "LT_PLAYER") {
        return true;
    } else if (foundObj.locationtype == "LT_IN_OBJECT") {
        return CheckItemInInventory(foundObj);
    } else {
        return false;
    }
}

function GetCustomChoiceAction(type, name, actionname) {
    var tempact = null;
    if (type == "Chr") {
        tempact = GetAction(GetCharacter(name).Actions, actionname);
    } else if (type == "Obj") {
        var tempobj = GetObject(name);
        if (tempobj != null)
            tempact = GetAction(tempobj.Actions, actionname);
    } else if (type == "Player") {
        tempact = GetAction(TheGame.Player.Actions, actionname);
    } else if (type == "Room") {
        var temproom = GetRoom(name);
        if (temproom != null)
            tempact = GetAction(temproom.Actions, actionname);
    } else if (type == "Timer") {
        var temptimer = GetTimer(name);
        if (temptimer != null)
            tempact = GetAction(temptimer.Actions, actionname);
    }
    return tempact;
}

function PauseGame() {
    GameController.pause();
    $("#Continue").css('background-color', "rgb(255, 255, 255)");
    $("#Continue").css('visibility', "visible");
}

function TestCustomProperty(PropVal, step3, step4) {
    var bResult = true;
    var replacedstring = PerformTextReplacements(step4, null);
    var bIntComparison = false;
    var iPropVal = 0.0;
    var iReplacedString = 0.0;
    try {
        iPropVal = parseInt(PropVal);
        iReplacedString = parseInt(replacedstring);
        if (isNaN(iPropVal))
            bIntComparison = false;
        else
            bIntComparison = true;
    } catch (err) {
        bIntComparison = false;
    }
    if (step3 == "Equals") {
        if (bIntComparison) {
            bResult = iReplacedString == iPropVal;
        } else {
            bResult = replacedstring == PropVal;
        }
    } else if (step3 == "Not Equals") {
        if (bIntComparison) {
            bResult = iReplacedString != iPropVal;
        } else {
            bResult = replacedstring != PropVal;
        }
    } else if (step3 == "Contains") {
        bResult = (PropVal.indexOf(replacedstring) >= 0);
    } else if (step3 == "Greater Than") {
        if (bIntComparison) {
            bResult = iPropVal > iReplacedString;
        } else {
            bResult = replacedstring > PropVal;
        }
    } else if (step3 == "Greater Than or Equals") {
        if (bIntComparison) {
            bResult = iPropVal >= iReplacedString;
        } else {
            bResult = replacedstring >= PropVal;
        }
    } else if (step3 == "Less Than") {
        if (bIntComparison) {
            bResult = iPropVal < iReplacedString;
        } else {
            bResult = replacedstring < PropVal;
        }
    } else if (step3 == "Less Than or Equals") {
        if (bIntComparison) {
            bResult = iPropVal <= iReplacedString;
        } else {
            bResult = replacedstring <= PropVal;
        }
    }
    return bResult;
}

function SetArrayData(tempvar, resultval) {
    var bMDA = false;
    var arWidth = 0;
    if (tempvar.VarArray.length > 0) {
        var test = tempvar.VarArray[0];
        if (test.length > 0) {
            bMDA = true;
            arWidth = test.length;
        }
    }
    tempvar.VarArray = resultval;
    var temparray = resultval;
}

function SetVariable(tempvar, bArraySet, bJavascript, varindex, varindex1a, replacedstring, cmdtxt, part3) {
    if (tempvar.vartype == "VT_DATETIMEARRAY" || tempvar.vartype == "VT_DATETIME") {} else if (tempvar.vartype == "VT_NUMBERARRAY" || tempvar.vartype == "VT_NUMBER") {
        if (part3 == "Equals") {
            if (bArraySet) {
                SetArrayData(tempvar, jsresult);
            } else {
                if (varindex == -1)
                    tempvar.dNumType = parseFloat(replacedstring);
                else {
                    if (varindex1a != -1)
                        tempvar.VarArray[varindex][varindex1a] = replacedstring;
                    else
                        tempvar.VarArray[varindex] = parseFloat(replacedstring);
                }
            }
        } else if (part3 == "Add") {
            if (varindex == -1)
                tempvar.dNumType += parseFloat(replacedstring);
            else {
                if (varindex1a != -1)
                    tempvar.VarArray[varindex][varindex1a] = (parseFloat(tempvar.VarArray[varindex][varindex1a]) +
                        parseFloat(replacedstring)).toString();
                else
                    tempvar.VarArray[varindex] = parseFloat(tempvar.VarArray[varindex]) +
                    parseFloat(replacedstring);
            }
        } else if (part3 == "Subtract") {
            if (varindex == -1)
                tempvar.dNumType -= parseFloat(replacedstring);
            else {
                if (varindex1a != -1)
                    tempvar.VarArray[varindex][varindex1a] = (parseFloat(tempvar.VarArray[varindex][varindex1a]) -
                        parseFloat(replacedstring)).toString();
                else
                    tempvar.VarArray[varindex] = parseFloat(tempvar.VarArray[varindex]) -
                    parseFloat(replacedstring);
            }
        } else if (part3 == "Multiply") {
            if (varindex == -1)
                tempvar.dNumType *= parseFloat(replacedstring);
            else {
                if (varindex1a != -1)
                    tempvar.VarArray[varindex][varindex1a] = (parseFloat(tempvar.VarArray[varindex][varindex1a]) * parseFloat(replacedstring)).toString();
                else
                    tempvar.VarArray[varindex] = parseFloat(tempvar.VarArray[varindex]) * parseFloat(replacedstring);
            }
        } else if (part3 == "Divide") {
            if (varindex == -1)
                tempvar.dNumType /= parseFloat(replacedstring);
            else {
                if (varindex1a != -1)
                    tempvar.VarArray[varindex][varindex1a] = (parseFloat(tempvar.VarArray[varindex][varindex1a]) / parseFloat(replacedstring)).toString();
                else
                    tempvar.VarArray[varindex] = parseFloat(tempvar.VarArray[varindex]) / parseFloat(replacedstring);
            }
        }
        if (tempvar.bEnforceRestrictions) {
            if (varindex == -1) {
                if (tempvar.dNumType < parseFloat(PerformTextReplacements(tempvar.dMin, null)))
                    tempvar.dNumType = parseFloat(PerformTextReplacements(tempvar.dMin, null));
                if (tempvar.dNumType > parseFloat(PerformTextReplacements(tempvar.dMax, null)))
                    tempvar.dNumType = parseFloat(PerformTextReplacements(tempvar.dMax, null));
            } else {
                if (varindex1a != -1) {
                    if (parseFloat(tempvar.VarArray[varindex][varindex1a]) < parseFloat(PerformTextReplacements(tempvar.dMin, null)))
                        tempvar.VarArray[varindex][varindex1a] = PerformTextReplacements(tempvar.dMin, null).toString();
                    if (parseFloat(tempvar.VarArray[varindex][varindex1a]) > parseFloat(PerformTextReplacements(tempvar.dMax, null)))
                        tempvar.VarArray[varindex][varindex1a] = PerformTextReplacements(tempvar.dMax, null).toString();
                } else {
                    if (parseFloat(tempvar.VarArray[varindex]) < parseFloat(PerformTextReplacements(tempvar.dMin, null)))
                        tempvar.VarArray[varindex] = parseFloat(PerformTextReplacements(tempvar.dMin, null));
                    if (parseFloat(tempvar.VarArray[varindex]) > parseFloat(PerformTextReplacements(tempvar.dMax, null)))
                        tempvar.VarArray[varindex] = parseFloat(PerformTextReplacements(tempvar.dMax, null));
                }
            }
        }
    } else if (tempvar.vartype == "VT_STRINGARRAY" || tempvar.vartype == "VT_STRING") {
        if (bJavascript) {
            var jsresult = evalJankyJavascript(cmdtxt);
            if (!bArraySet && jsresult != null)
                cmdtxt = jsresult.toString();
        }
        if (bArraySet) {
            SetArrayData(tempvar, jsresult);
        } else {
            if (varindex == -1)
                tempvar.sString = cmdtxt;
            else
            if (varindex1a != -1)
                tempvar.VarArray[varindex][varindex1a] = cmdtxt;
            else
                tempvar.VarArray[varindex] = cmdtxt;
        }
    }
}

function SetRagsObjectsFromJavascript(resultval) {
    var temparray = resultval;
    if (temparray != null) {
        for (var i = 0; i < temparray.length; i++) {
            var tempobj = temparray[i];
            if (tempobj.length > 0) {
                var objtomodify = "[" + tempobj[0].toString() + "]";
                var newval = tempobj[1].toString();
                if (newval == "")
                    newval = " ";
                PerformTextReplacements(objtomodify, null, newval);
            }
        }
    }
}

function CheckNumericLimits(tempvar, thevalue) {
    //check min/max limits...
    if (tempvar.bEnforceRestrictions) {
        var themin = parseFloat(TheGame.PerformTextReplacements(tempvar.dMin, null));
        var themax = parseFloat(TheGame.PerformTextReplacements(tempvar.dMax, null));
        if (parseFloat(thevalue) < themin)
            return themin;
        if (parseFloat(thevalue) > themax)
            return themax;
        return parseFloat(thevalue);

    } else
        return parseFloat(thevalue);
}

function SetCommandInput(tempcommand, Value) {
    var part2 = PerformTextReplacements(tempcommand.CommandPart2, null);
    var part3 = PerformTextReplacements(tempcommand.CommandPart3, null);
    var part4 = PerformTextReplacements(tempcommand.CommandPart4, null);
    var cmdtxt = PerformTextReplacements(tempcommand.CommandText, null);
    var tempvar = GetVariable(part3);
    var varindex = GetArrayIndex(part3, 0);
    var varindex3a = GetArrayIndex(part3, 1);
    if (tempvar != null) {
        switch (tempcommand.cmdtype) {
            case "CT_SETVARIABLE_NUMERIC_BYINPUT":
                {
                    if (varindex == -1) {
                        tempvar.dNumType = CheckNumericLimits(tempvar, Value);
                    } else {
                        if (varindex3a != -1) {
                            tempvar.VarArray[varindex][varindex3a] = "";
                            tempvar.VarArray[varindex][varindex3a] = CheckNumericLimits(tempvar, Value).toString();
                        } else {
                            tempvar.VarArray[varindex] = "";
                            tempvar.VarArray[varindex] = CheckNumericLimits(tempvar, Value).toString();
                        }
                    }
                    break;
                }
            case "CT_SETVARIABLEBYINPUT":
                {
                    var tempvar = GetVariable(part3);
                    var varindex = GetArrayIndex(part3, 0);
                    var varindex3a = GetArrayIndex(part3, 1);
                    if (tempvar != null) {
                        if (varindex == -1) {
                            tempvar.sString = Value;
                        } else {
                            if (varindex3a != -1) {
                                tempvar.VarArray[varindex][varindex3a] = "";
                                tempvar.VarArray[varindex][varindex3a] = Value;
                            } else {
                                tempvar.VarArray[varindex] = "";
                                tempvar.VarArray[varindex] = Value;
                            }
                        }
                    }
                }
        }
    }
}

function SetCustomProperty(curprop, part3, replacedstring) {
    var bInteger = true;
    var iReplacedString = parseFloat(replacedstring);
    var iPropVal = parseFloat(curprop.Value);
    if (isNaN(parseFloat(curprop.Value)) && isNaN(parseFloat(replacedstring))) {
        bInteger = false;
    }
    if (part3 == "Equals") {
        curprop.Value = replacedstring;
    } else if (part3 == "Add") {
        if (bInteger) {
            curprop.Value = (iReplacedString + iPropVal).toString();
        }
    } else if (part3 == "Subtract") {
        if (bInteger) {
            curprop.Value = (iPropVal - iReplacedString).toString();
        }
    } else if (part3 == "Multiply") {
        if (bInteger) {
            curprop.Value = (iReplacedString * iPropVal).toString();
        }
    } else if (part3 == "Divide") {
        if (bInteger) {
            curprop.Value = (iPropVal / iReplacedString).toString();
        }
    }
}

function TestVariable(step2, step3, step4) {
    var bResult = true;
    var tempvar = GetVariable(step2);
    if (tempvar != null) {
        var varindex = GetArrayIndex(step2, 0);
        var varindex2 = GetArrayIndex(step2, 1);
        var replacedstring = PerformTextReplacements(step4, null);
        if (tempvar.vartype == "VT_DATETIMEARRAY" || tempvar.vartype == "VT_DATETIME") {
            // Do Nothing
        } else if (tempvar.vartype == "VT_NUMBERARRAY" || tempvar.vartype == "VT_NUMBER") {
            if (varindex != -1) {
                if (varindex2 != -1) {
                    tempvar.dNumType = parseFloat(tempvar.VarArray[varindex][varindex2]);
                } else
                    tempvar.dNumType = tempvar.VarArray[varindex];
            }
            if (step3 == "Equals") {
                bResult = parseFloat(replacedstring) == tempvar.dNumType;
            } else if (step3 == "Not Equals") {
                bResult = parseFloat(replacedstring) != tempvar.dNumType;
            } else if (step3 == "Greater Than") {
                bResult = tempvar.dNumType > parseFloat(replacedstring);
            } else if (step3 == "Greater Than or Equals") {
                bResult = tempvar.dNumType >= parseFloat(replacedstring);
            } else if (step3 == "Less Than") {
                bResult = tempvar.dNumType < parseFloat(replacedstring);
            } else if (step3 == "Less Than or Equals") {
                bResult = tempvar.dNumType <= parseFloat(replacedstring);
            }
        } else if (tempvar.vartype == "VT_STRINGARRAY" || tempvar.vartype == "VT_STRING") {
            if (varindex != -1) {
                if (varindex2 != -1)
                    tempvar.sString = tempvar.VarArray[varindex][varindex2].toString();
                else
                    tempvar.sString = tempvar.VarArray[varindex].toString();
            }
            if (step3 == "Equals") {
                bResult = replacedstring == tempvar.sString;
            } else if (step3 == "Not Equals") {
                bResult = replacedstring != tempvar.sString;
            } else if (step3 == "Contains") {
                bResult = tempvar.sString.indexOf(replacedstring) > -1;
            } else if (step3 == "Greater Than") {
                bResult = tempvar.sString > replacedstring;
            } else if (step3 == "Less Than") {
                bResult = tempvar.sString < replacedstring;
            }
        }
    }
    if ((tempvar === undefined) && (step3 === "Contains")) {
        // HACK - preserve bug compatibility with desktop RAGS client
        // It seems like a "varname Contains val" query passes
        // if varname does not exist. Not sure how many other
        // situations this applies to. This is needed to get past
        // the opening quiz questions in Evil, Inc. where the
        // variable names have been typoed.
        return true;
    }
    return bResult;
}

function RunEvents(EventType) {
    try {
        var startingroomid = TheGame.Player.CurrentRoom;
        var curroom = GetRoom(startingroomid);
        var tempact = GetAction(curroom.Actions, EventType);
        if (tempact != null) {
            ProcessAction(tempact, false);
        }
        tempact = GetAction(TheGame.Player.Actions, EventType);
        if (tempact != null) {
            ProcessAction(tempact, false);
        }
        Interactables.roomObjects().forEach(function (obj) {
            CommandLists.addNestedCommandList(obj);

            if (EventType.indexOf("Player Enter") > -1) {
                if (!obj.bEnterFirstTime) {
                    tempact = GetAction(obj.Actions, "<<On Player Enter First Time>>");
                    obj.bEnterFirstTime = true;
                    if (tempact != null)
                        ProcessAction(tempact, false);
                }
            } else if (EventType.indexOf("Player Leave") > -1) {
                if (!obj.bLeaveFirstTime) {
                    tempact = GetAction(obj.Actions, "<<On Player Leave First Time>>");
                    obj.bLeaveFirstTime = true;
                    if (tempact != null)
                        ProcessAction(tempact, false);
                }
            }
            tempact = GetAction(obj.Actions, EventType);
            if (tempact != null) {
                if (EventType == "<<On Player Enter>>" || EventType == "<<On Player Leave>>") {
                    if (EventType == "<<On Player Enter>>") {
                        if (startingroomid == TheGame.Player.CurrentRoom) {
                            ProcessAction(tempact, false);
                        }
                    } else
                        ProcessAction(tempact, false);
                }
            }
            if (obj.bContainer) {
                if (!obj.bOpenable || obj.bOpen) {
                    for (var j = 0; j < TheGame.Objects.length; j++) {
                        var tempobj2 = TheGame.Objects[j];
                        CommandLists.addNestedCommandList(tempobj2);

                        if ((tempobj2.locationtype == "LT_IN_OBJECT") && (tempobj2.locationname == obj.UniqueIdentifier)) {
                            if (EventType.indexOf("Player Enter") > -1) {
                                if (!tempobj2.bEnterFirstTime) {
                                    tempact = GetAction(tempobj2.Actions, "<<On Player Enter First Time>>");
                                    tempobj2.bEnterFirstTime = true;
                                    if (tempact != null)
                                        ProcessAction(tempact, false);
                                }
                            } else if (EventType.indexOf("Player Leave") > -1) {
                                if (!tempobj2.bLeaveFirstTime) {
                                    tempact = GetAction(tempobj2.Actions, "<<On Player Leave First Time>>");
                                    tempobj2.bLeaveFirstTime = true;
                                    if (tempact != null)
                                        ProcessAction(tempact, false);
                                }
                            }
                            tempact = GetAction(tempobj2.Actions, EventType);
                            if (tempact != null) {
                                if (EventType == "<<On Player Enter>>" || EventType == "<<On Player Leave>>") {
                                    if (EventType == "<<On Player Enter>>") {
                                        if (startingroomid == TheGame.Player.CurrentRoom) {
                                            ProcessAction(tempact, false);
                                        }
                                    } else
                                        ProcessAction(tempact, false);
                                }
                            }
                        }
                    }
                }
            }
        });
        Interactables.characters().forEach(function (character) {
            if (EventType.indexOf("Player Enter") > -1) {
                if (!character.bEnterFirstTime) {
                    tempact = GetAction(character.Actions, "<<On Player Enter First Time>>");
                    character.bEnterFirstTime = true;
                    if (tempact != null)
                        ProcessAction(tempact, false); //null);
                }
            } else if (EventType.indexOf("Player Leave") > -1) {
                if (!character.bLeaveFirstTime) {
                    tempact = GetAction(character.Actions, "<<On Player Leave First Time>>");
                    character.bLeaveFirstTime = true;
                    if (tempact != null)
                        ProcessAction(tempact, false); //null);
                }
            }
            tempact = GetAction(character.Actions, EventType);
            if (tempact != null) {
                if (EventType == "<<On Player Enter>>" || EventType == "<<On Player Leave>>") {
                    if (EventType == "<<On Player Enter>>") {
                        if (startingroomid == TheGame.Player.CurrentRoom) {
                            ProcessAction(tempact, null);
                        }
                    } else
                        ProcessAction(tempact, false); //null);
                }
            }
        });
    } catch (err) {
        var themsg = err.message;
    }
}

function runSingleTimer(temptimer) {
    Globals.currentTimer = temptimer.Name;
    RunTimer(temptimer, function () {
        if (Globals.bResetTimer) {
            runSingleTimer(temptimer);
        }
    });
}

function RunTimerEvents() {
    if (Globals.bRunningTimers) {
        return;
    }

    Globals.bRunningTimers = true;
    Globals.bResetTimer = false;
    Globals.currentTimer = "";
    for (var i = 0; i < TheGame.Timers.length; i++) {
        var timer = TheGame.Timers[i];
        var lastTimer = (i === TheGame.Timers - 1);
        if (!timer.LiveTimer) {
            runAfterPause(function (timer) {
                return function () {
                    if (timer != null) {
                        runSingleTimer(timer);
                    }
                };
            }(timer));
        }
    }
    runAfterPause(function () {
        Globals.bRunningTimers = false;
        RefreshInventory();
        RefreshRoomObjects();
        RefreshCharacters();
    });
}

function RunTimer(temptimer, callback) {
    if (!callback) {
        callback = function () { };
    }

    Globals.bResetTimer = false;
    if (temptimer.Active) {
        temptimer.TurnNumber++;
        if (temptimer.TurnNumber > temptimer.Length && temptimer.TType == "TT_LENGTH") {
            if (!temptimer.Restart)
                temptimer.Active = false;
            temptimer.TurnNumber = 0;
            return;
        }

        var tempact = GetAction(temptimer.Actions, "<<On Each Turn>>");
        if (tempact != null) {
            if (temptimer.LiveTimer) {
                Globals.runningLiveTimerCommands = true;
                CommandLists.addToFront(function () {
                   Globals.runningLiveTimerCommands = false;
                });
                ProcessAction(tempact, true);
                RunCommands(Globals.theObj, null, null);
                return;
            } else {
                ProcessAction(tempact, false);
            }
        }

        UpdateStatusBars();
        runNextAfterPause(function () {
            if (Globals.bResetTimer)
                return callback();
            tempact = GetAction(temptimer.Actions, "<<On Turn " +
                temptimer.TurnNumber.toString() + ">>");
            if (tempact != null)
                ProcessAction(tempact, false); //null);
            UpdateStatusBars();

            runNextAfterPause(function () {
                if (Globals.bResetTimer)
                    return callback();
                if (temptimer.TurnNumber == temptimer.Length) {
                    tempact = GetAction(temptimer.Actions, "<<On Last Turn>>");
                    if (tempact != null)
                        ProcessAction(tempact, false); //null);
                }
                UpdateStatusBars();
                callback();
            });
        });
    }
}

function UpdateStatusBars() {
    SetupStatusBars();
}

function GetExit(room, dir) {
    for (var i = 0; i < room.Exits.length; i++) {
        if (room.Exits[i].Direction == dir) {
            return room.Exits[i];
        }
    }
    return null;
}