
function PerformTextReplacements(text, loopobject, newvalue) {
    var bChangedSomething = true;
    while (bChangedSomething) {
        bChangedSomething = false;
        var startpt = text.length;
        var tempindex = text.lastIndexOf("[", startpt);
        var foundindexes = [];
        while (tempindex >= 0) {
            var endindex = text.indexOf("]", tempindex);
            if (endindex != -1) {
                var sub = text.substring(tempindex, endindex + 1).toUpperCase();
                var colindex = sub.indexOf(":", 0);
                if (colindex != -1) {
                    bChangedSomething = true;
                    var subsub = sub.substring(0, colindex + 1).toUpperCase();
                    if (subsub == "[V:")
                        text = ReplaceVariable(text, tempindex, newvalue);
                    else if (subsub == "[JSA:")
                        text = ReplaceJSA(text, tempindex);
                    else if (subsub == "[RP:")
                        text = ReplaceProperty("rp", text, tempindex, newvalue);
                    else if (subsub == "[IP:")
                        text = ReplaceProperty("ip", text, tempindex, newvalue);
                    else if (subsub == "[PP:")
                        text = ReplaceProperty("pp", text, tempindex, newvalue);
                    else if (subsub == "[CP:")
                        text = ReplaceProperty("cp", text, tempindex, newvalue);
                    else if (subsub == "[VP:")
                        text = ReplaceProperty("vp", text, tempindex, newvalue);
                    else if (subsub == "[TP:")
                        text = ReplaceProperty("tp", text, tempindex, newvalue);
                    else if (subsub == "[IA:")
                        text = ReplaceAttribute("ia", text, tempindex, newvalue);
                    else if (subsub == "[TA:")
                        text = ReplaceAttribute("ta", text, tempindex, newvalue);
                    else if (subsub == "[CA:")
                        text = ReplaceAttribute("ca", text, tempindex, newvalue);
                    else if (subsub == "[RA:")
                        text = ReplaceAttribute("ra", text, tempindex, newvalue);
                    else if (subsub == "[PA:")
                        text = ReplaceAttribute("pa", text, tempindex, newvalue);
                    else
                        bChangedSomething = false;
                } else {
                    if (sub.indexOf("[/B]") > -1 || sub.indexOf("[/I]") > -1 || sub.indexOf("[/U]") > -1 || sub.indexOf("[/F]") > -1 || sub.indexOf("[/C]") > -1 || sub.indexOf("[/MIDDLE]") > -1 || sub.indexOf("[B]") > -1 || sub.indexOf("[I]") > -1 || sub.indexOf("[U]") > -1 || sub.indexOf("[F ") > -1 || sub.indexOf("[C ") > -1 || sub.indexOf("[MIDDLE]") > -1) {
                        startpt = tempindex - 1;
                    } else {
                        text = ReplaceStatic(text, tempindex, sub, loopobject);
                    }
                }
            }
            if (startpt > text.length) {
                if (tempindex == 0) {
                    tempindex = -1;
                } else {
                    foundindexes.push(tempindex);
                    tempindex = text.lastIndexOf("[", tempindex - 1);
                    var bfoundinlist = false;
                    for (var k = 0; k < foundindexes.length; k++) {
                        if (foundindexes[k] == tempindex) {
                            bfoundinlist = true;
                            break;
                        }
                    }
                    if (bfoundinlist)
                        tempindex = text.lastIndexOf("[", tempindex - 1);
                }
            } else if (startpt == -1) {
                tempindex = -1;
            } else {
                if (tempindex == 0) {
                    tempindex = -1;
                } else {
                    foundindexes.push(tempindex);
                    tempindex = text.lastIndexOf("[", tempindex - 1);
                    if (foundindexes.indexOf(tempindex) > -1) {
                        tempindex = text.lastIndexOf("[", tempindex - 1);
                    }
                }
            }
        }
    }
    return text;
}

