
function ragsimage() {
    this.TheName = "";
    this.curfilename = "";
    this.GroupName = "";
    this.TheType = "";
    this.LayeredImages = "";
    this.EnhInputData = new enhinputdata();
}

function SetupImageData(GameData) {
    var TheImage = new ragsimage();

    TheImage.TheName = GameData[0];
    TheImage.GroupName = GameData[1];
    TheImage.LayeredImages = GameData[2];
    TheImage.EnhInputData = SetupEnhInputData(GameData[3]);
    var imagetype = GetImageMimeType(TheImage.TheName.substr(TheImage.TheName.length - 3, 3));
    if (imagetype != "") {
        TheImage.TheType = imagetype;
    }
    return TheImage;
}