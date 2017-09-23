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
    if (GetActionCount(Finder.room(TheGame.Player.CurrentRoom).Actions) > 0) {
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
                    Globals.theObj = Finder.room(TheGame.Player.CurrentRoom);
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
            Globals.selectedObj = Finder.object($(this).val());
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
            Globals.selectedObj = Finder.object($(this).val());
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
        var currentroom = Finder.room(TheGame.Player.CurrentRoom);
        if (currentroom != null) {
            for (var j = 0; j < currentroom.Exits.length; j++) {
                var tempexit = currentroom.Exits[j];
                if (tempexit.PortalObjectName != "<None>") {
                    var tempobj = Finder.object(tempexit.PortalObjectName);
                    if (tempobj != null) {
                        if (tempobj.bVisible) {
                            var $div = $("<div>", {
                                class: "RoomObjects",
                                text: objecttostring(tempobj),
                                value: tempobj.UniqueIdentifier
                            });
                            $div.toggleClass('no-actions', GetActionCount(tempobj.Actions) === 0);

                            $div.click(function(clickEvent) {
                                Globals.selectedObj = Finder.object($(this).val());
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
                Globals.selectedObj = Finder.object($(this).val());
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
            Globals.selectedObj = Finder.character($(this).val());
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
                        ActionRecorder.actedOnSomething(actionRecipientToLog, selectionchoice);
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
                        ActionRecorder.actedOnSomething(actionRecipientToLog, selectiontext);
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
        GameActions.executeAction(act, bTimer);
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
            var currentroom = Finder.room(TheGame.Player.CurrentRoom);
            if (!currentroom) {
                return;
            }

            currentroom.Exits.forEach(function (roomExit) {
                if (roomExit.PortalObjectName != "<None>") {
                    var tempobj = Finder.object(roomExit.PortalObjectName);
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
    var currentroom = Finder.room(TheGame.Player.CurrentRoom);
    ChangeRoom(currentroom, bRunTimerEvents, bRunEvents);
}

function SetExits() {
    var currentroom = Finder.room(TheGame.Player.CurrentRoom);
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

function RefreshPictureBoxes() {
    showImage(Globals.currentImage);
    SetPortrait(TheGame.Player.PlayerPortrait);

    SetRoomThumb(Finder.room(TheGame.Player.CurrentRoom).RoomPic);
}

function movePlayerToRoom(roomName) {
    Globals.movingDirection = "";
    TheGame.Player.CurrentRoom = roomName;
    if (TheGame.Player.CurrentRoom) {
        RoomChange(false, true);
    }
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
        tempact = Finder.action(Finder.character(name).Actions, actionname);
    } else if (type == "Obj") {
        var tempobj = Finder.object(name);
        if (tempobj != null)
            tempact = Finder.action(tempobj.Actions, actionname);
    } else if (type == "Player") {
        tempact = Finder.action(TheGame.Player.Actions, actionname);
    } else if (type == "Room") {
        var temproom = Finder.room(name);
        if (temproom != null)
            tempact = Finder.action(temproom.Actions, actionname);
    } else if (type == "Timer") {
        var temptimer = Finder.timer(name);
        if (temptimer != null)
            tempact = Finder.action(temptimer.Actions, actionname);
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
    var tempvar = Finder.variable(part3);
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
                    var tempvar = Finder.variable(part3);
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

function RunEvents(EventType) {
    try {
        var startingroomid = TheGame.Player.CurrentRoom;
        var curroom = Finder.room(startingroomid);
        var tempact = Finder.action(curroom.Actions, EventType);
        if (tempact != null) {
            ProcessAction(tempact, false);
        }
        tempact = Finder.action(TheGame.Player.Actions, EventType);
        if (tempact != null) {
            ProcessAction(tempact, false);
        }
        Interactables.roomObjects().forEach(function (obj) {
            CommandLists.addNestedCommandList(obj);

            if (EventType.indexOf("Player Enter") > -1) {
                if (!obj.bEnterFirstTime) {
                    tempact = Finder.action(obj.Actions, "<<On Player Enter First Time>>");
                    obj.bEnterFirstTime = true;
                    if (tempact != null)
                        ProcessAction(tempact, false);
                }
            } else if (EventType.indexOf("Player Leave") > -1) {
                if (!obj.bLeaveFirstTime) {
                    tempact = Finder.action(obj.Actions, "<<On Player Leave First Time>>");
                    obj.bLeaveFirstTime = true;
                    if (tempact != null)
                        ProcessAction(tempact, false);
                }
            }
            tempact = Finder.action(obj.Actions, EventType);
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
                                    tempact = Finder.action(tempobj2.Actions, "<<On Player Enter First Time>>");
                                    tempobj2.bEnterFirstTime = true;
                                    if (tempact != null)
                                        ProcessAction(tempact, false);
                                }
                            } else if (EventType.indexOf("Player Leave") > -1) {
                                if (!tempobj2.bLeaveFirstTime) {
                                    tempact = Finder.action(tempobj2.Actions, "<<On Player Leave First Time>>");
                                    tempobj2.bLeaveFirstTime = true;
                                    if (tempact != null)
                                        ProcessAction(tempact, false);
                                }
                            }
                            tempact = Finder.action(tempobj2.Actions, EventType);
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
                    tempact = Finder.action(character.Actions, "<<On Player Enter First Time>>");
                    character.bEnterFirstTime = true;
                    if (tempact != null)
                        ProcessAction(tempact, false); //null);
                }
            } else if (EventType.indexOf("Player Leave") > -1) {
                if (!character.bLeaveFirstTime) {
                    tempact = Finder.action(character.Actions, "<<On Player Leave First Time>>");
                    character.bLeaveFirstTime = true;
                    if (tempact != null)
                        ProcessAction(tempact, false); //null);
                }
            }
            tempact = Finder.action(character.Actions, EventType);
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

        var tempact = Finder.action(temptimer.Actions, "<<On Each Turn>>");
        if (tempact != null) {
            if (temptimer.LiveTimer) {
                Globals.runningLiveTimerCommands = true;
                CommandLists.addToFront(function () {
                   Globals.runningLiveTimerCommands = false;
                });
                ProcessAction(tempact, true);
                GameCommands.runCommands(Globals.theObj, null, null);
                return;
            } else {
                ProcessAction(tempact, false);
            }
        }

        UpdateStatusBars();
        runNextAfterPause(function () {
            if (Globals.bResetTimer)
                return callback();
            tempact = Finder.action(temptimer.Actions, "<<On Turn " +
                temptimer.TurnNumber.toString() + ">>");
            if (tempact != null)
                ProcessAction(tempact, false); //null);
            UpdateStatusBars();

            runNextAfterPause(function () {
                if (Globals.bResetTimer)
                    return callback();
                if (temptimer.TurnNumber == temptimer.Length) {
                    tempact = Finder.action(temptimer.Actions, "<<On Last Turn>>");
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