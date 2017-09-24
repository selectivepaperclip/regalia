var GameTimers = {
    activeLiveTimers: function () {
        if (!TheGame) {
            return [];
        }
        return TheGame.Timers.filter(function (timer) {
           return timer.Active && timer.LiveTimer;
        });
    },
    staticTimers: function () {
        if (!TheGame) {
            return [];
        }
        return TheGame.Timers.filter(function (timer) {
            return !timer.LiveTimer;
        });
    },
    runSingleTimer: function (timer) {
        Globals.currentTimer = timer.Name;
        this.runTimer(timer, function () {
            if (Globals.bResetTimer) {
                GameTimers.runSingleTimer(timer);
            }
        });
    },
    runTimerEvents: function () {
        if (Globals.bRunningTimers) {
            return;
        }

        Globals.bRunningTimers = true;
        Globals.bResetTimer = false;
        Globals.currentTimer = "";
        this.staticTimers().forEach(function (timer) {
            runAfterPause(function (timer) {
                return function () {
                    if (timer != null) {
                        GameTimers.runSingleTimer(timer);
                    }
                };
            }(timer));
        });
        runAfterPause(function () {
            Globals.bRunningTimers = false;
            GameUI.refreshPanelItems();
        });
    },
    runTimer: function (timer, callback) {
        if (!callback) {
            callback = function () { };
        }

        Globals.bResetTimer = false;
        if (!timer.Active) {
            return;
        }

        timer.TurnNumber++;
        if (timer.TurnNumber > timer.Length && timer.TType == "TT_LENGTH") {
            if (!timer.Restart)
                timer.Active = false;
            timer.TurnNumber = 0;
            return;
        }

        var tempact = Finder.action(timer.Actions, "<<On Each Turn>>");
        if (tempact != null) {
            if (timer.LiveTimer) {
                Globals.runningLiveTimerCommands = true;
                CommandLists.addToFront(function () {
                    Globals.runningLiveTimerCommands = false;
                });
                GameActions.processAction(tempact, true);
                GameCommands.runCommands(Globals.theObj, null);
                return;
            } else {
                GameActions.processAction(tempact, false);
            }
        }

        UpdateStatusBars();
        runNextAfterPause(function () {
            if (Globals.bResetTimer)
                return callback();
            tempact = Finder.action(timer.Actions, "<<On Turn " +
                timer.TurnNumber.toString() + ">>");
            if (tempact != null)
                GameActions.processAction(tempact, false); //null);
            UpdateStatusBars();

            runNextAfterPause(function () {
                if (Globals.bResetTimer)
                    return callback();
                if (timer.TurnNumber == timer.Length) {
                    tempact = Finder.action(timer.Actions, "<<On Last Turn>>");
                    if (tempact != null)
                        GameActions.processAction(tempact, false); //null);
                }
                UpdateStatusBars();
                callback();
            });
        });
    },

    tickLiveTimers: function (skipRefresh) {
        if (!TheGame) {
            return;
        }

        this.activeLiveTimers().forEach(function(timer) {
            timer.curtickcount += 1000;
            if (timer.curtickcount >= timer.TimerSeconds * 1000) {
                timer.curtickcount = 0;
                GameTimers.runTimer(timer);
                if (!skipRefresh) {
                    GameUI.refreshPanelItems();
                }
            }
        });
    },

    scheduleLiveTimers: function (oneSecond) {
        GameTimers.tickLiveTimers();
        GameUI.displayLiveTimers();
        setTimeout(function () {
            GameTimers.scheduleLiveTimers(oneSecond);
        }, oneSecond);
    }
};


