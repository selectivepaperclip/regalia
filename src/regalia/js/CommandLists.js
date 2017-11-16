var CommandLists = {
    stack: [
        {obj: null, act: null, autoShift: false, commands: []}
    ],

    startNestedCommandList: function (params) {
        params = params || {};
        var newStackParams = {
            obj: params.obj || this.objectBeingActedUpon(),
            act: params.act,
            commands: []
        };
        this.stack.unshift(newStackParams);
        return newStackParams;
    },

    finishNestedCommandList: function (commandList) {
        commandList.autoShift = true;
        GameCommands.runCommands();
    },

    nextCommand: function () {
        this.unshiftEmptyStacks();
        return this.stack[0].commands[0];
    },

    shiftCommand: function () {
        this.unshiftEmptyStacks();
        return this.stack[0].commands.shift();
    },

    addToFront: function (command) {
        this.stack[0].commands.unshift(command);
    },

    addToEnd: function (command) {
        this.stack[0].commands.push(command);
    },

    setAdditionalData: function (additionalData) {
        for (var i = 0; i < this.stack.length; i++) {
            if (this.stack[i].act) {
                this.stack[i].additionalData = additionalData;
                return;
            }
        }
    },

    lastAdditionalData: function () {
        for (var i = 0; i < this.stack.length; i++) {
            if (this.stack[i].act) {
                return this.stack[i].additionalData;
            }
        }
    },

    objectBeingActedUpon: function () {
        for (var i = 0; i < this.stack.length; i++) {
            if (this.stack[i].obj) {
                return this.stack[i].obj;
            }
        }
    },

    actionBeingTaken: function () {
        for (var i = 0; i < this.stack.length; i++) {
            if (this.stack[i].act) {
                return this.stack[i].act;
            }
        }
    },

    commandCount: function () {
        this.unshiftEmptyStacks();
        var result = this.stack[0].commands.length;
        for (var i = 1; i < this.stack.length; i++) {
            if (!this.stack[i - 1].autoShift) {
                return result;
            }
            result += this.stack[i].commands.length;
        }
        return result;
    },

    unshiftEmptyStacks: function () {
        while (this.stack.length > 1 && this.stack[0].commands.length === 0) {
            if (this.stack[0].autoShift) {
                this.stack.shift();
            } else {
                return;
            }
        }
    }
};