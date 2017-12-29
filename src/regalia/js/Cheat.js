var cheatFreezes = {
  variables: {},
  playerProperties: {}
};

function isFrozenVariable(variable) {
    return !!cheatFreezes.variables[variable.varname];
}

function isFrozenPlayerProperty(property) {
    return !!cheatFreezes.playerProperties[property.Name];
}

$(document).ready(function () {
    $("#cheat_button").click(function(e) {
        $('.cheat-menu').removeClass('hidden');
        $('.cheat-menu').off();
        $('.cheat-menu').click(function (e) {
            if (!$.contains($('.cheat-menu-content')[0], e.target)) {
                $('.cheat-menu').addClass('hidden');
            }
        });

        ReactDOM.render(
            <CheatMenuContent />,
            $('.cheat-menu')[0]
        );
    });

    var originalSetVariable = SetVariable;
    SetVariable = function (tempvar, bArraySet, bJavascript, varindex, varindex1a, replacedstring, cmdtxt, part3) {
        if (isFrozenVariable(tempvar)) {
            return;
        }
        return originalSetVariable.apply(this, arguments);
    };

    var originalSetCustomProperty = SetCustomProperty;
    SetCustomProperty = function (curprop, part3, replacedstring) {
        if (isFrozenPlayerProperty(curprop)) {
            return;
        }
        return originalSetCustomProperty.apply(this, arguments);
    };
});
