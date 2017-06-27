
function player(){this.Gender="Male";this.Name="";this.Description="";this.StartingRoom=null;this.CurrentRoom=null;this.PlayerGender="Male";this.bPromptForName=false;this.bPromptForGender=false;this.PlayerPortrait="";this.PlayerLayeredImage="";this.Actions=new Array();this.bEnforceWeight=false;this.dWeightLimit=100.5;this.CustomProperties=new Array();}
function SetupPlayerData(GameData){var ThePlayer=new player();ThePlayer.Name=GameData[0];ThePlayer.Description=GameData[1];ThePlayer.StartingRoom=GameData[2];ThePlayer.PlayerGender=GameData[3];ThePlayer.PlayerLayeredImage=GameData[4];ThePlayer.bPromptForName=GameData[5];ThePlayer.bPromptForGender=GameData[6];ThePlayer.PlayerPortrait=GameData[7];ThePlayer.bEnforceWeight=GameData[8];ThePlayer.dWeightLimit=GameData[9];var numimages=0;for(_j=0;_j<GameData[10].length;_j++)
{ThePlayer.CustomProperties.length=numimages+1;ThePlayer.CustomProperties[numimages]=SetupCustomPropertyData(GameData[10][_j]);numimages++;}
numimages=0;for(_j=0;_j<GameData[11].length;_j++)
{ThePlayer.Actions.length=numimages+1;ThePlayer.Actions[numimages]=SetupActionData(GameData[11][_j]);numimages++;}
return ThePlayer;}