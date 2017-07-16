var MasterCommandList = [];
var currenttimer = null;
var bRunningTimers = false;
var AdditionalInput = "";
var InputDataObject = null;
var TheObj = null;
var bGameReset = false;
var bCancelMove = false;
var bResetTimer = false;
var CurrentImage = "";
var MasterLoopObject = null;
var MasterIdx = 0;
var MasterLoopArray = null;
var gamePaused = false;

var Logger = {
    level: 0,
    log: function () {
        if (this.level > 0) {
            console.log.apply(this, arguments);
        }
    },
    logExecutingAction: function (action) {
        Logger.log(
            'ACTION:',
            action.name
        );
    },
    logExecutingCommand: function (command, part2, part3, part4) {
        Logger.log(
            'COMMAND:',
            [
                command.cmdtype,
                part2,
                part3,
                part4
            ].join(':'),
            'Executing'
        );
    },
    logEvaluatedCondition: function (condition, passed) {
        Logger.log(
            'CONDITION:',
            condition.conditionname,
            passed ? 'Passed' : 'Failed'
        )
    }
};

Logger.level = 1;

function custom__setInputMenuTitle(act) {
    $("#InputMenuTitle").text(PerformTextReplacements(act.CustomChoiceTitle, null));
    $("#inputmenu").css("visibility", "visible");
    $("#inputmenu").toggleClass('cancellable', act.EnhInputData && act.EnhInputData.bAllowCancel);
}

function custom__showGameElements() {
    $("#RoomThumb").css("visibility", "visible");
    $("#PlayerPortrait").css("visibility", "visible");

    $("#RoomThumbImg").css("visibility", "visible");
    $("#PlayerImg").css("visibility", "visible");
    $("#RoomObjectsPanel").css("visibility", "visible");
    $("#VisibleCharactersPanel").css("visibility", "visible");
    $("#InventoryPanel").css("visibility", "visible");
    $(".compass-direction").css("visibility", "visible");
    SetExits();
}

function custom__hideGameElements() {
    $("#RoomThumb").css("visibility", "hidden");
    $("#PlayerImg").css("visibility", "hidden");
    $("#RoomThumbImg").css("visibility", "hidden");
    $("#RoomObjectsPanel").css("visibility", "hidden");
    $("#VisibleCharactersPanel").css("visibility", "hidden");
    $("#InventoryPanel").css("visibility", "hidden");
    $(".compass-direction").css("visibility", "hidden");
}