function ReplaceVariable(text, tempindex, replacementvalue) {
    var bReplacement = false;
    if (replacementvalue != null)
        bReplacement = true;
    if (replacementvalue == " ")
        replacementvalue = "";
    if (tempindex >= 0) {
        text = text.slice(0, tempindex) + text.slice(tempindex + 3);
        var endindex = text.indexOf("]", tempindex);
        var endindex2 = text.indexOf("(", tempindex);
        if (endindex2 < endindex && endindex2 != -1) {
            var endindex3 = text.indexOf(")", tempindex);
            if (endindex3 != -1) {
                var varname = text.substring(tempindex, endindex2).trim();
                if (endindex3 - (endindex2 + 1) < 0)
                    return;
                var arrayindex = text.substring(endindex2 + 1, endindex3).trim();
                var actualindex = arrayindex;
                var endindex4 = text.indexOf(")", endindex3 + 1);
                var actualindex2 = -1;
                if (endindex4 != -1) {
                    try {
                        var tempstr = text.substring(endindex3 + 2, endindex4 + 2);
                        actualindex2 = parseInt(PerformTextReplacements(tempstr, null));
                        if (isNaN(actualindex2)) {
                            actualindex2 = -1;
                            endindex4 = -1;
                        }
                    } catch (err) {
                        actualindex2 = -1;
                        endindex4 = -1;
                    }
                }
                if (actualindex > -1) {
                    var dtformat = "";
                    if (varname.indexOf(":") > -1) {
                        dtformat = varname.substring(varname.indexOf(":") + 1);
                        varname = varname.substring(0, varname.indexOf(":"));
                    }
                    var tempvar = GetVariable(varname);
                    if (tempvar != null) {
                        var lengthtoremove = 0;
                        if (endindex4 > -1)
                            lengthtoremove = endindex4 - tempindex + 2;
                        else
                            lengthtoremove = endindex3 - tempindex + 2;
                        text = text.slice(0, tempindex) + text.slice(tempindex + lengthtoremove);
                        if (actualindex < tempvar.VarArray.length) {
                            var newval = "";
                            if (tempvar.vartype == "VT_NUMBERARRAY" || tempvar.vartype == "VT_STRINGARRAY") {
                                if (actualindex2 > -1) {
                                    try {
                                        newval = tempvar.VarArray[actualindex][actualindex2].toString();
                                        if (bReplacement) {
                                            tempvar.VarArray[actualindex][actualindex2] = replacementvalue;
                                        }
                                    } catch (err) {
                                        newval = "<invalid variable reference>";
                                    }
                                } else {
                                    newval = tempvar.VarArray[actualindex].toString();
                                    if (bReplacement) {
                                        if (tempvar.vartype == GameVariable.VarType.VT_NUMBERARRAY) {
                                            tempvar.VarArray[actualindex] = Convert.ToDouble(replacementvalue);
                                        } else {
                                            tempvar.VarArray[actualindex] = replacementvalue;
                                        }
                                    }
                                }
                            } else if (tempvar.vartype == "VT_DATETIMEARRAY") {
                                if (actualindex2 > -1) {
                                    var tempdt = tempvar.VarArray[actualindex][actualindex2].toString();
                                    if (bReplacement) {
                                        tempvar.VarArray[actualindex][actualindex2] = replacementvalue;
                                    }
                                    var dttemp = tempdt;
                                    if (dtformat != "") {
                                        newval = dttemp;
                                    } else
                                        newval = dttemp;
                                } else {
                                    if (dtformat != "") {
                                        newval = tempvar.VarArray[actualindex].toString();
                                        if (bReplacement) {
                                            try {
                                                tempvar.VarArray[actualindex] = replacementvalue;
                                            } catch (err) {
                                                tempvar.VarArray[actualindex] = "bad value";
                                            }
                                        }
                                    } else
                                        newval = tempvar.VarArray[actualindex].toString();
                                }
                            }
                        }
                        if (!bReplacement)
                            text = text.slice(0, tempindex) + newval + text.slice(tempindex);
                    }
                }
            }
        } else if (endindex > -1) {
            var varname = text.substring(tempindex, endindex).trim();
            text = text.slice(0, tempindex) + text.slice(endindex + 1);
            var dtformat = "";
            if (varname.indexOf(":") > -1) {
                dtformat = varname.substring(varname.indexOf(":") + 1);
                varname = varname.substring(0, varname.indexOf(":"));
            }
            var tempvar = GetVariable(varname);
            if (tempvar != null) {
                var newval = "";
                if (tempvar.vartype == "VT_NUMBER") {
                    newval = tempvar.dNumType.toString();
                    if (bReplacement) {
                        try {
                            tempvar.dNumType = parseFloat(replacementvalue);
                        } catch (err) {
                            tempvar.dNumType = -1.0;
                        }
                    }
                } else if (tempvar.vartype == "VT_STRING") {
                    newval = tempvar.sString;
                    if (bReplacement) {
                        tempvar.sString = replacementvalue;
                    }
                } else if (tempvar.vartype == "VT_DATETIME") {
                    if (dtformat != "") {
                        newval = tempvar.dtDateTime.toString();
                        if (bReplacement) {
                            try {
                                tempvar.dtDateTime = replacementvalue;
                            } catch (err) {}
                        }
                    } else {
                        newval = tempvar.dtDateTime.toString();
                        if (bReplacement) {
                            try {
                                tempvar.dtDateTime = replacementvalue;
                            } catch (err) {}
                        }
                    }
                }
                if (bReplacement) {
                    newval = PerformTextReplacements(newval, null);
                }
                text = text.slice(0, tempindex) + newval + text.slice(tempindex);
            }
        }
    }
    return text;
}

