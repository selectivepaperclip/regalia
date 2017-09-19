var CommandLists = {
    stack: [
        {obj: null, commands: []}
    ],

    addNestedCommandList: function (obj) {
        this.stack.unshift({obj: obj, commands: []});
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

    objectBeingActedUpon: function () {
        return this.stack[0].obj;
    },

    commandCount: function () {
        this.unshiftEmptyStacks();
        var result = 0;
        for (var i = 0; i < this.stack.length; i++) {
            result += this.stack[i].commands.length;
        }
        return result;
    },

    unshiftEmptyStacks: function () {
        while (this.stack.length > 1 && this.stack[0].commands.length === 0) {
            this.stack.shift();
        }
    }
};