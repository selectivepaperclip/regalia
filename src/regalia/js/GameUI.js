var GameUI = {
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
            text: text,
            value: value
        });

        $div.click(function() {
            Globals.selectedObj = $(this).val();
            if (Globals.selectedObj != null) {
                GameController.executeAndRunTimers(function () {
                    Globals.additionalData = Globals.selectedObj;
                    GameController.stopAwaitingInput();
                    $("#inputmenu").css("visibility", "hidden");
                    if (getObjectClass(act) == "action" || "actionparent" in act) {
                        ActionRecorder.choseInputAction(Globals.selectedObj);
                        GameActions.executeAction(act, true, Globals.selectedObj);
                        GameCommands.runCommands(Globals.theObj, Globals.selectedObj, act);
                    }
                });
            }
        });

        $("#inputchoices").append($div);
    },

    addCmdInputChoice: function (text, value) {
        var $div = $("<div>", {
            class: "inputchoices",
            text: text,
            value: value
        });

        $div.click(function () {
            Globals.selectedObj = $(this).val();
            if (Globals.selectedObj != null) {
                GameController.executeAndRunTimers(function () {
                    $("#cmdinputmenu").hide();
                    GameController.stopAwaitingInput();
                    $("#cmdinputmenu").css("visibility", "hidden");
                    ActionRecorder.choseInputAction(Globals.selectedObj);
                    SetCommandInput(Globals.variableGettingSet, Globals.selectedObj);
                    GameCommands.runCommands.apply(GameCommands, Globals.pauseCommandArgs);
                });
            }
        });

        $("#cmdinputchoices").append($div);
        $("#cmdinputmenu").show();
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

    addActionChoice: function (action, text, actionRecipientToLog) {
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
                    ActionRecorder.actedOnSomething(actionRecipientToLog, selectiontext);
                    $("#MainText").append('</br><b>' + selectionchoice + "</b>");
                    $("#MainText").animate({
                        scrollTop: $("#MainText")[0].scrollHeight
                    });
                    $("#selectionmenu").css("visibility", "hidden");
                    ResetLoopObjects();
                    GameActions.processAction(selectionchoice);
                });
            }
        });

        $("#Actionchoices").append($div);
        return $div;
    },

    displayActions: function (actions, clickEvent, actionRecipientToLog) {
        if (GetActionCount(actions) === 0) {
            return;
        }

        $("#Actionchoices").empty();
        Globals.curActions = actions;
        for (var i = 0; i < actions.length; i++) {
            var action = actions[i];
            if (actionShouldBeVisible(action)) {
                this.addActionChoice(action, nameForAction(action), actionRecipientToLog);
                this.addChildActions(actions, "--", action.name, actionRecipientToLog);
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
    },

    addChildActions: function (actions, Indent, ActionName, actionRecipientToLog) {
        for (var i = 0; i < actions.length; i++) {
            var action = actions[i];
            if (action.name.substring(0, 2) != "<<" && action.bActive && action.actionparent == ActionName) {
                this.addActionChoice(action, Indent + nameForAction(action), actionRecipientToLog);
                this.addChildActions(actions, "--" + Indent, action.name, actionRecipientToLog);
            }
        }
    }
};
