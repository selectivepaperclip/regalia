
function enhinputdata() {
    this.BackgroundColor = "None";
    this.TextColor = "Black";
    this.TextFont = "Times New Roman Bold";
    this.Imagename = "";
    this.bUseEnhancedGraphics = true;
    this.bAllowCancel = true;
    this.NewImage = "";
}

function SetupEnhInputData(GameData) {
    var CurData = new enhinputdata();
    CurData.BackgroundColor = GameData[0];
    CurData.TextColor = GameData[1];
    CurData.Imagename = GameData[2];
    CurData.bUseEnhancedGraphics = GameData[3];
    CurData.bAllowCancel = GameData[4];
    CurData.NewImage = GameData[5];
    CurData.TextFont = GameData[6];
    return CurData;
}