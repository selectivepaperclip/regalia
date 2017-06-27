
function customproperty(){this.Name="";this.Value="";}
function SetupCustomPropertyData(GameData){var CurProperty=new customproperty();CurProperty.Name=GameData[0];CurProperty.Value=GameData[1];return CurProperty;}