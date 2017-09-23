var Finder = {
    action: function(actions, name) {
        name = name.trim();
        return actions.find(function (action) {
            return action.name.trim().toLowerCase() === name.toLowerCase();
        });
    },
    timer: function(timerName) {
        timerName = timerName.trim();
        return TheGame.Timers.find(function (timer) {
            return timer.Name.trim() === timerName;
        });
    },
    variable: function(variableName) {
        variableName = variableName.trim();
        if (variableName.indexOf("(") > -1) {
            variableName = variableName.substring(0, variableName.indexOf("("));
        }
        return TheGame.Variables.find(function (variable) {
            return variable.varname.trim().toLowerCase() === variableName.toLowerCase();
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
        for (var j = 0; j < TheGame.Objects.length; j++) {
            if (TheGame.Objects[j].name && TheGame.Objects[j].name.toLowerCase() === uidOrName.toLowerCase()) {
                return TheGame.Objects[j];
            }
        }
    },
    character: function(characterName) {
        if (characterName == null) {
            return null;
        }

        characterName = characterName.trim();
        for (var i = 0; i < TheGame.Characters.length; i++) {
            if (TheGame.Characters[i].Charname.toLowerCase() == characterName.toLowerCase()) {
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
};








