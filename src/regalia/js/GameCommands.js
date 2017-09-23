var GameCommands = {
    runSingleCommand: function (commandBeingProcessed, part2, part3, part4, cmdtxt, objectBeingActedUpon, act) {
        switch (commandBeingProcessed.cmdtype) {
            case "CT_LAYEREDIMAGE_ADD": {
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
            case "CT_LAYEREDIMAGE_REMOVE": {
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
            case "CT_LAYEREDIMAGE_REPLACE": {
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
            case "CT_LAYEREDIMAGE_CLEAR": {
                var temp = GetGameImage(part2);
                if (temp != null) {
                    temp.LayeredImages[0] = "";
                    RefreshPictureBoxes();
                }
                break;
            }
            case "CT_ITEM_GETRANDOMGROUP": {
                throw new Error("CT_ITEM_GETRANDOMGROUP not implemented!");
            }
            case "CT_MM_GETRANDOMGROUP": {
                throw new Error("CT_MM_GETRANDOMGROUP not implemented!");
            }
            case "CT_Status_ItemVisibleInvisible": {
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
            case "CT_DISPLAYITEMDESC": {
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
            case "CT_LOOP_BREAK": {
                return true;
            }
            case "CT_EXPORTVARIABLE": {
                break;
            }
            case "CT_IMPORTVARIABLE": {
                break;
            }
            case "CT_VARIABLE_SET_RANDOMLY": {
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
            case "CT_CANCELMOVE": {
                Globals.bCancelMove = true;
                break;
            }
            case "CT_ACTION_CLEAR_CUSTOMCHOICE": {
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
            case "CT_ACTION_ADD_CUSTOMCHOICE": {
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
            case "CT_ACTION_REMOVE_CUSTOMCHOICE": {
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
            case "CT_SETPLAYERGENDER": {
                TheGame.Player.PlayerGender = part2;
                break;
            }
            case "CT_PAUSEGAME": {
                AddTextToRTF("--------------------------------\r\n", "Black", "Bold");
                PauseGame();
                return true;
            }
            case "CT_SETPLAYERNAME": {
                TheGame.Player.Name = PerformTextReplacements(part4, null);
                break;
            }
            case "CT_DISPLAYPLAYERDESC": {
                var val = PerformTextReplacements(TheGame.Player.Description, null);
                AddTextToRTF(val + "\r\n", "Black", "Regular");
                break;
            }
            case "CT_ITEM_LAYERED_REMOVE": {
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
            case "CT_ITEM_LAYERED_WEAR": {
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
            case "CT_DISPLAYTEXT": {
                AddTextToRTF(cmdtxt + "</br>", "Black", "Regular");
                break;
            }
            case "CT_ENDGAME": {
                AddTextToRTF(cmdtxt + "\r\n", "Black", "Regular");
                alert("EndGame");
                GameUI.hideGameElements();
                break;
            }
            case "CT_MOVEITEMTOINV": {
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
            case "CT_ITEMS_MOVE_CONTAINER_TO_CONTAINER": {
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
            case "CT_ITEM_SET_VISIBILITY": {
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
            case "CT_MOVEINVENTORYTOCHAR": {
                Interactables.inventoryObjects().forEach(function (obj) {
                    obj.locationtype = "LT_CHARACTER";
                    obj.locationname = part2;
                });
                break;
            }
            case "CT_MOVEINVENTORYTOROOM": {
                Interactables.inventoryObjects().forEach(function (obj) {
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
            case "CT_MOVECHARINVTOPLAYER": {
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
            case "CT_ROOM_MOVE_ITEMS_TO_PLAYER": {
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
            case "CT_DISPLAYROOMDESCRIPTION": {
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
            case "CT_CHAR_DISPLAYPORT": {
                var tempchar = null;
                tempchar = GetCharacter(part2);
                if (tempchar != null) {
                    showImage(tempchar.CharPortrait);
                }
                break;
            }
            case "CT_DISPLAYROOMPICTURE": {
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
            case "CT_MOVEITEMTOROOM": {
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
            case "CT_MOVEITEMTOOBJ": {
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
            case "CT_MOVEITEMTOCHAR": {
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
            case "CT_SETEXIT": {
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
            case "CT_SETEXITDESTINATION": {
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
            case "CT_EXECUTETIMER": {
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
            case "CT_RESETTIMER": {
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
            case "CT_SETTIMER": {
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
            case "CT_SETITEMDESC": {
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
            case "CT_SETPLAYERDESC": {
                TheGame.Player.Description = cmdtxt;
                break;
            }
            case "CT_VARIABLE_SET_WITH_ROOMPROPERTYVALUE": {
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
                        else if (varindex1a != -1)
                            tempvar.VarArray[varindex][varindex1a] = ValueToSet;
                        else
                            tempvar.VarArray[varindex] = ValueToSet;
                    } else if (tempvar.vartype == "VT_NUMBER" || tempvar.vartype == "VT_NUMBERARRAY") {
                        if (varindex == -1)
                            tempvar.dNumType = ValueToSet;
                        else if (varindex1a != -1)
                            tempvar.VarArray[varindex][varindex1a] = ValueToSet;
                        else
                            tempvar.VarArray[varindex] = ValueToSet;
                    }
                }
                break;
            }
            case "CT_VARIABLE_SET_WITH_TIMERPROPERTYVALUE": {
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
            case "CT_VARIABLE_SET_WITH_VARIABLEPROPERTYVALUE": {
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
            case "CT_VARIABLE_SET_WITH_CHARPROPERTYVALUE": {
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
            case "CT_VARIABLE_SET_WITH_ITEMPROPERTYVALUE": {
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
            case "CT_VARIABLE_SET_WITH_PLAYERPROPERTYVALUE": {
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
            case "CT_ROOM_SET_CUSTOM_PROPERTY_JS": {
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
            case "CT_TIMER_SET_CUSTOM_PROPERTY_JS": {
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
            case "CT_VARIABLE_SET_CUSTOM_PROPERTY_JS": {
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
            case "CT_ITEM_SET_CUSTOM_PROPERTY_JS": {
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
            case "CT_CHAR_SET_CUSTOM_PROPERTY_JS": {
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
            case "CT_PLAYER_SET_CUSTOM_PROPERTY_JS": {
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
            case "CT_SETVARIABLE": {
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
            case "CT_VARIABLE_SET_WITH_VARIABLE": {
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
            case "CT_DISPLAYVARIABLE": {
                var tempvar = GetVariable(part2);
                var varindex = GetArrayIndex(part2, 0);
                var varindex2a = GetArrayIndex(part2, 1);
                if (tempvar != null) {
                    if (tempvar.vartype == "VT_DATETIMEARRAY") {
                    } else if (tempvar.vartype == "VT_NUMBER") {
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
            case "CT_CHAR_SETPORT": {
                var tempchar = null;
                tempchar = GetCharacter(part2);
                if (tempchar != null) {
                    tempchar.CharPortrait = part3;
                }
                break;
            }
            case "CT_SETROOMPIC": {
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
            case "CT_SETPLAYERPORTRAIT": {
                TheGame.Player.PlayerPortrait = part2;
                SetPortrait(part2);
                break;
            }
            case "CT_SETLAYEREDPLAYERPORTRAIT": {
                // TODO: use the layers!
                TheGame.Player.PlayerPortrait = part2;
                SetPortrait(part2);
                break;
            }
            case "CT_DISPLAYLAYEREDPICTURE": {
                mainImageExtraLayers = [part2];
                renderMainImageAndLayers();
                break;
            }
            case "CT_DISPLAYPICTURE": {
                showImage(part2);
                break;
            }
            case "CT_MM_SET_BACKGROUND_MUSIC": {
                var newmusic = "images/" + part2;
                var mplayer = $("#BGMusic");
                $("#bgmusicsource").attr("src", newmusic);
                mplayer[0].load();
                mplayer[0].play();
                break;
            }
            case "CT_MM_STOP_BACKGROUND_MUSIC": {
                $("#BGMusic")[0].pause();
                break;
            }
            case "CT_MM_PLAY_SOUNDEFFECT": {
                var newmusic = "images/" + part2;
                var mplayer = $("#SoundEffect").attr('src', newmusic)[0];
                mplayer.load();
                mplayer.play();
                break;
            }
            case "CT_MM_SET_UD_COMPASS": {
                $('#CustomUDCompass').off('load');
                $('#CustomUDCompass').attr('src', 'images/' + part2);
                $('#UDCompass').hide();
                break;
            }
            case "CT_MM_SET_MAIN_COMPASS": {
                $('#CustomCompass').off('load');
                $('#CustomCompass').attr('src', 'images/' + part2);
                $('#Compass').hide();
                break;
            }
            case "CT_SETOBJECTACTION": {
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
            case "CT_SETCHARACTION": {
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
            case "CT_CHAR_SET_GENDER": {
                var tempobj = GetCharacter(part2);
                if (tempobj != null) {
                    tempobj.CharGender = part3;
                }
                break;
            }
            case "CT_CHAR_SET_NAME": {
                var tempobj = GetCharacter(part2);
                if (tempobj != null) {
                    tempobj.CharnameOverride = part4;
                }
                break;
            }
            case "CT_ROOM_SET_NAME_OVERRIDE": {
                var tempobj = null;
                tempobj = GetRoom(part2);
                if (tempobj != null) {
                    tempobj.SDesc = part4;
                }
                break;
            }
            case "CT_ITEM_SET_NAME_OVERRIDE": {
                var tempobj = null;
                tempobj = GetObject(part2);
                if (tempobj != null) {
                    tempobj.sdesc = part4;
                }
                break;
            }
            case "CT_SETPLAYERACTION": {
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
            case "CT_SETROOMACTION": {
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
            case "CT_SETLOCKEDUNLOCKED": {
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
            case "CT_SETOPENCLOSED": {
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
            case "CT_SETITEMTOWORN": {
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
            case "CT_DISPLAYCHARDESC": {
                AddTextToRTF(GetCharacter(part2).Description + "\r\n", "Black", "Regular");
                var bfoundanitem = false;
                break;
            }
            case "CT_MOVECHAR": {
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
                        break;
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
            case "CT_MOVEPLAYER": {
                movePlayerToRoom(part2);
                break;
            }
            case "CT_MOVETOCHAR": {
                var tempchar = GetCharacter(part2);
                if (tempchar != null) {
                    if (tempchar.CurrentRoom != VoidRoomGuid && tempchar.CurrentRoom != CurrentRoomGuid) {
                        movePlayerToRoom(tempchar.CurrentRoom);
                    }
                }
                break;
            }
            case "CT_MOVETOOBJ": {
                var tempobj = GetObject(part2);
                if (tempobj != null) {
                    if (tempobj.locationtype == "LT_ROOM") {
                        movePlayerToRoom(tempobj.locationname);
                    }
                }
                break;
            }
            case "CT_CHAR_MOVETOOBJ": {
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
            case "CT_SETCHARDESC": {
                GetCharacter(part2).Description = cmdtxt;
                break;
            }
            case "CT_SETROOMDESCRIPTION": {
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
            case "CT_JAVA_SET_RAGS": {
                cmdtxt = PerformTextReplacements(cmdtxt, null);
                var jsresult = null;
                jsresult = evalJankyJavascript(cmdtxt);
                SetRagsObjectsFromJavascript(jsresult);
                break;
            }
            case "CT_SETVARIABLE_NUMERIC_BYINPUT": {
                var acttype = part2;
                if (acttype == "Custom") {
                    GameUI.setCmdInputForCustomChoices(part4, commandBeingProcessed);
                } else if (acttype == "Text") {
                    GameUI.showTextMenuChoice(part4);
                }
                GameController.startAwaitingInput();
                Globals.variableGettingSet = commandBeingProcessed;
                return true;
            }
            case "CT_SETVARIABLEBYINPUT": {
                var acttype = part2;
                Globals.variableGettingSet = commandBeingProcessed;
                if (acttype == "Custom") {
                    GameUI.setCmdInputForCustomChoices(part4, commandBeingProcessed);
                    GameController.startAwaitingInput();
                    return true;
                }

                if (acttype == "Text") {
                    GameUI.showTextMenuChoice(part4);
                    GameController.startAwaitingInput();
                    return true;
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
    },

    runCommands: function (TheObj, AdditionalInputData, act) {
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
                    var stop = this.runSingleCommand(commandBeingProcessed, part2, part3, part4, cmdtxt, objectBeingActedUpon, act);
                    if (stop) {
                        return;
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
};
