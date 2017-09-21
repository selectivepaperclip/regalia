var TheGame = null;
var OriginalGame = null;

var Globals = {
    additionalData: "",
    additionalDataContext: {
        action: null,
        timerInvocation: null
    },
    bRunningTimers: false,
    bMasterTimer: false,
    bCancelMove: false,
    bResetTimer: false,
    curActions: undefined,
    currentTimer: null,
    currentImage: "",
    loopArgs: {
        object: null,
        idx: 0,
        array: null
    },
    inputDataObject: null,
    movingDirection: "",
    pauseCommandArgs: null,
    runningLiveTimerCommands: false,
    theObj: null,
    timerInvocation: 0,
    selectedObj: null,
    variableGettingSet: null
};

function ResetLoopObjects() {
    Globals.loopArgs = {
        array: null,
        idx: 0,
        object: null
    };
}