function ReplaceJSA(text, tempindex) {
    if (tempindex >= 0) {
        text = text.slice(0, tempindex) + text.slice(tempindex + 5);
        var endindex = text.indexOf("]", tempindex);
        if (endindex > -1) {
            var varname = text.substring(tempindex, endindex).trim();
            text = text.slice(0, tempindex) + text.slice(endindex + 1);
            var tempvar = GetVariable(varname);
            if (tempvar != null) {
                var newval = JavaScriptArray(tempvar);
                //newval = tempvar.VarArray.toString();
                //newval = newval.replace("\r", "\\r");
                //newval = newval.replace("\n", "\\n");
                text = text.slice(0, tempindex) + newval + text.slice(tempindex);
            }
        }
        tempindex = text.lastIndexOf("[jsa:");
    }
    return text;
}

function ReplaceProperty(property, text, tempindex, replacementvalue) {
    var tempobj = null;
    var bReplacement = false;
    if (replacementvalue != null)
        bReplacement = true;
    if (replacementvalue == " ")
        replacementvalue = "";
    if (tempindex >= 0) {
        text = text.slice(0, tempindex) + text.slice(tempindex + 4);
        var endindex = text.indexOf("]", tempindex);
        if (endindex > -1) {
            var proptext = text.substring(tempindex, endindex).trim();
            text = text.slice(0, tempindex) + text.slice(endindex + 1);
            var dtformat = "";
            var parts = proptext.split(":");
            var partmatch = "";
            if (property == "pp") {
                tempobj = TheGame.Player;
                partmatch = parts[0].trim();
            } else {
                if (parts.length === 1) {
                    // Property request with no access. Rather than crashing,
                    // we'll replace it with empty string, which seems to be
                    // what the .NET client does.
                    return text;
                }

                partmatch = parts[1].trim();
            }
            if (parts.length > 1) {
                if (property == "rp") {
                    tempobj = GetRoom(parts[0]);
                } else if (property == "ip") {
                    tempobj = GetObject(parts[0]);
                } else if (property == "cp") {
                    tempobj = GetCharacter(parts[0]);
                } else if (property == "vp") {
                    tempobj = GetVariable(parts[0]);
                } else if (property == "tp") {
                    tempobj = GetTimer(parts[0]);
                }
            }
            if (tempobj != null) {
                for (var i = 0; i < tempobj.CustomProperties.length; i++) {
                    var prop = tempobj.CustomProperties[i];
                    if (prop.Name.toLowerCase() == partmatch.toLowerCase()) {
                        text = text.slice(0, tempindex) + prop.Value + text.slice(tempindex);
                        if (bReplacement) {
                            prop.Value = replacementvalue;
                        }
                        break;
                    }
                }
            }
        }
        tempindex = text.lastIndexOf("[" + property + ":");
    }
    return text;
}