function custom__addInputChoice($div) {
    $div.click(function() {
        selectedobj = $(this).val();
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

    $("#inputchoices").append($div);
}

function custom__clearInputChoices() {
    $("#inputchoices").empty();
}

function custom__clearCmdInputChoices() {
    $("#cmdinputchoices").empty();
}

function custom__setCmdInputMenuTitle(act, title) {
    $("#cmdInputMenuTitle").text(title);
    $("#cmdinputmenu").css("visibility", "visible");
    $("#cmdinputmenu").toggleClass('cancellable', act.EnhInputData && act.EnhInputData.bAllowCancel);
}

function custom__addCmdInputChoice($div) {
    $div.click(function () {
        selectedobj = $(this).val();
        if (selectedobj != null) {
            $("#cmdinputmenu").hide();
            custom__showGameElements();
            $("#cmdinputmenu").css("visibility", "hidden");
            SetCommandInput(VariableGettingSet, selectedobj);
            RunCommands(pausecommandargs[0], pausecommandargs[1], pausecommandargs[2], pausecommandargs[3], pausecommandargs[4], pausedindex + 1);
        }
    });

    $("#cmdinputchoices").append($div);
    $("#cmdinputmenu").show();
}

function custom__setCmdInputForCustomChoices(title, tempcommand) {
    custom__clearCmdInputChoices();
    for (_i = 0; _i < tempcommand.CustomChoices.length; _i++) {
        var $div = $("<div>", {
            class: "cmdinputchoices",
            text: tempcommand.CustomChoices[_i],
            value: tempcommand.CustomChoices[_i]
        });

        custom__addCmdInputChoice($div);
    }
    custom__setCmdInputMenuTitle(tempcommand, title);
}

function custom__showTextMenuChoice(title) {
    $("#textMenuTitle").text(title);
    $("#textchoice").css("visibility", "visible");
    $("#textchoice input").focus();
}

function AddToMaster(commands, addinputdata) {
    for (var _i = 0; _i < commands.length; _i++) {
        commands[_i].AdditionalInputData = addinputdata;
        MasterCommandList.push(commands[_i]);
    }
}

function InsertToMaster(commands, addinputdata) {
    for (var _i = commands.length - 1; _i >= 0; _i--) {
        commands[_i].AdditionalInputData = addinputdata;
        MasterCommandList.splice(0, 0, commands[_i]);
    }
}

function evalJankyJavascript(str) {
    return eval(
        str
            .replace(new RegExp("//.*?<\s*/?\s*br\s*>", "g"), "") // line comments ending in <br>
            .replace(new RegExp("</br>", "g"), "")
            .replace(new RegExp("<br>", "g"), "")
            .replace(new RegExp("\n", "g"), "")
    );
}

function SetBorders() {
    if (GetActionCount(GetRoom(TheGame.Player.CurrentRoom).Actions) > 0) {
        //set green border on room thumb
        $("#RoomThumb, #RoomThumbImg").addClass('has-actions');
    } else {
        $("#RoomThumb, #RoomThumbImg").removeClass('has-actions');
    }
    if (GetActionCount(TheGame.Player.Actions) > 0) {
        $("#PlayerImg").css("border-color", "green");
    } else {
        $("#PlayerImg").css("border-color", "transparent");
    }
}

function GetActionCount(Actions) {
    //CurActions = Actions;
    var count = 0;
    for (var i = 0; i < Actions.length; i++) {
        if (actionShouldBeVisible(Actions[i])) {
            count++;
        }
    }
    return count;
}

function SetRoomThumb(ImageName) {
    if (ImageName == null || ImageName == "None")
        return;
    $("#RoomImageLayers").empty();
    var tempimage = new Image();
    tempimage.onload = function() {
        var width = parseInt(tempimage.width);
        var height = parseInt(tempimage.height);
        var scalefactor = calculateRoomThumbScale(tempimage);
        $("#RoomThumbImg").attr("src", "images/" + ImageName);
        $("#RoomThumbImg").width(width * scalefactor);
        $("#RoomThumbImg").height(height * scalefactor);

        var checkimg = GetGameImage(ImageName);
        if (checkimg != null) {
            //layers?
            if (checkimg.LayeredImages[0] != "") {

                var thelayers = checkimg.LayeredImages[0].split(",");
                for (var _i = 0; _i < thelayers.length; _i++) {
                    var img = $('<img class="RoomLayeredImage">');
                    img.attr('src', "images/" + thelayers[_i]);
                    img.width($("#RoomThumbImg").width());
                    img.height($("#RoomThumbImg").height());
                    img.css({
                        top: $("#RoomThumbImg").position().top,
                        left: $("#RoomThumbImg").position().left
                    });
                    img.click(function(clickEvent) {
                        TheObj = GetRoom(TheGame.Player.CurrentRoom);
                        DisplayActions(TheObj.Actions, clickEvent);
                    });
                    img.appendTo('#RoomImageLayers');
                }

            }




        }

    };
    tempimage.src = "images/" + ImageName;


}

function GetImage(ImageName) {
    if (ImageName == null || ImageName == "None")
        return;
    $("#MainImageLayers").empty();
    CurrentImage = ImageName;
    var tempimage = new Image();
    tempimage.onload = function() {
        $("#MainImg").attr("src", "images/" + ImageName);

        var checkimg = GetGameImage(ImageName);
        if (checkimg != null) {
            //layers?
            if (checkimg.LayeredImages[0] != "") {

                var thelayers = checkimg.LayeredImages[0].split(",");
                for (var _i = 0; _i < thelayers.length; _i++) {
                    var img = $('<img class="MainLayeredImage">');
                    img.attr('src', "images/" + thelayers[_i]);
                    img.css({
                        top: $("#MainImg").position().top,
                        left: $("#MainImg").position().left
                    });
                    img.appendTo('#MainImageLayers');
                }

            }




        }
    };
    tempimage.src = "images/" + ImageName;



}

function SetPortrait(ImageName) {
    if (ImageName == null || ImageName == "")
        return;
    $("#PortraitImageLayers").empty();
    var tempimage = new Image();
    tempimage.onload = function() {
        var width = parseInt(tempimage.width);
        var height = parseInt(tempimage.height);
        var scalefactor = calculatePortraitScale(tempimage);
        var newwidth = (width * scalefactor + 0.5) | 0;
        var newheight = (height * scalefactor + 0.5) | 0;
        if (newwidth >= $("#PlayerImg").width())
            newwidth = $("#PlayerImg").width() - 2;
        if (newheight >= $("#PlayerImg").height())
            newheight = $("#PlayerImg").height() - 2;
        $("#PlayerImg").attr("src", "images/" + ImageName);
        $("#PlayerImg").width(width * scalefactor);
        $("#PlayerImg").height(height * scalefactor);

        var checkimg = GetGameImage(ImageName);
        if (checkimg != null) {
            //layers?
            if (checkimg.LayeredImages[0] != "") {

                var thelayers = checkimg.LayeredImages[0].split(",");
                for (var _i = 0; _i < thelayers.length; _i++) {
                    var img = $('<img class="PortraitLayeredImage">');
                    img.attr('src', "images/" + thelayers[_i]);
                    img.width($("#PlayerImg").width());
                    img.height($("#PlayerImg").height());
                    img.css({
                        top: $("#PlayerImg").offset().top,
                        left: $("#PlayerImg").offset().left
                    });
                    img.click(function(clickEvent) {
                        TheObj = TheGame.Player;
                        DisplayActions(TheGame.Player.Actions, clickEvent);
                    });
                    img.appendTo('#PortraitImageLayers');
                }

            }




        }

    };
    tempimage.src = "images/" + ImageName;



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
    for (var _i = 0; _i < TheGame.Objects.length; _i++) {
        var obj = TheGame.Objects[_i];
        if (obj.locationtype == "LT_PLAYER" && obj.bVisible) {
            var $div = $("<div>", {
                class: "RoomObjects",
                text: objecttostring(obj),
                value: obj.UniqueIdentifier
            });
            $div.toggleClass('no-actions', GetActionCount(obj.Actions) === 0);

            $div.click(function(clickEvent) {
                selectedobj = GetObject($(this).val());
                if (selectedobj != null) {
                    TheObj = selectedobj;
                    $(this).val([]);
                    DisplayActions(selectedobj.Actions, clickEvent);
                }
            });
            $("#Inventory").append($div);
            if (obj.bContainer) {
                if ((obj.bOpenable) && (!obj.bOpen)) {} else {
                    AddOpenedObjects(obj, $("#Inventory"), selectedobj);
                }
            }
        }
    }
}

function RefreshRoomObjects() {
    $("#RoomObjects").empty();
    for (var _i = 0; _i < TheGame.Objects.length; _i++) {
        var obj = TheGame.Objects[_i];
        if (obj.locationtype == "LT_ROOM" && obj.bVisible && obj.locationname == TheGame.Player.CurrentRoom) {
            var $div = $("<div>", {
                class: "RoomObjects",
                text: objecttostring(obj),
                value: obj.UniqueIdentifier
            });
            $div.toggleClass('no-actions', GetActionCount(obj.Actions) === 0);

            $div.click(function(clickEvent) {
                selectedobj = GetObject($(this).val());
                if (selectedobj != null) {
                    TheObj = selectedobj;
                    $("#RoomObjects").val([]);
                    DisplayActions(selectedobj.Actions, clickEvent);
                }
            });
            $("#RoomObjects").append($div);
            if (obj.bContainer) {
                if ((obj.bOpenable) && (!obj.bOpen)) {} else {
                    AddOpenedObjects(obj, $("#RoomObjects"), selectedobj);
                }
            }
        }
    }
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
                                selectedobj = GetObject($(this).val());
                                if (selectedobj != null) {
                                    TheObj = selectedobj;
                                    $("#RoomObjects").val([]);
                                    DisplayActions(selectedobj.Actions, clickEvent);
                                }
                            });
                            $("#RoomObjects").append($div);
                            if (tempobj.bContainer) {
                                if ((tempobj.bOpenable) && (!tempobj.bOpen)) {} else
                                    AddOpenedObjects(tempobj, $("#RoomObjects"), selectedobj);
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
        return action.name.toLowerCase() === name.toLowerCase();
    });
}

function GetTimer(timerName) {
    timerName = timerName.trim();
    return TheGame.Timers.find(function (timer) {
        return timer.Name === timerName;
    });
}

function GetVariable(variableName) {
    variableName = variableName.trim();
    if (variableName.indexOf("(") > -1) {
        variableName = variableName.substring(0, variableName.indexOf("("));
    }
    return TheGame.Variables.find(function (variable) {
        return variable.varname.toLowerCase() === variableName.toLowerCase();
    });
}

function AddOpenedObjects(tempobj, thelistbox, selitem) {
    for (var i = 0; i < TheGame.Objects.length; i++) {
        var tempobj2 = TheGame.Objects[i];
        if ((tempobj2.locationtype == "LT_IN_OBJECT") && (tempobj2.locationname == tempobj.UniqueIdentifier) && (tempobj2.bVisible)) {
            var $div = $("<div>", {
                class: "inputchoices",
                text: "--" + objecttostring(tempobj2),
                value: tempobj2.UniqueIdentifier
            });
            $div.toggleClass('no-actions', GetActionCount(tempobj2.Actions) === 0);

            $div.click(function(clickEvent) {
                selectedobj = GetObject($(this).val());
                if (selectedobj != null) {
                    TheObj = selectedobj;
                    $(this).val([]);
                    DisplayActions(selectedobj.Actions, clickEvent);
                }
            });

            thelistbox.append($div);
            if ((tempobj2.bOpenable) && (tempobj2.bOpen)) {
                AddOpenedObjects(tempobj2, thelistbox, selitem);
            }
        }
    }
}

