var GameActions = {
    executeAction: function (act, runNext, AdditionalInputData) {
        Logger.logExecutingAction(act);
        var bPassed = true;
        if (act.bConditionFailOnFirst) {
            for (var i = 0; i < act.Conditions.length; i++) {
                var tempcond = act.Conditions[i];
                if (GameConditions.testCondition(tempcond, AdditionalInputData, act, Globals.timerInvocation, null)) {
                    if (tempcond.Checks.length == 1 && isLoopCheck(tempcond.Checks[0])) {
                        // Do nothing?
                    } else {
                        GameCommands.addCommands(runNext, tempcond.PassCommands, AdditionalInputData, act);
                    }
                } else {
                    bPassed = false;
                    GameCommands.addCommands(runNext, tempcond.FailCommands, AdditionalInputData, act);
                }
            }
        } else {
            bPassed = (act.Conditions.length === 0);
            for (var i = 0; i < act.Conditions.length; i++) {
                var tempcond = act.Conditions[i];
                var btestresult = GameConditions.testCondition(tempcond, AdditionalInputData, act, Globals.timerInvocation, null);
                if (btestresult) {
                    bPassed = btestresult;
                    GameCommands.addCommands(runNext, tempcond.PassCommands, AdditionalInputData, act);
                } else {
                    GameCommands.addCommands(runNext, tempcond.FailCommands, AdditionalInputData, act);
                }
            }
        }
        GameCommands.addCommands(runNext, bPassed ? act.PassCommands : act.FailCommands, AdditionalInputData, act);
    }
};
