var GameUI = {
    setGameTitle: function () {
        var title = GameController.title();
        document.title = title;
        $('.game-title').text(title);
    },

    setDefaultCompass: function () {
        $(".compass-rose").css("background-image", 'url("images/300px-Compass_Rose_English_North.png")');
        $(".compass-up-down").css("background-image", 'url("images/300px-Compass_Rose_UD.png")');
    },

    setInputMenuTitle: function (act) {
        $("#InputMenuTitle").text(PerformTextReplacements(act.CustomChoiceTitle, null));
        $("#inputmenu").css("visibility", "visible");
        var cancellable = (act.EnhInputData && act.EnhInputData.bAllowCancel) || act.CustomChoices.length === 0;
        $("#inputmenu").toggleClass('cancellable', cancellable);
    },

    showGameElements: function () {
        $("#RoomThumbImg").css("visibility", "visible");
        $("#PlayerImg").css("visibility", "visible");
        $("#RoomObjectsPanel").css("visibility", "visible");
        $("#VisibleCharactersPanel").css("visibility", "visible");
        $("#InventoryPanel").css("visibility", "visible");
        $(".compass-direction").css("visibility", "visible");
        SetExits();
    },

    hideGameElements: function () {
        $("#PlayerImg").css("visibility", "hidden");
        $("#RoomThumbImg").css("visibility", "hidden");
        $("#RoomObjectsPanel").css("visibility", "hidden");
        $("#VisibleCharactersPanel").css("visibility", "hidden");
        $("#InventoryPanel").css("visibility", "hidden");
        $(".compass-direction").css("visibility", "hidden");
    },

    disableSaveAndLoad: function () {
        $('#save').prop('disabled', true);
        $('#load').prop('disabled', true);
    },

    enableSaveAndLoad: function () {
        $('#save').prop('disabled', false);
        $('#load').prop('disabled', false);
    },

    clearInputChoices: function () {
        $("#inputchoices").empty();
    },

    clearCmdInputChoices: function () {
        $("#cmdinputchoices").empty();
    },

    setCmdInputMenuTitle: function (act, title) {
        $("#cmdInputMenuTitle").text(title);
        $("#cmdinputmenu").css("visibility", "visible");
        $("#cmdinputmenu").toggleClass('cancellable', act.EnhInputData && act.EnhInputData.bAllowCancel);
    },

    addInputChoice: function (act, text, value) {
        var $div = $("<div>", {
            class: "inputchoices",
            text: text
        });

        $div.click(function() {
            Globals.selectedObj = value;
            if (Globals.selectedObj != null) {
                GameController.executeAndRunTimers(function () {
                    CommandLists.setAdditionalData(Globals.selectedObj);
                    GameController.stopAwaitingInput();
                    $("#inputmenu").css("visibility", "hidden");
                    if (getObjectClass(act) == "action" || "actionparent" in act) {
                        ActionRecorder.choseInputAction(text);
                        GameActions.executeAction(act, true);
                        GameCommands.runCommands();
                    }
                });
            }
        });

        $("#inputchoices").append($div);
    },

    addCmdInputChoice: function (text, value) {
        var $div = $("<div>", {
            class: "inputchoices",
            text: text
        });

        $div.click(function () {
            Globals.selectedObj = value;
            if (Globals.selectedObj != null) {
                GameController.executeAndRunTimers(function () {
                    $("#cmdinputmenu").hide();
                    GameController.stopAwaitingInput();
                    $("#cmdinputmenu").css("visibility", "hidden");
                    ActionRecorder.choseInputAction(text);
                    SetCommandInput(Globals.variableGettingSet, Globals.selectedObj);
                    GameCommands.runCommands();
                });
            }
        });

        $("#cmdinputchoices").append($div);
        $("#cmdinputmenu").show();
    },

    addCharacterOptions: function (act) {
        Interactables.characters().forEach(function (character) {
            if (act) {
                GameUI.addInputChoice(act, CharToString(character), character.Charname);
            } else {
                GameUI.addCmdInputChoice(CharToString(character), character.Charname);
            }
        });
    },

    addObjectOptions: function (act) {
        Interactables.roomAndInventoryObjects().forEach(function (obj) {
            if (act) {
                GameUI.addInputChoice(act, objecttostring(obj), obj);
            } else {
                GameUI.addCmdInputChoice(objecttostring(obj), obj);
            }
        });
    },

    setCmdInputForCustomChoices: function (title, tempcommand) {
        this.clearCmdInputChoices();
        for (var i = 0; i < tempcommand.CustomChoices.length; i++) {
            var text = PerformTextReplacements(tempcommand.CustomChoices[i]);
            this.addCmdInputChoice(text, text);
        }
        this.setCmdInputMenuTitle(tempcommand, title);
    },

    showTextMenuChoice: function (title) {
        $("#textMenuTitle").text(title);
        $("#textchoice").css("visibility", "visible");
        $("#textchoice input").focus();
    },

    addActionChoice: function (obj, action, text) {
        var $div = $("<div>", {
            class: "ActionChoices",
            text: text,
            value: action.name
        });

        $div.click(function (e) {
            var selectionchoice = $(this).val();
            var selectiontext = $(this).text();
            if (selectionchoice != null) {
                GameController.executeAndRunTimers(function () {
                    ActionRecorder.actedOnObject(obj, selectiontext);
                    $("#MainText").append('</br><b>' + selectionchoice + "</b>");
                    $("#MainText").animate({
                        scrollTop: $("#MainText")[0].scrollHeight
                    });
                    $("#selectionmenu").css("visibility", "hidden");
                    ResetLoopObjects();
                    GameActions.processAction(selectionchoice, false, obj);
                });
            }
        });

        $("#Actionchoices").append($div);
        return $div;
    },

    displayActions: function (obj, clickEvent) {
        var actions = obj.Actions;
        if (GetActionCount(actions) === 0) {
            return;
        }

        $("#Actionchoices").empty();
        Globals.curActions = actions;
        for (var i = 0; i < actions.length; i++) {
            var action = actions[i];
            if (actionShouldBeVisible(action)) {
                this.addActionChoice(obj, action, nameForAction(action));
                this.addChildActions(obj, actions, "--", action.name);
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

        var leftPosition = clickEvent.clientX;
        var topPosition = clickEvent.clientY;
        var rightPosition = leftPosition + $("#Actionchoices").width();
        var bottomPosition = topPosition + $("#Actionchoices").height();
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        var fudgeFactor = 2;
        if (rightPosition > windowWidth - fudgeFactor) {
            leftPosition -= (rightPosition - windowWidth + fudgeFactor);
        }
        if (bottomPosition > windowHeight - fudgeFactor) {
            topPosition -= (bottomPosition - windowHeight + fudgeFactor);
        }

        $("#selectionmenu").css("top", topPosition + "px");
        $("#selectionmenu").css("left", leftPosition + "px");
        $("#selectionmenu").css("visibility", "visible");
        $("#Actionchoices").focus();
    },

    addChildActions: function (obj, actions, Indent, ActionName) {
        for (var i = 0; i < actions.length; i++) {
            var action = actions[i];
            if (action.name.substring(0, 2) != "<<" && action.bActive && action.actionparent == ActionName) {
                this.addActionChoice(obj, action, Indent + nameForAction(action));
                this.addChildActions(obj, actions, "--" + Indent, action.name);
            }
        }
    },

    addOpenedObjects: function(outerObject, thelistbox, itemclass) {
        TheGame.Objects.forEach(function (innerObject) {
            if (
                (objectContainsObject(outerObject, innerObject)) ||
                ((outerObject.constructor.name === "character") && characterHasObject(outerObject, innerObject))
            ) {
                thelistbox.append(
                    GameUI.panelLink(
                        itemclass,
                        '--' + objecttostring(innerObject),
                        innerObject.UniqueIdentifier,
                        innerObject.Actions,
                        Finder.object
                    )
                );
                
                if (innerObject.bOpenable && innerObject.bOpen) {
                    GameUI.addOpenedObjects(innerObject, thelistbox, itemclass);
                }
            }
        });
    },

    refreshRoomObjects: function () {
        $("#RoomObjects").empty();
        Interactables.visibleRoomObjects().forEach(function (obj) {
            $("#RoomObjects").append(
                GameUI.panelLink(
                    'RoomObjects',
                    objecttostring(obj),
                    obj.UniqueIdentifier,
                    obj.Actions,
                    Finder.object
                )
            );

            if (obj.bContainer) {
                if (!obj.bOpenable || obj.bOpen) {
                    GameUI.addOpenedObjects(obj, $("#RoomObjects"), 'RoomObjects');
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
                                $("#RoomObjects").append(
                                    GameUI.panelLink(
                                        'RoomObjects',
                                        objecttostring(tempobj),
                                        tempobj.UniqueIdentifier,
                                        tempobj.Actions,
                                        Finder.object
                                    )
                                );

                                if (tempobj.bContainer) {
                                    if (!tempobj.bOpenable || tempobj.bOpen) {
                                        GameUI.addOpenedObjects(tempobj, $("#RoomObjects"), 'RoomObjects');
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    refreshInventory: function () {
        $("#Inventory").empty();
        Interactables.visibleInventoryObjects().forEach(function (obj) {
            $("#Inventory").append(
                GameUI.panelLink(
                    'RoomObjects',
                    objecttostring(obj),
                    obj.UniqueIdentifier,
                    obj.Actions,
                    Finder.object
                )
            );

            if (obj.bContainer) {
                if (!obj.bOpenable || obj.bOpen) {
                    GameUI.addOpenedObjects(obj, $("#Inventory"), 'RoomObjects');
                }
            }
        });
    },

    refreshCharacters: function () {
        $("#VisibleCharacters").empty();
        Interactables.characters().forEach(function (obj) {
            $("#VisibleCharacters").append(
                GameUI.panelLink(
                    'VisibleCharacters',
                    CharToString(obj),
                    obj.Charname,
                    obj.Actions,
                    Finder.character
                )
            );

            if (obj.bAllowInventoryInteraction) {
                GameUI.addOpenedObjects(obj, $("#VisibleCharacters"), 'VisibleCharacters');
            }
        });
    },

    panelLink: function (itemClass, text, value, actions, objFinderFunction) {
        var $div = $("<div>", {
            class: itemClass,
            text: text,
            value: value
        });
        $div.toggleClass('no-actions', GetActionCount(actions) === 0);

        $div.click(function(clickEvent) {
            // TODO: this is the main place that stashes Globals.selectedObj, try to get rid of it
            Globals.selectedObj = objFinderFunction($(this).val());
            if (Globals.selectedObj != null) {
                Globals.theObj = Globals.selectedObj;
                GameUI.displayActions(Globals.selectedObj, clickEvent);
            }
        });
        return $div;
    },

    refreshPanelItems: function () {
        this.refreshInventory();
        this.refreshRoomObjects();
        this.refreshCharacters();
    },

    displayLiveTimers: function () {
        var activeLiveTimers = GameTimers.activeLiveTimers();
        $('.live-timer-display').toggle(activeLiveTimers.length > 0);
        if (activeLiveTimers.length > 0) {
            var $container = $('.live-timer-display-rows');
            $container.empty();
            activeLiveTimers.forEach(function (timer) {
                var $timerRow = $('<tr>');
                $timerRow.append('<td>' + timer.Name + '</td>');
                $timerRow.append('<td>' + (timer.TimerSeconds - (timer.curtickcount / 1000)) + 's</td>');
                $timerRow.append('<td><b>Click to Skip</b></td>');
                $timerRow.data('timer-name', timer.Name);
                $timerRow.click(function () {
                    var timerName = $(this).data('timer-name');
                    var timer = Finder.timer(timerName);
                    var secondsRemaining = (timer.TimerSeconds - (timer.curtickcount / 1000));
                    for (var i = 0; i < secondsRemaining; i++) {
                        GameTimers.tickLiveTimers(true);
                    }
                    GameUI.refreshPanelItems();
                    GameUI.displayLiveTimers();
                });
                $container.append($timerRow);
            });
        }
    }
};