function RefreshCharacters() {
    $("#VisibleCharacters").empty();
    for (var _i = 0; _i < TheGame.Characters.length; _i++) {
        var obj = TheGame.Characters[_i];
        if (obj.CurrentRoom == TheGame.Player.CurrentRoom) {
            var $div = $("<div>", {
                class: "VisibleCharacters",
                text: CharToString(obj),
                value: obj.Charname
            });
            $div.toggleClass('no-actions', GetActionCount(obj.Actions) === 0);

            $div.click(function(clickEvent) {
                selectedobj = GetCharacter($(this).val());
                if (selectedobj != null) {
                    TheObj = selectedobj;
                    DisplayActions(selectedobj.Actions, clickEvent);
                }
            });

            $("#VisibleCharacters").append($div);
        }
    }
}

function GetObject(uid) {
    if (uid == null) {
        return null;
    }
    uid = uid.trim();

    for (var _i = 0; _i < TheGame.Objects.length; _i++) {
        if (TheGame.Objects[_i].UniqueIdentifier == uid) {
            return TheGame.Objects[_i];
        }
    }
    for (var _i = 0; _i < TheGame.Objects.length; _i++) {
        if (TheGame.Objects[_i].name == uid) {
            return TheGame.Objects[_i];
        }
    }
}

function GetCharacter(characterName) {
    if (characterName == null) {
        return null;
    }

    characterName = characterName.trim();
    for (var _i = 0; _i < TheGame.Characters.length; _i++) {
        if (TheGame.Characters[_i].Charname == characterName) {
            return TheGame.Characters[_i];
        }
    }
}

