var Finder = {
    action: function(actions, name) {
        var lowercaseActionName = name.trim().toLowerCase();
        return actions.find(function (action) {
            return action.name.trim().toLowerCase() === lowercaseActionName;
        });
    },
    timer: function(timerName) {
        var lowercaseTimerName = timerName.trim().toLowerCase();
        return TheGame.Timers.find(function (timer) {
            return timer.Name.trim().toLowerCase() === lowercaseTimerName;
        });
    },
    variable: function(variableName) {
        variableName = variableName.trim();
        if (variableName.indexOf("(") > -1) {
            variableName = variableName.substring(0, variableName.indexOf("("));
        }

        var lowercaseVariableName = variableName.toLowerCase();
        return TheGame.Variables.find(function (variable) {
            return variable.varname.trim().toLowerCase() === lowercaseVariableName;
        });
    },
    object: function(uidOrName) {
        if (!uidOrName) {
            return null;
        }
        uidOrName = uidOrName.trim();

        for (var i = 0; i < TheGame.Objects.length; i++) {
            if (TheGame.Objects[i].UniqueIdentifier === uidOrName) {
                return TheGame.Objects[i];
            }
        }

        var lowercaseObjectName = uidOrName.toLowerCase();
        for (var j = 0; j < TheGame.Objects.length; j++) {
            if (TheGame.Objects[j].name && TheGame.Objects[j].name.trim().toLowerCase() === lowercaseObjectName) {
                return TheGame.Objects[j];
            }
        }
    },
    character: function(characterName) {
        if (characterName == null) {
            return null;
        }

        var lowercaseCharacterName = characterName.trim().toLowerCase();
        for (var i = 0; i < TheGame.Characters.length; i++) {
            if (TheGame.Characters[i].Charname.trim().toLowerCase() == lowercaseCharacterName) {
                return TheGame.Characters[i];
            }
        }
    },
    room: function(roomName) {
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
        var lowercaseRoomName = roomName.toLowerCase();
        //check by name if we get here
        for (var j = 0; j < TheGame.Rooms.length; j++) {
            var room = TheGame.Rooms[j];
            if (room.Name.trim().toLowerCase() == lowercaseRoomName) {
                return TheGame.Rooms[j];
            }

            // Though it usually produces a UniqueID, sometimes
            // when you manually edit a field in the Rags designer
            // (instead of selecting from a dropdown) the value
            // for a room (in e.x. CT_MOVEPLAYER) will be the
            // room name or `%{name}-%{sdesc}`. So we need to check for that.
            if (containsDash && room.SDesc) {
                var joinedName = [room.Name, room.SDesc].join('-');
                if (joinedName.trim().toLowerCase() == lowercaseRoomName) {
                    return room;
                }
            }
        }
        return null;
    },
    customProp: function (obj, propertyName) {
        for (var i = 0; i < obj.CustomProperties.length; i++) {
            var curprop = obj.CustomProperties[i];
            if (curprop.Name == propertyName) {
                return curprop;
            }
        }
    }
};