function ReplaceAttribute(AttType, text, tempindex, replacementvalue) {
    var bReplacement = false;
    if (replacementvalue != null)
        bReplacement = true;
    if (replacementvalue == " ")
        replacementvalue = "";
    if (tempindex >= 0) {
        text = text.slice(0, tempindex) + text.slice(tempindex + 4);
        var endindex = text.indexOf("]", tempindex);
        if (endindex > -1) {
            var proptext = text.substring(tempindex, endindex).trim();
            text = text.slice(0, tempindex) + text.slice(endindex + 1);
            var dtformat = "";
            var parts = proptext.split(":");
            var tempobject = null;
            if (parts.length >= 1) {
                parts[0] = parts[0].trim();
                if (AttType == "ia") {
                    tempobject = GetObject(parts[0]);
                } else if (AttType == "ta") {
                    tempobject = GetTimer(parts[0]);
                } else if (AttType == "ca") {
                    tempobject = GetCharacter(parts[0]);
                } else if (AttType == "ra") {
                    tempobject = GetRoom(parts[0]);
                } else if (AttType == "pa") {
                    tempobject = TheGame.Player;
                }
                if (tempobject != null) {
                    var proptocheck = "";
                    if (AttType == "pa")
                        proptocheck = parts[0];
                    else
                        proptocheck = parts[1];
                    switch (proptocheck.toUpperCase()) {
                        case "ACTIVE":
                            {
                                text = text.slice(0, tempindex) + tempobject.Active.toString() + text.slice(tempindex);
                                if (bReplacement) {
                                    temptimer.Active = (replacementvalue.toLowerCase() == "true");
                                }
                                break;
                            }
                        case "TIMERTYPE":
                            {
                                text = text.slice(0, tempindex) + tempobject.TType + text.slice(tempindex);
                                if (bReplacement) {
                                    tempobject.TType = replacementvalue;
                                }
                                break;
                            }
                        case "LENGTH":
                            {
                                text = text.slice(0, tempindex) + tempobject.length + text.slice(tempindex);
                                if (bReplacement) {
                                    tempobject.length = parseInt(replacementvalue);
                                }
                                break;
                            }
                        case "TURNNUMBER":
                            {
                                text = text.slice(0, tempindex) + tempobject.TurnNumber + text.slice(tempindex);
                                if (bReplacement) {
                                    tempobject.TurnNumber = parseInt(replacementvalue);
                                }
                                break;
                            }
                        case "TIMERSECONDS":
                            {
                                text = text.slice(0, tempindex) + tempobject.TimerSeconds + text.slice(tempindex);
                                if (bReplacement) {
                                    tempobject.TimerSeconds = parseInt(replacementvalue);
                                }
                                break;
                            }
                        case "LIVETIMER":
                            {
                                text = text.slice(0, tempindex) + tempobject.LiveTimer + text.slice(tempindex);
                                if (bReplacement) {
                                    tempobject.LiveTimer = (replacementValue.toLowerCase() == "true");
                                }
                                break;
                            }
                        case "ACTION":
                            {
                                var tempact = GetAction(tempobject.Actions, parts[2]);
                                if (tempact != null) {
                                    text = GetActionData(tempact, parts[3], text, tempindex, replacementvalue);
                                }
                                break;
                            }
                        case "NAME":
                            {
                                switch (AttType) {
                                    case "ia":
                                        {
                                            text = text.slice(0, tempindex) + tempobject.name + text.slice(tempindex);
                                            if (bReplacement) {
                                                tempobject.name = replacementvalue;
                                            }
                                            break;
                                        }
                                    case "ra":
                                    case "pa":
                                        {
                                            text = text.slice(0, tempindex) + tempobject.Name + text.slice(tempindex);
                                            if (bReplacement) {
                                                tempobject.Name = replacementvalue;
                                            }
                                            break;
                                        }
                                    case "ca":
                                        {
                                            text = text.slice(0, tempindex) + tempobject.Charname + text.slice(tempindex);
                                            if (bReplacement) {
                                                tempobject.Charname = replacementvalue;
                                            }
                                            break;
                                        }
                                }
                                break;
                            }
                        case "DESCRIPTION":
                            {
                                switch (AttType) {
                                    case "ra":
                                        {
                                            text = text.slice(0, tempindex) + tempobject.Description + text.slice(tempindex);
                                            if (bReplacement) {
                                                tempobject.Description = replacementvalue;
                                            }
                                            break;
                                        }
                                    case "ia":
                                        {
                                            text = text.slice(0, tempindex) + tempobject.description + text.slice(tempindex);
                                            if (bReplacement) {
                                                tempobject.description = replacementvalue;
                                            }
                                            break;
                                        }
                                }
                                break;
                            }
                        case "SDESC":
                            {
                                text = text.slice(0, tempindex) + tempobject.SDesc + text.slice(tempindex);
                                if (bReplacement) {
                                    tempobject.SDesc = replacementvalue;
                                }
                                break;
                            }
                        case "ROOMPIC":
                            {
                                text = text.slice(0, tempindex) + tempobject.RoomPic + text.slice(tempindex);
                                if (bReplacement) {
                                    tempobject.RoomPic = replacementvalue;
                                }
                                break;
                            }
                        case "ENTEREDFIRSTTIME":
                            {
                                text = text.slice(0, tempindex) + tempobject.bEnterFirstTime + text.slice(tempindex);
                                if (bReplacement) {
                                    tempobject.bEnterFirstTime = (replacementValue.toLowerCase() == "true");
                                }
                                break;
                            }
                        case "LEFTFIRSTTIME":
                            {
                                text = text.slice(0, tempindex) + tempobject.bLeaveFirstTime + text.slice(tempindex);
                                if (bReplacement) {
                                    tempobject.bLeaveFirstTime = (replacementValue.toLowerCase() == "true");
                                }
                                break;
                            }
                        case "ID":
                            {
                                switch (AttType) {
                                    case "ra":
                                        {
                                            text = text.slice(0, tempindex) + tempobject.UniqueID + text.slice(tempindex);
                                            break;
                                        }
                                    case "ia":
                                        {
                                            text = text.slice(0, tempindex) + tempobject.UniqueIdentifier + text.slice(tempindex);
                                            break;
                                        }
                                }
                                break;
                            }
                        case "EXIT":
                            {
                                var tempexit = GetExit(tempobject, parts[2]);
                                if (tempexit != null) {
                                    if (parts[3].toUpperCase() == "ACTIVE") {
                                        text = text.slice(0, tempindex) + tempexit.bActive + text.slice(tempindex);
                                        if (bReplacement) {
                                            tempexit.bActive = (replacementValue.toLowerCase() == "true");
                                        }
                                    } else if (parts[3].toUpperCase() == "DESTINATIONID") {
                                        text = text.slice(0, tempindex) + tempexit.DestinationRoom + text.slice(tempindex);
                                        if (bReplacement) {
                                            tempexit.DestinationRoom = replacementvalue;
                                        }
                                    } else if (parts[3].toUpperCase() == "DESTINATIONNAME") {
                                        text = text.slice(0, tempindex) + tempexit.DestinationRoom + text.slice(tempindex);
                                        if (bReplacement) {
                                            tempexit.DestinationRoom = GetRoom(replacementvalue).UniqueID;
                                        }
                                    } else if (parts[3].toUpperCase() == "PORTAL") {
                                        text = text.slice(0, tempindex) + tempexit.PortalObjectName + text.slice(tempindex);
                                        if (bReplacement) {
                                            tempexit.PortalObjectName = replacementvalue;
                                        }
                                    }
                                }
                                break;
                            }
                        case "NAMEOVERRIDE":
                            {
                                text = text.slice(0, tempindex) + tempobject.sdesc + text.slice(tempindex);
                                if (bReplacement) {
                                    tempobject.sdesc = replacementvalue;
                                }
                                break;
                            }
                        case "CLOTHINGLAYERS":
                            {
                                var layers = "[";
                                var count = 0;
                                for (var i = 0; i < tempobject.LayeredZoneLevels.length; i++) {
                                    var str = tempobject.LayeredZoneLevels[i];
                                    if (count > 0)
                                        layers += ",";
                                    count++;
                                    layers += "[";
                                    var strsplit = str.split(":");
                                    if (strsplit.length > 0) {
                                        for (var j = 0; j < strsplit.length; j++) {
                                            if (j > 0)
                                                layers += ",";
                                            layers += "\"" + strsplit[j] + "\"";
                                        }
                                    }
                                    layers += "]";
                                }
                                layers += "]";
                                text = text.slice(0, tempindex) + layers + text.slice(tempindex);
                                break;
                            }
                        case "PREPOSITION":
                            {
                                text = text.slice(0, tempindex) + tempobject.preposition + text.slice(tempindex);
                                if (bReplacement) {
                                    tempobject.preposition = replacementvalue;
                                }
                                break;
                            }
                        case "IMPORTANT":
                            {
                                text = text.slice(0, tempindex) + tempobject.bImportant + text.slice(tempindex);
                                if (bReplacement) {
                                    tempobject.bImportant = (replacementValue.toLowerCase() == "true");
                                }
                                break;
                            }
                        case "CARRYABLE":
                            {
                                text = text.slice(0, tempindex) + tempobject.bCarryable + text.slice(tempindex);
                                if (bReplacement) {
                                    tempobject.bCarryable = (replacementValue.toLowerCase() == "true");
                                }
                                break;
                            }
                        case "WEARABLE":
                            {
                                text = text.slice(0, tempindex) + tempobject.bWearable + text.slice(tempindex);
                                if (bReplacement) {
                                    tempobject.bWearable = (replacementValue.toLowerCase() == "true");
                                }
                                break;
                            }
                        case "WORN":
                            {
                                text = text.slice(0, tempindex) + tempobject.bWorn + text.slice(tempindex);
                                if (bReplacement) {
                                    tempobject.bWorn = (replacementValue.toLowerCase() == "true");
                                }
                                break;
                            }
                        case "CONTAINER":
                            {
                                text = text.slice(0, tempindex) + tempobject.bContainer + text.slice(tempindex);
                                if (bReplacement) {
                                    tempobject.bContainer = (replacementValue.toLowerCase() == "true");
                                }
                                break;
                            }
                        case "OPENABLE":
                            {
                                text = text.slice(0, tempindex) + tempobject.bOpenable + text.slice(tempindex);
                                if (bReplacement) {
                                    tempobject.bOpenable = (replacementValue.toLowerCase() == "true");
                                }
                                break;
                            }
                        case "OPEN":
                            {
                                text = text.slice(0, tempindex) + tempobject.bOpen + text.slice(tempindex);
                                if (bReplacement) {
                                    tempobject.bOpen = (replacementValue.toLowerCase() == "true");
                                }
                                break;
                            }
                        case "LOCKABLE":
                            {
                                text = text.slice(0, tempindex) + tempobject.bLockable + text.slice(tempindex);
                                if (bReplacement) {
                                    tempobject.bLockable = (replacementValue.toLowerCase() == "true");
                                }
                                break;
                            }
                        case "LOCKED":
                            {
                                text = text.slice(0, tempindex) + tempobject.bLocked + text.slice(tempindex);
                                if (bReplacement) {
                                    tempobject.bLocked = (replacementValue.toLowerCase() == "true");
                                }
                                break;
                            }
                        case "VISIBLE":
                            {
                                text = text.slice(0, tempindex) + tempobject.bVisible + text.slice(tempindex);
                                if (bReplacement) {
                                    tempobject.bVisible = (replacementValue.toLowerCase() == "true");
                                }
                                break;
                            }
                        case "ENTERABLE":
                            {
                                text = text.slice(0, tempindex) + tempobject.bEnterable + text.slice(tempindex);
                                if (bReplacement) {
                                    tempobject.bEnterable = (replacementValue.toLowerCase() == "true");
                                }
                                break;
                            }
                        case "READABLE":
                            {
                                text = text.slice(0, tempindex) + tempobject.bReadable + text.slice(tempindex);
                                if (bReplacement) {
                                    tempobject.bReadable = (replacementValue.toLowerCase() == "true");
                                }
                                break;
                            }
                        case "WEIGHT":
                            {
                                text = text.slice(0, tempindex) + tempobject.dWeight + text.slice(tempindex);
                                if (bReplacement) {
                                    tempobject.dWeight = parseFloat(replacementvalue);
                                }
                                break;
                            }
                        case "OVERRIDENAME":
                            {
                                text = text.slice(0, tempindex) + tempobject.CharnameOverride + text.slice(tempindex);
                                if (bReplacement) {
                                    tempobject.CharnameOverride = replacementvalue;
                                }
                                break;
                            }
                        case "GENDER":
                            {
                                switch (AttType) {
                                    case "ca":
                                        {
                                            text = text.slice(0, tempindex) + tempobject.CharGender + text.slice(tempindex);
                                            if (bReplacement) {
                                                tempobject.CharGender = replacementvalue;
                                            }
                                            break;
                                        }
                                    case "pa":
                                        {
                                            text = text.slice(0, tempindex) + tempobject.PlayerGender + text.slice(tempindex);
                                            if (bReplacement) {
                                                tempobject.PlayerGender = replacementvalue;
                                            }
                                            break;
                                        }
                                }
                                break;
                            }
                        case "CURRENTROOM":
                            {
                                text = text.slice(0, tempindex) + tempobject.CurrentRoom + text.slice(tempindex);
                                if (bReplacement) {
                                    tempobject.CurrentRoom = replacementvalue;
                                }
                                break;
                            }
                        case "ALLOWINVINTERACTION":
                            {
                                text = text.slice(0, tempindex) + tempobject.bAllowInventoryInteraction + text.slice(tempindex);
                                if (bReplacement) {
                                    tempobject.bAllowInventoryInteraction = (replacementValue.toLowerCase() == "true");
                                }
                                break;
                            }
                        case "CURROOM":
                            {
                                if (tempobject.CurrentRoom != null)
                                    text = text.slice(0, tempindex) + tempobject.CurrentRoom + text.slice(tempindex);
                                else
                                    text = text.slice(0, tempindex) + "<Null>" + text.slice(tempindex);
                                if (bReplacement) {
                                    TheGame.Player.CurrentRoom = replacementvalue;
                                }
                                break;
                            }
                        case "CURPORTRAIT":
                            {
                                text = text.slice(0, tempindex) + tempobject.PlayerPortrait + text.slice(tempindex);
                                if (bReplacement) {
                                    tempobject.PlayerPortrait = replacementvalue;
                                }
                                break;
                            }
                    }
                }
            }
        }
        tempindex = text.lastIndexOf("[" + AttType + ":");
    }
    return text;
}

