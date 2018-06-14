var GameTimers = {
    activeLiveTimers: function () {
        if (!TheGame) {
            return [];
        }
        return TheGame.Timers.filter(function (timer) {
           return timer.Active && timer.LiveTimer;
        });
    },
    activeStaticTimers: function () {
        if (!TheGame) {
            return [];
        }
        return TheGame.Timers.filter(function (timer) {
            return timer.Active && !timer.LiveTimer;
        });
    },
    runSingleTimer: function (timer, checkActive) {
        this.runTimer(timer, checkActive, function () {
            if (timer._wasReset) {
                GameTimers.runSingleTimer(timer, checkActive);
            }
        });
    },
    runTimerEvents: function () {
        if (Globals.bRunningTimers) {
            return;
        }

        Globals.bRunningTimers = true;
        this.activeStaticTimers().forEach(function (timer) {
            runAfterPause(function (timer) {
                return function () {
                    if (timer != null) {
                        Logger.logExecutingTimer(timer);
                        GameTimers.runSingleTimer(timer, true);
                    }
                };
            }(timer));
        });
        runAfterPause(function () {
            Globals.bRunningTimers = false;
            GameUI.refreshPanelItems();
        });
    },
    runTimer: function (timer, checkActive, callback) {
        if (!callback) {
            callback = function () { };
        }

        timer._wasReset = false;
        if (checkActive) {
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
        }

        var tempact = Finder.action(timer.Actions, "<<On Each Turn>>");
        if (tempact != null) {
            if (timer.LiveTimer) {
                Globals.runningLiveTimerCommands = true;
                CommandLists.addToFront(function () {
                    Globals.runningLiveTimerCommands = false;
                });
                GameActions.processAction(tempact, true);
                GameCommands.runCommands();
                return;
            } else {
                GameActions.processAction(tempact, false);
            }
        }

        UpdateStatusBars();
        runNextAfterPause(function () {
            if (!timer.Active) {
                return;
            }
            if (timer._wasReset) {
                return callback();
            }
            tempact = Finder.action(timer.Actions, "<<On Turn " + timer.TurnNumber.toString() + ">>");
            if (tempact != null) {
                GameActions.processAction(tempact, false);
            }
            UpdateStatusBars();

            runNextAfterPause(function () {
                if (!timer.Active) {
                    return;
                }
                if (timer._wasReset) {
                    return callback();
                }
                if (timer.TurnNumber == timer.Length) {
                    tempact = Finder.action(timer.Actions, "<<On Last Turn>>");
                    if (tempact != null) {
                        GameActions.processAction(tempact, false);
                    }
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
                GameTimers.runTimer(timer, true);
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


