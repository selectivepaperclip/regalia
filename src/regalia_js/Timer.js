
function timer(){this.Name="";this.TType="";this.Active=false;this.Restart=false;this.TurnNumber=0;this.Length=0;this.LiveTimer=false;this.TimerSeconds=0;this.CustomProperties=new Array();this.Actions=new Array();this.curtickcount=0;}
function SetupTimerData(GameData){var TheTimer=new timer();TheTimer.Name=GameData[0];TheTimer.TType=GameData[1];TheTimer.Active=GameData[2];TheTimer.Restart=GameData[3];TheTimer.TurnNumber=GameData[4];TheTimer.Length=GameData[5];TheTimer.LiveTimer=GameData[6];TheTimer.TimerSeconds=GameData[7];var numimages=0;for(_j=0;_j<GameData[8].length;_j++)
{TheTimer.CustomProperties.length=numimages+1;TheTimer.CustomProperties[numimages]=SetupCustomPropertyData(GameData[8][_j]);numimages++;}
numimages=0;for(_j=0;_j<GameData[9].length;_j++)
{TheTimer.Actions.length=numimages+1;TheTimer.Actions[numimages]=SetupActionData(GameData[9][_j]);numimages++;}
return TheTimer;}