function JavaScriptArray(tempvar) {
    var bValidType = false;
    var bWantQuotes = true;
    if (tempvar.vartype == "VT_NUMBERARRAY") {
        bWantQuotes = false;
        bValidType = true;
    } else if (tempvar.vartype == "VT_STRINGARRAY" || tempvar.vartype == "VT_DATETIMEARRAY") {
        bValidType = true;
    }
    if (!bValidType)
        return "";
    var newval = "[";
    var count = -1;
    for (var i = 0; i < tempvar.VarArray.length; i++) {
        count++;
        if (count > 0)
            newval += ",";
        var row = tempvar.VarArray[i];
        if (row != null) {
            newval += "[";
            var count2 = -1;
            for (var j = 0; j < row.length; j++) {
                var str = row[j];
                count2++;
                if (count2 > 0)
                    newval += ",";
                if (bWantQuotes)
                    newval += "\"" + str.toString().replace(new RegExp("\"", "g"), "\\\"") + "\"";
                else
                    newval += str.toString();
            }
            newval += "]";
        } else {
            if (bWantQuotes)
                newval += "\"" + tempvar.VarArray[i].toString().replace(new RegExp("\"", "g"), "\\\"") + "\"";
            else
                newval += tempvar.VarArray[i].toString();
        }
    }
    newval += "];";
    return newval;
}

