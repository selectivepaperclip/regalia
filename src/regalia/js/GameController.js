var GameController = {
    gamePaused: false,
    gameAwaitingInput: false,

    startAwaitingInput: function () {
        this.gameAwaitingInput = true;
        GameUI.hideGameElements();
    },

    stopAwaitingInput: function () {
        this.gameAwaitingInput = false;
        GameUI.showGameElements();
    },

    executeAndRunTimers: function (fn) {
        var wasRunningTimers = bRunningTimers;

        fn();

        if (CommandLists.commandCount() == 0 && this.shouldRunCommands() && !wasRunningTimers) {
            RunTimerEvents();
            UpdateStatusBars();
        }
    },

    pause: function () {
        this.gamePaused = true;
        GameUI.hideGameElements();
    },

    continue: function () {
        this.gamePaused = false;
        GameUI.showGameElements();
    },

    shouldRunCommands: function () {
        return !(this.gamePaused || this.gameAwaitingInput);
    }
};
