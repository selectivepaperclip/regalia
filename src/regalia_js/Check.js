
function check(){this.CondType="CT_Uninitialized";this.CkType="CT_Uninitialized";this.ConditionStep2="";this.ConditionStep3="";this.ConditionStep4="";}
function SetupCheckData(GameData){var CurCheck=new check();CurCheck.CondType=GameData[0];CurCheck.CkType=GameData[1];CurCheck.ConditionStep2=GameData[2];CurCheck.ConditionStep3=GameData[3];CurCheck.ConditionStep4=GameData[4];return CurCheck;}