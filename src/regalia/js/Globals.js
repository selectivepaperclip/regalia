var TheGame = null;
var OriginalGame = null;

var Globals = {
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
    runningLiveTimerCommands: false,
    theObj: null,
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
