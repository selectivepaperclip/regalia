var GameController = {
    gamePaused: false,
    gameAwaitingInput: false,

    title: function () {
        if (TheGame.Title) {
            return TheGame.Title;
        }

        var urlParts = window.location.href.split("/");
        var penultimateUrlPart = urlParts[urlParts.length - 2];
        return decodeURIComponent(penultimateUrlPart);
    },

    startAwaitingInput: function () {
        this.gameAwaitingInput = true;

        // Somewhat of a hack: normally if commands executed as the result of a live timer
        // the are allowed to succeed even if the game is paused. In the desktop RAGS client,
        // live timer events seem to keep happening even if input is requested from the user.

        // That's hard to implement well, so this just makes it so if the player is asked for
        // input it doesn't try to clear out the rest of the event queue until execution
        // resumes normally
        Globals.runningLiveTimerCommands = false;

        GameUI.disableSaveAndLoad();
        GameUI.hideGameElements();
    },

    stopAwaitingInput: function () {
        this.gameAwaitingInput = false;
        GameUI.enableSaveAndLoad();
        GameUI.showGameElements();
    },

    executeAndRunTimers: function (fn) {
        var wasRunningTimers = Globals.bRunningTimers;

        fn();

        runAfterPause(function () {
            if (CommandLists.commandCount() == 0 && GameController.shouldRunCommands() && !wasRunningTimers) {
                GameTimers.runTimerEvents();
                UpdateStatusBars();
            }
        });
    },

    pause: function () {
        this.gamePaused = true;
        GameUI.disableSaveAndLoad();
        GameUI.hideGameElements();
    },

    continue: function () {
        this.gamePaused = false;
        GameUI.enableSaveAndLoad();
        GameUI.showGameElements();
    },

    shouldRunCommands: function () {
        return !(this.gamePaused || this.gameAwaitingInput);
    }
};
