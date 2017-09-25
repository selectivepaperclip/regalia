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

        if (CommandLists.commandCount() == 0 && this.shouldRunCommands() && !wasRunningTimers) {
            GameTimers.runTimerEvents();
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
