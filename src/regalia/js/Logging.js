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

Logger.level = 0;

var ActionRecorder = {
    actions: [],
    addAction: function () {
        var method = arguments[0];
        var args = Array.prototype.slice.call(arguments, 1);
        var actionString;
        if (args.length === 0) {
            actionString = method;
        } else {
            var escapedArgs = args.map(function (arg) {
                return "'" + arg.replace(/'/g, '\\\'') + "'";
            }).join(', ');
            actionString = method + ' ' + escapedArgs;
        }
        this.actions.push(actionString);
    },

    clear: function () {
        this.actions = [];
    },

    toString: function () {
        return this.actions.join("\n");
    },

    locationChange: function (direction) {
        this.addAction('go_direction', direction)
    },

    roomEntered: function (roomTitle) {
        this.addAction('go_to_room', roomTitle);
    },

    clickedContinue: function () {
        this.addAction('continue_until_unpaused');
    },

    choseInputAction: function (action) {
        this.addAction('choose_input_action', action);
    },

    filledInTextInput: function (input) {
        this.addAction('choose_input_action', input);
    },

    actedOnSelf: function (action) {
        this.addAction('act_on_self', action);
    },

    actedOnRoom: function (action) {
        this.addAction('act_on_room', action);
    },

    actedOnObject: function (object, action) {
        var method;
        var objectName;
        if (object instanceof player) {
            return this.actedOnSelf(action);
        } else if (object instanceof room) {
            return this.actedOnRoom(action);
        } else if (object instanceof character) {
            method = 'act_on_character';
            objectName = object.CharnameOverride || object.Charname;
        } else {
            method = 'act_on_object';
            objectName = object.sdesc || object.name;
        }
        this.addAction(method, objectName, action);
    }
};

var ImageRecorder = {
    imagesSeen: {},

    sawImage: function (image) {
        this.imagesSeen[image] = true;
    },

    allSeenImages: function () {
        return Object.keys(this.imagesSeen);
    }
};