function GetActionData(tempact, part3, text, tempindex, replacementvalue) {
    var bReplacement = false;
    if (replacementvalue != null)
        bReplacement = true;
    switch (part3.toUpperCase()) {
        case "ACTIVE":
            {
                text = text.slice(0, tempindex) + tempact.bActive + text.slice(tempindex);
                if (bReplacement) {
                    tempact.bActive = (replacementValue.toLowerCase() == "true");
                }
                break;
            }
        case "OVERRIDENAME":
            {
                text = text.slice(0, tempindex) + tempact.overridename + text.slice(tempindex);
                if (bReplacement) {
                    tempact.overridename = replacementvalue;
                }
                break;
            }
        case "ACTIONPARENT":
            {
                text = text.slice(0, tempindex) + tempact.actionparent + text.slice(tempindex);
                if (bReplacement) {
                    tempact.actionparent = replacementvalue;
                }
                break;
            }
        case "INPUTTYPE":
            {
                text = text.slice(0, tempindex) + tempact.InputType + text.slice(tempindex);
                if (bReplacement) {
                    tempact.InputType = replacementvalue;
                }
                break;
            }
    }
    return text;
}

function ReplaceStatic(text, tempindex, change, loopobject) {
    if (tempindex < 0) {
        return;
    }

    var staticReplacements = [
        '[PLAYERNAME]', function () {
            return TheGame.Player.Name;
        },
        '[INPUTDATA]', function () {
            var datatoinput = Globals.additionalData;
            if (loopobject != null && loopobject.AdditionalInputData) {
                datatoinput = loopobject.AdditionalInputData;
            }
            return datatoinput;
        },
        '[MAXCARRY]', function () {
            return TheGame.Player.dWeightLimit;
        },
        '[TURNS]', function () {
            return TurnCount;
        },
        '[CURRENTCARRY]', function () {
            var totalweight = 0;
            for (var i = 0; i < TheGame.Objects.length; i++) {
                var obj = ObjectList[i];
                if (obj.locationtype == "LT_PLAYER") {
                    totalweight += GetItemWeight(obj.UniqueIdentifier);
                }
            }
            return totalweight;
        },
        '[MAN/WOMAN]', function () {
            switch (TheGame.Player.PlayerGender) {
                case "Female":
                {
                    return "woman";
                }
                case "Male":
                {
                    return "man";
                }
                case "Other":
                {
                    return "thing";
                }
            }
        },
        '[MALE/FEMALE]', function () {
            return TheGame.Player.PlayerGender.toLowerCase();
        },
        '[GIRL/BOY]', function () {
            switch (TheGame.Player.PlayerGender) {
                case "Female":
                {
                    return "girl";
                }
                case "Male":
                {
                    return "boy";
                }
                case "Other":
                {
                    return "thing";
                }
            }
        },
        '[ROOM.NAME]', function () {
            var temproom = loopobject;
            if (temproom != null)
                return roomDisplayName(temproom);
            else {
                if (TheGame.Player.CurrentRoom != null) {
                    return roomDisplayName(GetRoom(TheGame.Player.CurrentRoom));
                }
            }
        },
        '[ROOM.ID]', function () {
            var temproom = loopobject;
            if (temproom != null)
                return temproom.UniqueID;
            else {
                if (TheGame.Player.CurrentRoom != null) {
                    return GetRoom(TheGame.Player.CurrentRoom).UniqueID;
                }
            }
        },
        '[EXIT.ACTIVE]', function () {
            if (loopobject != null) {
                var result = "N";
                if (loopobject.bActive)
                    result = "Y";
                return result;
            }
        },
        '[EXIT.DIRECTION]', function () {
            if (loopobject != null) {
                return loopobject.Direction;
            }
        },
        '[EXIT.DESTNAME]', function () {
            if (loopobject != null) {
                return GetRoom(loopobject.DestinationRoom).Name;
            }
        },
        '[EXIT.DESTID]', function () {
            if (loopobject != null) {
                return loopobject.DestinationRoom;
            }
        },
        '[ITEM.NAME]', function () {
            if (loopobject != null)
                return loopobject.name;
        },
        '[ITEM.ID]', function () {
            if (loopobject != null)
                return loopobject.UniqueIdentifier;
        },
        '[CHAR.NAME]', function () {
            if (loopobject != null)
                return loopobject.Charname;
        },
        '[A/AN]', function () {
            var check = text.substring(tempindex).trim();
            if (check.length >= 1) {
                if (check[0].toLowerCase() == "a" || check[0].toLowerCase() == "e" || check[0].toLowerCase() == "i" || check[0].toLowerCase() == "o" || check[0].toLowerCase() == "u") {
                    return "an";
                } else {
                    return "a";
                }
            }
        }
    ];

    for (var i = 0; i < staticReplacements.length; i += 2) {
        var str = staticReplacements[i];
        var func = staticReplacements[i + 1];
        if (change.indexOf(str) > -1) {
            var replacement = func() || '';
            return text.slice(0, tempindex) + replacement + text.slice(tempindex + str.length)
        }
    }

    // TODO: check this
    if (tempindex >= 0 && change.indexOf("[LEN(") > -1) {
        tempindex = change.indexOf("[LEN(", 0);
        var tempvar = null;
        var endlenindex = text.indexOf(")]", tempindex);
        if (endlenindex >= 0) {
            tempindex += 5;
            var varname = text.substring(tempindex, endlenindex);
            tempvar = GetVariable(varname);
        }
        if (tempvar != null) {
            text = text.slice(0, tempindex - 5) + text.slice(endlenindex + 2);
            switch (tempvar.vartype) {
                case "VT_STRING":
                    {
                        text = text.slice(0, tempindex - 5) + tempvar.sString.length + text.slice(tempindex - 5);
                        break;
                    }
                case "VT_STRINGARRAY":
                case "VT_NUMBERARRAY":
                case "VT_DATETIMEARRAY":
                    {
                        text = text.slice(0, tempindex - 5) + tempvar.VarArray.length + text.slice(tempindex - 5);
                        break;
                    }
            }
        } else {
            text = text.slice(0, tempindex) + text.slice(tempindex + 5);
        }
        tempindex = text.indexOf("[len(", 0);
    }

    return text;
}

