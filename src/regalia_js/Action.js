
function action(){this.name="default";this.bActive=true;this.overridename="";this.actionparent="None";this.bConditionFailOnFirst=true;this.InputType="None";this.PassCommands=new Array();this.FailCommands=new Array();this.Conditions=new Array();this.CustomChoices=new Array();this.EnhInputData=new enhinputdata();this.CustomChoiceTitle="";}
function SetupActionData(GameData){var CurAction=new action();CurAction.name=GameData[0];CurAction.bActive=GameData[1];CurAction.overridename=GameData[2];CurAction.actionparent=GameData[3];CurAction.bConditionFailOnFirst=GameData[4];CurAction.InputType=GameData[5];CurAction.CustomChoiceTitle=GameData[6];var numimages=0;for(var _j=0;_j<GameData[7].length;_j++)
{CurAction.PassCommands.length=numimages+1;if(GameData[7][_j][0]=="CMD"){CurAction.PassCommands[numimages]=SetupCommandData(GameData[7][_j]);}
else{CurAction.PassCommands[numimages]=SetupConditionData(GameData[7][_j]);}
numimages++;}
numimages=0;for(var _j=0;_j<GameData[8].length;_j++)
{CurAction.FailCommands.length=numimages+1;if(GameData[8][_j][0]=="CMD"){CurAction.FailCommands[numimages]=SetupCommandData(GameData[8][_j]);}
else{CurAction.FailCommands[numimages]=SetupConditionData(GameData[8][_j]);}
numimages++;}
numimages=0;for(var _j=0;_j<GameData[9].length;_j++)
{CurAction.Conditions.length=numimages+1;CurAction.Conditions[numimages]=SetupConditionData(GameData[9][_j]);numimages++;}
numimages=0;for(var _j=0;_j<GameData[10].length;_j++)
{CurAction.CustomChoices.length=numimages+1;CurAction.CustomChoices[numimages]=GameData[10][_j];numimages++;}
CurAction.EnhInputData=SetupEnhInputData(GameData[11]);return CurAction;}