function AddChildAction(Actions, Indent, ActionName) {
    for (var _i = 0; _i < Actions.length; _i++) {
        if (Actions[_i].name.substring(0, 2) != "<<" && Actions[_i].bActive && Actions[_i].actionparent == ActionName) {
            var $div = $("<div>", {
                class: "ActionChoices",
                text: Indent + Actions[_i].name,
                value: Actions[_i].name
            });


            $div.click(function() {
                var selectionchoice = $(this).val();
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

            $("#Actionchoices").append($div);

            /* var newopt = new Option(Indent + Actions[_i].name, Actions[_i].name);
            
            newopt.Action = Actions[_i];
            $("#Actionchoices").append(newopt);*/
            AddChildAction(Actions, "--" + Indent, Actions[_i].name);
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

function DisplayActions(Actions, clickEvent) {
    if (GetActionCount(Actions) === 0) {
        return;
    }

    $("#Actionchoices").empty();
    CurActions = Actions;
    for (_i = 0; _i < Actions.length; _i++) {
        if (actionShouldBeVisible(Actions[_i])) {
            var $div = $("<div>", {
                class: "ActionChoices",
                text: nameForAction(Actions[_i]),
                value: Actions[_i].name
            });

            $div.click(function(e) {
                var selectionchoice = $(this).val();
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

            $("#Actionchoices").append($div);
            AddChildAction(Actions, "--", Actions[_i].name);
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
    bMasterTimer = bTimer;
    if (getObjectClass(Action) == "action" || Action.actionparent != null) //"actionparent" in Action)
        act = Action
    else {
        for (var _i = 0; _i < CurActions.length; _i++) {
            if (CurActions[_i].name == Action) {
                act = CurActions[_i];
                break;
            }
        }
    }
    var curclass = getObjectClass(selectedobj);
    var actionname = "";
    if (selectedobj != null) {
        try {
            if (curclass == "ragsobject" || "bWearable" in selectedobj)
                actionname = selectedobj.name + ": " + act.name;
            else if (curclass == "character" || "Charname" in selectedobj)
                actionname = selectedobj.Charname + ": " + act.name;
        } catch (err) {}
    }
    if (!bTimer) {}
    if (act.InputType != "None") {
        InputDataObject = act;
        if (act.InputType == "Custom") {
            custom__clearInputChoices();
            for (_i = 0; _i < act.CustomChoices.length; _i++) {
                var $div = $("<div>", {
                    class: "inputchoices",
                    text: PerformTextReplacements(act.CustomChoices[_i]),
                    value: PerformTextReplacements(act.CustomChoices[_i])
                });

                custom__addInputChoice($div);
            }
            custom__setInputMenuTitle(act);
        } else if (act.InputType == "Character") {
            custom__clearInputChoices();
            for (_i = 0; _i < TheGame.Characters.length; _i++) {
                if (TheGame.Characters[_i].CurrentRoom == TheGame.Player.CurrentRoom) {
                    var $div = $("<div>", {
                        class: "inputchoices",
                        text: TheGame.Characters[_i].Charname,
                        value: TheGame.Characters[_i].Charname
                    });

                    custom__addInputChoice($div);
                }
            }
            custom__setInputMenuTitle(act);
        } else if (act.InputType == "Object") {
            custom__clearInputChoices();
            for (_i = 0; _i < TheGame.Objects.length; _i++) {
                var obj = TheGame.Objects[_i];
                if (obj.locationtype == "LT_PLAYER" || (obj.locationtype == "LT_ROOM" && obj.locationname == TheGame.Player.CurrentRoom)) {
                    var $div = $("<div>", {
                        class: "inputchoices",
                        text: objecttostring(obj),
                        value: obj.UniqueIdentifier
                    });

                    custom__addInputChoice($div);
                }
            }
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
                                        class: "inputchoices",
                                        text: objecttostring(tempobj),
                                        value: tempobj.UniqueIdentifier
                                    });

                                    custom__addInputChoice($div);

                                    if (tempobj.bContainer) {
                                        if ((tempobj.bOpenable) && (!tempobj.bOpen)) {} else
                                            AddOpenedObjects(tempobj, $("#inputchoices"), selectedobj);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            custom__setInputMenuTitle(act);
        } else if (act.InputType == "Inventory") {
            custom__clearInputChoices();
            for (_i = 0; _i < TheGame.Objects.length; _i++) {
                var obj = TheGame.Objects[_i];
                if (obj.locationtype == "LT_PLAYER") {
                    var $div = $("<div>", {
                        class: "inputchoices",
                        text: objecttostring(obj),
                        value: obj.UniqueIdentifier
                    });

                    custom__addInputChoice($div);
                }
            }
            custom__setInputMenuTitle(act);
        } else if (act.InputType == "ObjectOrCharacter") {
            custom__clearInputChoices();
            for (_i = 0; _i < TheGame.Objects.length; _i++) {
                var obj = TheGame.Objects[_i];
                if (obj.locationtype == "LT_PLAYER" || (obj.locationtype == "LT_ROOM" && obj.locationname == TheGame.Player.CurrentRoom)) {
                    var $div = $("<div>", {
                        class: "inputchoices",
                        text: objecttostring(obj),
                        value: obj.UniqueIdentifier
                    });

                    custom__addInputChoice($div);
                }
            }
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
                                        class: "inputchoices",
                                        text: objecttostring(tempobj),
                                        value: tempobj.UniqueIdentifier
                                    });

                                    custom__addInputChoice($div);

                                    if (tempobj.bContainer) {
                                        if ((tempobj.bOpenable) && (!tempobj.bOpen)) {} else
                                            AddOpenedObjects(tempobj, $("#inputchoices"), selectedobj);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            for (_i = 0; _i < TheGame.Characters.length; _i++) {
                if (TheGame.Characters[_i].CurrentRoom == TheGame.Player.CurrentRoom) {
                    var $div = $("<div>", {
                        class: "inputchoices",
                        text: TheGame.Characters[_i].Charname,
                        value: TheGame.Characters[_i].Charname
                    });

                    custom__addInputChoice($div);
                }
            }
            custom__setInputMenuTitle(act);
        } else if (act.InputType == "Text") {
            $("#textactionMenuTitle").text(act.CustomChoiceTitle);
            $("#textactionchoice").css("visibility", "visible");
        }
        var AdditionalInputData = "";
        if (act.InputType != "Text") {}
        custom__hideGameElements();
    } else {
        ExecuteAction(act, bTimer);
    }
    SetBorders();
}

function addCommands(insertFirst, commands, AdditionalInputData, act) {
    if (insertFirst) {
        InsertToMaster(commands, AdditionalInputData);
    } else {
        AddToMaster(commands, AdditionalInputData);
        RunCommands(TheObj, AdditionalInputData, act, null);
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

function ExecuteAction(act, bTimer, AdditionalInputData) {
    Logger.logExecutingAction(act);
    var bPassed = true;
    if (act.bConditionFailOnFirst) {
        for (var _i = 0; _i < act.Conditions.length; _i++) {
            var tempcond = act.Conditions[_i];
            if (TestCondition(tempcond, AdditionalInputData, act.InputType, act, null)) {
                if (tempcond.Checks.length == 1 && isLoopCheck(tempcond.Checks[0])) {
                    // Do nothing?
                } else {
                    addCommands(bTimer, tempcond.PassCommands, AdditionalInputData, act);
                }
            } else {
                bPassed = false;
                addCommands(bTimer, tempcond.FailCommands, AdditionalInputData, act);
            }
        }
    } else {
        bPassed = (act.Conditions.length === 0);
        for (var _i = 0; _i < act.Conditions.length; _i++) {
            var tempcond = act.Conditions[_i];
            var btestresult = TestCondition(tempcond, AdditionalInputData, act.InputType, act, null);
            if (btestresult) {
                bPassed = btestresult;
                addCommands(bTimer, tempcond.PassCommands, AdditionalInputData, act);
            } else {
                addCommands(bTimer, tempcond.FailCommands, AdditionalInputData, act);
            }
        }
    }
    if (bPassed) {
        addCommands(bTimer, act.PassCommands, AdditionalInputData, act);
    } else {
        addCommands(bTimer, act.FailCommands, AdditionalInputData, act);
    }
}

function runAfterPause(runNextPhase) {
    if (gamePaused) {
        MasterCommandList.push(runNextPhase);
    } else {
        runNextPhase();
    }
}

function ChangeRoom(currentroom, bRunTimerEvents, bRunEvents) {
    if (currentroom == null)
        return;
    $("#RoomTitle").html(currentroom.Name);
    SetRoomThumb(currentroom.RoomPic);
    TheGame.Player.CurrentRoom = currentroom.UniqueID;
    $("#MainText").append('</br><b>' + MovingDirection + "</b>");
    if (bRunEvents && !currentroom.bEnterFirstTime) {
        currentroom.bEnterFirstTime = true;
        RunEvents("<<On Player Enter First Time>>");
    }
    runAfterPause(function () {
        if (bRunEvents) {
            RunEvents("<<On Player Enter>>");
        }
        runAfterPause(function () {
            GetImage(currentroom.RoomPic);
            $("#MainText").animate({
                scrollTop: $("#MainText")[0].scrollHeight
            });
            AddTextToRTF(currentroom.Description, "Black", "Regular");
            $("#MainText").animate({
                scrollTop: $("#MainText")[0].scrollHeight
            }, 0);
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

function CheckGroupMembership(step2, step3, groupMembershipType) {
    //step 2 is the item, step 3 is the group
    var TheTable = "Media";
    var TheGroup = "MediaGroups";
    if (groupMembershipType == "GroupMembershipType.GM_Item") {
        TheTable = "Items";
        TheGroup = "ItemGroups";
    }
    /* SqlCeConnection con = Game.GetDBConnection();
    SqlCeCommand cmd = new SqlCeCommand(@"select GroupName from " + TheTable + @" where
    Name=@name",con);
    cmd.Parameters.AddWithValue("@name", step2);
    SqlCeDataReader dr = cmd.ExecuteReader();
    string itemvalue = string.Empty;
    if (dr.Read())
    {
    itemvalue = dr["GroupName"].ToString();
    }
    dr.Close();
    dr.Dispose();
    cmd.Dispose();*/

    if (itemvalue == step3) {
        return true;
    } else {
        /* string cmdtext = string.Empty;

        cmdtext = @"Select Name from " + TheGroup + @" where
        parent=@parent";
        cmd = new SqlCeCommand(cmdtext, con);
        cmd.Parameters.AddWithValue("@parent", step3);
        dr = cmd.ExecuteReader();
        while (dr.Read())
        {
        bool bretval = CheckGroupMembership(step2, dr["Name"].ToString(), groupMembershipType);
        if (bretval)
        {
        return bretval;
        }

        }*/
        return false;
    }
}

function TestCondition(tempcond, AdditionalInputData, acttype, Act, loopobject) {
    var bResult = true;
    var counter = 0;

    function performLoopIteration() {
        if (MasterIdx < MasterLoopArray.length) {
            MasterLoopObject = MasterLoopArray[MasterIdx];
            MasterIdx++;

            InsertToMaster([tempcond]);
            InsertToMaster(tempcond.PassCommands);
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
            if (TheGame == null)
                return false;
            var step2 = PerformTextReplacements(tempcheck.ConditionStep2, loopobject);
            var step3 = PerformTextReplacements(tempcheck.ConditionStep3, loopobject);
            var step4 = PerformTextReplacements(tempcheck.ConditionStep4, loopobject);
            switch (tempcheck.CondType) {
                case "CT_Item_InGroup":
                    {
                        var tempitem = GetObject(step2);
                        bResult = tempitem.GroupName == step3;
                        break;
                    }
                case "CT_MultiMedia_InGroup":
                    {
                        break;
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
                        bResult = (MovingDirection == tempdir);
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
                        bResult = TheGame.Player.CurrentRoom.UniqueID == curchar.CurrentRoom;
                        break;
                    }
                case "CT_Loop_While":
                    {
                        if (TestVariable(step2, step3, step4)) {
                            var condarray = [tempcond];
                            InsertToMaster(condarray);
                            InsertToMaster(tempcond.PassCommands);
                        }
                        break;
                    }
                case "CT_Loop_Rooms":
                    {
                        if (MasterLoopArray == null)
                            MasterLoopArray = TheGame.Rooms;
                        performLoopIteration();
                        break;
                    }
                case "CT_Loop_Exits":
                    {
                        if (MasterLoopArray == null) {
                            var temproom = GetRoom(step2);
                            if (temproom != null) {
                                MasterLoopArray = temproom.Exits;
                            }
                        }
                        performLoopIteration();
                        break;
                    }
                case "CT_Loop_Characters":
                    {
                        if (MasterLoopArray == null)
                            MasterLoopArray = TheGame.Characters;
                        performLoopIteration();
                        break;
                    }
                case "CT_Loop_Item_Group":
                    {
                        if (MasterLoopArray == null) {
                            MasterLoopArray = TheGame.Objects.filter(function (item) {
                                return item.GroupName === step2;
                            });
                        }
                        performLoopIteration();
                        break;
                    }
                case "CT_Loop_Item_Char_Inventory":
                    {
                        if (MasterLoopArray == null) {
                            MasterLoopArray = TheGame.Objects.filter(function (item) {
                                return item.locationtype === "LT_CHARACTER" && item.locationname === step2;
                            });
                        }
                        performLoopIteration();
                        break;
                    }
                case "CT_Loop_Item_Container":
                    {
                        if (MasterLoopArray == null) {
                            MasterLoopArray = TheGame.Objects.filter(function (item) {
                                return item.locationtype === "LT_IN_OBJECT" && item.locationname === step2;
                            });
                        }
                        performLoopIteration();
                        break;
                    }
                case "CT_Loop_Item_Inventory":
                    {
                        if (MasterLoopArray == null) {
                            MasterLoopArray = TheGame.Objects.filter(function (item) {
                                return item.locationtype === "LT_PLAYER";
                            });
                        }
                        performLoopIteration();
                        break;
                    }
                case "CT_Loop_Item_Room":
                    {
                        if (MasterLoopArray == null) {
                            MasterLoopArray = TheGame.Objects.filter(function (item) {
                                return item.locationtype === "LT_ROOM" && item.locationname === step2;
                            });
                        }
                        performLoopIteration();
                        break;
                    }
                case "CT_Loop_Items":
                    {
                        if (MasterLoopArray == null) {
                            MasterLoopArray = TheGame.Objects;
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
                                for (var _i = 0; _i < temproom.CustomProperties.length; _i++) {
                                    var curprop = temproom.CustomProperties[_i];
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
                                for (var _i = 0; _i < temproom.CustomProperties.length; _i++) {
                                    var curprop = temproom.CustomProperties[_i];
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
                                for (var _i = 0; _i < temproom.CustomProperties.length; _i++) {
                                    var curprop = temproom.CustomProperties[_i];
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
                                for (var _i = 0; _i < temproom.CustomProperties.length; _i++) {
                                    var curprop = temproom.CustomProperties[_i];
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
                                if (TheObj != null) {
                                    temproom = TheObj;
                                }
                            } else {
                                temproom = GetObject(roomname);
                            }
                            if (temproom != null) {
                                for (var _i = 0; _i < temproom.CustomProperties.length; _i++) {
                                    var curprop = temproom.CustomProperties[_i];
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
                        for (var _i = 0; _i < TheGame.Player.CustomProperties.length; _i++) {
                            var curprop = TheGame.Player.CustomProperties[_i];
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
                        if (AdditionalData != null)
                            datatocheck = AdditionalData; //AdditionalData[0];
                        if (tempcond.AdditionalInputData != null && tempcond.AdditionalInputData != "")
                            datatocheck = tempcond.AdditionalInputData; //tempcond.AdditionalInputData[0];
                        if (acttype == "Text") {
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
    if (!MasterLoopArray) {
        Logger.logEvaluatedCondition(tempcond, bResult);
    }
    return bResult;
}

function RefreshPictureBoxes() {
    GetImage(CurrentImage);
    SetPortrait(TheGame.Player.PlayerPortrait);

    SetRoomThumb(GetRoom(TheGame.Player.CurrentRoom).RoomPic);

}

function RunCommands(TheObj, AdditionalInputData, act, LoopObj, lastindex) {
    pausecommandargs = arguments;
    var bResult = false;
    var i = 0;
    while (MasterCommandList.length > 0 && $("#RoomThumb").css("visibility") != "hidden") {
        if (typeof MasterCommandList[0] === "function") {
            var callback = MasterCommandList[0];
            MasterCommandList.splice(0, 1);
            callback();
            continue;
        }

        var tempcommand = null;
        var tempcond = null;
        if (MasterLoopObject != null)
            LoopObj = MasterLoopObject;
        var curtype = getObjectClass(MasterCommandList[0]);
        if (curtype == "command" || "CommandName" in MasterCommandList[0]) {
            tempcommand = MasterCommandList[0];
        } else {
            tempcond = MasterCommandList[0];
        }
        MasterCommandList.splice(0, 1);
        if (tempcond != null) {
            if (TestCondition(tempcond, AdditionalInputData, act.InputType, act, LoopObj)) {
                if (tempcond.Checks.length === 1 && isLoopCheck(tempcond.Checks[0])) {
                    // Do nothing?
                } else {
                    InsertToMaster(tempcond.PassCommands);
                }
            } else {
                InsertToMaster(tempcond.FailCommands);
            }
        } else if (tempcommand != null) {
            if (TheGame == null)
                return false;
            var part2 = PerformTextReplacements(tempcommand.CommandPart2, LoopObj);
            var part3 = PerformTextReplacements(tempcommand.CommandPart3, LoopObj);
            var part4 = PerformTextReplacements(tempcommand.CommandPart4, LoopObj);
            var cmdtxt = PerformTextReplacements(tempcommand.CommandText, LoopObj);
            Logger.logExecutingCommand(tempcommand, part2, part3 ,part4);
            try {
                switch (tempcommand.cmdtype) {
                    case "CT_LAYEREDIMAGE_ADD":
                        {
                            var temp = GetGameImage(part2);
                            if (temp != null) {
                                if (temp.LayeredImages[0].length > 0)
                                    temp.LayeredImages[0] += ",";
                                temp.LayeredImages[0] += part3;

                                //temp.LayeredImages.Add(part3);
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
                            break;
                        }
                    case "CT_MM_GETRANDOMGROUP":
                        {
                            break;
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
                            break;
                        }
                    case "CT_DISPLAYITEMDESC":
                        {
                            if (part2 == "00000000-0000-0000-0000-000000000004") {
                                if (TheObj != null)
                                    AddTextToRTF(TheObj.description, "Black", "Regular");
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
                            break;
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
                            bCancelMove = true;
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
                                for (_i = 0; _i < tempact.CustomChoices.length; _i++) {
                                    var str = tempact.CustomChoices[_i];
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
                                for (_i = 0; _i < tempact.CustomChoices.length; _i++) {
                                    if (tempact.CustomChoices[_i] == cmdtxt) {
                                        tempact.CustomChoices.splice(_i, 1);
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
                            pausedindex = i;
                            bExitPauseLoop = false;
                            AddTextToRTF("--------------------------------\r\n", "Black", "Bold");
                            PauseGame();
                            return;
                            break;
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
                                for (var _i = 0; _i < tempobj.LayeredZoneLevels.length; _i++) {
                                    var str = tempobj.LayeredZoneLevels[_i];
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
                                for (var _i = 0; _i < tempobj.LayeredZoneLevels.length; _i++) {
                                    var str = tempobj.LayeredZoneLevels[_i];
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
                            custom__hideGameElements();
                            break;
                        }
                    case "CT_MOVEITEMTOINV":
                        {
                            var Tempobj = null;
                            if (part2 == ("00000000-0000-0000-0000-000000000004")) {
                                if (TheObj != null) {
                                    Tempobj = TheObj;
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
                                if (TheObj != null) {
                                    Tempobj = TheObj;
                                }
                            } else {
                                Tempobj = GetObject(part2);
                            }
                            var Destobj = null;
                            if (part3 == "00000000-0000-0000-0000-000000000004") {
                                if (TheObj != null) {
                                    Destobj = TheObj;
                                }
                            } else {
                                Destobj = GetObject(part3);
                            }
                            if (Tempobj != null && Destobj != null) {
                                for (var _i = 0; _i < TheGame.Objects.length; _i++) {
                                    var anObj = TheGame.Objects[_i];
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
                                if (TheObj != null)
                                    Tempobj = TheObj;
                            } else {
                                Tempobj = GetObject(part2);
                            }
                            if (Tempobj != null) {
                                if (part3 == "Visible")
                                    Tempobj.bVisible = true;
                                else
                                    Tempobj.bVisible = false;
                                RefreshRoomObjects();
                            }
                            break;
                        }
                    case "CT_MOVEINVENTORYTOCHAR":
                        {
                            for (var _i = 0; _i < TheGame.Objects.length; _i++) {
                                var obj = TheGame.Objects[_i];
                                if (obj.locationtype == "LT_PLAYER") {
                                    obj.locationtype = "LT_CHARACTER";
                                    obj.locationname = part2;
                                }
                            }
                            break;
                        }
                    case "CT_MOVEINVENTORYTOROOM":
                        {
                            for (var _i = 0; _i < TheGame.Objects.length; _i++) {
                                var obj = TheGame.Objects[_i];
                                if (obj.locationtype == "LT_PLAYER") {
                                    if (part2 == CurrentRoomGuid) {
                                        obj.locationtype = "LT_ROOM";
                                        obj.locationname = TheGame.Player.CurrentRoom;
                                    } else if (part2 == VoidRoomGuid) {
                                        obj.locationtype = "LT_NULL";
                                    } else {
                                        obj.locationtype = "LT_ROOM";
                                        obj.locationname = part2;
                                    }
                                }
                            }
                            break;
                        }
                    case "CT_MOVECHARINVTOPLAYER":
                        {
                            var tempchar = null;
                            tempchar = GetCharacter(part2);
                            if (tempchar != null) {
                                for (var _i = 0; _i < TheGame.Objects.length; _i++) {
                                    var obj = TheGame.Objects[_i];
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
                                for (var _i = 0; _i < TheGame.Objects.length; _i++) {
                                    var obj = TheGame.Objects[_i];
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
                                GetImage(tempchar.CharPortrait);
                            }
                            break;
                        }
                    case "CT_DISPLAYROOMPICTURE":
                        {
                            if (part2 == CurrentRoomGuid) {
                                var currentroom = GetRoom(TheGame.Player.CurrentRoom);
                                GetImage(currentroom.RoomPic);
                            } else {
                                var temproom = null;
                                temproom = GetRoom(part2);
                                if (temproom != null) {
                                    GetImage(temproom.RoomPic);
                                }
                            }
                            break;
                        }
                    case "CT_MOVEITEMTOROOM":
                        {
                            var Tempobj = null;
                            if (part2 == "00000000-0000-0000-0000-000000000004") {
                                if (TheObj != null)
                                    Tempobj = TheObj;
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
                                if (TheObj != null) {
                                    var locationnameref = "";
                                    try {
                                        locationnameref = part3;;
                                    } catch (err) {
                                        var locationobj = GetObject(part3);
                                        if (locationobj != null)
                                            locationnameref = locationobj.UniqueIdentifier;
                                    }
                                    if (locationnameref != "") {
                                        TheObj.locationtype = "LT_IN_OBJECT";
                                        TheObj.locationname = locationnameref;
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
                                if (TheObj != null) {
                                    TheObj.locationtype = "LT_CHARACTER";
                                    TheObj.locationname = part3;
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
                            var bRunningTimersOriginal = bRunningTimers;
                            var currentTimerOriginal = currenttimer;
                            bRunningTimers = true;
                            bResetTimer = false;
                            currenttimer = "";
                            var temptimer = GetTimer(part2);
                            if (temptimer != null) {
                                currenttimer = temptimer.Name;
                                var tempact = GetAction(temptimer.Actions, "<<On Each Turn>>");
                                if (tempact != null) {
                                    ProcessAction(tempact, true);
                                    while (bResetTimer) {
                                        bResetTimer = false;
                                        ProcessAction(tempact, true);
                                    }
                                }
                            }
                            bRunningTimers = bRunningTimersOriginal;
                            currenttimer = currentTimerOriginal;
                            break;
                        }
                    case "CT_RESETTIMER":
                        {
                            var temptimer = GetTimer(part2);
                            if (temptimer != null) {
                                temptimer.TurnNumber = 0;
                                if (bRunningTimers && currenttimer == temptimer.Name) {
                                    bResetTimer = true;
                                    return false;
                                } else {
                                    bResetTimer = false;
                                    return false;
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
                                if (TheObj != null)
                                    Tempobj = TheObj;
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
                                        for (var _i = 0; _i < temproom.CustomProperties.length; _i++) {
                                            var curprop = temproom.CustomProperties[_i];
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
                                        for (var _i = 0; _i < temproom.CustomProperties.length; _i++) {
                                            var curprop = temproom.CustomProperties[_i];
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
                                        for (var _i = 0; _i < temproom.CustomProperties.length; _i++) {
                                            var curprop = temproom.CustomProperties[_i];
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
                                        for (var _i = 0; _i < temproom.CustomProperties.length; _i++) {
                                            var curprop = temproom.CustomProperties[_i];
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
                                        if (TheObj != null) {
                                            temproom = TheObj;
                                        }
                                    } else {
                                        temproom = GetObject(roomname);
                                    }
                                    if (temproom != null) {
                                        for (var _i = 0; _i < temproom.CustomProperties.length; _i++) {
                                            var curprop = temproom.CustomProperties[_i];
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
                                for (var _i = 0; _i < temproom.CustomProperties.length; _i++) {
                                    var curprop = temproom.CustomProperties[_i];
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
                                                if (tempcommand.cmdtype == "CT_ROOM_SET_CUSTOM_PROPERTY_JS") {
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
                                                if (tempcommand.cmdtype == "CT_TIMER_SET_CUSTOM_PROPERTY_JS") {
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
                                                if (tempcommand.cmdtype == "CT_VARIABLE_SET_CUSTOM_PROPERTY_JS") {
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
                                var roomname = splits[0];
                                var property = splits[1];
                                var temproom = null;
                                if (roomname == "<Self>") {
                                    if (TheObj != null) {
                                        temproom = TheObj;
                                    }
                                } else {
                                    temproom = GetObject(roomname);
                                }
                                if (temproom != null) {
                                    for (var j = 0; j < temproom.CustomProperties.length; j++) {
                                        var curprop = temproom.CustomProperties[j];
                                        if (curprop != null) {
                                            if (curprop.Name == property) {
                                                if (tempcommand.cmdtype == "CT_ITEM_SET_CUSTOM_PROPERTY_JS") {
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
                                                if (tempcommand.cmdtype == "CT_CHAR_SET_CUSTOM_PROPERTY_JS") {
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
                                        if (tempcommand.cmdtype == "CT_PLAYER_SET_CUSTOM_PROPERTY_JS") {
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
                            if (tempcommand.cmdtype == "CT_VARIABLE_SET_JAVASCRIPT")
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
                                    GetImage(temproom.RoomPic);
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
                    case "CT_DISPLAYPICTURE":
                        {
                            GetImage(part2);
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
                                actionlist = CurActions;
                            } else {
                                tempobj = GetObject(part2);
                                actionlist = tempobj.Actions;
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
                                if (TheObj != null)
                                    Tempobj = TheObj;
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
                                if (TheObj != null)
                                    Tempobj = TheObj;
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
                                if (TheObj != null)
                                    Tempobj = TheObj;
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
                                GetCharacter(part2).CurrentRoom = part3;
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
                            TheGame.Player.CurrentRoom = part2;
                            RoomChange(false, true);
                            break;
                        }
                    case "CT_MOVETOCHAR":
                        {
                            var tempchar = GetCharacter(part2);
                            if (tempchar != null) {
                                if (tempchar.CurrentRoom != VoidRoomGuid && tempchar.CurrentRoom != CurrentRoomGuid) {
                                    TheGame.Player.CurrentRoom = GetRoom(tempchar.CurrentRoom);
                                }
                                if (TheGame.Player.CurrentRoom != null)
                                    RoomChange(false, true);
                            }
                            break;
                        }
                    case "CT_MOVETOOBJ":
                        {
                            var tempobj = GetObject(part2);
                            if (tempobj != null) {
                                if (tempobj.locationtype == "LT_ROOM") {
                                    TheGame.Player.CurrentRoom = GetRoom(tempobj.locationname);
                                }
                                if (TheGame.Player.CurrentRoom != null)
                                    RoomChange(false, true);
                            }
                            break;
                        }
                    case "CT_CHAR_MOVETOOBJ":
                        {
                            var tempchar = GetCharacter(part2);
                            var tempobj = GetObject(part3);
                            if (tempobj != null && tempchar != null) {
                                if (tempobj.locationtype == "LT_ROOM") {
                                    tempchar.CurrentRoom = tempobj.locationname;
                                }
                                if (TheGame.Player.CurrentRoom.UniqueID == tempobj.locationname)
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
                            var bTransparentChoice = false;
                            if (acttype == "Custom") {
                                custom__setCmdInputForCustomChoices(part4, tempcommand);
                            } else if (acttype == "Text") {
                                custom__showTextMenuChoice(part4);
                            } else {}
                            custom__hideGameElements();
                            VariableGettingSet = tempcommand;
                            return;
                            break;
                        }
                    case "CT_SETVARIABLEBYINPUT":
                        {
                            var acttype = part2;
                            var bTransparentChoice = false;
                            if (acttype == "Custom") {
                                custom__setCmdInputForCustomChoices(part4, tempcommand);
                            } else if (acttype == "Character") {
                                custom__clearCmdInputChoices();
                                for (_i = 0; _i < TheGame.Characters.length; _i++) {
                                    var $div = $("<div>", {
                                        class: "cmdinputchoices",
                                        text: TheGame.Character[_i].Charname,
                                        value: TheGame.Character[_i].Charname
                                    });

                                    custom__addCmdInputChoice($div)
                                }
                                custom__setCmdInputMenuTitle(act, part4);
                            } else if (acttype == "Object") {
                                custom__clearCmdInputChoices();
                                for (_i = 0; _i < TheGame.Objects.length; _i++) {
                                    var obj = TheGame.Objects[_i];
                                    if (obj.locationtype == "LT_PLAYER" || (obj.locationtype == "LT_ROOM" && obj.locationname == TheGame.Player.CurrentRoom)) {
                                        var $div = $("<div>", {
                                            class: "cmdinputchoices",
                                            text: objecttostring(obj),
                                            value: obj.UniqueIdentifier
                                        });

                                        custom__addCmdInputChoice($div)
                                    }
                                }
                                custom__setCmdInputMenuTitle(act, part4);
                            } else if (acttype == "Inventory") {
                                custom__clearCmdInputChoices();
                                for (_i = 0; _i < TheGame.Objects.length; _i++) {
                                    var obj = TheGame.Objects[_i];
                                    if (obj.locationtype == "LT_PLAYER") {
                                        var $div = $("<div>", {
                                            class: "cmdinputchoices",
                                            text: objecttostring(obj),
                                            value: obj.UniqueIdentifier
                                        });

                                        custom__addCmdInputChoice($div)
                                    }
                                }
                                custom__setCmdInputMenuTitle(act, part4);
                            } else if (acttype == "ObjectOrCharacter") {
                                custom__clearCmdInputChoices();
                                for (_i = 0; _i < TheGame.Objects.length; _i++) {
                                    var obj = TheGame.Objects[_i];
                                    if (obj.locationtype == "LT_PLAYER" || (obj.locationtype == "LT_ROOM" && obj.locationname == TheGame.Player.CurrentRoom)) {
                                        var $div = $("<div>", {
                                            class: "cmdinputchoices",
                                            text: objecttostring(obj),
                                            value: obj.UniqueIdentifier
                                        });

                                        custom__addCmdInputChoice($div)
                                    }
                                }
                                for (_i = 0; _i < TheGame.Characters.length; _i++) {
                                    var $div = $("<div>", {
                                        class: "cmdinputchoices",
                                        text: TheGame.Character[_i].Charname,
                                        value: TheGame.Character[_i].Charname
                                    });

                                    custom__addCmdInputChoice($div)

                                }
                                custom__setCmdInputMenuTitle(act, part4);
                            } else if (acttype == "Text") {
                                custom__showTextMenuChoice(part4);
                            } else {}
                            VariableGettingSet = tempcommand;
                            custom__hideGameElements();
                            return;
                            break;
                        }
                }
            } catch (err) {
                alert(err.message);
                alert("Rags can not process the command correctly.  If you are the game author," + " please correct the error in this command:" + tempcommand.cmdtype);
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
        for (var _i = 0; _i < styleformats.length; _i++) {
            var startindex = text.indexOf(styleformats[_i][0]);
            text = text.slice(0, startindex) + styleformats[_i][1] + text.slice(startindex);
            startindex = text.indexOf(styleformats[_i][0]);
            text = text.slice(0, startindex + styleformats[_i][0].length) + "</div>" + text.slice(startindex + styleformats[_i][0].length);
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
    var theobj = null;
    for (var i = 0; i < TheGame.Objects; i++) {
        var newobject = TheGame.Objects[i];
        if (newobject.name == tempobj.locationname) {
            theobj = newobject;
            break;
        }
    }
    if (theobj != null) {
        if (theobj.locationtype == "LT_PLAYER")
            return true;
        else if (theobj.locationtype == "LT_IN_OBJECT") {
            return CheckItemInInventory(theobj);
        } else
            return false;
    } else
        return false;
}

function sleep(milliseconds) {
    setTimeout(function() {
        var start = new Date().getTime();
        while ((new Date().getTime() - start) < milliseconds) {}
    }, 0);
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
        var temproom = null;
        temproom = GetRoom(name);
        if (temproom != null)
            tempact = GetAction(temproom.Actions, actionname);
    } else if (type == "Timer") {
        var temptimer = null;
        temptimer = GetTimer(name);
        if (temptimer != null)
            tempact = GetAction(temptimer.Actions, actionname);
    }
    return tempact;
}

function PauseGame() {
    gamePaused = true;
    custom__hideGameElements();
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
        for (var _i = 0; _i < temparray.length; _i++) {
            var tempobj = temparray[_i];
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
    var bInteger = false;
    var iReplacedString = 0.0;
    var iPropVal = 0.0;
    iPropVal = parseFloat(curprop.Value);
    iReplacedString = parseFloat(replacedstring);
    bInteger = true;
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
                bResult = tempvar.sString[0].indexOf(replacedstring) > -1;
            } else if (step3 == "Greater Than") {
                bResult = tempvar.sString > replacedstring;
            } else if (step3 == "Less Than") {
                bResult = tempvar.sString < replacedstring;
            }
        }
    }
    return bResult;
}

function RunEvents(EventType) {
    try {
        if (TheGame == null)
            return;
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
        for (var _i = 0; _i < TheGame.Objects.length; _i++) {
            var tempobj = TheGame.Objects[_i];
            if (tempobj.locationtype == "LT_ROOM" && tempobj.locationname == TheGame.Player.CurrentRoom) {
                if (EventType.indexOf("Player Enter") > -1) {
                    if (!tempobj.bEnterFirstTime) {
                        tempact = GetAction(tempobj.Actions, "<<On Player Enter First Time>>");
                        tempobj.bEnterFirstTime = true;
                        if (tempact != null)
                            ProcessAction(tempact, false); //tempobj);
                    }
                } else if (EventType.indexOf("Player Leave") > -1) {
                    if (!tempobj.bLeaveFirstTime) {
                        tempact = GetAction(tempobj.Actions, "<<On Player Leave First Time>>");
                        tempobj.bLeaveFirstTime = true;
                        if (tempact != null)
                            ProcessAction(tempact, false); //tempobj);
                    }
                }
                tempact = GetAction(tempobj.Actions, EventType);
                if (tempact != null) {
                    if (EventType == "<<On Player Enter>>" || EventType == "<<On Player Leave>>") {
                        if (EventType == "<<On Player Enter>>") {
                            if (startingroomid == TheGame.Player.CurrentRoom) {
                                ProcessAction(tempact, false); //tempobj);
                            }
                        } else
                            ProcessAction(tempact, false); //tempobj);
                    }
                }
                if (tempobj.bContainer) {
                    if ((tempobj.bOpenable) && (!tempobj.bOpen)) {} else {
                        for (var j = 0; j < TheGame.Objects.length; j++) {
                            var tempobj2 = TheGame.Objects[j];
                            if ((tempobj2.locationtype == "LT_IN_OBJECT") && (tempobj2.locationname == tempobj.UniqueIdentifier)) {
                                if (EventType.indexOf("Player Enter") > -1) {
                                    if (!tempobj2.bEnterFirstTime) {
                                        tempact = GetAction(tempobj2.Actions, "<<On Player Enter First Time>>");
                                        tempobj2.bEnterFirstTime = true;
                                        if (tempact != null)
                                            ProcessAction(tempact, false); //tempobj2);
                                    }
                                } else if (EventType.indexOf("Player Leave") > -1) {
                                    if (!tempobj2.bLeaveFirstTime) {
                                        tempact = GetAction(tempobj2.Actions, "<<On Player Leave First Time>>");
                                        tempobj2.bLeaveFirstTime = true;
                                        if (tempact != null)
                                            ProcessAction(tempact, false); //tempobj2);
                                    }
                                }
                                tempact = GetAction(tempobj2.Actions, EventType);
                                if (tempact != null) {
                                    if (EventType == "<<On Player Enter>>" || EventType == "<<On Player Leave>>") {
                                        if (EventType == "<<On Player Enter>>") {
                                            if (startingroomid == TheGame.Player.CurrentRoom) {
                                                ProcessAction(tempact, false); //tempobj2);
                                            }
                                        } else
                                            ProcessAction(tempact, false); //tempobj2);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        for (var _i = 0; _i < TheGame.Characters.length; _i++) {
            var tempchar = TheGame.Characters[_i];
            if (tempchar.CurrentRoom == TheGame.Player.CurrentRoom) {
                if (EventType.indexOf("Player Enter") > -1) {
                    if (!tempchar.bEnterFirstTime) {
                        tempact = GetAction(tempchar.Actions, "<<On Player Enter First Time>>");
                        tempchar.bEnterFirstTime = true;
                        if (tempact != null)
                            ProcessAction(tempact, false); //null);
                    }
                } else if (EventType.indexOf("Player Leave") > -1) {
                    if (!tempchar.bLeaveFirstTime) {
                        tempact = GetAction(tempchar.Actions, "<<On Player Leave First Time>>");
                        tempchar.bLeaveFirstTime = true;
                        if (tempact != null)
                            ProcessAction(tempact, false); //null);
                    }
                }
                tempact = GetAction(tempchar.Actions, EventType);
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
            }
        }
    } catch (err) {
        var themsg = err.message;
    }
}

function RunTimerEvents() {
    bRunningTimers = true;
    bResetTimer = false;
    currenttimer = "";
    for (var _i = 0; _i < TheGame.Timers.length; _i++) {
        var temptimer = TheGame.Timers[_i];
        if (temptimer != null) {
            currenttimer = temptimer.Name;
            var bresult = false;
            if (!temptimer.LiveTimer) {
                bresult = RunTimer(temptimer);
                while (!bresult) {
                    bresult = RunTimer(temptimer);
                }
            }
        }
        if (TheGame == null)
            return;
    }
    RefreshInventory();
    RefreshRoomObjects();
    RefreshCharacters();
}

function RunTimer(temptimer) {
    var bresult = true;
    bResetTimer = false;
    if (temptimer.Active) {
        temptimer.TurnNumber++;
        if (temptimer.TurnNumber > temptimer.Length && temptimer.TType == "TT_LENGTH") {
            if (!temptimer.Restart)
                temptimer.Active = false;
            temptimer.TurnNumber = 0;
        } else {
            var tempact = GetAction(temptimer.Actions, "<<On Each Turn>>");
            if (tempact != null)
                ProcessAction(tempact, false); //null);
            if (bResetTimer)
                return false;
            tempact = GetAction(temptimer.Actions, "<<On Turn " +
                temptimer.TurnNumber.toString() + ">>");
            if (tempact != null)
                ProcessAction(tempact, false); //null);
            if (bResetTimer)
                return false;
            if (temptimer.TurnNumber == temptimer.Length) {
                tempact = GetAction(temptimer.Actions, "<<On Last Turn>>");
                if (tempact != null)
                    ProcessAction(tempact, false); //null);
            }
        }
        UpdateStatusBars();
    }
    return bresult;
}

function UpdateStatusBars() {
    SetupStatusBars();
}

function GetExit(room, dir) {
    for (var _i = 0; _i < room.Exits.length; _i++) {
        if (room.Exits[_i].Direction == dir) {
            return room.Exits[_i];
        }
    }
    return null;
}