function GetItemWeight(objid) {
    var retval = 0;
    var tempobj = GetObject(objid);
    if (tempobj != null) {
        retval += tempobj.dWeight;
        if (tempobj.bContainer) {
            for (var i = 0; i < TheGame.Objects.length; i++) {
                var containedobj = TheGame.Objects[i];
                if (containedobj.locationtype == "LT_IN_OBJECT" && containedobj.locationname == tempobj.UniqueIdentifier) {
                    retval += GetItemWeight(containedobj.UniqueIdentifier);
                }
            }
        }
    }
    return retval;
}

function StripOut(value, temptext) {
    if (value == "[f" || value == "[c") {
        var index = temptext.indexOf(value, 0);
        while (index >= 0) {
            var endindex = temptext.indexOf("]", index);
            temptext = temptext.slice(0, index) + temptext.slice(endindex + 1);
            var valueend = "[/" + value[1] + "]";
            endindex = temptext.indexOf(valueend, index);
            if (endindex >= 0) {
                temptext = temptext.slice(0, endindex) + temptext.slice(endindex + 4);
            }
            index = temptext.indexOf(value, 0);
        }
    } else {
        value = value.toLowerCase();
        var index = temptext.indexOf(value, 0);
        while (index >= 0) {
            temptext = temptext.slice(0, index) + temptext.slice(index + value.length);
            index = temptext.indexOf(value, index);
        }
        value = value.slice(0, 1) + "/" + value.slice(1);
        index = temptext.indexOf(value, 0);
        while (index >= 0) {
            temptext = temptext.slice(0, index) + temptext.slice(index + value.length);
            index = temptext.indexOf(value, index);
        }
    }
    return temptext;
}

function MiddlesOnly(temptext) {
    temptext = StripOut("[f", temptext);
    temptext = StripOut("[c", temptext);
    temptext = StripOut("[B]", temptext);
    temptext = StripOut("[i]", temptext);
    temptext = StripOut("[u]", temptext);
    return temptext;
}

function TextOnly(temptext) {
    temptext = StripOut("[f", temptext);
    temptext = StripOut("[c", temptext);
    temptext = StripOut("[B]", temptext);
    temptext = StripOut("[Middle]", temptext);
    temptext = StripOut("[i]", temptext);
    temptext = StripOut("[u]", temptext);
    return temptext;
}